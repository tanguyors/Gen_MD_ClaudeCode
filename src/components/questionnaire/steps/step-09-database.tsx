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
import { FieldTooltip } from '@/components/ui/field-tooltip';
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

      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <label className="text-sm font-medium text-slate-700">{t('step09.schemaSource')}</label>
          <FieldTooltip
            tooltip="Where is the authoritative definition of your database schema?"
            examples={["Prisma schema at prisma/schema.prisma", "SQL migrations in db/migrations/", "Supabase dashboard"]}
          />
        </div>
        <Textarea {...register('schemaSource')} />
      </div>

      <Controller
        name="migrationPolicy"
        control={control}
        render={({ field }) => (
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-base font-bold text-slate-800 ml-1">{t('step09.migrationPolicy')}</span>
              <FieldTooltip
                tooltip="Rules for creating and applying database migrations."
                examples={["One migration per PR, never modify existing migrations", "Auto-generated via Prisma migrate"]}
              />
            </div>
            <OptionCardGroup
              options={MIGRATION_POLICY_OPTIONS}
              value={field.value ?? ''}
              onChange={(v) => field.onChange(v)}
              allowCustom
              customPlaceholder={t('step09.migrationPlaceholder')}
            />
          </div>
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
      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <label className="text-sm font-medium text-slate-700">{t('step09.criticalTables')}</label>
          <FieldTooltip
            tooltip="Tables where a mistake would have severe consequences. The agent will be extra careful here."
            examples={["users, payments, orders", "subscriptions, invoices"]}
          />
        </div>
        <Textarea {...register('criticalTables')} />
      </div>
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
