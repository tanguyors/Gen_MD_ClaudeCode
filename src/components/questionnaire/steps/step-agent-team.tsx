'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AgentTeamSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { z } from 'zod';
import { Plus, Trash2, Users } from 'lucide-react';
import { useT } from '@/lib/i18n';

type FormData = z.infer<typeof AgentTeamSchema>;

const ROLE_SUGGESTIONS = [
  { role: 'Frontend Lead', specialty: 'UI/UX implementation, React/Vue components, styling, accessibility', scope: 'src/components/, src/app/, src/styles/' },
  { role: 'Backend Lead', specialty: 'API design, business logic, data modeling, server architecture', scope: 'src/api/, src/lib/, src/services/' },
  { role: 'DevOps Engineer', specialty: 'CI/CD, infrastructure, deployment, monitoring, Docker', scope: '.github/, infra/, docker/, scripts/' },
  { role: 'QA Engineer', specialty: 'Testing strategy, test automation, quality assurance, coverage', scope: 'src/__tests__/, tests/, e2e/' },
  { role: 'Architect', specialty: 'System design, code review, standards, technical decisions', scope: 'Full codebase oversight' },
];

export default function StepAgentTeam({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.agentTeam;

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(AgentTeamSchema),
    defaultValues: {
      members: existing?.members?.length ? existing.members : [{ name: '', role: '', specialty: '', scope: '', rules: '' }],
      coordinationRules: existing?.coordinationRules ?? '',
      delegationStrategy: existing?.delegationStrategy ?? '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  const onSubmit = (data: FormData) => {
    updateSection('agentTeam', data);
    onNext();
  };

  const addSuggested = (suggestion: typeof ROLE_SUGGESTIONS[0]) => {
    if (fields.length >= 5) return;
    append({
      name: suggestion.role.replace(/\s+/g, '-').toLowerCase(),
      role: suggestion.role,
      specialty: suggestion.specialty,
      scope: suggestion.scope,
      rules: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium text-blue-900">{t('stepAgent.title')}</h3>
        </div>
        <p className="text-sm text-blue-700">
          {t('stepAgent.description')}
        </p>
      </div>

      {/* Quick-add suggestions */}
      {fields.length < 5 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">{t('stepAgent.quickAdd')}</p>
          <div className="flex flex-wrap gap-2">
            {ROLE_SUGGESTIONS.filter(
              (s) => !fields.some((f) => f.role === s.role),
            ).map((suggestion) => (
              <button
                key={suggestion.role}
                type="button"
                onClick={() => addSuggested(suggestion)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-3 w-3" />
                {suggestion.role}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Agent members */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">{t('stepAgent.agentIndex', { index: index + 1 })}</h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title={t('stepAgent.removeAgent')}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label={t('stepAgent.agentName')}
                {...register(`members.${index}.name`)}
                placeholder={t('stepAgent.agentNamePlaceholder')}
                error={errors.members?.[index]?.name?.message}
                required
              />
              <Input
                label={t('stepAgent.agentRole')}
                {...register(`members.${index}.role`)}
                placeholder={t('stepAgent.agentRolePlaceholder')}
                error={errors.members?.[index]?.role?.message}
                required
              />
            </div>
            <Input
              label={t('stepAgent.agentTools')}
              {...register(`members.${index}.specialty`)}
              placeholder={t('stepAgent.agentToolsPlaceholder')}
            />
            <Input
              label={t('stepAgent.agentScope')}
              {...register(`members.${index}.scope`)}
              placeholder={t('stepAgent.agentScopePlaceholder')}
            />
            <Textarea
              label={t('stepAgent.agentRules')}
              {...register(`members.${index}.rules`)}
              placeholder={t('stepAgent.agentRulesPlaceholder')}
              rows={2}
            />
          </div>
        ))}
      </div>

      {fields.length < 5 && (
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ name: '', role: '', specialty: '', scope: '', rules: '' })}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('stepAgent.addAgent')} ({fields.length}/5)
        </Button>
      )}

      {/* Coordination */}
      <div className="space-y-3 pt-4 border-t">
        <h3 className="text-sm font-medium text-gray-900">{t('stepAgent.teamCoordination')}</h3>
        <Textarea
          label={t('stepAgent.coordinationRules')}
          {...register('coordinationRules')}
          placeholder={t('stepAgent.coordinationPlaceholder')}
          rows={3}
        />
        <Textarea
          label={t('stepAgent.delegationStrategy')}
          {...register('delegationStrategy')}
          placeholder={t('stepAgent.delegationPlaceholder')}
          rows={3}
        />
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
