'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GovernanceSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import type { Governance } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { COMMUNICATION_CHANNELS_OPTIONS } from '@/lib/questionnaire/option-data';
import { useT } from '@/lib/i18n';

export default function StepGovernance({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.governance;

  const { register, handleSubmit, control } = useForm<Governance>({
    resolver: zodResolver(GovernanceSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: Governance) => {
    updateSection('governance', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Textarea label={t('step25.architectureValidator')} {...register('architectureValidator')} />
      <Textarea label={t('step25.dbValidator')} {...register('dbMigrationValidator')} />
      <Textarea label={t('step25.securityValidator')} {...register('securityValidator')} />
      <Textarea label={t('step25.conflictArbiter')} {...register('conflictArbiter')} />

      <Controller
        name="communicationChannels"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step25.communicationChannels')}
            options={COMMUNICATION_CHANNELS_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            multiple
            allowCustom
            customPlaceholder={t('step25.channelsPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step25.reviewSla')} {...register('reviewSla')} />

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
