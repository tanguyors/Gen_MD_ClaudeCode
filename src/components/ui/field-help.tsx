'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircleQuestion, Lightbulb } from 'lucide-react';
import { useLocale } from '@/lib/i18n/context';

export interface FieldHelpProps {
  what: string;
  why?: string;
  example?: string;
  children: React.ReactNode;
}

export function FieldHelp({ what, why, example, children }: FieldHelpProps) {
  const [expanded, setExpanded] = useState(false);
  const { locale } = useLocale();
  const hasMore = !!why || !!example;

  return (
    <div className="w-full space-y-1">
      {children}
      <p className="text-xs text-slate-400 ml-1 leading-relaxed">{what}</p>
      {hasMore && (
        <>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[11px] font-medium text-[#FF8A71] hover:text-[#e5735e] transition-colors ml-1"
          >
            {expanded
              ? (locale === 'fr' ? 'Masquer' : 'Hide')
              : (locale === 'fr' ? 'En savoir plus' : 'Learn more')}
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          <div
            className="grid transition-all duration-200 ease-in-out"
            style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className="ml-1 pl-3 border-l-2 border-slate-200 space-y-2 pt-1 pb-2">
                {why && (
                  <div className="flex items-start gap-2">
                    <MessageCircleQuestion size={14} className="text-slate-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-500 leading-relaxed">{why}</p>
                  </div>
                )}
                {example && (
                  <div className="flex items-start gap-2">
                    <Lightbulb size={14} className="text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 rounded-lg px-2.5 py-1.5 italic">
                      {example}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FieldHelp;
