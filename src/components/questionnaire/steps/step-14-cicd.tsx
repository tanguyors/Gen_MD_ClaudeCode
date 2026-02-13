'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CiCdSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { CiCd } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { BRANCH_STRATEGY_OPTIONS, RELEASE_STRATEGY_OPTIONS, MERGE_CONDITIONS_OPTIONS } from '@/lib/questionnaire/option-data';

export default function StepCiCd({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.cicd;

  const { register, handleSubmit, control } = useForm<CiCd>({
    resolver: zodResolver(CiCdSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: CiCd) => {
    updateSection('cicd', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Textarea label={t('step14.ciSteps')} {...register('ciPipeline')} />

      <Controller
        name="mergeConditions"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step14.mergeConditions')}
            options={MERGE_CONDITIONS_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            multiple
            allowCustom
            customPlaceholder={t('step14.mergePlaceholder')}
          />
        )}
      />

      <Controller
        name="branchStrategy"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step14.branchStrategy')}
            options={BRANCH_STRATEGY_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

      <Controller
        name="releaseStrategy"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step14.releaseStrategy')}
            options={RELEASE_STRATEGY_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step14.releasePlaceholder')}
          />
        )}
      />

      <Textarea label={t('step14.rollbackProcedure')} {...register('rollbackProcedure')} />
      <Textarea label={t('step14.releaseChecklist')} {...register('releaseChecklist')} />
      <Textarea label={t('step14.finalValidators')} {...register('finalValidators')} />
      <Textarea label={t('step14.hotfixProcess')} {...register('hotfixProcess')} />

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
