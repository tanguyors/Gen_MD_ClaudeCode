'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvironmentsSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { Environments } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { ENV_VARS_SOURCE_OPTIONS, SECRETS_POLICY_OPTIONS } from '@/lib/questionnaire/option-data';

export default function StepEnvironments({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.environments;

  const { register, handleSubmit, control } = useForm<Environments>({
    resolver: zodResolver(EnvironmentsSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: Environments) => {
    updateSection('environments', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Textarea label={t('step06.environmentList')} {...register('environmentList')} />
      <Textarea label={t('step06.keyDifferences')} {...register('envDifferences')} />

      <Controller
        name="envVarsSource"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step06.envVarsSource')}
            options={ENV_VARS_SOURCE_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step06.envVarsSourcePlaceholder')}
          />
        )}
      />

      <Textarea label={t('step06.minLocalVars')} {...register('requiredLocalVars')} />

      <Controller
        name="secretsPolicy"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step06.secretsPolicy')}
            options={SECRETS_POLICY_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step06.secretsPolicyPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step06.neverLog')} {...register('neverLog')} />
      <Textarea label={t('step06.newVarProcess')} {...register('newVarProcess')} />

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
