'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiMlSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import type { AiMl } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { PROMPT_MANAGEMENT_OPTIONS, SAFETY_GUARDRAILS_OPTIONS } from '@/lib/questionnaire/option-data';
import { useT } from '@/lib/i18n';

export default function StepAiMl({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.aiMl;

  const { register, handleSubmit, control } = useForm<AiMl>({
    resolver: zodResolver(AiMlSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: AiMl) => {
    updateSection('aiMl', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Textarea label={t('step18.useCases')} {...register('useCases')} />
      <Textarea label={t('step18.dataSources')} {...register('dataSources')} />
      <Textarea label={t('step18.dataQuality')} {...register('dataQualityConstraints')} />
      <Textarea label={t('step18.evaluationPolicy')} {...register('evaluationPolicy')} />

      <Controller
        name="promptManagement"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step18.promptManagement')}
            options={PROMPT_MANAGEMENT_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step18.promptPlaceholder')}
          />
        )}
      />

      <Controller
        name="safetyGuardrails"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step18.safetyGuardrails')}
            options={SAFETY_GUARDRAILS_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            multiple
            allowCustom
            customPlaceholder={t('step18.safetyPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step18.modelMonitoring')} {...register('modelMonitoring')} />
      <Textarea label={t('step18.modelVersioning')} {...register('modelVersioning')} />

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
