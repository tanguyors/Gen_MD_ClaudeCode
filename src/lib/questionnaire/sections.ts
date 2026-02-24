import type { SectionMeta, Questionnaire, OutputVerbosity } from './types';

const VERBOSITY_ORDER: Record<OutputVerbosity, number> = {
  minimal: 0,
  standard: 1,
  detailed: 2,
};

export const SECTIONS: SectionMeta[] = [
  {
    key: 'identity',
    index: 0,
    title: 'Project Identity',
    description: 'Basic project information and context',
    title_fr: 'Identité du projet',
    description_fr: 'Informations de base et contexte du projet',
    isRequired: true,
    isApplicable: () => true,
    category: 'core',
    minVerbosity: 'minimal',
  },
  {
    key: 'agentTeam',
    index: 1,
    title: 'Agent Team',
    description: 'Configure specialized sub-agents that work as a team on your project',
    title_fr: 'Équipe d\'agents',
    description_fr: 'Configurez des sous-agents spécialisés qui travaillent en équipe sur votre projet',
    isRequired: false,
    isApplicable: (data: Partial<Questionnaire>) => data.identity?.useAgentTeam === true,
    category: 'collaboration',
    minVerbosity: 'minimal',
  },
  {
    key: 'references',
    index: 2,
    title: 'References & Inspirations',
    description: 'Links to examples you like (design, CLAUDE.md, projects) — Claude can fetch them',
    title_fr: 'Références & inspirations',
    description_fr: 'Liens vers des exemples que vous aimez (design, CLAUDE.md, projets) — Claude peut les consulter',
    isRequired: false,
    isApplicable: () => true,
    category: 'core',
    minVerbosity: 'minimal',
  },
  {
    key: 'business',
    index: 3,
    title: 'Business Context & Product',
    description: 'Problem, users, value proposition, KPIs',
    title_fr: 'Contexte business & produit',
    description_fr: 'Problème, utilisateurs, proposition de valeur, KPI',
    isRequired: false,
    isApplicable: () => true,
    category: 'core',
    minVerbosity: 'standard',
  },
  {
    key: 'techGoals',
    index: 2,
    title: 'Technical Goals',
    description: 'Primary objectives and quality priorities',
    title_fr: 'Objectifs techniques',
    description_fr: 'Objectifs principaux et priorités qualité',
    isRequired: false,
    isApplicable: () => true,
    category: 'core',
    minVerbosity: 'standard',
  },
  {
    key: 'repoMap',
    index: 3,
    title: 'Repo Map',
    description: 'Repository structure and directory roles',
    title_fr: 'Cartographie du repo',
    description_fr: 'Structure du dépôt et rôles des répertoires',
    isRequired: false,
    isApplicable: () => true,
    category: 'technical',
    minVerbosity: 'standard',
  },
  {
    key: 'stack',
    index: 4,
    title: 'Stack & Dependencies',
    description: 'Languages, frameworks, tools, hosting',
    title_fr: 'Stack & dépendances',
    description_fr: 'Langages, frameworks, outils, hébergement',
    isRequired: false,
    isApplicable: () => true,
    category: 'technical',
    minVerbosity: 'minimal',
  },
  {
    key: 'commands',
    index: 5,
    title: 'Local Setup & Commands',
    description: 'Install, dev, build, test, lint commands',
    title_fr: 'Setup local & commandes',
    description_fr: 'Commandes install, dev, build, test, lint',
    isRequired: false,
    isApplicable: () => true,
    category: 'technical',
    minVerbosity: 'minimal',
  },
  {
    key: 'environments',
    index: 6,
    title: 'Environments & Configuration',
    description: 'Environment list, variables, secrets',
    title_fr: 'Environnements & configuration',
    description_fr: 'Liste des environnements, variables, secrets',
    isRequired: false,
    isApplicable: () => true,
    category: 'technical',
    minVerbosity: 'detailed',
  },
  {
    key: 'codeStandards',
    index: 7,
    title: 'Code Standards & Conventions',
    description: 'Naming, architecture, error handling, imports',
    title_fr: 'Standards de code & conventions',
    description_fr: 'Nommage, architecture, gestion d\'erreurs, imports',
    isRequired: false,
    isApplicable: () => true,
    category: 'process',
    minVerbosity: 'standard',
  },
  {
    key: 'alwaysOnRules',
    index: 8,
    title: 'Always-On Rules',
    description: 'Universal rules the agent must always follow',
    title_fr: 'Règles always-on',
    description_fr: 'Règles universelles que l\'agent doit toujours respecter',
    isRequired: false,
    isApplicable: () => true,
    category: 'process',
    minVerbosity: 'minimal',
  },
  {
    key: 'database',
    index: 9,
    title: 'Database & Data',
    description: 'Schema, migrations, integrity, PII',
    title_fr: 'Base de données & données',
    description_fr: 'Schéma, migrations, intégrité, PII',
    isRequired: false,
    isApplicable: (data: Partial<Questionnaire>) => {
      const type = data.identity?.projectType;
      if (!type) return true;
      return ['web', 'api', 'saas', 'data', 'ai', 'mobile'].includes(type);
    },
    category: 'technical',
    minVerbosity: 'detailed',
  },
  {
    key: 'apiContracts',
    index: 10,
    title: 'API & Contracts',
    description: 'Versioning, errors, auth, rate limiting',
    title_fr: 'API & contrats',
    description_fr: 'Versioning, erreurs, auth, rate limiting',
    isRequired: false,
    isApplicable: (data: Partial<Questionnaire>) => {
      const type = data.identity?.projectType;
      if (!type) return true;
      return ['api', 'saas', 'web'].includes(type);
    },
    category: 'technical',
    minVerbosity: 'detailed',
  },
  {
    key: 'security',
    index: 11,
    title: 'Security & Compliance',
    description: 'Security priorities, compliance, secrets',
    title_fr: 'Sécurité & conformité',
    description_fr: 'Priorités sécurité, conformité, secrets',
    isRequired: false,
    isApplicable: (data: Partial<Questionnaire>) => {
      const stage = data.identity?.currentStage;
      if (!stage) return true;
      return stage !== 'poc';
    },
    category: 'process',
    minVerbosity: 'detailed',
  },
  {
    key: 'performance',
    index: 12,
    title: 'Performance & Reliability',
    description: 'SLOs, targets, cache, retry strategies',
    title_fr: 'Performance & fiabilité',
    description_fr: 'SLO, objectifs, cache, stratégies de retry',
    isRequired: false,
    isApplicable: (data: Partial<Questionnaire>) => {
      const stage = data.identity?.currentStage;
      const type = data.identity?.projectType;
      if (type === 'saas') return true;
      if (!stage) return true;
      return stage === 'production' || stage === 'scale';
    },
    category: 'technical',
    minVerbosity: 'detailed',
  },
  {
    key: 'testing',
    index: 13,
    title: 'Testing & Quality',
    description: 'Strategy, tools, coverage, CI checks',
    title_fr: 'Tests & qualité',
    description_fr: 'Stratégie, outils, couverture, vérifications CI',
    isRequired: false,
    isApplicable: () => true,
    category: 'process',
    minVerbosity: 'standard',
  },
  {
    key: 'cicd',
    index: 14,
    title: 'CI/CD & Release',
    description: 'Pipeline, branches, release, rollback',
    title_fr: 'CI/CD & release',
    description_fr: 'Pipeline, branches, release, rollback',
    isRequired: false,
    isApplicable: (data: Partial<Questionnaire>) => {
      const stage = data.identity?.currentStage;
      if (!stage) return true;
      return stage !== 'poc';
    },
    category: 'process',
    minVerbosity: 'detailed',
  },
  {
    key: 'observability',
    index: 15,
    title: 'Observability & Incidents',
    description: 'Logs, metrics, alerts, incident process',
    title_fr: 'Observabilité & incidents',
    description_fr: 'Logs, métriques, alertes, processus d\'incident',
    isRequired: false,
    isApplicable: (data: Partial<Questionnaire>) => {
      const stage = data.identity?.currentStage;
      if (!stage) return true;
      return stage === 'production' || stage === 'scale';
    },
    category: 'process',
    minVerbosity: 'detailed',
  },
  {
    key: 'uxUi',
    index: 16,
    title: 'UX/UI & Design System',
    description: 'Design system, accessibility, responsive',
    title_fr: 'UX/UI & design system',
    description_fr: 'Design system, accessibilité, responsive',
    isRequired: false,
    isApplicable: (data: Partial<Questionnaire>) => {
      const type = data.identity?.projectType;
      return type === 'web' || type === 'mobile' || type === 'saas' || type === 'desktop';
    },
    category: 'technical',
    minVerbosity: 'detailed',
  },
  {
    key: 'i18n',
    index: 17,
    title: 'Internationalization',
    description: 'Languages, formats, locale management',
    title_fr: 'Internationalisation',
    description_fr: 'Langues, formats, gestion des locales',
    isRequired: false,
    isApplicable: (data: Partial<Questionnaire>) => {
      const type = data.identity?.projectType;
      return type === 'web' || type === 'mobile' || type === 'saas';
    },
    category: 'technical',
    minVerbosity: 'detailed',
  },
  {
    key: 'aiMl',
    index: 18,
    title: 'Data / AI / ML',
    description: 'AI use cases, data quality, model management',
    title_fr: 'Data / IA / ML',
    description_fr: 'Cas d\'usage IA, qualité des données, gestion des modèles',
    isRequired: false,
    isApplicable: (data: Partial<Questionnaire>) => data.identity?.projectType === 'ai',
    category: 'technical',
    minVerbosity: 'detailed',
  },
  {
    key: 'documentation',
    index: 19,
    title: 'Documentation & Progressive Disclosure',
    description: 'Existing docs, ADRs, when to read',
    title_fr: 'Documentation & progressive disclosure',
    description_fr: 'Docs existantes, ADR, quand les lire',
    isRequired: false,
    isApplicable: () => true,
    category: 'collaboration',
    minVerbosity: 'detailed',
  },
  {
    key: 'agentPrefs',
    index: 20,
    title: 'Agent Collaboration Preferences',
    description: 'Autonomy, format, detail level',
    title_fr: 'Préférences de collaboration agent',
    description_fr: 'Autonomie, format, niveau de détail',
    isRequired: false,
    isApplicable: () => true,
    category: 'collaboration',
    minVerbosity: 'standard',
  },
  {
    key: 'codePolicy',
    index: 21,
    title: 'Code Modification Policy',
    description: 'What the agent can/cannot do',
    title_fr: 'Politique de modification de code',
    description_fr: 'Ce que l\'agent peut/ne peut pas faire',
    isRequired: false,
    isApplicable: () => true,
    category: 'collaboration',
    minVerbosity: 'standard',
  },
  {
    key: 'dod',
    index: 22,
    title: 'Definition of Done',
    description: 'Completion criteria and deliverables',
    title_fr: 'Définition de terminé (DoD)',
    description_fr: 'Critères de complétion et livrables',
    isRequired: false,
    isApplicable: () => true,
    category: 'process',
    minVerbosity: 'standard',
  },
  {
    key: 'examples',
    index: 23,
    title: 'Examples (Good & Bad)',
    description: 'PR examples, patterns, anti-patterns',
    title_fr: 'Exemples (bons & mauvais)',
    description_fr: 'Exemples de PR, patterns, anti-patterns',
    isRequired: false,
    isApplicable: () => true,
    category: 'collaboration',
    minVerbosity: 'detailed',
  },
  {
    key: 'pitfalls',
    index: 24,
    title: 'Known Pitfalls',
    description: 'Bugs, counter-intuitive behaviors, traps',
    title_fr: 'Pièges connus',
    description_fr: 'Bugs, comportements contre-intuitifs, pièges',
    isRequired: false,
    isApplicable: () => true,
    category: 'collaboration',
    minVerbosity: 'detailed',
  },
  {
    key: 'governance',
    index: 25,
    title: 'Governance',
    description: 'Validators, communication, review SLA',
    title_fr: 'Gouvernance',
    description_fr: 'Validateurs, communication, SLA de review',
    isRequired: false,
    isApplicable: (data: Partial<Questionnaire>) => {
      const stage = data.identity?.currentStage;
      if (!stage) return true;
      return stage === 'production' || stage === 'scale';
    },
    category: 'process',
    minVerbosity: 'detailed',
  },
  {
    key: 'alwaysOnBlock',
    index: 26,
    title: 'Always-On Block (Short)',
    description: '5-8 ultra-short rules for the top of CLAUDE.md',
    title_fr: 'Bloc always-on (court)',
    description_fr: '5-8 règles ultra-courtes pour le haut du CLAUDE.md',
    isRequired: false,
    isApplicable: () => true,
    category: 'core',
    minVerbosity: 'minimal',
  },
  {
    key: 'finalValidation',
    index: 27,
    title: 'Final Validation',
    description: 'Quality checklist for the generated file',
    title_fr: 'Validation finale',
    description_fr: 'Checklist qualité pour le fichier généré',
    isRequired: false,
    isApplicable: () => true,
    category: 'core',
    minVerbosity: 'minimal',
  },
];

export const SECTION_COUNT = SECTIONS.length;

export function getApplicableSections(data: Partial<Questionnaire>): SectionMeta[] {
  const verbosity = data.identity?.outputVerbosity ?? 'standard';
  const verbosityLevel = VERBOSITY_ORDER[verbosity];

  return SECTIONS.filter((s) => {
    if (!s.isApplicable(data)) return false;
    return VERBOSITY_ORDER[s.minVerbosity] <= verbosityLevel;
  });
}
