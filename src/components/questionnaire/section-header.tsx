'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, SkipForward } from 'lucide-react';
import type { SectionMeta } from '@/lib/questionnaire/types';
import { useLocale, useT } from '@/lib/i18n';

interface SectionHeaderProps {
  sectionMeta: SectionMeta;
  stepNumber: number;
  totalSteps: number;
}

export function SectionHeader({ sectionMeta, stepNumber, totalSteps }: SectionHeaderProps) {
  const { locale } = useLocale();
  const { t } = useT();
  const [expanded, setExpanded] = useState(false);

  const title = locale === 'fr' && sectionMeta.title_fr ? sectionMeta.title_fr : sectionMeta.title;
  const description = locale === 'fr' && sectionMeta.description_fr ? sectionMeta.description_fr : sectionMeta.description;
  const whyItMatters = locale === 'fr' && sectionMeta.whyItMatters_fr ? sectionMeta.whyItMatters_fr : sectionMeta.whyItMatters;
  const whenToSkip = locale === 'fr' && sectionMeta.whenToSkip_fr ? sectionMeta.whenToSkip_fr : sectionMeta.whenToSkip;
  const hasHelp = !!whyItMatters || !!whenToSkip;

  return (
    <div className="mb-10">
      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF0ED] text-[#FF8A71] border border-[#FFD9D1] text-[10px] uppercase tracking-[0.15em] font-black mb-6 shadow-sm">
        {t('section.stepOf', { current: stepNumber, total: totalSteps })}
      </div>
      <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
        {title}
      </h2>
      <p className="text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
        {description}
      </p>

      {hasHelp && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-sm font-medium text-[#FF8A71] hover:text-[#e5735e] transition-colors"
          >
            {expanded
              ? (locale === 'fr' ? 'Masquer les détails' : 'Hide details')
              : (locale === 'fr' ? 'Pourquoi cette section ?' : 'Why this section?')}
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <div
            className="grid transition-all duration-200 ease-in-out"
            style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className="mt-3 pl-4 border-l-2 border-[#FFD9D1] space-y-3 max-w-2xl">
                {whyItMatters && (
                  <div className="flex items-start gap-2">
                    <HelpCircle size={16} className="text-[#FF8A71] mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-600 leading-relaxed">{whyItMatters}</p>
                  </div>
                )}
                {whenToSkip && (
                  <div className="flex items-start gap-2">
                    <SkipForward size={16} className="text-slate-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-500 leading-relaxed italic">{whenToSkip}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
