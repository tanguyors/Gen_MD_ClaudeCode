'use client';

import Link from 'next/link';
import {
  LayoutGrid,
  Sparkles,
  ClipboardCheck,
  ArrowRight,
  FileText,
  Settings,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useT } from '@/lib/i18n';

function FeatureCard({
  icon: Icon,
  title,
  description,
  colorClasses,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  colorClasses: string;
}) {
  return (
    <div className="group relative flex flex-col p-8 bg-white/70 backdrop-blur-sm border-2 border-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-300">
      <div
        className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-transform group-hover:scale-110 group-hover:rotate-3',
          colorClasses,
        )}
      >
        <Icon size={28} strokeWidth={2.5} />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm lg:text-base">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[#FF8A71] relative z-10">
          <Icon size={32} />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#FF8A71] text-white flex items-center justify-center font-bold text-sm shadow-lg z-20">
          {number}
        </div>
      </div>
      <h4 className="text-lg font-bold text-slate-800 mb-2">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function HomePage() {
  const { t } = useT();

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#FAF9F6] font-sans">
      {/* Background Blobs */}
      <div className="absolute w-96 h-96 bg-[#FFD1C1] top-[-10%] left-[-5%] rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute w-[30rem] h-[30rem] bg-[#D1FAE5] bottom-[-10%] right-[-5%] rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute w-80 h-80 bg-[#E9D5FF] top-[20%] right-[10%] rounded-full blur-3xl -z-10 opacity-40" />

      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
<h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
              {t('landing.heroTitle1')}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A71] to-[#FFB2A1]">
                {t('landing.heroTitle2')}
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              {t('landing.heroDescription')}{' '}
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#FF8A71] font-mono font-bold">
                CLAUDE.md
              </code>{' '}
              {t('landing.heroDescriptionEnd')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/questionnaire"
                className="group relative px-8 py-5 bg-[#FF8A71] text-white font-bold rounded-[2rem] shadow-[0_10px_25px_rgba(255,138,113,0.3)] hover:shadow-[0_15px_35px_rgba(255,138,113,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                {t('landing.cta')}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-32">
            <FeatureCard
              icon={LayoutGrid}
              title={t('landing.featureStructuredTitle')}
              description={t('landing.featureStructuredDesc')}
              colorClasses="bg-[#FFF0ED] text-[#FF8A71] border-[#FFD9D1]"
            />
            <FeatureCard
              icon={Sparkles}
              title={t('landing.featureAiTitle')}
              description={t('landing.featureAiDesc')}
              colorClasses="bg-[#F5F3FF] text-[#8B5CF6] border-[#DDD6FE]"
            />
            <FeatureCard
              icon={ClipboardCheck}
              title={t('landing.featureQualityTitle')}
              description={t('landing.featureQualityDesc')}
              colorClasses="bg-[#F0FFF4] text-[#48BB78] border-[#C6F6D5]"
            />
          </div>

          {/* How It Works Section */}
          <div className="relative pt-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">{t('landing.howItWorks')}</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#FF8A71] to-[#FFB2A1] rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-slate-200 -z-10" />

              <StepCard
                number="1"
                icon={FileText}
                title={t('landing.step1Title')}
                description={t('landing.step1Desc')}
              />
              <StepCard
                number="2"
                icon={Settings}
                title={t('landing.step2Title')}
                description={t('landing.step2Desc')}
              />
              <StepCard
                number="3"
                icon={Download}
                title={t('landing.step3Title')}
                description={t('landing.step3Desc')}
              />
            </div>

            <div className="mt-20 text-center">
              <Link
                href="/questionnaire"
                className="inline-flex items-center gap-2 font-bold text-[#FF8A71] hover:text-[#e67a62] transition-colors"
              >
                {t('landing.readyCta')}
                <span className="underline decoration-2 underline-offset-4">{t('landing.getStartedNow')}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
