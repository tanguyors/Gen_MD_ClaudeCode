'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommandsSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { Commands } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function StepCommands({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.commands;

  const { register, handleSubmit } = useForm<Commands>({
    resolver: zodResolver(CommandsSchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: Commands) => {
    updateSection('commands', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Input label={t('step05.installCommand')} {...register('installCmd')} placeholder="pnpm install" />
      <Input label={t('step05.devCommand')} {...register('devCmd')} placeholder="pnpm dev" />
      <Input label={t('step05.buildCommand')} {...register('buildCmd')} />
      <Input label={t('step05.typecheckCommand')} {...register('typecheckCmd')} />
      <Input label={t('step05.lintCommand')} {...register('lintCmd')} />
      <Input label={t('step05.formatCommand')} {...register('formatCmd')} />
      <Input label={t('step05.unitTestCommand')} {...register('unitTestCmd')} />
      <Input label={t('step05.integrationTestCommand')} {...register('integrationTestCmd')} />
      <Input label={t('step05.e2eTestCommand')} {...register('e2eTestCmd')} />
      <Input label={t('step05.codegenCommand')} {...register('codegenCmd')} />
      <Input label={t('step05.seedResetCommand')} {...register('seedResetCmd')} />
      <Input label={t('step05.localEnvCommand')} {...register('localEnvCmd')} />
      <Textarea label={t('step05.systemPrerequisites')} {...register('systemPrerequisites')} />

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
