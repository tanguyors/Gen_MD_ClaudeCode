'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExamplesSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import type { Examples } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { PATTERNS_TO_FOLLOW_OPTIONS, ANTI_PATTERNS_OPTIONS } from '@/lib/questionnaire/option-data';
import { useT } from '@/lib/i18n';

export default function StepExamples({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.examples;

  const { register, handleSubmit, control } = useForm<Examples>({
    resolver: zodResolver(ExamplesSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: Examples) => {
    updateSection('examples', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Textarea label={t('step23.goodPr')} {...register('goodPrExample')} />
      <Textarea label={t('step23.badPr')} {...register('badPrExample')} />
      <Textarea label={t('step23.goodRefactor')} {...register('goodRefactorExample')} />
      <Textarea label={t('step23.badRefactor')} {...register('badRefactorExample')} />

      <Controller
        name="patternsToFollow"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step23.patternsToFollow')}
            options={PATTERNS_TO_FOLLOW_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            multiple
            allowCustom
            customPlaceholder={t('step23.patternsPlaceholder')}
          />
        )}
      />

      <Controller
        name="antiPatterns"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step23.antiPatterns')}
            options={ANTI_PATTERNS_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            multiple
            allowCustom
            customPlaceholder={t('step23.antiPatternsPlaceholder')}
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
