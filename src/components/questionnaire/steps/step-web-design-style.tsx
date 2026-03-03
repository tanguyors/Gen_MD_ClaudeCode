'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WebDesignStyleSchema } from '@/lib/questionnaire/schemas';
import { useAppStore } from '@/lib/storage/store';
import type { WebDesignStyle } from '@/lib/questionnaire/types';
import type { StepProps } from '../step-renderer';
import { SectionHeader } from '../section-header';
import { Button } from '@/components/ui/button';
import { useT, useLocale } from '@/lib/i18n';
import { cn } from '@/lib/utils/cn';
import {
  Layers, BookOpen, Maximize2, LayoutGrid, Grid3x3, SquareStack,
  Columns, Rocket, Newspaper, BarChart3, AlignJustify, Box,
  Minus, Cloud, Hammer, Palette, Type,
  Image as ImageIcon, Play, PanelLeft, FileText, ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SelectionCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  example?: string;
  isSelected: boolean;
  onClick: () => void;
  size?: 'small' | 'large';
}

function SelectionCard({ icon: Icon, title, description, example, isSelected, onClick, size = 'large' }: SelectionCardProps) {
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
        {example && (
          <a
            href={example}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'inline-flex items-center gap-1 text-[10px] font-semibold mt-1.5 hover:underline',
              isSelected ? 'text-[#FF8A71]' : 'text-[#8B5CF6]',
            )}
          >
            <ExternalLink size={10} />
            {new URL(example).hostname.replace('www.', '')}
          </a>
        )}
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
  { id: 'parallax', title: 'Parallax Scrolling', title_fr: 'Défilement parallaxe', desc: 'Multiple layers move at different speeds as you scroll, creating a cinematic depth effect where backgrounds glide slowly behind foreground content.', desc_fr: 'Plusieurs couches se déplacent à des vitesses différentes au scroll, créant un effet de profondeur cinématique où les arrière-plans glissent lentement derrière le contenu.', icon: Layers, example: 'https://www.apple.com/iphone/' },
  { id: 'scrollytelling', title: 'Scrollytelling', title_fr: 'Scrollytelling', desc: 'A narrative unfolds as you scroll — animations, images, and text are triggered at specific scroll positions, guiding the user through a story.', desc_fr: 'Un récit se déroule au fil du scroll — animations, images et textes se déclenchent à des positions précises, guidant l\'utilisateur à travers une histoire.', icon: BookOpen, example: 'https://www.nytimes.com/projects/2012/snow-fall/index.html' },
  { id: 'snap-scroll', title: 'Full-Page Snap', title_fr: 'Snap plein écran', desc: 'Each section takes the full viewport height. Scrolling snaps precisely to the next slide, like a vertical slideshow presentation.', desc_fr: 'Chaque section occupe toute la hauteur de l\'écran. Le scroll accroche précisément à la section suivante, comme un diaporama vertical.', icon: Maximize2, example: 'https://alvarotrigo.com/fullPage/' },
  { id: 'bento-grid', title: 'Bento Grid', title_fr: 'Grille Bento', desc: 'Content is organized into variably-sized tiles arranged like a Japanese bento box — some large, some small, creating a modular mosaic.', desc_fr: 'Le contenu est organisé en tuiles de tailles variées comme une boîte bento japonaise — certaines grandes, certaines petites, créant une mosaïque modulaire.', icon: LayoutGrid, example: 'https://www.apple.com/' },
  { id: 'masonry', title: 'Masonry', title_fr: 'Masonry', desc: 'Items of different heights stack in columns like bricks, filling gaps dynamically. Content flows vertically in a Pinterest-style waterfall.', desc_fr: 'Des éléments de hauteurs différentes s\'empilent en colonnes comme des briques, comblant les espaces dynamiquement. Le contenu coule verticalement style Pinterest.', icon: Grid3x3, example: 'https://www.pinterest.com/' },
  { id: 'card-based', title: 'Card-Based', title_fr: 'Cartes', desc: 'Uniform rectangular cards displayed in a clean grid. Each card contains an image, title, and metadata — easy to scan and browse.', desc_fr: 'Des cartes rectangulaires uniformes dans une grille propre. Chaque carte contient image, titre et métadonnées — facile à parcourir.', icon: SquareStack, example: 'https://dribbble.com/' },
  { id: 'split-screen', title: 'Split-Screen', title_fr: 'Écran divisé', desc: 'The page is divided into two distinct halves — typically text/CTA on one side and imagery on the other, creating visual balance.', desc_fr: 'La page est divisée en deux moitiés distinctes — texte/CTA d\'un côté et image de l\'autre, créant un équilibre visuel.', icon: Columns, example: 'https://www.shopify.com/' },
  { id: 'saas-landing', title: 'SaaS Landing', title_fr: 'Landing SaaS', desc: 'Classic startup page structure: big hero headline, feature grid with icons, social proof logos, pricing table, and call-to-action buttons.', desc_fr: 'Structure classique de page startup : gros titre hero, grille de fonctionnalités avec icônes, logos de preuve sociale, tableau de prix et boutons d\'action.', icon: Rocket, example: 'https://www.notion.com/' },
  { id: 'magazine', title: 'Magazine', title_fr: 'Magazine', desc: 'Editorial layout with large hero images, rich typography, pull quotes, and multi-column text — like reading a premium print magazine online.', desc_fr: 'Mise en page éditoriale avec grandes images, typographie riche, citations en exergue et texte multi-colonnes — comme lire un magazine premium en ligne.', icon: Newspaper, example: 'https://www.esquire.com/' },
  { id: 'dashboard', title: 'Dashboard', title_fr: 'Tableau de bord', desc: 'Dense interface with sidebar navigation, data cards, charts, tables, and metrics — designed for monitoring and analytics.', desc_fr: 'Interface dense avec navigation latérale, cartes de données, graphiques, tableaux et métriques — conçue pour le monitoring et l\'analytics.', icon: BarChart3, example: 'https://grafana.com/grafana/dashboards/' },
  { id: 'single-column', title: 'Single Column', title_fr: 'Colonne unique', desc: 'One narrow column of content centered on the page with generous whitespace. No sidebar, no distractions — pure focused reading.', desc_fr: 'Une seule colonne de contenu centrée avec beaucoup d\'espace blanc. Pas de sidebar, pas de distractions — lecture pure et concentrée.', icon: AlignJustify, example: 'https://medium.com/' },
  { id: 'immersive-3d', title: '3D Immersif', title_fr: '3D Immersif', desc: 'Interactive 3D scene rendered with WebGL/Three.js. Users can rotate, zoom, or navigate a 3D environment directly in the browser.', desc_fr: 'Scène 3D interactive rendue avec WebGL/Three.js. Les utilisateurs peuvent tourner, zoomer ou naviguer dans un environnement 3D directement dans le navigateur.', icon: Box, example: 'https://bruno-simon.com/' },
];

const VISUAL_OPTIONS = [
  { id: 'minimalist', title: 'Minimalist', title_fr: 'Minimaliste', desc: 'Lots of whitespace, restrained colors, sharp typography — let the content breathe.', desc_fr: 'Beaucoup d\'espace blanc, couleurs sobres, typographie nette — laisser le contenu respirer.', icon: Minus, example: 'https://www.apple.com/' },
  { id: 'glassmorphism', title: 'Glassmorphism', title_fr: 'Glassmorphisme', desc: 'Frosted glass panels with blur and transparency over colorful gradients.', desc_fr: 'Panneaux en verre dépoli avec flou et transparence sur des dégradés colorés.', icon: Cloud, example: 'https://reflect.app/' },
  { id: 'brutalist', title: 'Brutalist', title_fr: 'Brutaliste', desc: 'Raw HTML feel, plain fonts, no polish — intentionally unrefined and bold.', desc_fr: 'Aspect HTML brut, polices simples, aucun vernis — volontairement brut et audacieux.', icon: Hammer, example: 'https://craigslist.org/' },
  { id: 'maximalist', title: 'Maximalist', title_fr: 'Maximaliste', desc: 'Bold colors, overlapping elements, neon accents — visual overload by design.', desc_fr: 'Couleurs vives, éléments superposés, accents néon — surcharge visuelle assumée.', icon: Palette, example: 'https://www.glitche.com/' },
  { id: 'kinetic-typography', title: 'Kinetic Type', title_fr: 'Typo cinétique', desc: 'Text is the main visual — letters animate, morph, and respond to interaction.', desc_fr: 'Le texte est l\'élément visuel principal — les lettres s\'animent, se transforment et réagissent aux interactions.', icon: Type, example: 'https://stripe.com/' },
];

const HERO_OPTIONS = [
  { id: 'fullscreen-image', title: 'Full-Screen Image', title_fr: 'Image plein écran', desc: 'A stunning photo fills the entire viewport behind the headline.', desc_fr: 'Une photo époustouflante remplit tout l\'écran derrière le titre.', icon: ImageIcon, example: 'https://www.nationalgeographic.com/' },
  { id: 'video-background', title: 'Video Background', title_fr: 'Vidéo en fond', desc: 'Autoplay looping video behind the hero text, cinematic feel.', desc_fr: 'Vidéo en boucle automatique derrière le texte hero, ambiance cinématique.', icon: Play, example: 'https://www.tesla.com/' },
  { id: 'split-hero', title: 'Split Hero', title_fr: 'Hero divisé', desc: 'Text and CTA on one side, product image or illustration on the other.', desc_fr: 'Texte et CTA d\'un côté, image produit ou illustration de l\'autre.', icon: PanelLeft, example: 'https://slack.com/' },
  { id: 'minimalist-hero', title: 'Minimalist Hero', title_fr: 'Hero minimaliste', desc: 'Bold text on clean background, no image — pure typography impact.', desc_fr: 'Texte en gras sur fond épuré, pas d\'image — impact typographique pur.', icon: FileText, example: 'https://linear.app/' },
];

export default function StepWebDesignStyle({ onNext, onPrev, onSkip, isFirst, isLast, sectionMeta, stepNumber, totalSteps }: StepProps) {
  const { questionnaire, updateSection } = useAppStore();
  const { t } = useT();
  const { locale } = useLocale();
  const isFr = locale === 'fr';
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
                  title={isFr && opt.title_fr ? opt.title_fr : opt.title}
                  description={isFr && opt.desc_fr ? opt.desc_fr : opt.desc}
                  example={opt.example}
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
                    title={isFr && opt.title_fr ? opt.title_fr : opt.title}
                    description={isFr && opt.desc_fr ? opt.desc_fr : opt.desc}
                    example={opt.example}
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
                    title={isFr && opt.title_fr ? opt.title_fr : opt.title}
                    description={isFr && opt.desc_fr ? opt.desc_fr : opt.desc}
                    example={opt.example}
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
