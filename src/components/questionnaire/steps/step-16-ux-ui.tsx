'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UxUiSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import type { UxUi } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { DESIGN_SYSTEM_OPTIONS, UI_LIBRARY_OPTIONS, ACCESSIBILITY_LEVEL_OPTIONS } from '@/lib/questionnaire/option-data';
import { useT } from '@/lib/i18n';

export default function StepUxUi({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.uxUi;

  const { register, handleSubmit, control } = useForm<UxUi>({
    resolver: zodResolver(UxUiSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: UxUi) => {
    updateSection('uxUi', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Controller
        name="designSystem"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step16.designSystem')}
            options={DESIGN_SYSTEM_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step16.designSystemPlaceholder')}
          />
        )}
      />

      <Controller
        name="uiLibrary"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step16.uiLibrary')}
            options={UI_LIBRARY_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step16.uiLibraryPlaceholder')}
          />
        )}
      />

      <Controller
        name="accessibilityLevel"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step16.accessibilityLevel')}
            options={ACCESSIBILITY_LEVEL_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

      <Textarea label={t('step16.responsivePriorities')} {...register('responsivePriorities')} />
      <Textarea label={t('step16.copyRules')} {...register('copyRules')} />
      <Textarea label={t('step16.antiPatterns')} {...register('uiAntiPatterns')} />
      <Input label={t('step16.designTokensLocation')} {...register('designTokensLocation')} />

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
