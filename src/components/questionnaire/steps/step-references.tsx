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
import { Plus, Trash2, ExternalLink, Puzzle, Search } from 'lucide-react';

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
  const [mcpSearch, setMcpSearch] = useState('');
  const [mcpCategory, setMcpCategory] = useState<string>('all');

  const CATEGORIES = ['all', 'ai-debate', 'audio', 'code-review', 'database', 'design', 'devops', 'productivity', 'search', 'security'] as const;

  const filteredMcps = MCP_OPTIONS.filter((opt) => {
    const matchesCategory = mcpCategory === 'all' || opt.category === mcpCategory;
    const matchesSearch = mcpSearch.trim() === '' ||
      opt.label.toLowerCase().includes(mcpSearch.toLowerCase()) ||
      opt.description.toLowerCase().includes(mcpSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800 ml-1 flex items-center gap-2">
              <Puzzle size={16} className="text-[#FF8A71]" />
              {t('stepRef.mcpLabel')}
            </h3>
            {mcpSelections.length > 0 && (
              <span className="text-xs font-bold text-[#FF8A71] bg-[#FFF0ED] px-3 py-1 rounded-full">
                {mcpSelections.length} {t('stepRef.mcpSelected')}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 ml-1">{t('stepRef.mcpDesc')}</p>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={mcpSearch}
              onChange={(e) => setMcpSearch(e.target.value)}
              placeholder={t('stepRef.mcpSearch')}
              className={cn(
                'w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-100 bg-white text-sm transition-all',
                'placeholder:text-slate-400 focus:outline-none focus:border-[#FF8A71] focus:ring-4 focus:ring-[#FF8A71]/10',
              )}
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setMcpCategory(cat)}
                className={cn(
                  'px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all',
                  mcpCategory === cat
                    ? 'border-[#FF8A71] bg-[#FFF0ED] text-[#FF8A71]'
                    : 'border-slate-100 bg-white/70 text-slate-500 hover:border-slate-200',
                )}
              >
                {cat === 'all' ? t('stepRef.mcpAll') : t(`stepRef.mcpCat.${cat}` as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>

          {/* MCP list */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {filteredMcps.map((opt) => (
              <label
                key={opt.id}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all',
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">
                      {locale === 'fr' ? opt.label_fr : opt.label}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full shrink-0">
                      {opt.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {locale === 'fr' ? opt.description_fr : opt.description}
                  </p>
                </div>
              </label>
            ))}
            {filteredMcps.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-6">
                {locale === 'fr' ? 'Aucun MCP trouvé' : 'No MCPs found'}
              </p>
            )}
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
