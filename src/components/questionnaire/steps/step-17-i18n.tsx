'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppStore } from '@/lib/storage/store';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { I18N_STRATEGY_OPTIONS } from '@/lib/questionnaire/option-data';
import { useT } from '@/lib/i18n';

const FormSchema = z.object({
  supportedLanguagesStr: z.string().optional(),
  i18nStrategy: z.string().optional(),
  formatRules: z.string().optional(),
  pluralizationRules: z.string().optional(),
  antiHardcodeRules: z.string().optional(),
  newLocaleProcess: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

export default function StepI18n({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.i18n;

  const { register, handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      supportedLanguagesStr: existing?.supportedLanguages?.join(', ') ?? '',
      i18nStrategy: existing?.i18nStrategy ?? '',
      formatRules: existing?.formatRules ?? '',
      pluralizationRules: existing?.pluralizationRules ?? '',
      antiHardcodeRules: existing?.antiHardcodeRules ?? '',
      newLocaleProcess: existing?.newLocaleProcess ?? '',
    },
  });

  const onSubmit = (data: FormData) => {
    const { supportedLanguagesStr, ...rest } = data;
    updateSection('i18n', {
      ...rest,
      supportedLanguages: supportedLanguagesStr
        ? supportedLanguagesStr.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Input label={t('step17.supportedLanguages')} {...register('supportedLanguagesStr')} placeholder={t('step17.supportedLanguagesPlaceholder')} />

      <Controller
        name="i18nStrategy"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step17.i18nStrategy')}
            options={I18N_STRATEGY_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step17.i18nStrategyPlaceholder')}
          />
        )}
      />

      <Textarea label={t('step17.dateNumberFormat')} {...register('formatRules')} />
      <Textarea label={t('step17.pluralizationRules')} {...register('pluralizationRules')} />
      <Textarea label={t('step17.antiHardcodeRules')} {...register('antiHardcodeRules')} />
      <Textarea label={t('step17.newLocaleProcess')} {...register('newLocaleProcess')} />

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
