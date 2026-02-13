'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TechnicalGoalsSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { PRIORITY_QUALITIES_OPTIONS, RISK_TOLERANCE_OPTIONS } from '@/lib/questionnaire/option-data';
import { getPrimaryGoalOptions } from '@/lib/questionnaire/contextual-options';
import { z } from 'zod';

const FormSchema = TechnicalGoalsSchema.extend({
  priorityQualitiesStr: z.string().optional(),
}).omit({ priorityQualities: true });

type FormData = z.infer<typeof FormSchema>;

export default function StepTechGoals({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.techGoals;
  const projectType = questionnaire.identity?.projectType;

  const { register, handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      primaryGoal: existing?.primaryGoal ?? '',
      priorityQualitiesStr: existing?.priorityQualities?.join(', ') ?? '',
      existingTechDebt: existing?.existingTechDebt ?? '',
      criticalComponents: existing?.criticalComponents ?? '',
      riskTolerance: existing?.riskTolerance ?? 'medium',
    },
  });

  const onSubmit = (data: FormData) => {
    const { priorityQualitiesStr, ...rest } = data;
    updateSection('techGoals', {
      ...rest,
      priorityQualities: priorityQualitiesStr
        ? priorityQualitiesStr.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Controller
        name="primaryGoal"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step02.primaryGoal')}
            options={getPrimaryGoalOptions(projectType)}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step02.primaryGoalPlaceholder')}
          />
        )}
      />

      <Controller
        name="priorityQualitiesStr"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step02.priorityQualities')}
            options={PRIORITY_QUALITIES_OPTIONS}
            value={field.value ? field.value.split(',').map((s) => s.trim()).filter(Boolean) : []}
            onChange={(v) => field.onChange(Array.isArray(v) ? v.join(', ') : v)}
            multiple
            allowCustom
            customPlaceholder={t('step02.qualitiesPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step02.existingTechDebt')} {...register('existingTechDebt')} />
      <Textarea label={t('step02.criticalComponents')} {...register('criticalComponents')} />

      <Controller
        name="riskTolerance"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step02.riskTolerance')}
            options={RISK_TOLERANCE_OPTIONS}
            value={field.value ?? 'medium'}
            onChange={(v) => field.onChange(v)}
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
