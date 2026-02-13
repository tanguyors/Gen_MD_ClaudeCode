'use client';

import { useAppStore } from '@/lib/storage/store';
import { scoreQuestionnaire } from '@/lib/questionnaire/scoring';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useT } from '@/lib/i18n';

export default function StepValidation({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire } = useAppStore();
  const { t } = useT();
  const score = scoreQuestionnaire(questionnaire);

  const checks = [
    { label: t('step27.under300Lines'), ok: score.requiredComplete },
    { label: t('step27.universalRules'), ok: score.sections.filter((s) => s.percentage > 0).length >= 5 },
    { label: t('step27.commandsComplete'), ok: (score.sections.find((s) => s.key === 'commands')?.percentage ?? 0) > 0 },
    { label: t('step27.actionsExplicit'), ok: (score.sections.find((s) => s.key === 'alwaysOnBlock')?.percentage ?? 0) > 0 },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Overall completion</span>
            <span className="font-medium">{score.overallPercentage}%</span>
          </div>
          <ProgressBar value={score.overallPercentage} />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Pre-generation checklist</h3>
          {checks.map((check, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className={check.ok ? 'text-green-600' : 'text-gray-400'}>{check.ok ? '\u2713' : '\u2717'}</span>
              <span className={check.ok ? 'text-gray-900' : 'text-gray-500'}>{check.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Section coverage</h3>
          <div className="grid grid-cols-2 gap-2">
            {score.sections.map((s) => (
              <div key={s.key} className="flex items-center justify-between text-xs p-2 rounded bg-gray-50">
                <span className="truncate">{s.title}</span>
                <span className={s.percentage > 0 ? 'text-green-600 font-medium' : 'text-gray-400'}>
                  {s.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t mt-8">
        <div>{!isFirst && <Button type="button" variant="outline" onClick={onPrev}>{t('step.previous')}</Button>}</div>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={onSkip}>{t('step.skip')}</Button>
          <Button type="button" onClick={onNext} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">
            {isLast ? t('step.generate') : t('step.next')}
          </Button>
        </div>
      </div>
    </div>
  );
}
