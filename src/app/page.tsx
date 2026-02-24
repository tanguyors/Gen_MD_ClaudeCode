'use client';

import Link from 'next/link';
import {
  LayoutGrid,
  Sparkles,
  ClipboardCheck,
  ArrowRight,
  FileText,
  Settings,
  Download,
  XCircle,
  CheckCircle2,
  Check,
  X,
  Copy,
  Terminal,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useT } from '@/lib/i18n';

function FeatureCard({
  icon: Icon,
  title,
  description,
  colorClasses,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  colorClasses: string;
}) {
  return (
    <div className="group relative flex flex-col p-8 bg-white/70 backdrop-blur-sm border-2 border-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-300">
      <div
        className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-transform group-hover:scale-110 group-hover:rotate-3',
          colorClasses,
        )}
      >
        <Icon size={28} strokeWidth={2.5} />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm lg:text-base">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[#FF8A71] relative z-10">
          <Icon size={32} />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#FF8A71] text-white flex items-center justify-center font-bold text-sm shadow-lg z-20">
          {number}
        </div>
      </div>
      <h4 className="text-lg font-bold text-slate-800 mb-2">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function HomePage() {
  const { t } = useT();

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#FAF9F6] font-sans">
      {/* Background Blobs */}
      <div className="absolute w-96 h-96 bg-[#FFD1C1] top-[-10%] left-[-5%] rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute w-[30rem] h-[30rem] bg-[#D1FAE5] bottom-[-10%] right-[-5%] rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute w-80 h-80 bg-[#E9D5FF] top-[20%] right-[10%] rounded-full blur-3xl -z-10 opacity-40" />

      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
<h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
              {t('landing.heroTitle1')}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A71] to-[#FFB2A1]">
                {t('landing.heroTitle2')}
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              {t('landing.heroDescription')}{' '}
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#FF8A71] font-mono font-bold">
                CLAUDE.md
              </code>{' '}
              {t('landing.heroDescriptionEnd')}
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <Link
                href="/questionnaire"
                className="group relative px-8 py-5 bg-[#FF8A71] text-white font-bold rounded-[2rem] shadow-[0_10px_25px_rgba(255,138,113,0.3)] hover:shadow-[0_15px_35px_rgba(255,138,113,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                {t('landing.cta')}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
                <Clock size={14} />
                <span>{t('landing.timeBadge')}</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-32">
            <FeatureCard
              icon={LayoutGrid}
              title={t('landing.featureStructuredTitle')}
              description={t('landing.featureStructuredDesc')}
              colorClasses="bg-[#FFF0ED] text-[#FF8A71] border-[#FFD9D1]"
            />
            <FeatureCard
              icon={Sparkles}
              title={t('landing.featureAiTitle')}
              description={t('landing.featureAiDesc')}
              colorClasses="bg-[#F5F3FF] text-[#8B5CF6] border-[#DDD6FE]"
            />
            <FeatureCard
              icon={ClipboardCheck}
              title={t('landing.featureQualityTitle')}
              description={t('landing.featureQualityDesc')}
              colorClasses="bg-[#F0FFF4] text-[#48BB78] border-[#C6F6D5]"
            />
          </div>

          {/* Before & After Section */}
          <div className="mt-32 mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                {t('landing.beforeAfterTitle')}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#FF8A71] to-[#FFB2A1] rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Without CLAUDE.md */}
              <div className="group relative flex flex-col p-8 lg:p-10 bg-white/70 backdrop-blur-sm border-2 border-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-300">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF0ED] text-[#FF8A71] border border-[#FFD9D1] flex items-center justify-center transition-transform group-hover:scale-110 group-hover:-rotate-3">
                    <XCircle size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-800">
                    {t('landing.beforeTitle')}
                  </h3>
                </div>

                <ul className="space-y-6">
                  {([1, 2, 3, 4] as const).map((index) => (
                    <li key={`before-${index}`} className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <XCircle size={18} className="text-[#FF8A71]/60" />
                      </div>
                      <p className="text-slate-600 leading-relaxed font-medium">
                        {t(`landing.beforeItem${index}` as 'landing.beforeItem1')}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: With CLAUDE.md */}
              <div className="group relative flex flex-col p-8 lg:p-10 bg-white/70 backdrop-blur-sm border-2 border-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-300 ring-2 ring-[#48BB78]/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#F0FFF4] text-[#48BB78] border border-[#C6F6D5] flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <CheckCircle2 size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-800">
                    {t('landing.afterTitle')}
                  </h3>
                </div>

                <ul className="space-y-6">
                  {([1, 2, 3, 4] as const).map((index) => (
                    <li key={`after-${index}`} className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 size={18} className="text-[#48BB78]" />
                      </div>
                      <p className="text-slate-700 leading-relaxed font-bold">
                        {t(`landing.afterItem${index}` as 'landing.afterItem1')}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-24 lg:mt-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-6">
                {t('landing.previewTitle')}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('landing.previewDesc')}
              </p>
            </div>

            <div className="relative group max-w-4xl mx-auto">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FFD1C1] rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D1FAE5] rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />

              <div className="relative bg-white/70 backdrop-blur-md border-2 border-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF8A71]/40" />
                      <div className="w-3 h-3 rounded-full bg-orange-200" />
                      <div className="w-3 h-3 rounded-full bg-[#48BB78]/40" />
                    </div>
                    <div className="ml-4 flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-50 border border-slate-100">
                      <FileText size={14} className="text-[#FF8A71]" />
                      <span className="text-xs font-bold text-slate-500 font-mono tracking-tight">CLAUDE.md</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-2 text-slate-400">
                      <Copy size={18} />
                    </div>
                  </div>
                </div>

                <div className="p-8 lg:p-10 overflow-x-auto">
                  <pre className="font-mono text-sm lg:text-base leading-relaxed text-slate-700">
                    <code className="block whitespace-pre-wrap">
                      <span className="text-[#FF8A71] font-bold"># MyProject</span>
                      {'\n\n'}
                      <span className="text-slate-400 italic">{'<!-- ALWAYS-ON RULES -->'}</span>{'\n'}
                      <span className="text-[#8B5CF6]">-</span> Never push directly to main{'\n'}
                      <span className="text-[#8B5CF6]">-</span> Run <span className="bg-slate-100 px-1 rounded">`pnpm typecheck`</span> before committing{'\n'}
                      <span className="text-[#8B5CF6]">-</span> All components must be typed with TypeScript{'\n\n'}
                      <span className="text-[#FF8A71] font-bold">## WHY</span>{'\n'}
                      SaaS platform for team collaboration.{'\n'}
                      Target: Engineering teams, 10-500 employees.{'\n\n'}
                      <span className="text-[#FF8A71] font-bold">## WHAT</span>{'\n'}
                      <span className="text-[#48BB78] font-bold">### Stack</span>{'\n'}
                      Next.js 14 · TypeScript · Tailwind · Prisma · PostgreSQL{'\n\n'}
                      <span className="text-[#48BB78] font-bold">### Commands</span>{'\n'}
                      Install → <span className="text-[#8B5CF6]">pnpm install</span>{'\n'}
                      Dev → <span className="text-[#8B5CF6]">pnpm dev</span>{'\n'}
                      Build → <span className="text-[#8B5CF6]">pnpm build</span>{'\n'}
                      Test → <span className="text-[#8B5CF6]">pnpm test</span>{'\n\n'}
                      <span className="text-[#FF8A71] font-bold">## HOW</span>{'\n'}
                      <span className="text-[#48BB78] font-bold">### Code Standards</span>{'\n'}
                      <span className="text-[#8B5CF6]">-</span> camelCase for variables, PascalCase for components{'\n'}
                      <span className="text-[#8B5CF6]">-</span> Prefer named exports over default exports
                    </code>
                  </pre>
                </div>

                <div className="absolute bottom-6 right-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 shadow-xl rounded-2xl">
                    <Terminal size={16} className="text-[#48BB78]" />
                    <span className="text-xs font-bold text-slate-600">Optimized for AI Agents</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table Section */}
          <div className="py-24 lg:py-32 relative">
            <div className="absolute w-72 h-72 bg-[#E9D5FF] top-0 left-1/2 -translate-x-1/2 rounded-full blur-3xl -z-10 opacity-30" />

            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                {t('landing.compareTitle')}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#FF8A71] to-[#FFB2A1] rounded-full mx-auto" />
            </div>

            <div className="relative overflow-x-auto pb-8">
              <table className="w-full border-separate border-spacing-x-2 md:border-spacing-x-4 min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-6 text-left text-slate-500 font-bold uppercase text-xs tracking-widest bg-white/40 backdrop-blur-sm rounded-t-[2rem]">
                      {t('landing.compareFeature')}
                    </th>
                    <th className="p-6 text-center text-slate-600 font-bold bg-white/40 backdrop-blur-sm rounded-t-[2rem]">
                      {t('landing.compareManual')}
                    </th>
                    <th className="p-6 text-center relative">
                      <div className="bg-[#FF8A71] text-white font-black text-lg p-6 rounded-t-[2rem] shadow-[0_-10px_25px_rgba(255,138,113,0.15)]">
                        {t('landing.compareTool')}
                      </div>
                    </th>
                    <th className="p-6 text-center text-slate-600 font-bold bg-white/40 backdrop-blur-sm rounded-t-[2rem]">
                      {t('landing.compareCursor')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {([1, 2, 3, 4, 5, 6] as const).map((rowNum, idx) => {
                    const isLast = idx === 5;
                    return (
                      <tr key={rowNum} className="group">
                        <td className={cn(
                          'p-6 bg-white/70 backdrop-blur-sm border-x-2 border-white text-slate-800 font-bold transition-all group-hover:bg-white',
                          isLast && 'rounded-b-[2rem] border-b-2',
                        )}>
                          {t(`landing.compareRow${rowNum}` as 'landing.compareRow1')}
                        </td>
                        <td className={cn(
                          'p-6 text-center bg-white/50 backdrop-blur-sm border-x-2 border-white transition-all group-hover:bg-white/80',
                          isLast && 'rounded-b-[2rem] border-b-2',
                        )}>
                          <div className="flex justify-center">
                            <X className="text-slate-300" size={24} strokeWidth={3} />
                          </div>
                        </td>
                        <td className={cn(
                          'p-6 text-center bg-white border-x-2 border-[#FF8A71]',
                          isLast ? 'rounded-b-[2rem] border-b-2 shadow-[0_20px_40px_rgba(255,138,113,0.1)]' : 'shadow-[20px_0_40px_rgba(255,138,113,0.05),-20px_0_40px_rgba(255,138,113,0.05)]',
                        )}>
                          <div className="flex justify-center">
                            <div className="w-10 h-10 rounded-full bg-[#F0FFF4] border border-[#C6F6D5] flex items-center justify-center text-[#48BB78] shadow-sm">
                              <Check size={24} strokeWidth={4} />
                            </div>
                          </div>
                        </td>
                        <td className={cn(
                          'p-6 text-center bg-white/50 backdrop-blur-sm border-x-2 border-white transition-all group-hover:bg-white/80',
                          isLast && 'rounded-b-[2rem] border-b-2',
                        )}>
                          <div className="flex justify-center">
                            <X className="text-slate-300" size={24} strokeWidth={3} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="relative pt-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">{t('landing.howItWorks')}</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#FF8A71] to-[#FFB2A1] rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-slate-200 -z-10" />

              <StepCard
                number="1"
                icon={FileText}
                title={t('landing.step1Title')}
                description={t('landing.step1Desc')}
              />
              <StepCard
                number="2"
                icon={Settings}
                title={t('landing.step2Title')}
                description={t('landing.step2Desc')}
              />
              <StepCard
                number="3"
                icon={Download}
                title={t('landing.step3Title')}
                description={t('landing.step3Desc')}
              />
            </div>

            <div className="mt-20 text-center">
              <Link
                href="/questionnaire"
                className="inline-flex items-center gap-2 font-bold text-[#FF8A71] hover:text-[#e67a62] transition-colors"
              >
                {t('landing.readyCta')}
                <span className="underline decoration-2 underline-offset-4">{t('landing.getStartedNow')}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="relative pt-24 pb-8 max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">{t('landing.faqTitle')}</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#FF8A71] to-[#FFB2A1] rounded-full mx-auto" />
            </div>

            <div className="space-y-6">
              {([1, 2, 3, 4] as const).map((n) => (
                <details
                  key={n}
                  className="group bg-white/70 backdrop-blur-sm border-2 border-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-left font-bold text-slate-800 hover:text-[#FF8A71] transition-colors list-none">
                    {t(`landing.faq${n}Q` as 'landing.faq1Q')}
                    <span className="ml-4 text-slate-300 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">
                    {t(`landing.faq${n}A` as 'landing.faq1A')}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
