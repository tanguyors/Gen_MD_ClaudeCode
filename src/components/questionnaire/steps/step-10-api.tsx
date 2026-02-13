'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiContractsSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { ApiContracts } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { API_VERSIONING_OPTIONS, ERROR_FORMAT_OPTIONS, INPUT_VALIDATION_OPTIONS } from '@/lib/questionnaire/option-data';

export default function StepApiContracts({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.apiContracts;

  const { register, handleSubmit, control } = useForm<ApiContracts>({
    resolver: zodResolver(ApiContractsSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: ApiContracts) => {
    updateSection('apiContracts', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Textarea label={t('step10.contractsLocation')} {...register('contractsLocation')} />

      <Controller
        name="apiVersioning"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step10.apiVersioning')}
            options={API_VERSIONING_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

      <Textarea label={t('step10.breakingChanges')} {...register('breakingChangePolicy')} />

      <Controller
        name="errorFormat"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step10.errorFormat')}
            options={ERROR_FORMAT_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step10.errorFormatPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step10.authRules')} {...register('authRules')} />
      <Textarea label={t('step10.rateLimiting')} {...register('rateLimiting')} />
      <Textarea label={t('step10.idempotence')} {...register('idempotence')} />

      <Controller
        name="inputValidation"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step10.inputValidation')}
            options={INPUT_VALIDATION_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step10.inputValidationPlaceholder')}
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
