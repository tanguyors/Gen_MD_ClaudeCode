'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DocumentationSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import type { Documentation } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { EXISTING_DOCS_OPTIONS } from '@/lib/questionnaire/option-data';
import { useT } from '@/lib/i18n';

export default function StepDocumentation({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.documentation;

  const { register, handleSubmit, control } = useForm<Documentation>({
    resolver: zodResolver(DocumentationSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: Documentation) => {
    updateSection('documentation', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Controller
        name="existingDocs"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step19.existingDocs')}
            options={EXISTING_DOCS_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            multiple
            allowCustom
            customPlaceholder={t('step19.existingDocsPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step19.docDescriptions')} {...register('docDescriptions')} />
      <Textarea label={t('step19.whenToRead')} {...register('whenToRead')} />
      <Checkbox label={t('step19.sensitiveDocsApproval')} {...register('sensitiveDocsApproval')} />
      <Input label={t('step19.adrLocation')} {...register('adrLocation')} />
      <Textarea label={t('step19.obsoleteDocs')} {...register('obsoleteDocs')} />

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
