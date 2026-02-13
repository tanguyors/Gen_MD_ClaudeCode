'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SecuritySchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { Security } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { SECURITY_PRIORITIES_OPTIONS } from '@/lib/questionnaire/option-data';

export default function StepSecurity({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.security;

  const { register, handleSubmit, control } = useForm<Security>({
    resolver: zodResolver(SecuritySchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: Security) => {
    updateSection('security', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Controller
        name="securityPriorities"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step11.priorities')}
            options={SECURITY_PRIORITIES_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            multiple
            allowCustom
            customPlaceholder={t('step11.prioritiesPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step11.compliance')} {...register('complianceRequirements')} />
      <Textarea label={t('step11.secretsPolicy')} {...register('secretsPolicy')} />
      <Textarea label={t('step11.sensitiveDataAccess')} {...register('sensitiveDataAccess')} />
      <Textarea label={t('step11.securityReview')} {...register('securityReviewProcess')} />
      <Textarea label={t('step11.auditTriggers')} {...register('auditTriggers')} />

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
