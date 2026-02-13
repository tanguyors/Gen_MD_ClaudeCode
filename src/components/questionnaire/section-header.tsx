'use client';

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
  const title = locale === 'fr' && sectionMeta.title_fr ? sectionMeta.title_fr : sectionMeta.title;
  const description = locale === 'fr' && sectionMeta.description_fr ? sectionMeta.description_fr : sectionMeta.description;

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
    </div>
  );
}
