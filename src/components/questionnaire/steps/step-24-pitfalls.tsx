'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PitfallsSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import type { Pitfalls } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { CRITICAL_CHECKS_OPTIONS } from '@/lib/questionnaire/option-data';
import { useT } from '@/lib/i18n';

export default function StepPitfalls({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.pitfalls;

  const { register, handleSubmit, control } = useForm<Pitfalls>({
    resolver: zodResolver(PitfallsSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: Pitfalls) => {
    updateSection('pitfalls', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Textarea label={t('step24.knownBugs')} {...register('knownBugs')} />
      <Textarea label={t('step24.counterIntuitive')} {...register('counterIntuitiveBehaviors')} />
      <Textarea label={t('step24.unstableTools')} {...register('unstableTools')} />
      <Textarea label={t('step24.commonMistakes')} {...register('falseGoodIdeas')} />

      <Controller
        name="criticalChecks"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step24.criticalChecks')}
            options={CRITICAL_CHECKS_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            multiple
            allowCustom
            customPlaceholder={t('step24.criticalChecksPlaceholder')}
          />
        )}
      />

      <div className="flex justify-between pt-6 border-t mt-8">
        <div>{!isFirst && <Button type="button" variant="outline" onClick={onPrev}>{t('step.previous')}</Button>}</div>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={onSkip}>{t('step.skip')}</Button>
          <Button type="submit">{isLast ? t('step.generate') : t('step.next')}</Button>
        </div>
      </div>
    </form>
  );
}
