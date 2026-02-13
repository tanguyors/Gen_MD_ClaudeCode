'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TestingSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { Testing } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import {
  TEST_STRATEGY_OPTIONS,
  TEST_DISTRIBUTION_OPTIONS,
  COVERAGE_THRESHOLD_OPTIONS,
  TEST_TOOLS_OPTIONS,
} from '@/lib/questionnaire/option-data';

export default function StepTesting({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.testing;

  const { register, handleSubmit, control } = useForm<Testing>({
    resolver: zodResolver(TestingSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: Testing) => {
    updateSection('testing', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Controller
        name="testStrategy"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step13.testStrategy')}
            options={TEST_STRATEGY_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step13.testStrategyPlaceholder')}
          />
        )}
      />

      <Controller
        name="testDistribution"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step13.testDistribution')}
            options={TEST_DISTRIBUTION_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

      <Controller
        name="coverageThreshold"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step13.coverageThreshold')}
            options={COVERAGE_THRESHOLD_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

      <Textarea label={t('step13.criticalCases')} {...register('criticalTestCases')} />
      <Textarea label={t('step13.flakyTests')} {...register('flakyTests')} />

      <Controller
        name="testTools"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step13.testTools')}
            options={TEST_TOOLS_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            multiple
            allowCustom
            customPlaceholder={t('step13.testToolsPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step13.prChecks')} {...register('prChecks')} />
      <Textarea label={t('step13.prodChecks')} {...register('prodChecks')} />

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
