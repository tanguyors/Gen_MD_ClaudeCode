'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BusinessContextSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { BusinessContext } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { BUSINESS_CONSTRAINTS_OPTIONS } from '@/lib/questionnaire/option-data';
import { getTargetUsersOptions, getSuccessKpisOptions } from '@/lib/questionnaire/contextual-options';

export default function StepBusiness({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.business;
  const projectType = questionnaire.identity?.projectType;

  const { register, handleSubmit, control } = useForm<BusinessContext>({
    resolver: zodResolver(BusinessContextSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: BusinessContext) => {
    updateSection('business', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Textarea label={t('step01.problemSolved')} {...register('problemSolved')} />

      <Controller
        name="targetUsers"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step01.targetUsers')}
            options={getTargetUsersOptions(projectType)}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step01.targetUsersPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step01.expectedOutcome')} {...register('expectedOutcome')} />
      <Textarea label={t('step01.valueProposition')} {...register('valueProposition')} />

      <Controller
        name="successKpis"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step01.successKpis')}
            options={getSuccessKpisOptions(projectType)}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step01.kpisPlaceholder')}
          />
        )}
      />

      <Controller
        name="businessConstraints"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step01.businessConstraints')}
            options={BUSINESS_CONSTRAINTS_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            multiple
            allowCustom
            customPlaceholder={t('step01.constraintsPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step01.outOfScope')} {...register('outOfScope')} />

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
