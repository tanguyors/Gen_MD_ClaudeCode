'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppStore } from '@/lib/storage/store';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useT } from '@/lib/i18n';

const FormSchema = z.object({
  rules: z.array(z.object({ value: z.string() })).min(3).max(10),
});

type FormData = z.infer<typeof FormSchema>;

export default function StepAlwaysOnBlock({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.alwaysOnBlock;

  const defaultRules = existing?.shortRules?.length
    ? existing.shortRules.map((r) => ({ value: r }))
    : [{ value: '' }, { value: '' }, { value: '' }];

  const { register, handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: { rules: defaultRules },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'rules' });

  const onSubmit = (data: FormData) => {
    const shortRules = data.rules.map((r) => r.value).filter((v) => v.trim().length > 0);
    updateSection('alwaysOnBlock', { shortRules });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <p className="text-sm text-gray-600">{t('step26.description')}</p>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <span className="text-sm text-gray-400 w-6">{index + 1}.</span>
            <Input {...register(`rules.${index}.value`)} placeholder={t('step26.rulePlaceholder')} className="flex-1" />
            {fields.length > 3 && (
              <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>{t('step26.remove')}</Button>
            )}
          </div>
        ))}
        {fields.length < 10 && (
          <Button type="button" variant="outline" size="sm" onClick={() => append({ value: '' })}>
            + {t('step26.addRule')}
          </Button>
        )}
      </div>

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
