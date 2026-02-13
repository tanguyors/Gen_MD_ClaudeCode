'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CodePolicySchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import type { CodePolicy } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useT } from '@/lib/i18n';

export default function StepCodePolicy({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.codePolicy;

  const { register, handleSubmit } = useForm<CodePolicy>({
    resolver: zodResolver(CodePolicySchema),
    defaultValues: {
      ...existing,
    },
  });

  const onSubmit = (data: CodePolicy) => {
    updateSection('codePolicy', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <Checkbox label={t('step21.canCreateFiles')} {...register('canCreateFiles')} />
      <Checkbox label={t('step21.canRename')} {...register('canRenameMove')} />
      <Checkbox label={t('step21.canModifySchema')} {...register('canModifyDbSchema')} />
      <Checkbox label={t('step21.canModifyCiCd')} {...register('canModifyCiCd')} />
      <Checkbox label={t('step21.canModifyDeps')} {...register('canAddRemoveDeps')} />
      <Textarea label={t('step21.humanValidation')} {...register('humanValidationRequired')} />
      <Textarea label={t('step21.forbiddenActions')} {...register('alwaysForbidden')} />

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
