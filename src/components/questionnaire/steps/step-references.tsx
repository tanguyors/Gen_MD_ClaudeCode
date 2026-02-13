'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/storage/store';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useT, useLocale } from '@/lib/i18n';
import { cn } from '@/lib/utils/cn';
import { MCP_OPTIONS } from '@/lib/generation/mcp-blocks';
import { Plus, Trash2, ExternalLink, Puzzle } from 'lucide-react';

interface RefEntry {
  url: string;
  description: string;
}

export default function StepReferences({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const existing = questionnaire.references;
  const { t } = useT();
  const { locale } = useLocale();

  const [entries, setEntries] = useState<RefEntry[]>(() => {
    if (existing?.referenceUrls?.length) {
      return existing.referenceUrls.map((r) => ({
        url: r.url ?? '',
        description: r.description ?? '',
      }));
    }
    return [{ url: '', description: '' }];
  });

  const [designNotes, setDesignNotes] = useState(existing?.designNotes ?? '');
  const [mcpSelections, setMcpSelections] = useState<string[]>(existing?.mcpIntegrations ?? []);

  const addEntry = () => {
    setEntries([...entries, { url: '', description: '' }]);
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: keyof RefEntry, value: string) => {
    setEntries(entries.map((e, i) => i === index ? { ...e, [field]: value } : e));
  };

  const toggleMcp = (id: string) => {
    setMcpSelections((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = entries.filter((e) => e.url.trim().length > 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateSection('references', {
      referenceUrls: filtered,
      designNotes: designNotes || undefined,
      mcpIntegrations: mcpSelections.length > 0 ? mcpSelections : undefined,
    } as any);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      <p className="text-sm text-slate-500 ml-1">
        {t('stepRef.intro')}
      </p>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 ml-1">{t('stepRef.linksLabel')}</h3>

        {entries.map((entry, index) => (
          <div
            key={index}
            className="rounded-2xl border-2 border-slate-100 bg-white/70 p-4 space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <ExternalLink size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <input
                    type="url"
                    value={entry.url}
                    onChange={(e) => updateEntry(index, 'url', e.target.value)}
                    placeholder={t('stepRef.urlPlaceholder')}
                    className={cn(
                      'w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-white text-sm transition-all',
                      'placeholder:text-slate-400 focus:outline-none focus:border-[#FF8A71] focus:ring-4 focus:ring-[#FF8A71]/10',
                    )}
                  />
                </div>
                <input
                  type="text"
                  value={entry.description}
                  onChange={(e) => updateEntry(index, 'description', e.target.value)}
                  placeholder={t('stepRef.descPlaceholder')}
                  className={cn(
                    'w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-white text-sm transition-all',
                    'placeholder:text-slate-400 focus:outline-none focus:border-[#FF8A71] focus:ring-4 focus:ring-[#FF8A71]/10',
                  )}
                />
              </div>
              {entries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry(index)}
                  className="p-2 text-slate-300 hover:text-red-400 transition-colors mt-1"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addEntry}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[#FF8A71] border-2 border-dashed border-[#FFD9D1] rounded-xl hover:bg-[#FFF0ED] transition-all"
        >
          <Plus size={16} />
          {t('stepRef.addLink')}
        </button>
      </div>

      <Textarea
        label={t('stepRef.designNotes')}
        value={designNotes}
        onChange={(e) => setDesignNotes(e.target.value)}
        placeholder={t('stepRef.designNotesPlaceholder')}
      />

      {MCP_OPTIONS.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-800 ml-1 flex items-center gap-2">
            <Puzzle size={16} className="text-[#FF8A71]" />
            {t('stepRef.mcpLabel')}
          </h3>
          <p className="text-sm text-slate-500 ml-1">{t('stepRef.mcpDesc')}</p>
          <div className="space-y-2">
            {MCP_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all',
                  mcpSelections.includes(opt.id)
                    ? 'border-[#FF8A71] bg-[#FFF0ED]'
                    : 'border-slate-100 bg-white/70 hover:border-slate-200',
                )}
              >
                <input
                  type="checkbox"
                  checked={mcpSelections.includes(opt.id)}
                  onChange={() => toggleMcp(opt.id)}
                  className="mt-0.5 accent-[#FF8A71]"
                />
                <div>
                  <span className="text-sm font-bold text-slate-800">
                    {locale === 'fr' ? opt.label_fr : opt.label}
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {locale === 'fr' ? opt.description_fr : opt.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

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
