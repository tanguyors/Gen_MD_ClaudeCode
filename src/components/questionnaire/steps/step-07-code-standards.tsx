'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CodeStandardsSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { CodeStandards } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import {
  NAMING_CONVENTIONS_OPTIONS,
  ARCHITECTURE_STYLE_OPTIONS,
  ERROR_HANDLING_OPTIONS,
  API_CONVENTION_OPTIONS,
  IMPORT_CONVENTION_OPTIONS,
} from '@/lib/questionnaire/option-data';

export default function StepCodeStandards({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.codeStandards;

  const { register, handleSubmit, control } = useForm<CodeStandards>({
    resolver: zodResolver(CodeStandardsSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: CodeStandards) => {
    updateSection('codeStandards', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Controller
        name="namingConventions"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step07.namingConventions')}
            options={NAMING_CONVENTIONS_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step07.namingPlaceholder')}
          />
        )}
      />

      <Controller
        name="architectureStyle"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step07.architectureStyle')}
            options={ARCHITECTURE_STYLE_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step07.architecturePlaceholder')}
          />
        )}
      />

      <Controller
        name="errorHandling"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step07.errorHandling')}
            options={ERROR_HANDLING_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step07.errorPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step07.loggingConvention')} {...register('loggingConvention')} />
      <Textarea label={t('step07.commentConvention')} {...register('commentConvention')} />

      <Controller
        name="importConvention"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step07.importConvention')}
            options={IMPORT_CONVENTION_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step07.importPlaceholder')}
          />
        )}
      />

      <Controller
        name="apiConvention"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step07.apiConvention')}
            options={API_CONVENTION_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step07.apiPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step07.versioningConvention')} {...register('versioningConvention')} />
      <Textarea label={t('step07.prStructure')} {...register('prStructure')} />
      <Textarea label={t('step07.linterFormatter')} {...register('linterFormatter')} />
      <Textarea label={t('step07.blockingRules')} {...register('blockingLintRules')} />

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
