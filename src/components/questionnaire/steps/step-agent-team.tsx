'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/storage/store';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AGENT_CATALOG, SKILL_CATALOG, type AgentCatalogItem, type SkillCatalogItem } from '@/lib/questionnaire/option-data';
import { useLocale, useT } from '@/lib/i18n';
import { Bot, Check, Bug, Layers, FileText, Zap, Database, Server, Sparkles, Code, Wrench, Search, BarChart, BookOpen, Rocket } from 'lucide-react';

// ── Agent categories ────────────────────────────────────────
const AGENT_CATEGORY_META: Record<AgentCatalogItem['category'], { label: string; label_fr: string; icon: React.ElementType; color: string }> = {
  review: { label: 'Review & Quality', label_fr: 'Revue & Qualité', icon: Check, color: 'bg-blue-100 text-blue-700' },
  testing: { label: 'Testing', label_fr: 'Tests', icon: Bug, color: 'bg-green-100 text-green-700' },
  architecture: { label: 'Architecture', label_fr: 'Architecture', icon: Layers, color: 'bg-purple-100 text-purple-700' },
  docs: { label: 'Documentation', label_fr: 'Documentation', icon: FileText, color: 'bg-yellow-100 text-yellow-700' },
  performance: { label: 'Performance', label_fr: 'Performance', icon: Zap, color: 'bg-orange-100 text-orange-700' },
  data: { label: 'Data & Database', label_fr: 'Données & Base de données', icon: Database, color: 'bg-teal-100 text-teal-700' },
  devops: { label: 'DevOps', label_fr: 'DevOps', icon: Server, color: 'bg-gray-100 text-gray-700' },
};

// ── Skill categories ────────────────────────────────────────
const SKILL_CATEGORY_META: Record<SkillCatalogItem['category'], { label: string; label_fr: string; icon: React.ElementType; color: string }> = {
  planning: { label: 'Planning & Strategy', label_fr: 'Planification & Stratégie', icon: BookOpen, color: 'bg-violet-100 text-violet-700' },
  development: { label: 'Development', label_fr: 'Développement', icon: Code, color: 'bg-sky-100 text-sky-700' },
  quality: { label: 'Quality & Testing', label_fr: 'Qualité & Tests', icon: Bug, color: 'bg-green-100 text-green-700' },
  data: { label: 'Data & Database', label_fr: 'Données & Base de données', icon: Database, color: 'bg-teal-100 text-teal-700' },
  devops: { label: 'DevOps & Deploy', label_fr: 'DevOps & Déploiement', icon: Rocket, color: 'bg-rose-100 text-rose-700' },
  research: { label: 'Research & Analysis', label_fr: 'Recherche & Analyse', icon: Search, color: 'bg-amber-100 text-amber-700' },
  performance: { label: 'Performance', label_fr: 'Performance', icon: BarChart, color: 'bg-orange-100 text-orange-700' },
};

// Group agents by category
const groupedAgents: Record<string, AgentCatalogItem[]> = {};
for (const agent of AGENT_CATALOG) {
  const cat = agent.category;
  if (!groupedAgents[cat]) groupedAgents[cat] = [];
  groupedAgents[cat]!.push(agent);
}

// Group skills by category
const groupedSkills: Record<string, SkillCatalogItem[]> = {};
for (const skill of SKILL_CATALOG) {
  const cat = skill.category;
  if (!groupedSkills[cat]) groupedSkills[cat] = [];
  groupedSkills[cat]!.push(skill);
}

export default function StepAgentTeam({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const { locale } = useLocale();
  const isFr = locale === 'fr';

  const existing = questionnaire.agentTeam;
  const [selectedAgents, setSelectedAgents] = useState<string[]>(existing?.selectedAgents ?? []);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(existing?.selectedSkills ?? []);
  const [enableTeam, setEnableTeam] = useState(existing?.enableAgentTeam ?? false);

  // Sync back when values change
  useEffect(() => {
    updateSection('agentTeam', {
      ...existing,
      selectedAgents,
      selectedSkills,
      enableAgentTeam: enableTeam,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAgents, selectedSkills, enableTeam]);

  const toggleAgent = (id: string) => {
    setSelectedAgents((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const toggleSkill = (id: string) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const selectAllAgents = () => setSelectedAgents(AGENT_CATALOG.map((a) => a.id));
  const selectNoAgents = () => setSelectedAgents([]);
  const selectAllSkills = () => setSelectedSkills(SKILL_CATALOG.map((s) => s.id));
  const selectNoSkills = () => setSelectedSkills([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection('agentTeam', {
      selectedAgents,
      selectedSkills,
      enableAgentTeam: enableTeam,
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      {/* ── SUB-AGENTS SECTION ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#FF8A71]" />
            <span className="text-sm font-bold text-slate-700">
              {isFr ? 'Sub-agents' : 'Sub-agents'} — {selectedAgents.length} / {AGENT_CATALOG.length} {isFr ? 'sélectionnés' : 'selected'}
            </span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={selectAllAgents} className="text-xs font-bold text-[#FF8A71] hover:underline">
              {isFr ? 'Tout' : 'All'}
            </button>
            <span className="text-slate-300">|</span>
            <button type="button" onClick={selectNoAgents} className="text-xs font-bold text-slate-400 hover:underline">
              {isFr ? 'Aucun' : 'None'}
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          {isFr
            ? 'Processus autonomes spécialisés que Claude peut lancer en sous-tâche. Chacun a son propre modèle et ses outils.'
            : 'Specialized autonomous processes Claude can spawn as sub-tasks. Each has its own model and tools.'}
        </p>

        {/* Agent grid by category */}
        <div className="space-y-5">
          {Object.entries(groupedAgents).map(([category, agents]) => {
            const meta = AGENT_CATEGORY_META[category as AgentCatalogItem['category']];
            if (!meta) return null;
            const Icon = meta.icon;

            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${meta.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                    {isFr ? meta.label_fr : meta.label}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {agents.map((agent) => {
                    const isSelected = selectedAgents.includes(agent.id);
                    return (
                      <button
                        key={agent.id}
                        type="button"
                        onClick={() => toggleAgent(agent.id)}
                        className={`relative text-left p-3 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-[#FF8A71] bg-[#FFF5F3] shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected ? 'bg-[#FF8A71] text-white' : 'bg-slate-100'
                        }`}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>

                        <div className="pr-8">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-slate-900">
                              {isFr ? agent.label_fr : agent.label}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              agent.model === 'haiku' ? 'bg-emerald-100 text-emerald-700' :
                              agent.model === 'sonnet' ? 'bg-blue-100 text-blue-700' :
                              agent.model === 'opus' ? 'bg-purple-100 text-purple-700' :
                              'bg-slate-100 text-slate-500'
                            }`}>
                              {agent.model}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {isFr ? agent.description_fr : agent.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="border-t-2 border-dashed border-slate-200 my-8" />

      {/* ── SKILLS SECTION ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-500" />
            <span className="text-sm font-bold text-slate-700">
              {isFr ? 'Skills (slash commands)' : 'Skills (slash commands)'} — {selectedSkills.length} / {SKILL_CATALOG.length} {isFr ? 'sélectionnés' : 'selected'}
            </span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={selectAllSkills} className="text-xs font-bold text-violet-500 hover:underline">
              {isFr ? 'Tout' : 'All'}
            </button>
            <span className="text-slate-300">|</span>
            <button type="button" onClick={selectNoSkills} className="text-xs font-bold text-slate-400 hover:underline">
              {isFr ? 'Aucun' : 'None'}
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          {isFr
            ? 'Workflows que vous invoquez manuellement avec /nom-du-skill. Ils exécutent des procédures étape par étape dans la session principale.'
            : 'Workflows you invoke manually with /skill-name. They execute step-by-step procedures in the main session.'}
        </p>

        {/* Info box about built-in skills */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          <p className="text-xs text-slate-500">
            <span className="font-bold text-slate-600">{isFr ? 'Déjà intégrés dans Claude Code :' : 'Already built into Claude Code:'}</span>{' '}
            <code className="text-[10px] bg-slate-200 px-1 rounded">/simplify</code>{' '}
            <code className="text-[10px] bg-slate-200 px-1 rounded">/debug</code>{' '}
            <code className="text-[10px] bg-slate-200 px-1 rounded">/batch</code>{' '}
            <code className="text-[10px] bg-slate-200 px-1 rounded">/plan</code>{' '}
            <code className="text-[10px] bg-slate-200 px-1 rounded">/security-review</code>{' '}
            <code className="text-[10px] bg-slate-200 px-1 rounded">/code-review</code>
          </p>
        </div>

        {/* Skill grid by category */}
        <div className="space-y-5">
          {Object.entries(groupedSkills).map(([category, skills]) => {
            const meta = SKILL_CATEGORY_META[category as SkillCatalogItem['category']];
            if (!meta) return null;
            const Icon = meta.icon;

            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${meta.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                    {isFr ? meta.label_fr : meta.label}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {skills.map((skill) => {
                    const isSelected = selectedSkills.includes(skill.id);
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => toggleSkill(skill.id)}
                        className={`relative text-left p-3 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-violet-400 bg-violet-50 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected ? 'bg-violet-500 text-white' : 'bg-slate-100'
                        }`}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>

                        <div className="pr-8">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-slate-900">
                              {isFr ? skill.label_fr : skill.label}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-600">
                              /{skill.id}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed mb-1.5">
                            {isFr ? skill.description_fr : skill.description}
                          </p>
                          <code className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded block truncate">
                            {isFr ? skill.example_fr : skill.example}
                          </code>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── AGENT TEAMS TOGGLE ── */}
      <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-200">
        <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
          <Checkbox
            label={isFr
              ? 'Activer Agent Teams (experimental) — Permet a plusieurs agents de collaborer et communiquer entre eux'
              : 'Enable Agent Teams (experimental) — Allows multiple agents to collaborate and communicate with each other'
            }
            checked={enableTeam}
            onChange={(e) => setEnableTeam(e.target.checked)}
          />
          {enableTeam && (
            <p className="text-xs text-amber-600 mt-2 ml-6">
              {isFr
                ? 'Fonctionnalite experimentale. Ajoute une mention dans le CLAUDE.md pour activer les Agent Teams dans Claude Code.'
                : 'Experimental feature. Adds a note in CLAUDE.md to enable Agent Teams in Claude Code.'
              }
            </p>
          )}
        </div>
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
