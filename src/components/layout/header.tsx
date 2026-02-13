'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';
import { useLocale, useT } from '@/lib/i18n';

export function Header() {
  const { locale, setLocale } = useLocale();
  const { t } = useT();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b-2 border-white/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FFF0ED] border border-[#FFD9D1] flex items-center justify-center text-[#FF8A71] group-hover:rotate-3 transition-transform">
            <FileText size={22} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            ClaudeMD{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A71] to-[#FFB2A1]">
              Generator
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/questionnaire"
            className="text-sm font-bold text-slate-600 hover:text-[#FF8A71] transition-colors duration-300 relative group"
          >
            {t('nav.questionnaire')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8A71] transition-all duration-300 group-hover:w-full rounded-full" />
          </Link>
          <Link
            href="/preview"
            className="text-sm font-bold text-slate-600 hover:text-[#FF8A71] transition-colors duration-300 relative group"
          >
            {t('nav.preview')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8A71] transition-all duration-300 group-hover:w-full rounded-full" />
          </Link>

          <button
            onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
            className="px-3 py-1.5 text-xs font-black tracking-wider uppercase rounded-full border-2 border-slate-200 text-slate-500 hover:border-[#FF8A71] hover:text-[#FF8A71] transition-all"
          >
            {locale === 'en' ? 'FR' : 'EN'}
          </button>

          <Link
            href="/questionnaire"
            className="ml-4 px-6 py-2.5 bg-[#FF8A71] text-white text-sm font-bold rounded-full shadow-[0_8px_20px_rgba(255,138,113,0.2)] hover:shadow-[0_12px_25px_rgba(255,138,113,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          >
            {t('nav.getStarted')}
          </Link>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
            className="px-3 py-1.5 text-xs font-black tracking-wider uppercase rounded-full border-2 border-slate-200 text-slate-500"
          >
            {locale === 'en' ? 'FR' : 'EN'}
          </button>
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center gap-1 cursor-pointer">
            <span className="w-5 h-0.5 bg-slate-400 rounded-full" />
            <span className="w-5 h-0.5 bg-slate-400 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
