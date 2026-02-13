'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AgentPrefsSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import type { AgentPrefs } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import {
  AUTONOMY_LEVEL_OPTIONS,
  DETAIL_LEVEL_OPTIONS,
  CHANGE_PREFERENCE_OPTIONS,
  SPEED_VS_ROBUSTNESS_OPTIONS,
  PROTOTYPE_VS_PRODUCTION_OPTIONS,
} from '@/lib/questionnaire/option-data';
import { useT } from '@/lib/i18n';

export default function StepAgentPrefs({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.agentPrefs;

  const { register, handleSubmit, control } = useForm<AgentPrefs>({
    resolver: zodResolver(AgentPrefsSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: AgentPrefs) => {
    updateSection('agentPrefs', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Textarea label={t('step20.taskTypes')} {...register('taskTypes')} />

      <Controller
        name="autonomyLevel"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step20.autonomyLevel')}
            options={AUTONOMY_LEVEL_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

      <Checkbox label={t('step20.planBeforeCode')} {...register('planBeforeCoding')} />
      <Input label={t('step20.responseFormat')} {...register('responseFormat')} />

      <Controller
        name="detailLevel"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step20.detailLevel')}
            options={DETAIL_LEVEL_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

      <Checkbox label={t('step20.explainTradeoffs')} {...register('alwaysExplainTradeoffs')} />

      <Controller
        name="changePreference"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step20.changePreference')}
            options={CHANGE_PREFERENCE_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

      <Controller
        name="speedVsRobustness"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step20.speedVsRobustness')}
            options={SPEED_VS_ROBUSTNESS_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

      <Controller
        name="prototypeVsProduction"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step20.prototypeVsProduction')}
            options={PROTOTYPE_VS_PRODUCTION_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

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
