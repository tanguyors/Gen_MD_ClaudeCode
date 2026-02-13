'use client';

import { useForm, Controller } from 'react-hook-form';
import { useAppStore } from '@/lib/storage/store';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { PROJECT_TYPE_OPTIONS, CURRENT_STAGE_OPTIONS } from '@/lib/questionnaire/option-data';
import { useT } from '@/lib/i18n';

interface FormData {
  projectName: string;
  projectType: string;
  currentStage: string;
  owner?: string;
  devEnvironment?: string;
  agentLanguage?: string;
  useAgentTeam?: boolean;
}

export default function StepIdentity({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.identity;
  const { t } = useT();

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      projectName: existing?.projectName ?? '',
      projectType: existing?.projectType ?? 'web',
      currentStage: existing?.currentStage ?? 'mvp',
      owner: existing?.owner ?? '',
      devEnvironment: existing?.devEnvironment,
      agentLanguage: existing?.agentLanguage ?? 'en',
      useAgentTeam: existing?.useAgentTeam ?? false,
    },
  });

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateSection('identity', data as any);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Input label={t('step00.projectName')} {...register('projectName', { required: t('step00.projectNameRequired') })} error={errors.projectName?.message} required />

      <Controller
        name="projectType"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step00.projectType')}
            options={PROJECT_TYPE_OPTIONS}
            value={field.value}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

      <Controller
        name="currentStage"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step00.currentStage')}
            options={CURRENT_STAGE_OPTIONS}
            value={field.value}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

      <Input label={t('step00.owner')} {...register('owner')} placeholder={t('step00.ownerPlaceholder')} />
      <Select label={t('step00.devEnvironment')} {...register('devEnvironment')} options={[
        { value: '', label: t('step00.select') }, { value: 'windows', label: t('step00.windows') },
        { value: 'macos', label: t('step00.macos') }, { value: 'linux', label: t('step00.linux') },
      ]} />

      <Select label={t('step00.agentLanguage')} {...register('agentLanguage')} options={[
        { value: 'en', label: t('step00.english') }, { value: 'fr', label: t('step00.french') },
        { value: 'es', label: t('step00.spanish') }, { value: 'de', label: t('step00.german') },
        { value: 'pt', label: t('step00.portuguese') }, { value: 'zh', label: t('step00.chinese') }, { value: 'ja', label: t('step00.japanese') },
      ]} />

      <div className="rounded-2xl border-2 border-[#DDD6FE] bg-[#F5F3FF] p-4 space-y-2">
        <Checkbox label={t('step00.enableAgentTeam')} {...register('useAgentTeam')} />
        <p className="text-xs text-slate-500 ml-6">
          {t('step00.agentTeamDesc')}
        </p>
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
