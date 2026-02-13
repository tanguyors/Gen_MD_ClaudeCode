'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StackSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import { useT } from '@/lib/i18n';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { OptionCardGroup } from '@/components/ui/option-card';
import {
  FRONTEND_FRAMEWORK_OPTIONS,
  BACKEND_FRAMEWORK_OPTIONS,
  DATABASE_OPTIONS,
  ORM_OPTIONS,
  PACKAGE_MANAGER_OPTIONS,
  HOSTING_OPTIONS,
  AUTH_TOOLS_OPTIONS,
} from '@/lib/questionnaire/option-data';
import { z } from 'zod';

const FormSchema = StackSchema.extend({
  languagesStr: z.string().optional(),
}).omit({ languages: true });

type FormData = z.infer<typeof FormSchema>;

export default function StepStack({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.stack;

  const { register, handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      languagesStr: existing?.languages?.join(', ') ?? '',
      frontendFramework: existing?.frontendFramework ?? '',
      backendFramework: existing?.backendFramework ?? '',
      database: existing?.database ?? '',
      orm: existing?.orm ?? '',
      cacheQueueBroker: existing?.cacheQueueBroker ?? '',
      authTools: existing?.authTools ?? '',
      observabilityTools: existing?.observabilityTools ?? '',
      cicdTools: existing?.cicdTools ?? '',
      hosting: existing?.hosting ?? '',
      packageManager: existing?.packageManager ?? '',
      runtimeVersions: existing?.runtimeVersions ?? '',
      forbiddenDeps: existing?.forbiddenDeps ?? '',
    },
  });

  const handleLetClaudeDecide = () => {
    updateSection('stack', { _claudeDecide: true } as never);
    onNext();
  };

  const onSubmit = (data: FormData) => {
    const { languagesStr, ...rest } = data;
    updateSection('stack', {
      ...rest,
      languages: languagesStr
        ? languagesStr.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <button
        type="button"
        onClick={handleLetClaudeDecide}
        className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed border-[#FF8A71]/30 bg-[#FFF0ED]/50 hover:bg-[#FFF0ED] hover:border-[#FF8A71]/50 transition-all group"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF8A71] to-[#FFB2A1] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
          <Sparkles size={22} />
        </div>
        <div className="text-left">
          <span className="text-sm font-black text-slate-900 block">{t('step04.letClaudeDecide')}</span>
          <span className="text-xs text-slate-500 leading-relaxed">{t('step04.letClaudeDecideDesc')}</span>
        </div>
      </button>

      <Input label={t('step04.languages')} {...register('languagesStr')} placeholder={t('step04.languagesPlaceholder')} />

      <Controller
        name="frontendFramework"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step04.frontendFramework')}
            options={FRONTEND_FRAMEWORK_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step04.frontendPlaceholder')}
          />
        )}
      />

      <Controller
        name="backendFramework"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step04.backendFramework')}
            options={BACKEND_FRAMEWORK_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step04.backendPlaceholder')}
          />
        )}
      />

      <Controller
        name="database"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step04.database')}
            options={DATABASE_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step04.databasePlaceholder')}
          />
        )}
      />

      <Controller
        name="orm"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step04.orm')}
            options={ORM_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step04.ormPlaceholder')}
          />
        )}
      />

      <Input label={t('step04.cacheQueueBroker')} {...register('cacheQueueBroker')} />

      <Controller
        name="authTools"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step04.authTools')}
            options={AUTH_TOOLS_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step04.authPlaceholder')}
          />
        )}
      />

      <Input label={t('step04.observabilityTools')} {...register('observabilityTools')} />
      <Input label={t('step04.cicdTools')} {...register('cicdTools')} />

      <Controller
        name="hosting"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step04.hosting')}
            options={HOSTING_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step04.hostingPlaceholder')}
          />
        )}
      />

      <Controller
        name="packageManager"
        control={control}
        render={({ field }) => (
          <OptionCardGroup
            label={t('step04.packageManager')}
            options={PACKAGE_MANAGER_OPTIONS}
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            allowCustom
            customPlaceholder={t('step04.packageManagerPlaceholder')}
          />
        )}
      />

      <Input label={t('step04.runtimeVersions')} {...register('runtimeVersions')} />
      <Textarea label={t('step04.forbiddenDeps')} {...register('forbiddenDeps')} />

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
