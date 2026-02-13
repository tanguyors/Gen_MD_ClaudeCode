'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ObservabilitySchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { Observability } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { LOGS_LOCATION_OPTIONS, METRICS_LOCATION_OPTIONS } from '@/lib/questionnaire/option-data';

export default function StepObservability({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.observability;

  const { register, handleSubmit, control } = useForm<Observability>({
    resolver: zodResolver(ObservabilitySchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: Observability) => {
    updateSection('observability', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Controller
        name="logsLocation"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step15.logsLocation')}
            options={LOGS_LOCATION_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step15.logsPlaceholder')}
          />
        )}
      />

      <Controller
        name="metricsLocation"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step15.metricsLocation')}
            options={METRICS_LOCATION_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step15.metricsPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step15.mandatoryEvents')} {...register('mandatoryEvents')} />
      <Textarea label={t('step15.diagnosticProcess')} {...register('incidentDiagnosis')} />
      <Textarea label={t('step15.runbooks')} {...register('runbooks')} />
      <Textarea label={t('step15.postmortemProcess')} {...register('postMortemProcess')} />
      <Textarea label={t('step15.opsKpis')} {...register('opsKpis')} />

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
