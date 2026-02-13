'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RepoMapSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { RepoMap } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OptionCardGroup } from '@/components/ui/option-card';
import { REPO_TYPE_OPTIONS } from '@/lib/questionnaire/option-data';

export default function StepRepoMap({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.repoMap;

  const { register, handleSubmit, control } = useForm<RepoMap>({
    resolver: zodResolver(RepoMapSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: RepoMap) => {
    updateSection('repoMap', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Controller
        name="repoType"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step03.repoType')}
            options={REPO_TYPE_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />

      <Textarea label={t('step03.directoryStructure')} {...register('directoryStructure')} rows={8} />
      <Textarea label={t('step03.mainApps')} {...register('mainApps')} />
      <Textarea label={t('step03.sharedPackages')} {...register('sharedPackages')} />
      <Input label={t('step03.contractsLocation')} {...register('contractsLocation')} />
      <Input label={t('step03.globalConfigLocation')} {...register('globalConfigLocation')} />
      <Input label={t('step03.migrationsLocation')} {...register('migrationsLocation')} />
      <Input label={t('step03.testsLocation')} {...register('testsLocation')} />
      <Textarea label={t('step03.sensitiveDirs')} {...register('sensitiveDirs')} />
      <Textarea label={t('step03.generatedFiles')} {...register('generatedFiles')} />
      <Textarea label={t('step03.legacyZones')} {...register('legacyZones')} />

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
