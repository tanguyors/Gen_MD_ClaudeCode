'use client';

import { lazy, Suspense } from 'react';
import type { SectionKey, SectionMeta } from '@/lib/questionnaire/types';

const STEP_COMPONENTS: Record<SectionKey, React.LazyExoticComponent<React.ComponentType<StepProps>>> = {
  identity: lazy(() => import('./steps/step-00-identity')),
  agentTeam: lazy(() => import('./steps/step-agent-team')),
  references: lazy(() => import('./steps/step-references')),
  business: lazy(() => import('./steps/step-01-business')),
  techGoals: lazy(() => import('./steps/step-02-tech-goals')),
  repoMap: lazy(() => import('./steps/step-03-repo-map')),
  stack: lazy(() => import('./steps/step-04-stack')),
  commands: lazy(() => import('./steps/step-05-commands')),
  environments: lazy(() => import('./steps/step-06-environments')),
  codeStandards: lazy(() => import('./steps/step-07-code-standards')),
  alwaysOnRules: lazy(() => import('./steps/step-08-always-on-rules')),
  database: lazy(() => import('./steps/step-09-database')),
  apiContracts: lazy(() => import('./steps/step-10-api')),
  security: lazy(() => import('./steps/step-11-security')),
  performance: lazy(() => import('./steps/step-12-performance')),
  testing: lazy(() => import('./steps/step-13-testing')),
  cicd: lazy(() => import('./steps/step-14-cicd')),
  observability: lazy(() => import('./steps/step-15-observability')),
  uxUi: lazy(() => import('./steps/step-16-ux-ui')),
  i18n: lazy(() => import('./steps/step-17-i18n')),
  aiMl: lazy(() => import('./steps/step-18-ai-ml')),
  documentation: lazy(() => import('./steps/step-19-documentation')),
  agentPrefs: lazy(() => import('./steps/step-20-agent-prefs')),
  codePolicy: lazy(() => import('./steps/step-21-code-policy')),
  dod: lazy(() => import('./steps/step-22-dod')),
  examples: lazy(() => import('./steps/step-23-examples')),
  pitfalls: lazy(() => import('./steps/step-24-pitfalls')),
  governance: lazy(() => import('./steps/step-25-governance')),
  alwaysOnBlock: lazy(() => import('./steps/step-26-always-on-block')),
  finalValidation: lazy(() => import('./steps/step-27-validation')),
};

export interface StepProps {
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isFirst: boolean;
  isLast: boolean;
  sectionMeta: SectionMeta;
  stepNumber: number;
  totalSteps: number;
}

interface StepRendererProps extends StepProps {
  sectionKey: SectionKey;
}

export function StepRenderer({ sectionKey, ...props }: StepRendererProps) {
  const Component = STEP_COMPONENTS[sectionKey];

  return (
    <Suspense fallback={<StepSkeleton />}>
      <Component {...props} />
    </Suspense>
  );
}

function StepSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="space-y-3 mt-8">
        <div className="h-10 bg-gray-100 rounded" />
        <div className="h-10 bg-gray-100 rounded" />
        <div className="h-10 bg-gray-100 rounded" />
      </div>
    </div>
  );
}
