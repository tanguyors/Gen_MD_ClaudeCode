'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DodSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import type { Dod } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { DONE_WHEN_OPTIONS, EXPECTED_DELIVERABLES_OPTIONS } from '@/lib/questionnaire/option-data';
import { useT } from '@/lib/i18n';

export default function StepDod({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.dod;

  const { register, handleSubmit, control } = useForm<Dod>({
    resolver: zodResolver(DodSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: Dod) => {
    updateSection('dod', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Controller
        name="doneWhen"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step22.doneWhen')}
            options={DONE_WHEN_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            multiple
            allowCustom
            customPlaceholder={t('step22.donePlaceholder')}
          />
        )}
      />

      <Textarea label={t('step22.techValidation')} {...register('technicalValidation')} />
      <Textarea label={t('step22.productValidation')} {...register('productValidation')} />
      <Textarea label={t('step22.securityValidation')} {...register('securityValidation')} />
      <Textarea label={t('step22.perfValidation')} {...register('performanceValidation')} />

      <Controller
        name="expectedDeliverables"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step22.deliverables')}
            options={EXPECTED_DELIVERABLES_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            multiple
            allowCustom
            customPlaceholder={t('step22.deliverablesPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step22.acceptanceCriteria')} {...register('acceptanceCriteria')} />

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
