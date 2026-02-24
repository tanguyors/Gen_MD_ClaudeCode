'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
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
import { getSuggestions } from '@/lib/questionnaire/tech-dependencies';
import { z } from 'zod';

const FormSchema = StackSchema.extend({
  languagesStr: z.string().optional(),
}).omit({ languages: true });

type FormData = z.infer<typeof FormSchema>;

export default function StepStack({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { t } = useT();
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.stack;

  const { register, handleSubmit, control, setValue, getValues } = useForm<FormData>({
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

  const watchedFrontend = useWatch({ control, name: 'frontendFramework' });
  const watchedBackend = useWatch({ control, name: 'backendFramework' });
  const watchedDatabase = useWatch({ control, name: 'database' });

  const [autoFillNotice, setAutoFillNotice] = useState(false);
  const noticeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showAutoFillNotice = useCallback(() => {
    setAutoFillNotice(true);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setAutoFillNotice(false), 3000);
  }, []);

  const prevFrontend = useRef(watchedFrontend);
  const prevBackend = useRef(watchedBackend);
  const prevDatabase = useRef(watchedDatabase);

  useEffect(() => {
    let changedField: string | null = null;
    let changedValue = '';

    if (watchedFrontend !== prevFrontend.current) {
      changedField = 'frontendFramework';
      changedValue = watchedFrontend ?? '';
      prevFrontend.current = watchedFrontend;
    } else if (watchedBackend !== prevBackend.current) {
      changedField = 'backendFramework';
      changedValue = watchedBackend ?? '';
      prevBackend.current = watchedBackend;
    } else if (watchedDatabase !== prevDatabase.current) {
      changedField = 'database';
      changedValue = watchedDatabase ?? '';
      prevDatabase.current = watchedDatabase;
    }

    if (!changedField || !changedValue) return;

    const current = getValues();
    // Note: 'languages' is intentionally omitted so getSuggestions always
    // returns language suggestions. Deduplication is handled below when
    // appending to the languagesStr field.
    const currentMap: Record<string, string> = {
      backendFramework: current.backendFramework ?? '',
      frontendFramework: current.frontendFramework ?? '',
      packageManager: current.packageManager ?? '',
      hosting: current.hosting ?? '',
      orm: current.orm ?? '',
      authTools: current.authTools ?? '',
      database: current.database ?? '',
    };

    const suggestions = getSuggestions(changedField, changedValue, currentMap);
    let didFill = false;

    for (const [key, value] of Object.entries(suggestions)) {
      if (key === 'languages') {
        // Append to languagesStr instead of replacing
        const existingLangs = current.languagesStr ?? '';
        const langs = existingLangs ? existingLangs.split(',').map((s) => s.trim()).filter(Boolean) : [];
        if (!langs.includes(value)) {
          const updated = langs.length > 0 ? `${existingLangs}, ${value}` : value;
          setValue('languagesStr', updated, { shouldDirty: true });
          didFill = true;
        }
      } else {
        setValue(key as keyof FormData, value, { shouldDirty: true });
        didFill = true;
      }
    }

    if (didFill) showAutoFillNotice();
  }, [watchedFrontend, watchedBackend, watchedDatabase, getValues, setValue, showAutoFillNotice]);

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

      {autoFillNotice && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-300">
          <Sparkles size={14} className="shrink-0" />
          Auto-filled based on your selection
        </div>
      )}

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
