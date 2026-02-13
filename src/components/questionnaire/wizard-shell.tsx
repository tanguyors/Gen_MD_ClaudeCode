'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/storage/store';
import { getApplicableSections } from '@/lib/questionnaire/sections';
import { StepRenderer } from './step-renderer';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { OptionCardGroup } from '@/components/ui/option-card';
import { OUTPUT_VERBOSITY_OPTIONS } from '@/lib/questionnaire/option-data';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { useLocale, useT } from '@/lib/i18n';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
} from 'lucide-react';

export function WizardShell() {
  const router = useRouter();
  const { questionnaire, currentStep, setCurrentStep, updateSection } = useAppStore();
  const applicableSections = getApplicableSections(questionnaire);
  const totalSteps = applicableSections.length;
  const currentSection = applicableSections[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const { locale } = useLocale();
  const { t } = useT();

  const hasCompletedOnboarding = !!questionnaire.identity?.outputVerbosity;
  const [verbosity, setVerbosity] = useState<string>(questionnaire.identity?.outputVerbosity ?? '');

  const handleContinueOnboarding = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateSection('identity', { outputVerbosity: verbosity } as any);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      router.push('/preview');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSkip = () => handleNext();

  // Show onboarding screen before the wizard
  if (!hasCompletedOnboarding) {
    return (
      <section className="min-h-screen bg-[#FAF9F6] font-sans">
        <div className="relative overflow-hidden min-h-[calc(100vh-80px)] px-6 py-12 lg:py-20 font-sans flex flex-col">
          {/* Decorative Background Blobs */}
          <div className="absolute w-96 h-96 bg-[#FFD1C1] top-[-5%] left-[-5%] rounded-full blur-3xl -z-10 opacity-30" />
          <div className="absolute w-[30rem] h-[30rem] bg-[#D1FAE5] bottom-[-10%] right-[-5%] rounded-full blur-3xl -z-10 opacity-30" />
          <div className="absolute w-80 h-80 bg-[#E9D5FF] top-[15%] right-[5%] rounded-full blur-3xl -z-10 opacity-30" />

          <div className="max-w-5xl mx-auto w-full relative z-10 flex-grow flex flex-col">
            {/* Header Section */}
            <div className="text-center mb-12 lg:mb-16">
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
                {t('onboarding.title')}{' '}
                <code className="bg-white/80 px-3 py-1 rounded-2xl text-[#FF8A71] font-mono font-bold border-2 border-[#FFD9D1] shadow-sm">
                  {t('onboarding.titleHighlight')}
                </code>{' '}
                {t('onboarding.titleEnd')}
              </h1>

              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                {t('onboarding.subtitle')}
              </p>
            </div>

            {/* Verbosity OptionCardGroup */}
            <div className="mb-16">
              <OptionCardGroup
                options={OUTPUT_VERBOSITY_OPTIONS}
                value={verbosity}
                onChange={(v) => setVerbosity(v as string)}
              />
            </div>

            {/* Footer Actions */}
            <div className="flex justify-center mt-auto pb-8">
              <button
                onClick={handleContinueOnboarding}
                disabled={!verbosity}
                className={cn(
                  'group relative px-12 py-5 font-bold rounded-[2rem] transition-all duration-300 flex items-center gap-3 text-lg',
                  verbosity
                    ? 'bg-[#FF8A71] text-white shadow-[0_10px_25px_rgba(255,138,113,0.3)] hover:shadow-[0_15px_35px_rgba(255,138,113,0.4)] hover:scale-105 active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed grayscale',
                )}
              >
                {t('onboarding.continue')}
                <ArrowRight
                  className={cn(
                    'transition-transform duration-300',
                    verbosity ? 'group-hover:translate-x-1' : '',
                  )}
                  size={24}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!currentSection) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-slate-600">{t('wizard.noSections')}</p>
        <Button onClick={() => setCurrentStep(0)} className="mt-4">
          {t('wizard.reset')}
        </Button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FAF9F6] font-sans pb-24">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute w-[40rem] h-[40rem] bg-[#FFD1C1] -top-20 -left-20 rounded-full blur-[100px] opacity-20" />
        <div className="absolute w-[35rem] h-[35rem] bg-[#D1FAE5] -bottom-20 -right-20 rounded-full blur-[100px] opacity-20" />
        <div className="absolute w-80 h-80 bg-[#E9D5FF] top-1/2 left-1/4 rounded-full blur-[100px] opacity-10" />
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Header & Progress */}
        <div className="mb-10 text-center">
          <Badge variant="default">{t('wizard.badge')}</Badge>
          <h1 className="text-3xl font-black text-slate-900 mt-4 mb-8">
            {t('wizard.stepOf', { current: currentStep + 1, total: totalSteps })}
          </h1>

          <div className="space-y-4">
            <ProgressBar value={progress} />
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>{t('wizard.progress')}</span>
              <span>{t('wizard.complete', { percent: Math.round(progress) })}</span>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="mb-8 relative">
          <div
            className="flex overflow-x-auto pb-4 gap-3 scroll-smooth"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              scrollbarWidth: 'none',
            }}
          >
            {applicableSections.map((section, idx) => {
              const isCompleted = idx < currentStep;
              const isActive = idx === currentStep;
              const sectionTitle = locale === 'fr' && section.title_fr ? section.title_fr : section.title;

              return (
                <button
                  key={section.key}
                  onClick={() => setCurrentStep(idx)}
                  className={cn(
                    'flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all font-bold text-sm whitespace-nowrap',
                    isActive
                      ? 'bg-white border-[#FFD9D1] text-[#FF8A71] shadow-sm scale-105'
                      : isCompleted
                        ? 'bg-[#F0FFF4] border-[#C6F6D5] text-[#48BB78]'
                        : 'bg-white border-slate-100 text-slate-400 opacity-60 hover:opacity-100',
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <Circle size={16} className={isActive ? 'fill-[#FF8A71]/20' : ''} />
                  )}
                  {sectionTitle}
                </button>
              );
            })}
          </div>
        </div>

        {/* Questionnaire Card */}
        <Card className="mb-8">
          <div className="min-h-[400px]">
            <StepRenderer
              sectionKey={currentSection.key}
              sectionMeta={currentSection}
              onNext={handleNext}
              onPrev={handlePrev}
              onSkip={handleSkip}
              isFirst={currentStep === 0}
              isLast={currentStep === totalSteps - 1}
              stepNumber={currentStep + 1}
              totalSteps={totalSteps}
            />
          </div>
        </Card>

      </div>
    </section>
  );
}
