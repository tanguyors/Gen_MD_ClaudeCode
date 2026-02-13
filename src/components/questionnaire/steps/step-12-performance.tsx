'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PerformanceSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { Performance } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { CACHE_STRATEGY_OPTIONS, RETRY_STRATEGY_OPTIONS } from '@/lib/questionnaire/option-data';

export default function StepPerformance({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.performance;

  const { register, handleSubmit, control } = useForm<Performance>({
    resolver: zodResolver(PerformanceSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: Performance) => {
    updateSection('performance', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Textarea label={t('step12.sloSla')} {...register('sloSla')} />
      <Textarea label={t('step12.performanceTargets')} {...register('performanceTargets')} />
      <Textarea label={t('step12.performanceBudgets')} {...register('performanceBudgets')} />

      <Controller
        name="cacheStrategy"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step12.cacheStrategy')}
            options={CACHE_STRATEGY_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step12.cachePlaceholder')}
          />
        )}
      />

      <Controller
        name="retryStrategy"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step12.retryStrategy')}
            options={RETRY_STRATEGY_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step12.retryPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step12.gracefulDegradation')} {...register('gracefulDegradation')} />
      <Textarea label={t('step12.knownBottlenecks')} {...register('knownBottlenecks')} />
      <Textarea label={t('step12.optimizationPriorities')} {...register('optimizationPriorities')} />

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
