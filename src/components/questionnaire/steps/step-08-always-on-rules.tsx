'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlwaysOnRulesSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { AlwaysOnRules } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export default function StepAlwaysOnRules({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.alwaysOnRules;

  const { register, handleSubmit, control, formState: { errors } } = useForm<AlwaysOnRules>({
    resolver: zodResolver(AlwaysOnRulesSchema),
    defaultValues: {
      universalRules: existing?.universalRules?.length
        ? existing.universalRules
        : [{ rule: '', isHard: true }],
      emergencyCompromises: existing?.emergencyCompromises ?? '',
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'universalRules' });

  const onSubmit = (data: AlwaysOnRules) => {
    const filtered = {
      ...data,
      universalRules: data.universalRules?.filter((r) => r.rule.trim().length > 0),
    };
    updateSection('alwaysOnRules', filtered);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Universal Rules</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2">
            <Input
              {...register(`universalRules.${index}.rule`)}
              placeholder={t('step08.rulePlaceholder')}
              className="flex-1"
            />
            <label className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap pt-2">
              <input type="checkbox" {...register(`universalRules.${index}.isHard`)} className="h-3 w-3" />
              {t('step08.hardRule')}
            </label>
            {fields.length > 1 && (
              <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>{t('step08.remove')}</Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => append({ rule: '', isHard: true })}>
          {t('step08.addRule')}
        </Button>
      </div>

      <Textarea label={t('step08.urgencyCompromises')} {...register('emergencyCompromises')} />

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
