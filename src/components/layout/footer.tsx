'use client';

import Link from 'next/link';
import { FileText, Heart } from 'lucide-react';
import { useT } from '@/lib/i18n';

export function Footer() {
  const { t } = useT();

  return (
    <footer className="w-full bg-[#FAF9F6] border-t-2 border-white py-16 px-6 font-sans overflow-hidden relative">
      <div className="absolute w-64 h-64 bg-[#E9D5FF] bottom-[-20%] left-[-10%] rounded-full blur-3xl -z-10 opacity-20" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[#FF8A71] shadow-sm">
            <FileText size={18} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900">
            ClaudeMD{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A71] to-[#FFB2A1]">
              Generator
            </span>
          </span>
        </div>

        <p className="text-slate-600 text-sm md:text-base max-w-md leading-relaxed mb-8">
          {t('footer.description')}{' '}
          <code className="bg-white px-1.5 py-0.5 rounded border border-slate-100 text-[#FF8A71] font-mono font-bold text-xs">
            CLAUDE.md
          </code>{' '}
          {t('footer.descriptionEnd')}
        </p>

        <div className="w-full pt-8 border-t border-slate-200/50 flex items-center justify-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            {t('footer.madeWith')}{' '}
            <Heart size={14} className="fill-[#FF8A71] text-[#FF8A71] animate-pulse" /> {t('footer.forDevelopers')}
          </p>
        </div>
      </div>
    </footer>
  );
}
