'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatabaseSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { Database } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { MIGRATION_POLICY_OPTIONS, SEED_POLICY_OPTIONS } from '@/lib/questionnaire/option-data';

export default function StepDatabase({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.database;

  const { register, handleSubmit, control } = useForm<Database>({
    resolver: zodResolver(DatabaseSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: Database) => {
    updateSection('database', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Textarea label={t('step09.schemaSource')} {...register('schemaSource')} />

      <Controller
        name="migrationPolicy"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step09.migrationPolicy')}
            options={MIGRATION_POLICY_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step09.migrationPlaceholder')}
          />
        )}
      />

      <Controller
        name="seedPolicy"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step09.seedPolicy')}
            options={SEED_POLICY_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step09.seedPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step09.prodMigrationCompat')} {...register('prodMigrationCompat')} />
      <Textarea label={t('step09.criticalTables')} {...register('criticalTables')} />
      <Textarea label={t('step09.integrityConstraints')} {...register('integrityConstraints')} />
      <Textarea label={t('step09.piiConstraints')} {...register('piiConstraints')} />
      <Textarea label={t('step09.backupNotes')} {...register('backupNotes')} />

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
