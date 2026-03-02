'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WebDesignStyleSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import type { WebDesignStyle } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Button } from '@/components/ui/button';
import { useT } from '@/lib/i18n';
import { cn } from '@/lib/utils/cn';
import {
  Layers, BookOpen, Maximize2, LayoutGrid, Grid3x3, SquareStack,
  Columns, Rocket, Newspaper, BarChart3, AlignJustify, Box,
  Minus, Cloud, Hammer, Palette, Type,
  Image as ImageIcon, Play, PanelLeft, FileText,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SelectionCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
  size?: 'small' | 'large';
}

function SelectionCard({ icon: Icon, title, description, isSelected, onClick, size = 'large' }: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex text-left transition-all duration-300 border-2 rounded-[2rem]',
        size === 'large' ? 'flex-col p-6' : 'flex-row items-center gap-4 p-4',
        isSelected
          ? 'bg-[#FFF0ED] border-[#FF8A71] shadow-[0_10px_25px_rgba(255,138,113,0.15)] -translate-y-1'
          : 'bg-white/70 backdrop-blur-sm border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.06)] hover:-translate-y-0.5',
      )}
    >
      <div className={cn(
        'rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shrink-0',
        isSelected ? 'bg-white text-[#FF8A71]' : 'bg-[#F5F3FF] text-[#8B5CF6]',
        size === 'large' ? 'w-12 h-12 mb-4' : 'w-10 h-10',
      )}>
        <Icon size={size === 'large' ? 24 : 20} strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <h3 className={cn('font-bold text-slate-800', size === 'large' ? 'text-base mb-1' : 'text-sm')}>{title}</h3>
        {description && <p className="text-slate-500 text-xs leading-relaxed">{description}</p>}
      </div>
      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 bg-[#FF8A71] rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      )}
    </button>
  );
}

const LAYOUT_OPTIONS = [
  { id: 'parallax', title: 'Parallax Scrolling', desc: 'Layered depth effect, backgrounds glide slowly.', icon: Layers },
  { id: 'scrollytelling', title: 'Scrollytelling', desc: 'Narrative-driven, animations triggered by scroll.', icon: BookOpen },
  { id: 'snap-scroll', title: 'Full-Page Snap', desc: 'Full-screen slides that snap into place.', icon: Maximize2 },
  { id: 'bento-grid', title: 'Bento Grid', desc: 'Modular grid of variably-sized tiles.', icon: LayoutGrid },
  { id: 'masonry', title: 'Masonry', desc: 'Cascading Pinterest-style waterfall grid.', icon: Grid3x3 },
  { id: 'card-based', title: 'Card-Based', desc: 'Uniform cards in a scannable grid.', icon: SquareStack },
  { id: 'split-screen', title: 'Split-Screen', desc: 'Two-column layout with distinct content zones.', icon: Columns },
  { id: 'saas-landing', title: 'SaaS Landing', desc: 'Hero + features + pricing + CTA flow.', icon: Rocket },
  { id: 'magazine', title: 'Magazine', desc: 'Rich typography, large images, pull quotes.', icon: Newspaper },
  { id: 'dashboard', title: 'Dashboard', desc: 'Data-dense cards, charts, sidebar nav.', icon: BarChart3 },
  { id: 'single-column', title: 'Single Column', desc: 'Clean, focused, distraction-free reading.', icon: AlignJustify },
  { id: 'immersive-3d', title: 'Immersive 3D', desc: 'Interactive 3D environments (WebGL).', icon: Box },
];

const VISUAL_OPTIONS = [
  { id: 'minimalist', title: 'Minimalist', icon: Minus },
  { id: 'glassmorphism', title: 'Glassmorphism', icon: Cloud },
  { id: 'brutalist', title: 'Brutalist', icon: Hammer },
  { id: 'maximalist', title: 'Maximalist', icon: Palette },
  { id: 'kinetic-typography', title: 'Kinetic Type', icon: Type },
];

const HERO_OPTIONS = [
  { id: 'fullscreen-image', title: 'Full-Screen Image', icon: ImageIcon },
  { id: 'video-background', title: 'Video Background', icon: Play },
  { id: 'split-hero', title: 'Split Hero', icon: PanelLeft },
  { id: 'minimalist-hero', title: 'Minimalist Hero', icon: FileText },
];

export default function StepWebDesignStyle({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const existing = questionnaire.webDesignStyle;

  const { control, handleSubmit } = useForm<WebDesignStyle>({
    resolver: zodResolver(WebDesignStyleSchema),
    defaultValues: {
      layoutStyle: existing?.layoutStyle ?? '',
      visualStyle: existing?.visualStyle ?? '',
      heroStyle: existing?.heroStyle ?? '',
      designNotes: existing?.designNotes ?? '',
    },
  });

  const onSubmit = (data: WebDesignStyle) => {
    updateSection('webDesignStyle', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <SectionHeader sectionMeta={sectionMeta} stepNumber={stepNumber} totalSteps={totalSteps} />

      {/* Section 1: Layout Style */}
      <section>
        <h3 className="text-xl font-black text-slate-900 mb-2">{t('stepDesign.layoutTitle')}</h3>
        <p className="text-sm text-slate-500 mb-6">{t('stepDesign.layoutDesc')}</p>
        <Controller
          name="layoutStyle"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {LAYOUT_OPTIONS.map((opt) => (
                <SelectionCard
                  key={opt.id}
                  icon={opt.icon}
                  title={opt.title}
                  description={opt.desc}
                  isSelected={field.value === opt.id}
                  onClick={() => field.onChange(opt.id)}
                />
              ))}
            </div>
          )}
        />
      </section>

      {/* Section 2 & 3 side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Section 2: Visual Style */}
        <section>
          <h3 className="text-xl font-black text-slate-900 mb-2">{t('stepDesign.visualTitle')}</h3>
          <p className="text-sm text-slate-500 mb-6">{t('stepDesign.visualDesc')}</p>
          <Controller
            name="visualStyle"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VISUAL_OPTIONS.map((opt) => (
                  <SelectionCard
                    key={opt.id}
                    icon={opt.icon}
                    title={opt.title}
                    isSelected={field.value === opt.id}
                    onClick={() => field.onChange(opt.id)}
                    size="small"
                  />
                ))}
              </div>
            )}
          />
        </section>

        {/* Section 3: Hero Style */}
        <section>
          <h3 className="text-xl font-black text-slate-900 mb-2">{t('stepDesign.heroTitle')}</h3>
          <p className="text-sm text-slate-500 mb-6">{t('stepDesign.heroDesc')}</p>
          <Controller
            name="heroStyle"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HERO_OPTIONS.map((opt) => (
                  <SelectionCard
                    key={opt.id}
                    icon={opt.icon}
                    title={opt.title}
                    isSelected={field.value === opt.id}
                    onClick={() => field.onChange(opt.id)}
                    size="small"
                  />
                ))}
              </div>
            )}
          />
        </section>
      </div>

      {/* Design Notes */}
      <section className="bg-white/50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-2">{t('stepDesign.notesTitle')}</h3>
        <p className="text-sm text-slate-500 mb-4">{t('stepDesign.notesDesc')}</p>
        <Controller
          name="designNotes"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder={t('stepDesign.notesPlaceholder')}
              className="w-full h-28 p-5 rounded-2xl bg-white border-2 border-slate-100 focus:border-[#FF8A71] focus:ring-4 focus:ring-[#FF8A71]/10 transition-all outline-none resize-none text-slate-700 text-sm placeholder:text-slate-300"
            />
          )}
        />
      </section>

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
