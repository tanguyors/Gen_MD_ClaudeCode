<!-- VIBE_3 - Warm Pastel Friendly -->

```tsx
// Design System: Warm Pastel Friendly
// Scale: Balanced
// Vibe: Warm, friendly, pastel colors, soft rounded corners, playful

import React from 'react';
import Link from 'next/link';
import {
  LayoutGrid,
  Sparkles,
  ClipboardCheck,
  ArrowRight,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function Vibe3FeatureCard({ icon: Icon, title, description, colorClasses }: { icon: React.ElementType; title: string; description: string; colorClasses: string }) {
  return (
    <div className="group relative flex flex-col p-8 bg-white/70 backdrop-blur-sm border-2 border-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-300">
      <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-transform group-hover:scale-110 group-hover:rotate-3', colorClasses)}>
        <Icon size={28} strokeWidth={2.5} />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm lg:text-base">{description}</p>
    </div>
  );
}

function Vibe3() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-6 py-24 lg:py-32 font-sans">
      <div className="absolute w-96 h-96 bg-[#FFD1C1] top-[-10%] left-[-5%] rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute w-[30rem] h-[30rem] bg-[#D1FAE5] bottom-[-10%] right-[-5%] rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute w-80 h-80 bg-[#E9D5FF] top-[20%] right-[10%] rounded-full blur-3xl -z-10 opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-500">New: GPT-4o Integration</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
            ClaudeMD{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A71] to-[#FFB2A1]">Generator</span>
          </h1>

          <p className="text-lg lg:text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Transform your project context into concise, actionable{' '}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#FF8A71] font-mono font-bold">CLAUDE.md</code>{' '}
            files that make AI coding agents work better for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/questionnaire"
              className="group relative px-8 py-5 bg-[#FF8A71] text-white font-bold rounded-[2rem] shadow-[0_10px_25px_rgba(255,138,113,0.3)] hover:shadow-[0_15px_35px_rgba(255,138,113,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              Start Questionnaire
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <Vibe3FeatureCard icon={LayoutGrid} title="Structured Input" description="27-section questionnaire covering every aspect of your project architecture, rules, and tech stack." colorClasses="bg-[#FFF0ED] text-[#FF8A71] border-[#FFD9D1]" />
          <Vibe3FeatureCard icon={Sparkles} title="AI-Enhanced" description="Optional GPT enhancement to polish your responses into concise, professional, agent-optimized documentation." colorClasses="bg-[#F5F3FF] text-[#8B5CF6] border-[#DDD6FE]" />
          <Vibe3FeatureCard icon={ClipboardCheck} title="Quality Checks" description="Automatic validation for line count, coverage, and best practices to ensure high-performance AI interactions." colorClasses="bg-[#F0FFF4] text-[#48BB78] border-[#C6F6D5]" />
        </div>
      </div>
    </section>
  );
}
```

<!-- Design Tokens -->
<!-- Background: bg-[#FAF9F6] (warm off-white) -->
<!-- Primary accent: #FF8A71 (peach/coral) -->
<!-- Secondary accent: #FFB2A1 (light peach) -->
<!-- Lavender accent: #8B5CF6 -->
<!-- Mint accent: #48BB78 -->
<!-- Card style: bg-white/70 backdrop-blur-sm border-2 border-white rounded-[2.5rem] -->
<!-- Card shadow: shadow-[0_8px_30px_rgb(0,0,0,0.04)] -->
<!-- Card hover: hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-2 -->
<!-- Button style: bg-[#FF8A71] text-white font-bold rounded-[2rem] -->
<!-- Button shadow: shadow-[0_10px_25px_rgba(255,138,113,0.3)] -->
<!-- Badge style: rounded-full bg-white border border-slate-100 shadow-sm -->
<!-- Icon container: w-14 h-14 rounded-2xl border -->
<!-- Color themes: peach(bg-[#FFF0ED] text-[#FF8A71] border-[#FFD9D1]), lavender(bg-[#F5F3FF] text-[#8B5CF6] border-[#DDD6FE]), mint(bg-[#F0FFF4] text-[#48BB78] border-[#C6F6D5]) -->
<!-- Floating blobs: rounded-full blur-3xl opacity-40 (peach #FFD1C1, mint #D1FAE5, lavender #E9D5FF) -->
<!-- Typography: font-black for headings, text-slate-900 primary, text-slate-600 secondary -->
<!-- Transitions: transition-all duration-300, hover:-translate-y-2, group-hover:scale-110 group-hover:rotate-3 -->
