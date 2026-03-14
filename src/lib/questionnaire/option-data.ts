import type { OptionItem } from '@/components/ui/option-card';

// ─── Step 0: Identity ───────────────────────────────────────────
export const OUTPUT_VERBOSITY_OPTIONS: OptionItem[] = [
  { value: 'minimal', label: 'Minimal (~60 lines)', label_fr: 'Minimal (~60 lignes)', description: 'Essential info only: stack, commands, and key rules. Best for small projects or experienced users.', description_fr: 'Infos essentielles uniquement : stack, commandes et règles clés. Idéal pour les petits projets ou utilisateurs expérimentés.', pros: ['Fast to fill', 'Optimal for LLMs', '~5 steps'], pros_fr: ['Rapide à remplir', 'Optimal pour les LLMs', '~5 étapes'], cons: ['Less context'], cons_fr: ['Moins de contexte'] },
  { value: 'standard', label: 'Standard (~150 lines)', label_fr: 'Standard (~150 lignes)', description: 'Covers business context, code standards, testing, and collaboration preferences. Recommended for most projects.', description_fr: 'Couvre le contexte business, les standards de code, les tests et les préférences de collaboration. Recommandé pour la plupart des projets.', pros: ['Good balance', 'Covers essentials', '~13 steps'], pros_fr: ['Bon équilibre', 'Couvre l\'essentiel', '~13 étapes'], cons: ['More questions'], cons_fr: ['Plus de questions'] },
  { value: 'detailed', label: 'Detailed (~300 lines)', label_fr: 'Détaillé (~300 lignes)', description: 'Everything: security, performance, CI/CD, observability, governance. For production apps with teams.', description_fr: 'Tout : sécurité, performance, CI/CD, observabilité, gouvernance. Pour les apps en production avec des équipes.', pros: ['Full coverage', 'All sections', '~28 steps'], pros_fr: ['Couverture complète', 'Toutes les sections', '~28 étapes'], cons: ['Long questionnaire', 'May overwhelm LLM'], cons_fr: ['Questionnaire long', 'Peut surcharger le LLM'] },
];

export const PROJECT_TYPE_OPTIONS: OptionItem[] = [
  { value: 'website', label: 'Website', label_fr: 'Site web', description: 'Static or content site (blog, landing page, portfolio). Mostly read-only content.', description_fr: 'Site statique ou de contenu (blog, landing page, portfolio). Contenu principalement en lecture seule.', pros: ['Simple', 'Fast to build', 'SEO-friendly'], pros_fr: ['Simple', 'Rapide à construire', 'SEO-friendly'], cons: ['Limited interactivity'], cons_fr: ['Interactivité limitée'] },
  { value: 'web', label: 'Web App', label_fr: 'Application web', description: 'Interactive app with user accounts, dashboards, forms. Users do things, not just read.', description_fr: 'App interactive avec comptes utilisateurs, tableaux de bord, formulaires. Les utilisateurs agissent, pas juste lire.', pros: ['Large ecosystem', 'Easy deployment'], pros_fr: ['Grand écosystème', 'Déploiement facile'], cons: ['Browser compat issues'], cons_fr: ['Problèmes de compatibilité navigateur'] },
  { value: 'mobile', label: 'Mobile', label_fr: 'Mobile', description: 'iOS/Android app (native or cross-platform like React Native, Flutter).', description_fr: 'App iOS/Android (native ou cross-platform comme React Native, Flutter).', pros: ['Native UX', 'Offline support'], pros_fr: ['UX native', 'Support hors-ligne'], cons: ['Platform-specific code'], cons_fr: ['Code spécifique à la plateforme'] },
  { value: 'api', label: 'API / Backend', label_fr: 'API / Backend', description: 'Server-side service that other apps consume. No user interface included.', description_fr: 'Service côté serveur consommé par d\'autres apps. Pas d\'interface utilisateur incluse.', pros: ['Clean separation', 'Reusable'], pros_fr: ['Séparation claire', 'Réutilisable'], cons: ['No frontend bundled'], cons_fr: ['Pas de frontend inclus'] },
  { value: 'saas', label: 'SaaS', label_fr: 'SaaS', description: 'Software as a Service: web app with subscriptions, billing, multi-tenancy.', description_fr: 'Software as a Service : app web avec abonnements, facturation, multi-tenancy.', pros: ['Recurring revenue model', 'Scalable'], pros_fr: ['Modèle de revenus récurrents', 'Scalable'], cons: ['Complex billing/auth'], cons_fr: ['Facturation/authentification complexe'] },
  { value: 'crm', label: 'CRM', label_fr: 'CRM', description: 'Customer Relationship Management: contacts, sales pipeline, email automation.', description_fr: 'Gestion de la relation client : contacts, pipeline commercial, automatisation email.', pros: ['Contact management', 'Sales pipeline', 'Automation'], pros_fr: ['Gestion des contacts', 'Pipeline de vente', 'Automatisation'], cons: ['Complex data model', 'Many integrations'], cons_fr: ['Modèle de données complexe', 'Nombreuses intégrations'] },
  { value: 'infra', label: 'Infrastructure', label_fr: 'Infrastructure', description: 'DevOps, IaC (Terraform, Pulumi), CI/CD pipelines, cloud configuration.', description_fr: 'DevOps, IaC (Terraform, Pulumi), pipelines CI/CD, configuration cloud.', pros: ['Automation', 'Reproducible'], pros_fr: ['Automatisation', 'Reproductible'], cons: ['Steep learning curve'], cons_fr: ['Courbe d\'apprentissage raide'] },
  { value: 'data', label: 'Data / Analytics', label_fr: 'Data / Analytique', description: 'Data pipelines, ETL, dashboards, reporting, data warehousing.', description_fr: 'Pipelines de données, ETL, tableaux de bord, reporting, entrepôt de données.', pros: ['Insight-driven', 'Scalable pipelines'], pros_fr: ['Basé sur les insights', 'Pipelines scalables'], cons: ['Data quality challenges'], cons_fr: ['Défis de qualité des données'] },
  { value: 'ai', label: 'AI / ML', label_fr: 'IA / ML', description: 'Machine learning, LLM integrations, model training, AI-powered features.', description_fr: 'Machine learning, intégrations LLM, entraînement de modèles, fonctionnalités alimentées par l\'IA.', pros: ['Cutting-edge', 'High value'], pros_fr: ['Technologie de pointe', 'Haute valeur ajoutée'], cons: ['Costly compute', 'Non-deterministic'], cons_fr: ['Calcul coûteux', 'Non-déterministe'] },
  { value: 'desktop', label: 'Desktop', label_fr: 'Bureau', description: 'Desktop application (Electron, Tauri, native). Runs on user\'s machine.', description_fr: 'Application de bureau (Electron, Tauri, natif). Tourne sur la machine de l\'utilisateur.', pros: ['Full OS access', 'Offline-first'], pros_fr: ['Accès complet à l\'OS', 'Hors-ligne natif'], cons: ['Distribution complexity'], cons_fr: ['Complexité de distribution'] },
];

export const PRIMARY_LANGUAGE_OPTIONS: OptionItem[] = [
  { value: 'TypeScript', label: 'TypeScript', pros: ['Type safety', 'Great DX', 'Large ecosystem'], pros_fr: ['Typage fort', 'Excellente DX', 'Grand écosystème'], cons: ['Build step required', 'Config complexity'], cons_fr: ['Étape de build requise', 'Complexité de config'] },
  { value: 'JavaScript', label: 'JavaScript', pros: ['Universal', 'No build needed', 'Huge community'], pros_fr: ['Universel', 'Pas de build', 'Énorme communauté'], cons: ['No types', 'Runtime errors'], cons_fr: ['Pas de types', 'Erreurs au runtime'] },
  { value: 'Python', label: 'Python', pros: ['Readable', 'AI/ML leader', 'Fast prototyping'], pros_fr: ['Lisible', 'Leader IA/ML', 'Prototypage rapide'], cons: ['Slow runtime', 'GIL limits'], cons_fr: ['Runtime lent', 'Limites du GIL'] },
  { value: 'Go', label: 'Go', pros: ['Fast compilation', 'Simple concurrency', 'Single binary'], pros_fr: ['Compilation rapide', 'Concurrence simple', 'Binaire unique'], cons: ['Verbose error handling', 'No generics (older)'], cons_fr: ['Gestion d\'erreurs verbeuse', 'Pas de génériques (ancien)'] },
  { value: 'Rust', label: 'Rust', pros: ['Memory safe', 'Blazing fast', 'No GC'], pros_fr: ['Mémoire sûre', 'Ultra rapide', 'Pas de GC'], cons: ['Steep learning curve', 'Slow compilation'], cons_fr: ['Courbe d\'apprentissage raide', 'Compilation lente'] },
  { value: 'Java', label: 'Java', pros: ['Enterprise proven', 'JVM ecosystem', 'Strong typing'], pros_fr: ['Éprouvé en entreprise', 'Écosystème JVM', 'Typage fort'], cons: ['Verbose', 'Heavy runtime'], cons_fr: ['Verbeux', 'Runtime lourd'] },
  { value: 'C#', label: 'C#', pros: ['.NET ecosystem', 'Great tooling', 'Cross-platform'], pros_fr: ['Écosystème .NET', 'Excellent outillage', 'Multi-plateforme'], cons: ['Microsoft-centric', 'Large runtime'], cons_fr: ['Centré Microsoft', 'Runtime volumineux'] },
  { value: 'PHP', label: 'PHP', pros: ['Easy hosting', 'Laravel/Symfony', 'Quick start'], pros_fr: ['Hébergement facile', 'Laravel/Symfony', 'Démarrage rapide'], cons: ['Inconsistent stdlib', 'Legacy stigma'], cons_fr: ['Stdlib incohérente', 'Stigmate legacy'] },
  { value: 'Ruby', label: 'Ruby', pros: ['Elegant syntax', 'Rails productivity', 'Convention > config'], pros_fr: ['Syntaxe élégante', 'Productivité Rails', 'Convention > config'], cons: ['Slow performance', 'Shrinking market'], cons_fr: ['Performance lente', 'Marché en déclin'] },
  { value: 'Swift', label: 'Swift', pros: ['Apple native', 'Safe by design', 'Modern syntax'], pros_fr: ['Natif Apple', 'Sûr par conception', 'Syntaxe moderne'], cons: ['Apple-only (mostly)', 'Breaking changes'], cons_fr: ['Apple uniquement (surtout)', 'Breaking changes'] },
  { value: 'Kotlin', label: 'Kotlin', pros: ['Android official', 'JVM compatible', 'Concise'], pros_fr: ['Officiel Android', 'Compatible JVM', 'Concis'], cons: ['Smaller community', 'Build times'], cons_fr: ['Communauté plus petite', 'Temps de build'] },
  { value: 'C/C++', label: 'C / C++', pros: ['Maximum performance', 'System-level access', 'Embedded/OS'], pros_fr: ['Performance maximale', 'Accès système', 'Embarqué/OS'], cons: ['Memory unsafe', 'Complex toolchain'], cons_fr: ['Mémoire non sûre', 'Toolchain complexe'] },
];

export const CURRENT_STAGE_OPTIONS: OptionItem[] = [
  { value: 'poc', label: 'POC', label_fr: 'POC', description: 'Proof of concept: testing an idea, code may be thrown away. Speed over quality.', description_fr: 'Preuve de concept : tester une idée, le code peut être jeté. Vitesse plutôt que qualité.', pros: ['Fast iteration', 'Low commitment'], pros_fr: ['Itération rapide', 'Faible engagement'], cons: ['Throwaway code'], cons_fr: ['Code jetable'] },
  { value: 'mvp', label: 'MVP', label_fr: 'MVP', description: 'Minimum Viable Product: first real version with core features. Good enough to ship.', description_fr: 'Produit Minimum Viable : première vraie version avec les fonctionnalités de base. Assez bon pour livrer.', pros: ['Validated concept', 'Quick to market'], pros_fr: ['Concept validé', 'Mise sur le marché rapide'], cons: ['Tech debt expected'], cons_fr: ['Dette technique attendue'] },
  { value: 'production', label: 'Production', label_fr: 'Production', description: 'Live with real users. Changes must be careful, tested, and reviewed.', description_fr: 'En ligne avec de vrais utilisateurs. Les changements doivent être prudents, testés et revus.', pros: ['Stable', 'Real users'], pros_fr: ['Stable', 'Utilisateurs réels'], cons: ['Change is risky'], cons_fr: ['Les changements sont risqués'] },
  { value: 'scale', label: 'Scale', label_fr: 'Scale', description: 'Growing fast: more users, more traffic, bigger team. Architecture and processes matter.', description_fr: 'Croissance rapide : plus d\'utilisateurs, plus de trafic, plus grande équipe. L\'architecture et les processus comptent.', pros: ['Proven product', 'Growing team'], pros_fr: ['Produit éprouvé', 'Équipe en croissance'], cons: ['Complexity grows fast'], cons_fr: ['La complexité croît vite'] },
];

// ─── Step 1: Business Context ───────────────────────────────────
export const TARGET_USERS_OPTIONS: OptionItem[] = [
  { value: 'developers', label: 'Developers', label_fr: 'Développeurs', pros: ['Tech-savvy', 'Self-serve'], pros_fr: ['Technophiles', 'Autonomes'], cons: ['High expectations'], cons_fr: ['Attentes élevées'] },
  { value: 'business-users', label: 'Business Users', label_fr: 'Utilisateurs métier', pros: ['Large market', 'Willing to pay'], pros_fr: ['Grand marché', 'Prêts à payer'], cons: ['Need simple UX'], cons_fr: ['Besoin d\'une UX simple'] },
  { value: 'consumers', label: 'Consumers (B2C)', label_fr: 'Consommateurs (B2C)', pros: ['Massive market'], pros_fr: ['Marché massif'], cons: ['High churn', 'Price-sensitive'], cons_fr: ['Fort taux d\'attrition', 'Sensibles au prix'] },
  { value: 'enterprise', label: 'Enterprise (B2B)', label_fr: 'Entreprise (B2B)', pros: ['High revenue', 'Long contracts'], pros_fr: ['Revenus élevés', 'Contrats longs'], cons: ['Slow sales cycle', 'SSO/compliance'], cons_fr: ['Cycle de vente long', 'SSO/conformité'] },
  { value: 'internal-team', label: 'Internal Team', label_fr: 'Équipe interne', pros: ['Known users', 'Direct feedback'], pros_fr: ['Utilisateurs connus', 'Retours directs'], cons: ['Low priority risk'], cons_fr: ['Risque de faible priorité'] },
];

export const SUCCESS_KPIS_OPTIONS: OptionItem[] = [
  { value: 'conversion', label: 'Conversion Rate', label_fr: 'Taux de conversion', pros: ['Direct revenue impact'], pros_fr: ['Impact direct sur le revenu'], cons: ['Hard to attribute'], cons_fr: ['Difficile à attribuer'] },
  { value: 'retention', label: 'User Retention', label_fr: 'Rétention utilisateur', pros: ['Long-term growth'], pros_fr: ['Croissance long terme'], cons: ['Slow to measure'], cons_fr: ['Lent à mesurer'] },
  { value: 'latency', label: 'Latency / Speed', label_fr: 'Latence / Vitesse', pros: ['Measurable', 'UX impact'], pros_fr: ['Mesurable', 'Impact UX'], cons: ['Diminishing returns'], cons_fr: ['Rendements décroissants'] },
  { value: 'revenue', label: 'Revenue / ARR', label_fr: 'Revenus / ARR', pros: ['Clear business metric'], pros_fr: ['Métrique business claire'], cons: ['Lagging indicator'], cons_fr: ['Indicateur retardé'] },
  { value: 'adoption', label: 'User Adoption', label_fr: 'Adoption utilisateur', pros: ['Growth indicator'], pros_fr: ['Indicateur de croissance'], cons: ['Vanity metric risk'], cons_fr: ['Risque de métrique vaniteuse'] },
  { value: 'error-rate', label: 'Error Rate', label_fr: 'Taux d\'erreur', pros: ['Quality signal'], pros_fr: ['Signal de qualité'], cons: ['Hard to set targets'], cons_fr: ['Difficile de fixer des cibles'] },
];

export const BUSINESS_CONSTRAINTS_OPTIONS: OptionItem[] = [
  { value: 'deadline', label: 'Hard Deadline', label_fr: 'Deadline ferme', pros: ['Forces focus'], pros_fr: ['Force la concentration'], cons: ['Cuts corners'], cons_fr: ['Pousse aux raccourcis'] },
  { value: 'budget', label: 'Limited Budget', label_fr: 'Budget limité', pros: ['Lean choices'], pros_fr: ['Choix économes'], cons: ['Less tooling'], cons_fr: ['Moins d\'outillage'] },
  { value: 'sla', label: 'SLA Requirements', label_fr: 'Exigences SLA', pros: ['Quality bar'], pros_fr: ['Barre de qualité'], cons: ['Slower delivery'], cons_fr: ['Livraison plus lente'] },
  { value: 'compliance', label: 'Compliance (GDPR, SOC2...)', label_fr: 'Conformité (RGPD, SOC2...)', pros: ['Trust & credibility'], pros_fr: ['Confiance et crédibilité'], cons: ['Added complexity'], cons_fr: ['Complexité supplémentaire'] },
  { value: 'team-size', label: 'Small Team', label_fr: 'Petite équipe', pros: ['Fast decisions'], pros_fr: ['Décisions rapides'], cons: ['Limited bandwidth'], cons_fr: ['Bande passante limitée'] },
];

// ─── Step 2: Technical Goals ────────────────────────────────────
export const PRIMARY_GOAL_OPTIONS: OptionItem[] = [
  { value: 'reliability', label: 'Reliability', label_fr: 'Fiabilité', description: 'The system must work correctly and consistently. Downtime is unacceptable.', description_fr: 'Le système doit fonctionner correctement et de manière cohérente. Les pannes sont inacceptables.', pros: ['User trust', 'Less firefighting'], pros_fr: ['Confiance utilisateur', 'Moins de gestion de crises'], cons: ['Slower to ship'], cons_fr: ['Plus lent à livrer'] },
  { value: 'speed', label: 'Speed / Performance', label_fr: 'Vitesse / Performance', description: 'Pages load fast, APIs respond quickly. Every millisecond counts.', description_fr: 'Les pages chargent vite, les API répondent rapidement. Chaque milliseconde compte.', pros: ['Better UX', 'SEO boost'], pros_fr: ['Meilleure UX', 'Boost SEO'], cons: ['Optimization cost'], cons_fr: ['Coût d\'optimisation'] },
  { value: 'scalability', label: 'Scalability', label_fr: 'Scalabilité', description: 'Must handle 10x or 100x growth without rewriting. Architecture for the future.', description_fr: 'Doit gérer une croissance 10x ou 100x sans réécriture. Architecture pour le futur.', pros: ['Handles growth'], pros_fr: ['Gère la croissance'], cons: ['Over-engineering risk'], cons_fr: ['Risque de sur-ingénierie'] },
  { value: 'developer-experience', label: 'Developer Experience', label_fr: 'Expérience développeur', description: 'Developers should love working on this codebase. Fast feedback loops, clear patterns.', description_fr: 'Les développeurs doivent aimer travailler sur ce codebase. Boucles de feedback rapides, patterns clairs.', pros: ['Faster iteration', 'Hiring'], pros_fr: ['Itération plus rapide', 'Recrutement'], cons: ['Tool overhead'], cons_fr: ['Surcharge d\'outillage'] },
  { value: 'security', label: 'Security First', label_fr: 'Sécurité d\'abord', description: 'Security is the top priority. Every change must be reviewed for vulnerabilities.', description_fr: 'La sécurité est la priorité absolue. Chaque changement doit être examiné pour les vulnérabilités.', pros: ['Trust', 'Compliance'], pros_fr: ['Confiance', 'Conformité'], cons: ['Slower development'], cons_fr: ['Développement plus lent'] },
  { value: 'time-to-market', label: 'Time to Market', label_fr: 'Délai de mise sur le marché', description: 'Ship as fast as possible. Perfect is the enemy of good. Iterate after launch.', description_fr: 'Livrer aussi vite que possible. Le parfait est l\'ennemi du bien. Itérer après le lancement.', pros: ['First-mover advantage'], pros_fr: ['Avantage du premier arrivé'], cons: ['Tech debt'], cons_fr: ['Dette technique'] },
];

export const PRIORITY_QUALITIES_OPTIONS: OptionItem[] = [
  { value: 'readability', label: 'Readability', label_fr: 'Lisibilité', pros: ['Easy onboarding', 'Less bugs'], pros_fr: ['Intégration facile', 'Moins de bugs'], cons: ['More verbose'], cons_fr: ['Plus verbeux'] },
  { value: 'testability', label: 'Testability', label_fr: 'Testabilité', pros: ['Confidence in changes'], pros_fr: ['Confiance dans les changements'], cons: ['More test code'], cons_fr: ['Plus de code de test'] },
  { value: 'security', label: 'Security', label_fr: 'Sécurité', pros: ['Compliance ready'], pros_fr: ['Prêt pour la conformité'], cons: ['Slower development'], cons_fr: ['Développement plus lent'] },
  { value: 'maintainability', label: 'Maintainability', label_fr: 'Maintenabilité', pros: ['Long-term savings'], pros_fr: ['Économies long terme'], cons: ['Upfront effort'], cons_fr: ['Effort initial'] },
  { value: 'performance', label: 'Performance', label_fr: 'Performance', pros: ['Better UX'], pros_fr: ['Meilleure UX'], cons: ['Complexity'], cons_fr: ['Complexité'] },
  { value: 'simplicity', label: 'Simplicity', label_fr: 'Simplicité', pros: ['Less bugs', 'Faster dev'], pros_fr: ['Moins de bugs', 'Dev plus rapide'], cons: ['May not scale'], cons_fr: ['Peut ne pas passer à l\'échelle'] },
];

export const RISK_TOLERANCE_OPTIONS: OptionItem[] = [
  { value: 'low', label: 'Low Risk', label_fr: 'Risque faible', description: 'The agent should be conservative: small changes, always test, never skip reviews.', description_fr: 'L\'agent doit être conservateur : petits changements, toujours tester, jamais sauter les revues.', pros: ['Safe', 'Predictable'], pros_fr: ['Sûr', 'Prévisible'], cons: ['Slower innovation'], cons_fr: ['Innovation plus lente'] },
  { value: 'medium', label: 'Medium Risk', label_fr: 'Risque modéré', description: 'The agent can make reasonable trade-offs between speed and safety.', description_fr: 'L\'agent peut faire des compromis raisonnables entre vitesse et sécurité.', pros: ['Balanced approach'], pros_fr: ['Approche équilibrée'], cons: ['Judgment calls needed'], cons_fr: ['Nécessite des arbitrages'] },
  { value: 'high', label: 'High Risk', label_fr: 'Risque élevé', description: 'Move fast, break things. The agent can take bold shortcuts when speed matters.', description_fr: 'Avancer vite, casser des trucs. L\'agent peut prendre des raccourcis audacieux quand la vitesse compte.', pros: ['Fast innovation'], pros_fr: ['Innovation rapide'], cons: ['More incidents'], cons_fr: ['Plus d\'incidents'] },
];

// ─── Step 3: Repo Map ───────────────────────────────────────────
export const REPO_TYPE_OPTIONS: OptionItem[] = [
  { value: 'single', label: 'Single Repo', label_fr: 'Repo unique', pros: ['Simple setup', 'Easy to navigate'], pros_fr: ['Configuration simple', 'Facile à naviguer'], cons: ['Scales poorly for large teams'], cons_fr: ['Passe mal à l\'échelle pour les grandes équipes'] },
  { value: 'monorepo', label: 'Monorepo', label_fr: 'Monorepo', pros: ['Shared code', 'Atomic changes'], pros_fr: ['Code partagé', 'Changements atomiques'], cons: ['Tooling complexity', 'Slow CI'], cons_fr: ['Complexité de l\'outillage', 'CI lente'] },
];

// ─── Step 4: Stack ──────────────────────────────────────────────
export const FRONTEND_FRAMEWORK_OPTIONS: OptionItem[] = [
  { value: 'nextjs', label: 'Next.js', label_fr: 'Next.js', pros: ['SSR + SSG', 'React ecosystem', 'Vercel support'], pros_fr: ['SSR + SSG', 'Écosystème React', 'Support Vercel'], cons: ['Complex for small projects'], cons_fr: ['Complexe pour les petits projets'] },
  { value: 'react-vite', label: 'React + Vite', label_fr: 'React + Vite', pros: ['Lightweight', 'Fast HMR'], pros_fr: ['Léger', 'HMR rapide'], cons: ['No SSR built-in'], cons_fr: ['Pas de SSR intégré'] },
  { value: 'vue', label: 'Vue 3', label_fr: 'Vue 3', pros: ['Gentle learning curve', 'Lightweight'], pros_fr: ['Courbe d\'apprentissage douce', 'Léger'], cons: ['Smaller ecosystem'], cons_fr: ['Écosystème plus petit'] },
  { value: 'nuxt', label: 'Nuxt', label_fr: 'Nuxt', pros: ['Vue SSR', 'Auto imports'], pros_fr: ['Vue SSR', 'Imports automatiques'], cons: ['Nuxt-specific patterns'], cons_fr: ['Patterns spécifiques à Nuxt'] },
  { value: 'svelte', label: 'SvelteKit', label_fr: 'SvelteKit', pros: ['Minimal bundle', 'Fast'], pros_fr: ['Bundle minimal', 'Rapide'], cons: ['Smaller community'], cons_fr: ['Communauté plus petite'] },
  { value: 'angular', label: 'Angular', label_fr: 'Angular', pros: ['Enterprise-ready', 'Full framework'], pros_fr: ['Prêt pour l\'entreprise', 'Framework complet'], cons: ['Verbose', 'Steep curve'], cons_fr: ['Verbeux', 'Courbe d\'apprentissage raide'] },
  { value: 'remix', label: 'Remix', label_fr: 'Remix', pros: ['Web standards', 'Nested routes'], pros_fr: ['Standards web', 'Routes imbriquées'], cons: ['Newer ecosystem'], cons_fr: ['Écosystème plus récent'] },
  { value: 'none', label: 'None / API only', label_fr: 'Aucun / API uniquement', pros: ['Simpler stack'], pros_fr: ['Stack plus simple'], cons: ['No frontend'], cons_fr: ['Pas de frontend'] },
];

export const BACKEND_FRAMEWORK_OPTIONS: OptionItem[] = [
  { value: 'nextjs-api', label: 'Next.js API Routes', label_fr: 'Next.js API Routes', pros: ['Same codebase as frontend', 'Edge support'], pros_fr: ['Même codebase que le frontend', 'Support Edge'], cons: ['Coupled to Vercel ecosystem'], cons_fr: ['Couplé à l\'écosystème Vercel'] },
  { value: 'express', label: 'Express.js', label_fr: 'Express.js', pros: ['Mature', 'Huge ecosystem'], pros_fr: ['Mature', 'Énorme écosystème'], cons: ['Minimal by default'], cons_fr: ['Minimal par défaut'] },
  { value: 'fastify', label: 'Fastify', label_fr: 'Fastify', pros: ['Fast', 'Schema validation'], pros_fr: ['Rapide', 'Validation par schéma'], cons: ['Smaller ecosystem'], cons_fr: ['Écosystème plus petit'] },
  { value: 'nestjs', label: 'NestJS', label_fr: 'NestJS', pros: ['Enterprise patterns', 'DI'], pros_fr: ['Patterns entreprise', 'Injection de dépendances'], cons: ['Verbose', 'Opinionated'], cons_fr: ['Verbeux', 'Opinioné'] },
  { value: 'hono', label: 'Hono', label_fr: 'Hono', pros: ['Ultra-light', 'Edge-native'], pros_fr: ['Ultra-léger', 'Natif Edge'], cons: ['Young ecosystem'], cons_fr: ['Écosystème jeune'] },
  { value: 'django', label: 'Django', label_fr: 'Django', pros: ['Batteries included', 'Admin panel'], pros_fr: ['Tout inclus', 'Panneau d\'administration'], cons: ['Python GIL'], cons_fr: ['Python GIL'] },
  { value: 'fastapi', label: 'FastAPI', label_fr: 'FastAPI', pros: ['Async Python', 'Auto docs'], pros_fr: ['Python asynchrone', 'Documentation automatique'], cons: ['Python ecosystem'], cons_fr: ['Écosystème Python'] },
  { value: 'rails', label: 'Ruby on Rails', label_fr: 'Ruby on Rails', pros: ['Convention over config', 'Productive'], pros_fr: ['Convention plutôt que configuration', 'Productif'], cons: ['Performance'], cons_fr: ['Performance'] },
  { value: 'spring', label: 'Spring Boot', label_fr: 'Spring Boot', pros: ['Enterprise-grade', 'JVM'], pros_fr: ['Grade entreprise', 'JVM'], cons: ['Complex config'], cons_fr: ['Configuration complexe'] },
  { value: 'go-stdlib', label: 'Go (stdlib)', label_fr: 'Go (stdlib)', pros: ['Fast', 'Simple'], pros_fr: ['Rapide', 'Simple'], cons: ['Verbose HTTP handling'], cons_fr: ['Gestion HTTP verbeuse'] },
  { value: 'none', label: 'None / Serverless', label_fr: 'Aucun / Serverless', pros: ['No server management'], pros_fr: ['Pas de gestion de serveur'], cons: ['Cold starts'], cons_fr: ['Démarrages à froid'] },
];

export const DATABASE_OPTIONS: OptionItem[] = [
  { value: 'postgresql', label: 'PostgreSQL', label_fr: 'PostgreSQL', pros: ['Robust', 'JSONB', 'Extensions'], pros_fr: ['Robuste', 'JSONB', 'Extensions'], cons: ['Config complexity'], cons_fr: ['Complexité de configuration'] },
  { value: 'mysql', label: 'MySQL', label_fr: 'MySQL', pros: ['Performant reads', 'Very widespread'], pros_fr: ['Lectures performantes', 'Très répandu'], cons: ['Fewer advanced features'], cons_fr: ['Moins de fonctionnalités avancées'] },
  { value: 'mongodb', label: 'MongoDB', label_fr: 'MongoDB', pros: ['Flexible schema', 'Easy start'], pros_fr: ['Schéma flexible', 'Démarrage facile'], cons: ['No joins', 'Consistency trade-offs'], cons_fr: ['Pas de jointures', 'Compromis de cohérence'] },
  { value: 'sqlite', label: 'SQLite', label_fr: 'SQLite', pros: ['Zero config', 'Embedded'], pros_fr: ['Zéro configuration', 'Embarqué'], cons: ['No concurrent writes'], cons_fr: ['Pas d\'écritures concurrentes'] },
  { value: 'supabase', label: 'Supabase (Postgres)', label_fr: 'Supabase (Postgres)', pros: ['Auth + DB + Realtime', 'Free tier'], pros_fr: ['Auth + DB + Temps réel', 'Offre gratuite'], cons: ['Vendor lock-in'], cons_fr: ['Dépendance fournisseur'] },
  { value: 'planetscale', label: 'PlanetScale', label_fr: 'PlanetScale', pros: ['Serverless MySQL', 'Branching'], pros_fr: ['MySQL serverless', 'Branching'], cons: ['No FK enforcement'], cons_fr: ['Pas de contraintes FK'] },
  { value: 'redis', label: 'Redis', label_fr: 'Redis', pros: ['Ultra fast', 'Pub/Sub'], pros_fr: ['Ultra rapide', 'Pub/Sub'], cons: ['In-memory cost'], cons_fr: ['Coût mémoire'] },
  { value: 'dynamodb', label: 'DynamoDB', label_fr: 'DynamoDB', pros: ['Serverless', 'Auto-scaling'], pros_fr: ['Serverless', 'Auto-scaling'], cons: ['Complex query model'], cons_fr: ['Modèle de requêtes complexe'] },
  { value: 'firestore', label: 'Firestore', label_fr: 'Firestore', pros: ['Real-time sync', 'Firebase ecosystem'], pros_fr: ['Synchronisation temps réel', 'Écosystème Firebase'], cons: ['Vendor lock-in', 'Query limitations'], cons_fr: ['Dépendance fournisseur', 'Limitations de requêtes'] },
];

export const ORM_OPTIONS: OptionItem[] = [
  { value: 'prisma', label: 'Prisma', label_fr: 'Prisma', pros: ['Type-safe', 'Great DX', 'Migrations'], pros_fr: ['Typage sûr', 'Excellente DX', 'Migrations'], cons: ['Cold start overhead'], cons_fr: ['Surcharge au démarrage à froid'] },
  { value: 'drizzle', label: 'Drizzle', label_fr: 'Drizzle', pros: ['Lightweight', 'SQL-like', 'Fast'], pros_fr: ['Léger', 'Proche du SQL', 'Rapide'], cons: ['Newer, less docs'], cons_fr: ['Plus récent, moins de docs'] },
  { value: 'typeorm', label: 'TypeORM', label_fr: 'TypeORM', pros: ['Decorators', 'Active Record'], pros_fr: ['Décorateurs', 'Active Record'], cons: ['Buggy migrations'], cons_fr: ['Migrations instables'] },
  { value: 'knex', label: 'Knex.js', label_fr: 'Knex.js', pros: ['Flexible query builder'], pros_fr: ['Query builder flexible'], cons: ['No type generation'], cons_fr: ['Pas de génération de types'] },
  { value: 'sequelize', label: 'Sequelize', label_fr: 'Sequelize', pros: ['Mature', 'Wide DB support'], pros_fr: ['Mature', 'Support large de DB'], cons: ['Verbose', 'TS support limited'], cons_fr: ['Verbeux', 'Support TS limité'] },
  { value: 'sqlalchemy', label: 'SQLAlchemy', label_fr: 'SQLAlchemy', pros: ['Python standard', 'Powerful'], pros_fr: ['Standard Python', 'Puissant'], cons: ['Complex API'], cons_fr: ['API complexe'] },
  { value: 'none', label: 'Raw SQL / None', label_fr: 'SQL brut / Aucun', pros: ['Full control', 'No overhead'], pros_fr: ['Contrôle total', 'Aucune surcharge'], cons: ['Manual migrations'], cons_fr: ['Migrations manuelles'] },
];

export const PACKAGE_MANAGER_OPTIONS: OptionItem[] = [
  { value: 'npm', label: 'npm', label_fr: 'npm', pros: ['Default Node.js', 'Universal'], pros_fr: ['Par défaut avec Node.js', 'Universel'], cons: ['Slower installs'], cons_fr: ['Installations plus lentes'] },
  { value: 'pnpm', label: 'pnpm', label_fr: 'pnpm', pros: ['Fast', 'Disk efficient', 'Strict'], pros_fr: ['Rapide', 'Efficace en espace disque', 'Strict'], cons: ['Symlink issues sometimes'], cons_fr: ['Problèmes de symlinks parfois'] },
  { value: 'yarn', label: 'Yarn', label_fr: 'Yarn', pros: ['Fast', 'Workspaces'], pros_fr: ['Rapide', 'Workspaces'], cons: ['v1/v2/v3 confusion'], cons_fr: ['Confusion v1/v2/v3'] },
  { value: 'bun', label: 'Bun', label_fr: 'Bun', pros: ['Ultra fast', 'All-in-one'], pros_fr: ['Ultra rapide', 'Tout-en-un'], cons: ['Young ecosystem'], cons_fr: ['Écosystème jeune'] },
  { value: 'pip', label: 'pip / Poetry', label_fr: 'pip / Poetry', pros: ['Python standard'], pros_fr: ['Standard Python'], cons: ['Dependency conflicts'], cons_fr: ['Conflits de dépendances'] },
  { value: 'cargo', label: 'Cargo', label_fr: 'Cargo', pros: ['Rust standard', 'Great DX'], pros_fr: ['Standard Rust', 'Excellente DX'], cons: ['Compile times'], cons_fr: ['Temps de compilation'] },
];

export const HOSTING_OPTIONS: OptionItem[] = [
  { value: 'vercel', label: 'Vercel', label_fr: 'Vercel', pros: ['Zero config', 'Edge functions'], pros_fr: ['Zéro configuration', 'Fonctions Edge'], cons: ['Vendor lock-in', 'Cost at scale'], cons_fr: ['Dépendance fournisseur', 'Coût à grande échelle'] },
  { value: 'aws', label: 'AWS', label_fr: 'AWS', pros: ['Full control', 'Every service'], pros_fr: ['Contrôle total', 'Tous les services'], cons: ['Complexity', 'Cost management'], cons_fr: ['Complexité', 'Gestion des coûts'] },
  { value: 'gcp', label: 'Google Cloud', label_fr: 'Google Cloud', pros: ['Great ML/AI tools', 'Kubernetes'], pros_fr: ['Excellents outils ML/IA', 'Kubernetes'], cons: ['Complex pricing'], cons_fr: ['Tarification complexe'] },
  { value: 'azure', label: 'Azure', label_fr: 'Azure', pros: ['Enterprise integrations'], pros_fr: ['Intégrations entreprise'], cons: ['Complex UX'], cons_fr: ['UX complexe'] },
  { value: 'railway', label: 'Railway', label_fr: 'Railway', pros: ['Simple PaaS', 'DB included'], pros_fr: ['PaaS simple', 'DB incluse'], cons: ['Limited scale'], cons_fr: ['Échelle limitée'] },
  { value: 'fly-io', label: 'Fly.io', label_fr: 'Fly.io', pros: ['Edge deploy', 'Docker-based'], pros_fr: ['Déploiement Edge', 'Basé sur Docker'], cons: ['Newer platform'], cons_fr: ['Plateforme plus récente'] },
  { value: 'cloudflare', label: 'Cloudflare Workers', label_fr: 'Cloudflare Workers', pros: ['Edge-first', 'Fast', 'Cheap'], pros_fr: ['Edge natif', 'Rapide', 'Économique'], cons: ['V8 isolates limitations'], cons_fr: ['Limitations des isolats V8'] },
  { value: 'self-hosted', label: 'Self-hosted', label_fr: 'Auto-hébergé', pros: ['Full control', 'No vendor lock-in'], pros_fr: ['Contrôle total', 'Pas de dépendance fournisseur'], cons: ['Ops overhead'], cons_fr: ['Surcharge opérationnelle'] },
];

export const AUTH_TOOLS_OPTIONS: OptionItem[] = [
  { value: 'nextauth', label: 'NextAuth / Auth.js', label_fr: 'NextAuth / Auth.js', pros: ['Free', 'Many providers'], pros_fr: ['Gratuit', 'Nombreux fournisseurs'], cons: ['Config complexity'], cons_fr: ['Complexité de configuration'] },
  { value: 'clerk', label: 'Clerk', label_fr: 'Clerk', pros: ['Great DX', 'Pre-built UI'], pros_fr: ['Excellente DX', 'UI pré-construite'], cons: ['Pricing at scale'], cons_fr: ['Tarification à grande échelle'] },
  { value: 'supabase-auth', label: 'Supabase Auth', label_fr: 'Supabase Auth', pros: ['Integrated with DB', 'Free tier'], pros_fr: ['Intégré à la DB', 'Offre gratuite'], cons: ['Vendor lock-in'], cons_fr: ['Dépendance fournisseur'] },
  { value: 'firebase-auth', label: 'Firebase Auth', label_fr: 'Firebase Auth', pros: ['Easy setup', 'Google ecosystem'], pros_fr: ['Configuration facile', 'Écosystème Google'], cons: ['Vendor lock-in'], cons_fr: ['Dépendance fournisseur'] },
  { value: 'auth0', label: 'Auth0', label_fr: 'Auth0', pros: ['Enterprise features', 'SSO'], pros_fr: ['Fonctionnalités entreprise', 'SSO'], cons: ['Expensive'], cons_fr: ['Coûteux'] },
  { value: 'passport', label: 'Passport.js', label_fr: 'Passport.js', pros: ['Flexible', 'Many strategies'], pros_fr: ['Flexible', 'Nombreuses stratégies'], cons: ['Manual setup'], cons_fr: ['Configuration manuelle'] },
  { value: 'custom', label: 'Custom (JWT)', label_fr: 'Personnalisé (JWT)', pros: ['Full control'], pros_fr: ['Contrôle total'], cons: ['Security responsibility'], cons_fr: ['Responsabilité de sécurité'] },
  { value: 'none', label: 'None', label_fr: 'Aucun', pros: ['Simpler stack'], pros_fr: ['Stack plus simple'], cons: ['No auth'], cons_fr: ['Pas d\'authentification'] },
];

// ─── Step 6: Environments ───────────────────────────────────────
export const ENV_VARS_SOURCE_OPTIONS: OptionItem[] = [
  { value: 'dotenv', label: '.env files', label_fr: 'Fichiers .env', pros: ['Simple', 'Local-friendly'], pros_fr: ['Simple', 'Adapté au local'], cons: ['Not for secrets in prod'], cons_fr: ['Pas pour les secrets en prod'] },
  { value: 'vault', label: 'HashiCorp Vault', label_fr: 'HashiCorp Vault', pros: ['Enterprise-grade secrets'], pros_fr: ['Secrets grade entreprise'], cons: ['Complex setup'], cons_fr: ['Configuration complexe'] },
  { value: 'aws-ssm', label: 'AWS SSM / Secrets Manager', label_fr: 'AWS SSM / Secrets Manager', pros: ['Integrated with AWS'], pros_fr: ['Intégré à AWS'], cons: ['Vendor lock-in'], cons_fr: ['Dépendance fournisseur'] },
  { value: 'vercel-env', label: 'Vercel Environment', label_fr: 'Environnement Vercel', pros: ['Simple', 'Auto-inject'], pros_fr: ['Simple', 'Injection automatique'], cons: ['Vercel-only'], cons_fr: ['Uniquement Vercel'] },
  { value: 'doppler', label: 'Doppler', label_fr: 'Doppler', pros: ['Great DX', 'Team sync'], pros_fr: ['Excellente DX', 'Synchronisation d\'équipe'], cons: ['Paid service'], cons_fr: ['Service payant'] },
  { value: 'infisical', label: 'Infisical', label_fr: 'Infisical', pros: ['Open-source', 'Self-hostable'], pros_fr: ['Open-source', 'Auto-hébergeable'], cons: ['Newer tool'], cons_fr: ['Outil plus récent'] },
];

export const SECRETS_POLICY_OPTIONS: OptionItem[] = [
  { value: 'env-only', label: 'Env variables only', label_fr: 'Variables d\'environnement uniquement', pros: ['Simple'], pros_fr: ['Simple'], cons: ['No rotation'], cons_fr: ['Pas de rotation'] },
  { value: 'vault', label: 'Secret manager (Vault/SSM)', label_fr: 'Gestionnaire de secrets (Vault/SSM)', pros: ['Rotation', 'Audit'], pros_fr: ['Rotation', 'Audit'], cons: ['Complexity'], cons_fr: ['Complexité'] },
  { value: 'encrypted-config', label: 'Encrypted config files', label_fr: 'Fichiers de config chiffrés', pros: ['Version controlled'], pros_fr: ['Versionné'], cons: ['Key management'], cons_fr: ['Gestion des clés'] },
  { value: 'ci-secrets', label: 'CI/CD secrets only', label_fr: 'Secrets CI/CD uniquement', pros: ['Not in code'], pros_fr: ['Pas dans le code'], cons: ['CI-dependent'], cons_fr: ['Dépendant de la CI'] },
];

// ─── Step 7: Code Standards ─────────────────────────────────────
export const NAMING_CONVENTIONS_OPTIONS: OptionItem[] = [
  { value: 'camelCase', label: 'camelCase', label_fr: 'camelCase', pros: ['JS/TS standard', 'Familiar'], pros_fr: ['Standard JS/TS', 'Familier'], cons: ['Less readable for long names'], cons_fr: ['Moins lisible pour les noms longs'] },
  { value: 'snake_case', label: 'snake_case', label_fr: 'snake_case', pros: ['Python standard', 'Readable'], pros_fr: ['Standard Python', 'Lisible'], cons: ['Unusual in JS/TS'], cons_fr: ['Inhabituel en JS/TS'] },
  { value: 'PascalCase-components', label: 'PascalCase (components)', label_fr: 'PascalCase (composants)', pros: ['React convention'], pros_fr: ['Convention React'], cons: ['Verbose'], cons_fr: ['Verbeux'] },
  { value: 'kebab-case-files', label: 'kebab-case (files)', label_fr: 'kebab-case (fichiers)', pros: ['URL-friendly', 'Consistent'], pros_fr: ['Compatible URL', 'Cohérent'], cons: ['Import mismatch'], cons_fr: ['Incohérence d\'imports'] },
  { value: 'mixed', label: 'Mixed (per context)', label_fr: 'Mixte (selon le contexte)', pros: ['Follow language norms'], pros_fr: ['Suit les normes du langage'], cons: ['Rules to remember'], cons_fr: ['Règles à retenir'] },
];

export const ARCHITECTURE_STYLE_OPTIONS: OptionItem[] = [
  { value: 'feature-based', label: 'Feature-based / Domain', label_fr: 'Par fonctionnalité / Domaine', description: 'Code organized by feature (users/, payments/, orders/). Each folder contains everything for that feature.', description_fr: 'Code organisé par fonctionnalité (users/, payments/, orders/). Chaque dossier contient tout pour cette fonctionnalité.', pros: ['Scalable', 'Encapsulated'], pros_fr: ['Scalable', 'Encapsulé'], cons: ['Shared code challenge'], cons_fr: ['Défi du code partagé'] },
  { value: 'layered', label: 'Layered (MVC/Clean)', label_fr: 'En couches (MVC/Clean)', description: 'Code organized by layer (controllers/, services/, models/). Traditional separation of concerns.', description_fr: 'Code organisé par couche (controllers/, services/, models/). Séparation des responsabilités traditionnelle.', pros: ['Clear separation'], pros_fr: ['Séparation claire'], cons: ['Boilerplate'], cons_fr: ['Boilerplate'] },
  { value: 'modular-monolith', label: 'Modular Monolith', label_fr: 'Monolithe modulaire', description: 'Single deployable app with clear internal module boundaries. Best of both worlds.', description_fr: 'App déployable unique avec des frontières de modules internes claires. Le meilleur des deux mondes.', pros: ['Simple deploy', 'Module boundaries'], pros_fr: ['Déploiement simple', 'Frontières de modules'], cons: ['Coupling risk'], cons_fr: ['Risque de couplage'] },
  { value: 'microservices', label: 'Microservices', label_fr: 'Microservices', description: 'Multiple independent services communicating via APIs. Each can be deployed and scaled separately.', description_fr: 'Plusieurs services indépendants communiquant via des API. Chacun peut être déployé et scalé séparément.', pros: ['Independent deploy', 'Scale per service'], pros_fr: ['Déploiement indépendant', 'Scaling par service'], cons: ['Complexity', 'Latency'], cons_fr: ['Complexité', 'Latence'] },
  { value: 'serverless', label: 'Serverless Functions', label_fr: 'Fonctions Serverless', description: 'Individual functions triggered by events. No server to manage, pay only for what you use.', description_fr: 'Fonctions individuelles déclenchées par des événements. Pas de serveur à gérer, payez uniquement ce que vous utilisez.', pros: ['Auto-scale', 'Pay-per-use'], pros_fr: ['Auto-scaling', 'Paiement à l\'usage'], cons: ['Cold starts', 'Debugging'], cons_fr: ['Démarrages à froid', 'Débogage'] },
  { value: 'hexagonal', label: 'Hexagonal / Ports & Adapters', label_fr: 'Hexagonale / Ports & Adaptateurs', description: 'Business logic at the center, isolated from frameworks and infrastructure via interfaces (ports).', description_fr: 'Logique métier au centre, isolée des frameworks et de l\'infra via des interfaces (ports).', pros: ['Testable', 'Framework-agnostic'], pros_fr: ['Testable', 'Indépendant du framework'], cons: ['Verbose'], cons_fr: ['Verbeux'] },
];

export const ERROR_HANDLING_OPTIONS: OptionItem[] = [
  { value: 'try-catch', label: 'Try/Catch + Custom Errors', label_fr: 'Try/Catch + Erreurs personnalisées', description: 'Classic approach: wrap risky code in try/catch, throw custom error classes.', description_fr: 'Approche classique : envelopper le code risqué dans try/catch, lancer des classes d\'erreur personnalisées.', pros: ['Standard', 'Flexible'], pros_fr: ['Standard', 'Flexible'], cons: ['Verbose'], cons_fr: ['Verbeux'] },
  { value: 'result-type', label: 'Result/Either type', label_fr: 'Type Result/Either', description: 'Functions return { ok, value } or { error } instead of throwing. Forces callers to handle errors.', description_fr: 'Les fonctions retournent { ok, value } ou { error } au lieu de throw. Force les appelants à gérer les erreurs.', pros: ['Type-safe', 'Explicit'], pros_fr: ['Typage sûr', 'Explicite'], cons: ['Learning curve'], cons_fr: ['Courbe d\'apprentissage'] },
  { value: 'error-boundary', label: 'Error Boundaries (React)', label_fr: 'Error Boundaries (React)', description: 'React component that catches errors in its child tree and shows a fallback UI.', description_fr: 'Composant React qui capture les erreurs dans ses enfants et affiche une UI de secours.', pros: ['Graceful UI recovery'], pros_fr: ['Récupération élégante de l\'UI'], cons: ['React-specific'], cons_fr: ['Spécifique à React'] },
  { value: 'middleware', label: 'Global middleware', label_fr: 'Middleware global', description: 'A single error handler catches all errors at the API/server level. No per-function try/catch.', description_fr: 'Un seul gestionnaire d\'erreurs capture toutes les erreurs au niveau API/serveur. Pas de try/catch par fonction.', pros: ['Centralized'], pros_fr: ['Centralisé'], cons: ['Less granular'], cons_fr: ['Moins granulaire'] },
  { value: 'neverthrow', label: 'neverthrow / ts-results', label_fr: 'neverthrow / ts-results', description: 'Library that adds Rust-like Result types to TypeScript. Errors become part of the return type.', description_fr: 'Bibliothèque qui ajoute des types Result façon Rust à TypeScript. Les erreurs deviennent partie du type de retour.', pros: ['Functional approach', 'Type-safe'], pros_fr: ['Approche fonctionnelle', 'Typage sûr'], cons: ['Extra dependency'], cons_fr: ['Dépendance supplémentaire'] },
];

export const API_CONVENTION_OPTIONS: OptionItem[] = [
  { value: 'rest', label: 'REST', label_fr: 'REST', description: 'Standard HTTP verbs (GET, POST, PUT, DELETE) on resource URLs. The most common API style.', description_fr: 'Verbes HTTP standard (GET, POST, PUT, DELETE) sur des URLs de ressources. Le style d\'API le plus courant.', pros: ['Universal', 'Cacheable', 'Simple'], pros_fr: ['Universel', 'Mise en cache possible', 'Simple'], cons: ['Over/under-fetching'], cons_fr: ['Sur/sous-récupération de données'] },
  { value: 'graphql', label: 'GraphQL', label_fr: 'GraphQL', description: 'Single endpoint, client asks for exactly the data it needs. Great for complex frontends.', description_fr: 'Endpoint unique, le client demande exactement les données dont il a besoin. Idéal pour les frontends complexes.', pros: ['Flexible queries', 'One endpoint'], pros_fr: ['Requêtes flexibles', 'Un seul endpoint'], cons: ['Complexity', 'Caching harder'], cons_fr: ['Complexité', 'Mise en cache plus difficile'] },
  { value: 'trpc', label: 'tRPC', label_fr: 'tRPC', description: 'TypeScript functions called directly from the frontend. No API schema needed, types are shared.', description_fr: 'Fonctions TypeScript appelées directement depuis le frontend. Pas de schéma API nécessaire, les types sont partagés.', pros: ['End-to-end type safety', 'Zero schema'], pros_fr: ['Typage de bout en bout', 'Zéro schéma'], cons: ['TS-only', 'Coupled'], cons_fr: ['TypeScript uniquement', 'Couplé'] },
  { value: 'grpc', label: 'gRPC', label_fr: 'gRPC', description: 'Binary protocol with protobuf schemas. Very fast, used for service-to-service communication.', description_fr: 'Protocole binaire avec des schémas protobuf. Très rapide, utilisé pour la communication entre services.', pros: ['Fast', 'Schema-first', 'Streaming'], pros_fr: ['Rapide', 'Schéma d\'abord', 'Streaming'], cons: ['Browser support'], cons_fr: ['Support navigateur'] },
  { value: 'rpc-custom', label: 'Custom RPC', label_fr: 'RPC personnalisé', description: 'Custom remote procedure calls — your own convention for request/response patterns.', description_fr: 'Appels de procédure distants personnalisés — votre propre convention pour les patterns requête/réponse.', pros: ['Tailored to needs'], pros_fr: ['Adapté aux besoins'], cons: ['No standard tooling'], cons_fr: ['Pas d\'outillage standard'] },
];

export const IMPORT_CONVENTION_OPTIONS: OptionItem[] = [
  { value: 'absolute-alias', label: 'Absolute with alias (@/)', label_fr: 'Absolu avec alias (@/)', pros: ['Clean imports', 'No ../..'], pros_fr: ['Imports propres', 'Pas de ../..'], cons: ['Config needed'], cons_fr: ['Configuration nécessaire'] },
  { value: 'relative', label: 'Relative paths', label_fr: 'Chemins relatifs', pros: ['No config needed'], pros_fr: ['Pas de configuration nécessaire'], cons: ['Long ../../.. chains'], cons_fr: ['Longues chaînes ../../..'] },
  { value: 'barrel-exports', label: 'Barrel exports (index.ts)', label_fr: 'Barrel exports (index.ts)', pros: ['Clean API'], pros_fr: ['API propre'], cons: ['Circular dep risk', 'Bundle bloat'], cons_fr: ['Risque de dépendances circulaires', 'Gonflement du bundle'] },
  { value: 'direct-imports', label: 'Direct file imports', label_fr: 'Imports directs de fichiers', pros: ['Tree-shakeable', 'Explicit'], pros_fr: ['Tree-shakeable', 'Explicite'], cons: ['Verbose'], cons_fr: ['Verbeux'] },
];

// ─── Step 9: Database ───────────────────────────────────────────
export const MIGRATION_POLICY_OPTIONS: OptionItem[] = [
  { value: 'orm-managed', label: 'ORM-managed migrations', label_fr: 'Migrations gérées par l\'ORM', pros: ['Auto-generated', 'Version tracked'], pros_fr: ['Auto-générées', 'Versionnées'], cons: ['Less control'], cons_fr: ['Moins de contrôle'] },
  { value: 'manual-sql', label: 'Manual SQL migrations', label_fr: 'Migrations SQL manuelles', pros: ['Full control', 'DB-native'], pros_fr: ['Contrôle total', 'Natif DB'], cons: ['Error-prone'], cons_fr: ['Sujet aux erreurs'] },
  { value: 'schema-push', label: 'Schema push (dev only)', label_fr: 'Schema push (dev uniquement)', pros: ['Fast iteration'], pros_fr: ['Itération rapide'], cons: ['Not for production'], cons_fr: ['Pas pour la production'] },
  { value: 'liquibase', label: 'Liquibase / Flyway', label_fr: 'Liquibase / Flyway', pros: ['Enterprise-grade', 'Multi-DB'], pros_fr: ['Grade entreprise', 'Multi-DB'], cons: ['Java dependency'], cons_fr: ['Dépendance Java'] },
];

export const SEED_POLICY_OPTIONS: OptionItem[] = [
  { value: 'fixtures', label: 'Fixture files', label_fr: 'Fichiers de fixtures', pros: ['Reproducible', 'Version tracked'], pros_fr: ['Reproductible', 'Versionné'], cons: ['Maintenance burden'], cons_fr: ['Charge de maintenance'] },
  { value: 'faker', label: 'Faker / factory scripts', label_fr: 'Scripts Faker / factory', pros: ['Realistic data', 'Scalable'], pros_fr: ['Données réalistes', 'Scalable'], cons: ['Non-deterministic'], cons_fr: ['Non-déterministe'] },
  { value: 'dump-restore', label: 'DB dump / restore', label_fr: 'Dump / restauration DB', pros: ['Exact copy'], pros_fr: ['Copie exacte'], cons: ['Large files', 'PII risk'], cons_fr: ['Fichiers volumineux', 'Risque PII'] },
  { value: 'manual', label: 'Manual seeding', label_fr: 'Seeding manuel', pros: ['Full control'], pros_fr: ['Contrôle total'], cons: ['Not reproducible'], cons_fr: ['Non reproductible'] },
];

// ─── Step 10: API ───────────────────────────────────────────────
export const API_VERSIONING_OPTIONS: OptionItem[] = [
  { value: 'url-path', label: 'URL path (/v1/...)', label_fr: 'Chemin URL (/v1/...)', pros: ['Simple', 'Visible'], pros_fr: ['Simple', 'Visible'], cons: ['URL pollution'], cons_fr: ['Pollution d\'URL'] },
  { value: 'header', label: 'Header-based', label_fr: 'Basé sur les headers', pros: ['Clean URLs'], pros_fr: ['URLs propres'], cons: ['Less discoverable'], cons_fr: ['Moins découvrable'] },
  { value: 'query-param', label: 'Query parameter', label_fr: 'Paramètre de requête', pros: ['Easy to switch'], pros_fr: ['Facile à changer'], cons: ['Unusual pattern'], cons_fr: ['Pattern inhabituel'] },
  { value: 'none', label: 'No versioning', label_fr: 'Pas de versioning', pros: ['Simplicity'], pros_fr: ['Simplicité'], cons: ['Breaking changes risk'], cons_fr: ['Risque de breaking changes'] },
];

export const ERROR_FORMAT_OPTIONS: OptionItem[] = [
  { value: 'rfc7807', label: 'RFC 7807 (Problem Details)', label_fr: 'RFC 7807 (Problem Details)', pros: ['Standard', 'Machine-readable'], pros_fr: ['Standard', 'Lisible par les machines'], cons: ['Learning curve'], cons_fr: ['Courbe d\'apprentissage'] },
  { value: 'custom-json', label: 'Custom JSON format', label_fr: 'Format JSON personnalisé', pros: ['Tailored to needs'], pros_fr: ['Adapté aux besoins'], cons: ['Non-standard'], cons_fr: ['Non-standard'] },
  { value: 'http-status-only', label: 'HTTP status codes only', label_fr: 'Codes HTTP uniquement', pros: ['Simple'], pros_fr: ['Simple'], cons: ['No detail'], cons_fr: ['Pas de détail'] },
  { value: 'graphql-errors', label: 'GraphQL errors format', label_fr: 'Format d\'erreurs GraphQL', pros: ['Standard for GraphQL'], pros_fr: ['Standard pour GraphQL'], cons: ['GraphQL-specific'], cons_fr: ['Spécifique à GraphQL'] },
];

export const INPUT_VALIDATION_OPTIONS: OptionItem[] = [
  { value: 'zod', label: 'Zod', label_fr: 'Zod', pros: ['TypeScript-first', 'Great inference'], pros_fr: ['TypeScript natif', 'Excellente inférence'], cons: ['Runtime overhead'], cons_fr: ['Surcharge à l\'exécution'] },
  { value: 'joi', label: 'Joi', label_fr: 'Joi', pros: ['Mature', 'Expressive'], pros_fr: ['Mature', 'Expressif'], cons: ['No TS inference'], cons_fr: ['Pas d\'inférence TS'] },
  { value: 'yup', label: 'Yup', label_fr: 'Yup', pros: ['Popular', 'Form integration'], pros_fr: ['Populaire', 'Intégration formulaires'], cons: ['Slower than Zod'], cons_fr: ['Plus lent que Zod'] },
  { value: 'ajv', label: 'AJV (JSON Schema)', label_fr: 'AJV (JSON Schema)', pros: ['Standard', 'Fast'], pros_fr: ['Standard', 'Rapide'], cons: ['Verbose schemas'], cons_fr: ['Schémas verbeux'] },
  { value: 'class-validator', label: 'class-validator', label_fr: 'class-validator', pros: ['Decorator-based', 'NestJS'], pros_fr: ['Basé sur les décorateurs', 'NestJS'], cons: ['Class-based'], cons_fr: ['Basé sur les classes'] },
  { value: 'custom', label: 'Custom validation', label_fr: 'Validation personnalisée', pros: ['Full control'], pros_fr: ['Contrôle total'], cons: ['Maintenance'], cons_fr: ['Maintenance'] },
];

// ─── Step 11: Security ──────────────────────────────────────────
export const SECURITY_PRIORITIES_OPTIONS: OptionItem[] = [
  { value: 'owasp-top10', label: 'OWASP Top 10', label_fr: 'OWASP Top 10', pros: ['Industry standard'], pros_fr: ['Standard de l\'industrie'], cons: ['Broad coverage'], cons_fr: ['Couverture large'] },
  { value: 'auth-authz', label: 'Auth & Authorization', label_fr: 'Authentification et autorisation', pros: ['Core security'], pros_fr: ['Sécurité fondamentale'], cons: ['Complex to get right'], cons_fr: ['Complexe à bien implémenter'] },
  { value: 'data-encryption', label: 'Data Encryption', label_fr: 'Chiffrement des données', pros: ['Data protection'], pros_fr: ['Protection des données'], cons: ['Performance cost'], cons_fr: ['Coût en performance'] },
  { value: 'input-sanitization', label: 'Input Sanitization', label_fr: 'Assainissement des entrées', pros: ['XSS/SQL injection prevention'], pros_fr: ['Prévention XSS/injection SQL'], cons: ['Ongoing effort'], cons_fr: ['Effort continu'] },
  { value: 'dependency-audit', label: 'Dependency Auditing', label_fr: 'Audit des dépendances', pros: ['Supply chain safety'], pros_fr: ['Sécurité de la chaîne d\'approvisionnement'], cons: ['Frequent updates'], cons_fr: ['Mises à jour fréquentes'] },
  { value: 'api-security', label: 'API Security (rate limit, CORS)', label_fr: 'Sécurité API (rate limit, CORS)', pros: ['Abuse prevention'], pros_fr: ['Prévention des abus'], cons: ['Config overhead'], cons_fr: ['Surcharge de configuration'] },
];

// ─── Step 12: Performance ───────────────────────────────────────
export const CACHE_STRATEGY_OPTIONS: OptionItem[] = [
  { value: 'cdn-edge', label: 'CDN / Edge caching', label_fr: 'Cache CDN / Edge', pros: ['Global speed', 'Auto-scale'], pros_fr: ['Vitesse mondiale', 'Auto-scaling'], cons: ['Cache invalidation'], cons_fr: ['Invalidation du cache'] },
  { value: 'redis', label: 'Redis / In-memory cache', label_fr: 'Redis / Cache en mémoire', pros: ['Ultra fast', 'Flexible'], pros_fr: ['Ultra rapide', 'Flexible'], cons: ['Memory cost'], cons_fr: ['Coût mémoire'] },
  { value: 'browser-cache', label: 'Browser / HTTP cache', label_fr: 'Cache navigateur / HTTP', pros: ['Free', 'Standard'], pros_fr: ['Gratuit', 'Standard'], cons: ['User-side only'], cons_fr: ['Côté utilisateur uniquement'] },
  { value: 'isr', label: 'ISR (Next.js)', label_fr: 'ISR (Next.js)', pros: ['Static + fresh data'], pros_fr: ['Statique + données fraîches'], cons: ['Next.js-specific'], cons_fr: ['Spécifique à Next.js'] },
  { value: 'application-cache', label: 'Application-level cache', label_fr: 'Cache applicatif', pros: ['Custom logic'], pros_fr: ['Logique personnalisée'], cons: ['Invalidation complexity'], cons_fr: ['Complexité d\'invalidation'] },
  { value: 'none', label: 'No caching strategy', label_fr: 'Pas de stratégie de cache', pros: ['Simplicity'], pros_fr: ['Simplicité'], cons: ['Slower'], cons_fr: ['Plus lent'] },
];

export const RETRY_STRATEGY_OPTIONS: OptionItem[] = [
  { value: 'exponential-backoff', label: 'Exponential Backoff', label_fr: 'Backoff exponentiel', pros: ['Standard', 'Reduces load'], pros_fr: ['Standard', 'Réduit la charge'], cons: ['Slow recovery'], cons_fr: ['Récupération lente'] },
  { value: 'circuit-breaker', label: 'Circuit Breaker', label_fr: 'Circuit Breaker', pros: ['Prevents cascading failure'], pros_fr: ['Empêche les pannes en cascade'], cons: ['Complex to tune'], cons_fr: ['Complexe à paramétrer'] },
  { value: 'fixed-retry', label: 'Fixed Retry (3x)', label_fr: 'Retry fixe (3x)', pros: ['Simple'], pros_fr: ['Simple'], cons: ['Can overwhelm services'], cons_fr: ['Peut surcharger les services'] },
  { value: 'none', label: 'Fail fast (no retry)', label_fr: 'Échec rapide (pas de retry)', pros: ['Fast feedback'], pros_fr: ['Retour rapide'], cons: ['Fragile'], cons_fr: ['Fragile'] },
];

// ─── Step 13: Testing ───────────────────────────────────────────
export const TEST_STRATEGY_OPTIONS: OptionItem[] = [
  { value: 'pyramid', label: 'Testing Pyramid', label_fr: 'Pyramide de tests', pros: ['Many unit, few E2E', 'Fast feedback'], pros_fr: ['Beaucoup d\'unitaires, peu de E2E', 'Retour rapide'], cons: ['May miss integration bugs'], cons_fr: ['Peut manquer des bugs d\'intégration'] },
  { value: 'trophy', label: 'Testing Trophy', label_fr: 'Trophée de tests', pros: ['Integration-heavy', 'Real behavior'], pros_fr: ['Axé intégration', 'Comportement réel'], cons: ['Slower tests'], cons_fr: ['Tests plus lents'] },
  { value: 'diamond', label: 'Testing Diamond', label_fr: 'Diamant de tests', pros: ['Balanced', 'Integration focus'], pros_fr: ['Équilibré', 'Focus intégration'], cons: ['More setup'], cons_fr: ['Plus de mise en place'] },
  { value: 'e2e-first', label: 'E2E-first', label_fr: 'E2E en priorité', pros: ['User-facing confidence'], pros_fr: ['Confiance côté utilisateur'], cons: ['Slow', 'Flaky'], cons_fr: ['Lent', 'Instable'] },
  { value: 'minimal', label: 'Minimal (critical paths)', label_fr: 'Minimal (chemins critiques)', pros: ['Fast to write'], pros_fr: ['Rapide à écrire'], cons: ['Low coverage'], cons_fr: ['Faible couverture'] },
];

export const TEST_DISTRIBUTION_OPTIONS: OptionItem[] = [
  { value: '70-20-10', label: '70% Unit / 20% Integration / 10% E2E', label_fr: '70% Unitaire / 20% Intégration / 10% E2E', pros: ['Fast feedback loop'], pros_fr: ['Boucle de retour rapide'], cons: ['Less integration confidence'], cons_fr: ['Moins de confiance en intégration'] },
  { value: '40-40-20', label: '40% Unit / 40% Integration / 20% E2E', label_fr: '40% Unitaire / 40% Intégration / 20% E2E', pros: ['Balanced confidence'], pros_fr: ['Confiance équilibrée'], cons: ['Slower overall'], cons_fr: ['Plus lent globalement'] },
  { value: '20-60-20', label: '20% Unit / 60% Integration / 20% E2E', label_fr: '20% Unitaire / 60% Intégration / 20% E2E', pros: ['Behavior-driven'], pros_fr: ['Axé comportement'], cons: ['Slower unit feedback'], cons_fr: ['Retour unitaire plus lent'] },
  { value: 'custom', label: 'Custom distribution', label_fr: 'Distribution personnalisée', pros: ['Tailored to project'], pros_fr: ['Adaptée au projet'], cons: ['No standard reference'], cons_fr: ['Pas de référence standard'] },
];

export const COVERAGE_THRESHOLD_OPTIONS: OptionItem[] = [
  { value: '80', label: '80%+', label_fr: '80%+', pros: ['Good balance'], pros_fr: ['Bon équilibre'], cons: ['Some gaps'], cons_fr: ['Quelques lacunes'] },
  { value: '90', label: '90%+', label_fr: '90%+', pros: ['High confidence'], pros_fr: ['Haute confiance'], cons: ['Effort to maintain'], cons_fr: ['Effort de maintenance'] },
  { value: '60', label: '60%+', label_fr: '60%+', pros: ['Reasonable bar'], pros_fr: ['Barre raisonnable'], cons: ['More risk'], cons_fr: ['Plus de risque'] },
  { value: 'none', label: 'No threshold', label_fr: 'Pas de seuil', pros: ['No blocked PRs'], pros_fr: ['Pas de PRs bloquées'], cons: ['Coverage may drop'], cons_fr: ['La couverture peut baisser'] },
  { value: 'critical-only', label: 'Critical paths only', label_fr: 'Chemins critiques uniquement', pros: ['Focused effort'], pros_fr: ['Effort ciblé'], cons: ['Hard to define'], cons_fr: ['Difficile à définir'] },
];

export const TEST_TOOLS_OPTIONS: OptionItem[] = [
  { value: 'vitest', label: 'Vitest', label_fr: 'Vitest', pros: ['Fast', 'Vite-native', 'Jest-compatible'], pros_fr: ['Rapide', 'Natif Vite', 'Compatible Jest'], cons: ['Newer'], cons_fr: ['Plus récent'] },
  { value: 'jest', label: 'Jest', label_fr: 'Jest', pros: ['Mature', 'Huge ecosystem'], pros_fr: ['Mature', 'Énorme écosystème'], cons: ['Slower than Vitest'], cons_fr: ['Plus lent que Vitest'] },
  { value: 'playwright', label: 'Playwright', label_fr: 'Playwright', pros: ['Multi-browser E2E', 'Auto-wait'], pros_fr: ['E2E multi-navigateur', 'Attente automatique'], cons: ['Slow tests'], cons_fr: ['Tests lents'] },
  { value: 'cypress', label: 'Cypress', label_fr: 'Cypress', pros: ['Great DX', 'Time travel debug'], pros_fr: ['Excellente DX', 'Débogage voyage dans le temps'], cons: ['Chrome-focused'], cons_fr: ['Centré sur Chrome'] },
  { value: 'testing-library', label: 'Testing Library', label_fr: 'Testing Library', pros: ['User-centric tests'], pros_fr: ['Tests centrés utilisateur'], cons: ['Query complexity'], cons_fr: ['Complexité des requêtes'] },
  { value: 'pytest', label: 'pytest', label_fr: 'pytest', pros: ['Python standard', 'Fixtures'], pros_fr: ['Standard Python', 'Fixtures'], cons: ['Python only'], cons_fr: ['Python uniquement'] },
];

// ─── Step 14: CI/CD ─────────────────────────────────────────────
export const BRANCH_STRATEGY_OPTIONS: OptionItem[] = [
  { value: 'trunk-based', label: 'Trunk-based', label_fr: 'Trunk-based', pros: ['Fast integration', 'Simple'], pros_fr: ['Intégration rapide', 'Simple'], cons: ['Feature flags needed'], cons_fr: ['Feature flags nécessaires'] },
  { value: 'gitflow', label: 'GitFlow', label_fr: 'GitFlow', pros: ['Structured releases'], pros_fr: ['Releases structurées'], cons: ['Complex branching'], cons_fr: ['Branching complexe'] },
  { value: 'github-flow', label: 'GitHub Flow', label_fr: 'GitHub Flow', pros: ['Simple', 'PR-based'], pros_fr: ['Simple', 'Basé sur les PRs'], cons: ['No release branches'], cons_fr: ['Pas de branches de release'] },
  { value: 'feature-branches', label: 'Feature branches', label_fr: 'Branches par fonctionnalité', pros: ['Isolation'], pros_fr: ['Isolation'], cons: ['Long-lived branches risk'], cons_fr: ['Risque de branches longue durée'] },
];

export const RELEASE_STRATEGY_OPTIONS: OptionItem[] = [
  { value: 'continuous', label: 'Continuous Deployment', label_fr: 'Déploiement continu', pros: ['Fast delivery', 'Small changes'], pros_fr: ['Livraison rapide', 'Petits changements'], cons: ['Needs strong tests'], cons_fr: ['Nécessite des tests solides'] },
  { value: 'scheduled', label: 'Scheduled Releases', label_fr: 'Releases planifiées', pros: ['Predictable', 'QA window'], pros_fr: ['Prévisible', 'Fenêtre de QA'], cons: ['Slower delivery'], cons_fr: ['Livraison plus lente'] },
  { value: 'manual', label: 'Manual Release', label_fr: 'Release manuelle', pros: ['Full control'], pros_fr: ['Contrôle total'], cons: ['Bottleneck'], cons_fr: ['Goulot d\'étranglement'] },
  { value: 'semantic', label: 'Semantic Versioning', label_fr: 'Versionnement sémantique', pros: ['Clear versioning'], pros_fr: ['Versionnement clair'], cons: ['Release overhead'], cons_fr: ['Surcharge de release'] },
  { value: 'canary', label: 'Canary / Progressive', label_fr: 'Canary / Progressif', pros: ['Low risk rollout'], pros_fr: ['Déploiement à faible risque'], cons: ['Infrastructure needed'], cons_fr: ['Infrastructure nécessaire'] },
];

export const MERGE_CONDITIONS_OPTIONS: OptionItem[] = [
  { value: 'ci-pass', label: 'CI must pass', label_fr: 'La CI doit passer', pros: ['Quality gate'], pros_fr: ['Porte de qualité'], cons: ['Blocked by flaky tests'], cons_fr: ['Bloqué par les tests instables'] },
  { value: 'review-required', label: 'Review required', label_fr: 'Revue requise', pros: ['Knowledge sharing'], pros_fr: ['Partage de connaissances'], cons: ['Bottleneck'], cons_fr: ['Goulot d\'étranglement'] },
  { value: 'no-conflicts', label: 'No merge conflicts', label_fr: 'Pas de conflits de merge', pros: ['Clean merge'], pros_fr: ['Merge propre'], cons: ['Rebase overhead'], cons_fr: ['Surcharge de rebase'] },
  { value: 'coverage-check', label: 'Coverage threshold', label_fr: 'Seuil de couverture', pros: ['Quality bar'], pros_fr: ['Barre de qualité'], cons: ['False blocking'], cons_fr: ['Blocages erronés'] },
  { value: 'linear-history', label: 'Linear history (rebase)', label_fr: 'Historique linéaire (rebase)', pros: ['Clean git log'], pros_fr: ['Git log propre'], cons: ['Rebase conflicts'], cons_fr: ['Conflits de rebase'] },
];

// ─── Step 15: Observability ─────────────────────────────────────
export const LOGS_LOCATION_OPTIONS: OptionItem[] = [
  { value: 'datadog', label: 'Datadog', label_fr: 'Datadog', pros: ['Full observability suite'], pros_fr: ['Suite d\'observabilité complète'], cons: ['Expensive'], cons_fr: ['Coûteux'] },
  { value: 'grafana-loki', label: 'Grafana + Loki', label_fr: 'Grafana + Loki', pros: ['Open-source', 'Flexible'], pros_fr: ['Open-source', 'Flexible'], cons: ['Self-host overhead'], cons_fr: ['Surcharge d\'auto-hébergement'] },
  { value: 'cloudwatch', label: 'CloudWatch', label_fr: 'CloudWatch', pros: ['AWS native'], pros_fr: ['Natif AWS'], cons: ['AWS-only'], cons_fr: ['AWS uniquement'] },
  { value: 'sentry', label: 'Sentry', label_fr: 'Sentry', pros: ['Error tracking', 'Great DX'], pros_fr: ['Suivi d\'erreurs', 'Excellente DX'], cons: ['Not full logs'], cons_fr: ['Pas de logs complets'] },
  { value: 'vercel-logs', label: 'Vercel Logs', label_fr: 'Vercel Logs', pros: ['Zero config'], pros_fr: ['Zéro configuration'], cons: ['Limited retention'], cons_fr: ['Rétention limitée'] },
  { value: 'elk', label: 'ELK Stack', label_fr: 'Stack ELK', pros: ['Powerful search'], pros_fr: ['Recherche puissante'], cons: ['Resource heavy'], cons_fr: ['Gourmand en ressources'] },
  { value: 'console', label: 'Console / stdout', label_fr: 'Console / stdout', pros: ['Simple', 'Free'], pros_fr: ['Simple', 'Gratuit'], cons: ['Not searchable'], cons_fr: ['Non recherchable'] },
];

export const METRICS_LOCATION_OPTIONS: OptionItem[] = [
  { value: 'datadog', label: 'Datadog', label_fr: 'Datadog', pros: ['APM + metrics'], pros_fr: ['APM + métriques'], cons: ['Expensive'], cons_fr: ['Coûteux'] },
  { value: 'prometheus-grafana', label: 'Prometheus + Grafana', label_fr: 'Prometheus + Grafana', pros: ['Open-source standard'], pros_fr: ['Standard open-source'], cons: ['Self-host overhead'], cons_fr: ['Surcharge d\'auto-hébergement'] },
  { value: 'cloudwatch', label: 'CloudWatch Metrics', label_fr: 'CloudWatch Metrics', pros: ['AWS native'], pros_fr: ['Natif AWS'], cons: ['AWS-only'], cons_fr: ['AWS uniquement'] },
  { value: 'vercel-analytics', label: 'Vercel Analytics', label_fr: 'Vercel Analytics', pros: ['Web vitals', 'Simple'], pros_fr: ['Web vitals', 'Simple'], cons: ['Vercel-only'], cons_fr: ['Uniquement Vercel'] },
  { value: 'posthog', label: 'PostHog', label_fr: 'PostHog', pros: ['Open-source', 'Product analytics'], pros_fr: ['Open-source', 'Analytique produit'], cons: ['Self-host needed'], cons_fr: ['Auto-hébergement nécessaire'] },
  { value: 'none', label: 'None yet', label_fr: 'Aucun pour l\'instant', pros: ['No overhead'], pros_fr: ['Pas de surcharge'], cons: ['Flying blind'], cons_fr: ['Navigation à l\'aveugle'] },
];

// ─── Step 16: UX/UI ─────────────────────────────────────────────
export const DESIGN_SYSTEM_OPTIONS: OptionItem[] = [
  { value: 'custom', label: 'Custom Design System', label_fr: 'Design System personnalisé', pros: ['Unique brand', 'Full control'], pros_fr: ['Marque unique', 'Contrôle total'], cons: ['Build & maintain cost'], cons_fr: ['Coût de construction et maintenance'] },
  { value: 'material', label: 'Material Design', label_fr: 'Material Design', pros: ['Well-documented', 'Familiar'], pros_fr: ['Bien documenté', 'Familier'], cons: ['Google-looking'], cons_fr: ['Aspect Google'] },
  { value: 'apple-hig', label: 'Apple HIG', label_fr: 'Apple HIG', pros: ['Elegant', 'Premium feel'], pros_fr: ['Élégant', 'Sensation premium'], cons: ['iOS-biased'], cons_fr: ['Orienté iOS'] },
  { value: 'ant-design', label: 'Ant Design', label_fr: 'Ant Design', pros: ['Enterprise components'], pros_fr: ['Composants entreprise'], cons: ['Heavy bundle'], cons_fr: ['Bundle lourd'] },
  { value: 'none', label: 'No design system', label_fr: 'Pas de design system', pros: ['Faster start'], pros_fr: ['Démarrage plus rapide'], cons: ['Inconsistent UI'], cons_fr: ['UI incohérente'] },
];

export const UI_LIBRARY_OPTIONS: OptionItem[] = [
  { value: 'shadcn', label: 'shadcn/ui', label_fr: 'shadcn/ui', pros: ['Copy-paste', 'Customizable', 'Radix-based'], pros_fr: ['Copier-coller', 'Personnalisable', 'Basé sur Radix'], cons: ['Manual updates'], cons_fr: ['Mises à jour manuelles'] },
  { value: 'radix', label: 'Radix UI', label_fr: 'Radix UI', pros: ['Accessible', 'Headless'], pros_fr: ['Accessible', 'Headless'], cons: ['Needs styling'], cons_fr: ['Nécessite du style'] },
  { value: 'chakra', label: 'Chakra UI', label_fr: 'Chakra UI', pros: ['Good DX', 'Accessible'], pros_fr: ['Bonne DX', 'Accessible'], cons: ['Opinionated styles'], cons_fr: ['Styles opinionés'] },
  { value: 'mantine', label: 'Mantine', label_fr: 'Mantine', pros: ['Rich hooks', 'Many components'], pros_fr: ['Hooks riches', 'Nombreux composants'], cons: ['Large bundle'], cons_fr: ['Bundle volumineux'] },
  { value: 'mui', label: 'MUI (Material UI)', label_fr: 'MUI (Material UI)', pros: ['Complete', 'Enterprise-ready'], pros_fr: ['Complet', 'Prêt pour l\'entreprise'], cons: ['Heavy', 'Material look'], cons_fr: ['Lourd', 'Aspect Material'] },
  { value: 'tailwind-only', label: 'Tailwind only', label_fr: 'Tailwind uniquement', pros: ['Full control', 'Light'], pros_fr: ['Contrôle total', 'Léger'], cons: ['Build everything'], cons_fr: ['Tout construire soi-même'] },
  { value: 'headlessui', label: 'Headless UI', label_fr: 'Headless UI', pros: ['Tailwind-friendly', 'Accessible'], pros_fr: ['Compatible Tailwind', 'Accessible'], cons: ['Few components'], cons_fr: ['Peu de composants'] },
];

export const ACCESSIBILITY_LEVEL_OPTIONS: OptionItem[] = [
  { value: 'wcag-aa', label: 'WCAG 2.1 AA', label_fr: 'WCAG 2.1 AA', pros: ['Legal compliance', 'Good UX'], pros_fr: ['Conformité légale', 'Bonne UX'], cons: ['Extra effort'], cons_fr: ['Effort supplémentaire'] },
  { value: 'wcag-aaa', label: 'WCAG 2.1 AAA', label_fr: 'WCAG 2.1 AAA', pros: ['Maximum accessibility'], pros_fr: ['Accessibilité maximale'], cons: ['Significant effort'], cons_fr: ['Effort significatif'] },
  { value: 'basic', label: 'Basic (keyboard + labels)', label_fr: 'Basique (clavier + labels)', pros: ['Quick wins'], pros_fr: ['Gains rapides'], cons: ['Not fully compliant'], cons_fr: ['Pas entièrement conforme'] },
  { value: 'none', label: 'No specific target', label_fr: 'Pas d\'objectif spécifique', pros: ['Faster delivery'], pros_fr: ['Livraison plus rapide'], cons: ['Excludes users'], cons_fr: ['Exclut des utilisateurs'] },
];

// ─── Step 17: i18n ──────────────────────────────────────────────
export const I18N_STRATEGY_OPTIONS: OptionItem[] = [
  { value: 'next-intl', label: 'next-intl', label_fr: 'next-intl', pros: ['Next.js native', 'Type-safe'], pros_fr: ['Natif Next.js', 'Typage sûr'], cons: ['Next.js only'], cons_fr: ['Next.js uniquement'] },
  { value: 'react-i18next', label: 'react-i18next', label_fr: 'react-i18next', pros: ['Mature', 'Feature-rich'], pros_fr: ['Mature', 'Riche en fonctionnalités'], cons: ['Verbose config'], cons_fr: ['Configuration verbeuse'] },
  { value: 'formatjs', label: 'FormatJS / react-intl', label_fr: 'FormatJS / react-intl', pros: ['ICU standard'], pros_fr: ['Standard ICU'], cons: ['Complex syntax'], cons_fr: ['Syntaxe complexe'] },
  { value: 'paraglide', label: 'Paraglide', label_fr: 'Paraglide', pros: ['Compile-time', 'Type-safe'], pros_fr: ['Compilation', 'Typage sûr'], cons: ['New tool'], cons_fr: ['Outil récent'] },
  { value: 'none', label: 'No i18n needed', label_fr: 'Pas de i18n nécessaire', pros: ['Simpler code'], pros_fr: ['Code plus simple'], cons: ['Single language only'], cons_fr: ['Langue unique'] },
];

// ─── Step 18: AI/ML ─────────────────────────────────────────────
export const PROMPT_MANAGEMENT_OPTIONS: OptionItem[] = [
  { value: 'version-controlled', label: 'Version-controlled prompts', label_fr: 'Prompts versionnés', pros: ['Reproducible', 'Auditable'], pros_fr: ['Reproductible', 'Auditable'], cons: ['PR overhead'], cons_fr: ['Surcharge de PRs'] },
  { value: 'prompt-registry', label: 'Prompt registry / CMS', label_fr: 'Registre de prompts / CMS', pros: ['Non-dev editable'], pros_fr: ['Éditable par les non-devs'], cons: ['Extra service'], cons_fr: ['Service supplémentaire'] },
  { value: 'inline', label: 'Inline in code', label_fr: 'Inline dans le code', pros: ['Simple', 'No extra tool'], pros_fr: ['Simple', 'Pas d\'outil supplémentaire'], cons: ['Hard to iterate'], cons_fr: ['Difficile à itérer'] },
  { value: 'template-engine', label: 'Template engine', label_fr: 'Moteur de templates', pros: ['Dynamic', 'Reusable'], pros_fr: ['Dynamique', 'Réutilisable'], cons: ['Complexity'], cons_fr: ['Complexité'] },
];

export const SAFETY_GUARDRAILS_OPTIONS: OptionItem[] = [
  { value: 'content-filter', label: 'Content filtering', label_fr: 'Filtrage de contenu', pros: ['Blocks harmful output'], pros_fr: ['Bloque les sorties nuisibles'], cons: ['False positives'], cons_fr: ['Faux positifs'] },
  { value: 'rate-limiting', label: 'Rate limiting per user', label_fr: 'Rate limiting par utilisateur', pros: ['Cost control'], pros_fr: ['Contrôle des coûts'], cons: ['UX friction'], cons_fr: ['Friction UX'] },
  { value: 'output-validation', label: 'Output validation / schema', label_fr: 'Validation de sortie / schéma', pros: ['Predictable output'], pros_fr: ['Sortie prévisible'], cons: ['Rejects valid responses'], cons_fr: ['Rejette des réponses valides'] },
  { value: 'human-review', label: 'Human-in-the-loop review', label_fr: 'Revue humaine dans la boucle', pros: ['Quality assurance'], pros_fr: ['Assurance qualité'], cons: ['Doesn\'t scale'], cons_fr: ['Ne passe pas à l\'échelle'] },
  { value: 'monitoring', label: 'Real-time monitoring', label_fr: 'Surveillance en temps réel', pros: ['Catches issues fast'], pros_fr: ['Détecte les problèmes vite'], cons: ['Alert fatigue'], cons_fr: ['Fatigue d\'alertes'] },
];

// ─── Step 19: Documentation ─────────────────────────────────────
export const EXISTING_DOCS_OPTIONS: OptionItem[] = [
  { value: 'readme', label: 'README.md', label_fr: 'README.md', pros: ['Standard entry point'], pros_fr: ['Point d\'entrée standard'], cons: ['Often outdated'], cons_fr: ['Souvent obsolète'] },
  { value: 'adr', label: 'ADR (Architecture Decision Records)', label_fr: 'ADR (Architecture Decision Records)', pros: ['Decision history'], pros_fr: ['Historique des décisions'], cons: ['Maintenance overhead'], cons_fr: ['Surcharge de maintenance'] },
  { value: 'wiki', label: 'Wiki (GitHub/Confluence)', label_fr: 'Wiki (GitHub/Confluence)', pros: ['Searchable', 'Collaborative'], pros_fr: ['Recherchable', 'Collaboratif'], cons: ['Can get stale'], cons_fr: ['Peut devenir obsolète'] },
  { value: 'storybook', label: 'Storybook', label_fr: 'Storybook', pros: ['Living component docs'], pros_fr: ['Documentation vivante des composants'], cons: ['Build overhead'], cons_fr: ['Surcharge de build'] },
  { value: 'openapi', label: 'OpenAPI / Swagger', label_fr: 'OpenAPI / Swagger', pros: ['API contract', 'Auto-generated'], pros_fr: ['Contrat API', 'Auto-généré'], cons: ['Schema maintenance'], cons_fr: ['Maintenance du schéma'] },
  { value: 'agent-docs', label: 'agent_docs/*.md', label_fr: 'agent_docs/*.md', pros: ['AI-optimized docs'], pros_fr: ['Documentation optimisée pour l\'IA'], cons: ['New pattern'], cons_fr: ['Nouveau pattern'] },
  { value: 'none', label: 'No documentation yet', label_fr: 'Pas encore de documentation', pros: ['Fresh start'], pros_fr: ['Départ à zéro'], cons: ['Knowledge gaps'], cons_fr: ['Lacunes de connaissances'] },
];

// ─── Step 20: Agent Preferences ─────────────────────────────────
export const AUTONOMY_LEVEL_OPTIONS: OptionItem[] = [
  { value: 'low', label: 'Low Autonomy', label_fr: 'Autonomie faible', pros: ['Full control', 'No surprises'], pros_fr: ['Contrôle total', 'Pas de surprises'], cons: ['Constant input needed'], cons_fr: ['Intervention constante nécessaire'] },
  { value: 'medium', label: 'Medium Autonomy', label_fr: 'Autonomie modérée', pros: ['Balanced', 'Plan-then-do'], pros_fr: ['Équilibré', 'Planifier puis exécuter'], cons: ['Some judgment calls'], cons_fr: ['Quelques arbitrages nécessaires'] },
  { value: 'high', label: 'High Autonomy', label_fr: 'Autonomie élevée', pros: ['Fast execution', 'Minimal input'], pros_fr: ['Exécution rapide', 'Intervention minimale'], cons: ['May diverge from intent'], cons_fr: ['Peut diverger de l\'intention'] },
];

export const DETAIL_LEVEL_OPTIONS: OptionItem[] = [
  { value: 'minimal', label: 'Minimal', label_fr: 'Minimal', pros: ['Fast responses', 'No fluff'], pros_fr: ['Réponses rapides', 'Pas de superflu'], cons: ['May miss context'], cons_fr: ['Peut manquer de contexte'] },
  { value: 'moderate', label: 'Moderate', label_fr: 'Modéré', pros: ['Good balance'], pros_fr: ['Bon équilibre'], cons: ['N/A'], cons_fr: ['N/A'] },
  { value: 'detailed', label: 'Detailed', label_fr: 'Détaillé', pros: ['Full explanations'], pros_fr: ['Explications complètes'], cons: ['Verbose output'], cons_fr: ['Sortie verbeuse'] },
];

export const CHANGE_PREFERENCE_OPTIONS: OptionItem[] = [
  { value: 'minimal', label: 'Minimal Changes', label_fr: 'Changements minimaux', pros: ['Low risk', 'Easy to review'], pros_fr: ['Faible risque', 'Facile à relire'], cons: ['Doesn\'t fix root cause'], cons_fr: ['Ne corrige pas la cause profonde'] },
  { value: 'refactor', label: 'Deeper Refactoring', label_fr: 'Refactoring en profondeur', pros: ['Better long-term', 'Clean code'], pros_fr: ['Meilleur à long terme', 'Code propre'], cons: ['Larger PRs', 'More risk'], cons_fr: ['PRs plus grosses', 'Plus de risque'] },
];

export const SPEED_VS_ROBUSTNESS_OPTIONS: OptionItem[] = [
  { value: 'speed', label: 'Favor Speed', label_fr: 'Privilégier la vitesse', pros: ['Ship fast', 'Iterate quickly'], pros_fr: ['Livrer vite', 'Itérer rapidement'], cons: ['May need revisiting'], cons_fr: ['Peut nécessiter une reprise'] },
  { value: 'balanced', label: 'Balanced', label_fr: 'Équilibré', pros: ['Reasonable trade-off'], pros_fr: ['Compromis raisonnable'], cons: ['N/A'], cons_fr: ['N/A'] },
  { value: 'robustness', label: 'Favor Robustness', label_fr: 'Privilégier la robustesse', pros: ['Reliable', 'Production-ready'], pros_fr: ['Fiable', 'Prêt pour la production'], cons: ['Slower delivery'], cons_fr: ['Livraison plus lente'] },
];

export const PROTOTYPE_VS_PRODUCTION_OPTIONS: OptionItem[] = [
  { value: 'prototype', label: 'Prototype', label_fr: 'Prototype', pros: ['Fast', 'Exploratory'], pros_fr: ['Rapide', 'Exploratoire'], cons: ['Not production-ready'], cons_fr: ['Pas prêt pour la production'] },
  { value: 'balanced', label: 'Balanced', label_fr: 'Équilibré', pros: ['Reasonable quality'], pros_fr: ['Qualité raisonnable'], cons: ['N/A'], cons_fr: ['N/A'] },
  { value: 'production', label: 'Production-ready', label_fr: 'Prêt pour la production', pros: ['Solid', 'Complete'], pros_fr: ['Solide', 'Complet'], cons: ['Slower development'], cons_fr: ['Développement plus lent'] },
];

// ─── Step 22: Definition of Done ────────────────────────────────
export const DONE_WHEN_OPTIONS: OptionItem[] = [
  { value: 'tests-pass', label: 'All tests pass', label_fr: 'Tous les tests passent', pros: ['Objective criteria'], pros_fr: ['Critères objectifs'], cons: ['Tests may be insufficient'], cons_fr: ['Les tests peuvent être insuffisants'] },
  { value: 'review-approved', label: 'Code review approved', label_fr: 'Revue de code approuvée', pros: ['Peer validation'], pros_fr: ['Validation par les pairs'], cons: ['Bottleneck'], cons_fr: ['Goulot d\'étranglement'] },
  { value: 'deployed-staging', label: 'Deployed to staging', label_fr: 'Déployé en staging', pros: ['Real environment test'], pros_fr: ['Test en environnement réel'], cons: ['Deploy overhead'], cons_fr: ['Surcharge de déploiement'] },
  { value: 'acceptance-criteria', label: 'Acceptance criteria met', label_fr: 'Critères d\'acceptation remplis', pros: ['Business alignment'], pros_fr: ['Alignement business'], cons: ['Subjective'], cons_fr: ['Subjectif'] },
  { value: 'docs-updated', label: 'Documentation updated', label_fr: 'Documentation mise à jour', pros: ['Knowledge preserved'], pros_fr: ['Connaissances préservées'], cons: ['Extra effort'], cons_fr: ['Effort supplémentaire'] },
];

export const EXPECTED_DELIVERABLES_OPTIONS: OptionItem[] = [
  { value: 'code', label: 'Code', label_fr: 'Code', pros: ['Core deliverable'], pros_fr: ['Livrable principal'], cons: ['N/A'], cons_fr: ['N/A'] },
  { value: 'tests', label: 'Tests', label_fr: 'Tests', pros: ['Confidence'], pros_fr: ['Confiance'], cons: ['Time cost'], cons_fr: ['Coût en temps'] },
  { value: 'docs', label: 'Documentation', label_fr: 'Documentation', pros: ['Knowledge sharing'], pros_fr: ['Partage de connaissances'], cons: ['Maintenance'], cons_fr: ['Maintenance'] },
  { value: 'migrations', label: 'DB Migrations', label_fr: 'Migrations DB', pros: ['Schema changes tracked'], pros_fr: ['Changements de schéma suivis'], cons: ['Rollback needed'], cons_fr: ['Rollback nécessaire'] },
  { value: 'changelog', label: 'Changelog entry', label_fr: 'Entrée de changelog', pros: ['Release communication'], pros_fr: ['Communication de release'], cons: ['Manual effort'], cons_fr: ['Effort manuel'] },
];

// ─── Step 23: Examples ──────────────────────────────────────────
export const PATTERNS_TO_FOLLOW_OPTIONS: OptionItem[] = [
  { value: 'small-prs', label: 'Small, focused PRs', label_fr: 'PRs petites et ciblées', pros: ['Easy review', 'Fast merge'], pros_fr: ['Revue facile', 'Merge rapide'], cons: ['More PRs'], cons_fr: ['Plus de PRs'] },
  { value: 'conventional-commits', label: 'Conventional commits', label_fr: 'Commits conventionnels', pros: ['Auto-changelog', 'Standard'], pros_fr: ['Changelog automatique', 'Standard'], cons: ['Verbose messages'], cons_fr: ['Messages verbeux'] },
  { value: 'tdd', label: 'Test-driven development', label_fr: 'Développement piloté par les tests', pros: ['High coverage', 'Good design'], pros_fr: ['Haute couverture', 'Bonne conception'], cons: ['Slower initial dev'], cons_fr: ['Développement initial plus lent'] },
  { value: 'pair-programming', label: 'Pair programming', label_fr: 'Programmation en binôme', pros: ['Knowledge sharing'], pros_fr: ['Partage de connaissances'], cons: ['Time-intensive'], cons_fr: ['Chronophage'] },
  { value: 'code-review', label: 'Thorough code review', label_fr: 'Revue de code approfondie', pros: ['Quality gate'], pros_fr: ['Porte de qualité'], cons: ['Bottleneck'], cons_fr: ['Goulot d\'étranglement'] },
  { value: 'feature-flags', label: 'Feature flags', label_fr: 'Feature flags', pros: ['Safe rollout'], pros_fr: ['Déploiement sûr'], cons: ['Flag cleanup needed'], cons_fr: ['Nettoyage des flags nécessaire'] },
];

export const ANTI_PATTERNS_OPTIONS: OptionItem[] = [
  { value: 'god-objects', label: 'God objects / files', label_fr: 'Objets / fichiers dieu', pros: [], pros_fr: [], cons: ['Hard to maintain', 'Hard to test'], cons_fr: ['Difficile à maintenir', 'Difficile à tester'] },
  { value: 'premature-optimization', label: 'Premature optimization', label_fr: 'Optimisation prématurée', pros: [], pros_fr: [], cons: ['Complexity without proof'], cons_fr: ['Complexité sans preuve'] },
  { value: 'copy-paste', label: 'Copy-paste code', label_fr: 'Code copier-coller', pros: [], pros_fr: [], cons: ['Inconsistency', 'Bug duplication'], cons_fr: ['Incohérence', 'Duplication de bugs'] },
  { value: 'magic-numbers', label: 'Magic numbers / strings', label_fr: 'Nombres / chaînes magiques', pros: [], pros_fr: [], cons: ['Unclear intent'], cons_fr: ['Intention peu claire'] },
  { value: 'no-error-handling', label: 'Swallowing errors silently', label_fr: 'Avaler les erreurs silencieusement', pros: [], pros_fr: [], cons: ['Hidden bugs'], cons_fr: ['Bugs cachés'] },
  { value: 'over-abstraction', label: 'Over-abstraction', label_fr: 'Sur-abstraction', pros: [], pros_fr: [], cons: ['Hard to understand', 'Premature'], cons_fr: ['Difficile à comprendre', 'Prématuré'] },
];

// ─── Step 24: Pitfalls ──────────────────────────────────────────
export const CRITICAL_CHECKS_OPTIONS: OptionItem[] = [
  { value: 'env-vars', label: 'Check env vars before deploy', label_fr: 'Vérifier les variables d\'env avant déploiement', pros: ['Prevents runtime errors'], pros_fr: ['Prévient les erreurs d\'exécution'], cons: ['Manual step'], cons_fr: ['Étape manuelle'] },
  { value: 'db-backup', label: 'DB backup before migration', label_fr: 'Sauvegarde DB avant migration', pros: ['Safety net'], pros_fr: ['Filet de sécurité'], cons: ['Time overhead'], cons_fr: ['Surcharge de temps'] },
  { value: 'lock-file', label: 'Lock file consistency', label_fr: 'Cohérence du fichier lock', pros: ['Reproducible installs'], pros_fr: ['Installations reproductibles'], cons: ['Merge conflicts'], cons_fr: ['Conflits de merge'] },
  { value: 'type-check', label: 'Run typecheck before push', label_fr: 'Lancer le typecheck avant push', pros: ['Catches type errors early'], pros_fr: ['Détecte les erreurs de type tôt'], cons: ['Slower push'], cons_fr: ['Push plus lent'] },
  { value: 'secret-scan', label: 'Scan for leaked secrets', label_fr: 'Scanner les secrets divulgués', pros: ['Security'], pros_fr: ['Sécurité'], cons: ['False positives'], cons_fr: ['Faux positifs'] },
];

// ─── Step 25: Governance ────────────────────────────────────────
export const COMMUNICATION_CHANNELS_OPTIONS: OptionItem[] = [
  { value: 'slack', label: 'Slack', label_fr: 'Slack', pros: ['Real-time', 'Integrations'], pros_fr: ['Temps réel', 'Intégrations'], cons: ['Noisy'], cons_fr: ['Bruyant'] },
  { value: 'discord', label: 'Discord', label_fr: 'Discord', pros: ['Free', 'Voice channels'], pros_fr: ['Gratuit', 'Canaux vocaux'], cons: ['Less enterprise'], cons_fr: ['Moins entreprise'] },
  { value: 'github-discussions', label: 'GitHub Discussions', label_fr: 'GitHub Discussions', pros: ['Near the code'], pros_fr: ['Proche du code'], cons: ['Low discoverability'], cons_fr: ['Faible découvrabilité'] },
  { value: 'teams', label: 'Microsoft Teams', label_fr: 'Microsoft Teams', pros: ['Enterprise standard'], pros_fr: ['Standard entreprise'], cons: ['Heavy'], cons_fr: ['Lourd'] },
  { value: 'email', label: 'Email', label_fr: 'Email', pros: ['Universal', 'Async'], pros_fr: ['Universel', 'Asynchrone'], cons: ['Slow'], cons_fr: ['Lent'] },
  { value: 'linear', label: 'Linear / Jira', label_fr: 'Linear / Jira', pros: ['Issue tracking'], pros_fr: ['Suivi des tickets'], cons: ['Context switching'], cons_fr: ['Changement de contexte'] },
];

// ─── Step 20: Memory Provider ──────────────────────────────────
export const MEMORY_PROVIDER_OPTIONS: OptionItem[] = [
  { value: 'none', label: 'No persistent memory', label_fr: 'Pas de mémoire persistante', description: 'Standard Claude Code behavior. Context is lost after compaction.', description_fr: 'Comportement standard de Claude Code. Le contexte est perdu après compaction.', pros: ['No setup', 'No API cost'], pros_fr: ['Pas de configuration', 'Pas de coût API'], cons: ['Context lost after compaction'], cons_fr: ['Contexte perdu après compaction'] },
  { value: 'openai', label: 'OpenAI (GPT)', label_fr: 'OpenAI (GPT)', description: 'Uses GPT-4o-mini to summarize conversations before compaction. Fast and cheap.', description_fr: 'Utilise GPT-4o-mini pour résumer les conversations avant compaction. Rapide et économique.', pros: ['Fast', 'Cheap (~$0.01/compact)', 'Reliable'], pros_fr: ['Rapide', 'Économique (~0,01$/compact)', 'Fiable'], cons: ['Requires OpenAI API key'], cons_fr: ['Nécessite une clé API OpenAI'] },
  { value: 'anthropic', label: 'Anthropic (Claude)', label_fr: 'Anthropic (Claude)', description: 'Uses Claude Haiku to summarize conversations. Same ecosystem, great quality.', description_fr: 'Utilise Claude Haiku pour résumer les conversations. Même écosystème, excellente qualité.', pros: ['Same ecosystem', 'Great summaries', 'Fast'], pros_fr: ['Même écosystème', 'Excellents résumés', 'Rapide'], cons: ['Requires Anthropic API key'], cons_fr: ['Nécessite une clé API Anthropic'] },
];

// ─── Sub-agents Catalog ──────────────────────────────────────

export interface AgentCatalogItem {
  id: string;
  label: string;
  label_fr: string;
  description: string;
  description_fr: string;
  category: 'review' | 'testing' | 'architecture' | 'docs' | 'performance' | 'data' | 'devops';
  tools: string;
  model: 'haiku' | 'sonnet' | 'opus' | 'inherit';
  prompt: string;
}

export interface SkillCatalogItem {
  id: string;
  label: string;
  label_fr: string;
  description: string;
  description_fr: string;
  category: 'planning' | 'development' | 'quality' | 'data' | 'devops' | 'research' | 'performance';
  /** Example invocation shown in the UI */
  example: string;
  example_fr: string;
  /** The full prompt template for the skill file */
  prompt: string;
}

export const AGENT_CATALOG: AgentCatalogItem[] = [
  // ── Review & Quality ────────────────────────────────────
  // NOTE: code-reviewer removed — use built-in `code-review` plugin (`/code-review`)
  // NOTE: code-simplifier removed — use built-in `/simplify` skill
  {
    id: 'confidence-reviewer',
    label: 'Confidence Code Reviewer',
    label_fr: 'Réviseur avec score de confiance',
    description: 'Reviews code with confidence scoring (0-100) to filter out false positives. Only reports issues with confidence >= 80.',
    description_fr: 'Révise le code avec un score de confiance (0-100) pour filtrer les faux positifs. Ne rapporte que les problèmes avec confiance >= 80.',
    category: 'review',
    tools: 'Read, Grep, Glob, Bash',
    model: 'sonnet',
    prompt: `You are an expert code reviewer using confidence-based filtering to report only high-priority issues.

Review unstaged changes from git diff by default. The user may specify different scope.

Core responsibilities:
- Project guidelines compliance (CLAUDE.md conventions)
- Bug detection (logic errors, null handling, race conditions, security)
- Code quality (duplication, missing error handling, accessibility)

Confidence scoring (0-100):
- 0: Not confident. False positive.
- 25: Might be real, may be false positive.
- 50: Real issue but might be a nitpick.
- 75: Verified real issue hit in practice.
- 100: Absolutely certain confirmed issue.

Only report issues with confidence >= 80. Quality over quantity.

For each issue: description with confidence score, file:line, guideline reference, concrete fix.
Group by severity (Critical vs Important). If no high-confidence issues, confirm code meets standards.`,
  },
  // ── Testing ─────────────────────────────────────────────
  {
    id: 'test-writer',
    label: 'Test Writer',
    label_fr: 'Rédacteur de tests',
    description: 'Writes comprehensive tests: unit, integration, edge cases. Uses project testing framework and conventions.',
    description_fr: 'Écrit des tests complets : unitaires, intégration, cas limites. Utilise le framework de test et conventions du projet.',
    category: 'testing',
    tools: 'Read, Write, Edit, Grep, Glob, Bash',
    model: 'sonnet',
    prompt: `You are an expert test engineer who writes thorough, maintainable test suites.

When invoked:
1. Read source code to understand functionality
2. Identify testing framework (check package.json, pytest.ini, etc.)
3. Analyze existing test patterns for consistency
4. Write comprehensive tests

Coverage strategy:
- Happy path: normal expected behavior
- Edge cases: boundary values, empty inputs, null/undefined
- Error cases: invalid inputs, network failures, timeouts
- Integration points: API calls, database operations

Test quality rules:
- Each test tests ONE behavior
- Descriptive names: "should return empty array when no items match filter"
- Arrange-Act-Assert pattern
- Test behavior, not implementation
- Mock external deps, not internal logic
- Never use random data unless testing randomness

After writing tests, run them to verify they pass.`,
  },
  {
    id: 'pr-test-analyzer',
    label: 'PR Test Analyzer',
    label_fr: 'Analyseur de tests PR',
    description: 'Reviews PRs for test coverage quality. Identifies critical gaps and rates them by severity.',
    description_fr: 'Analyse les PR pour la qualité de couverture de tests. Identifie les lacunes critiques et les classe par sévérité.',
    category: 'testing',
    tools: 'Read, Grep, Glob, Bash',
    model: 'haiku',
    prompt: `You are an expert test coverage analyst for pull request review.

Focus on behavioral coverage, not line coverage. Identify:
- Untested error handling paths
- Missing edge case coverage
- Uncovered critical business logic
- Absent negative test cases
- Missing async behavior tests

Rate criticality 1-10:
- 9-10: Could cause data loss, security issues, system failures
- 7-8: Could cause user-facing errors
- 5-6: Edge cases causing confusion
- 3-4: Nice-to-have coverage

Output: Summary, Critical gaps (8-10), Important improvements (5-7), Test quality issues, Positive observations.`,
  },
  {
    id: 'silent-failure-hunter',
    label: 'Silent Failure Hunter',
    label_fr: 'Chasseur d\'erreurs silencieuses',
    description: 'Finds silent failures, swallowed errors, and inadequate error handling. Prevents bugs from hiding.',
    description_fr: 'Trouve les erreurs silencieuses, erreurs avalées et gestion d\'erreurs inadéquate. Empêche les bugs de se cacher.',
    category: 'testing',
    tools: 'Read, Grep, Glob, Bash',
    model: 'sonnet',
    prompt: `You are an elite error handling auditor. Find every place where errors are silently swallowed or masked.

Systematically identify: try-catch blocks, error callbacks, conditional error branches, fallback logic, logging patterns.

For each handler examine:
- Logging quality: sufficient context?
- User feedback: actionable information?
- Catch specificity: too broad?
- Fallback justification: explicitly justified?
- Error propagation: propagated when needed?

Check for: empty catch blocks, silent null returns, catch-and-continue without logging, swallowed promise rejections, generic messages hiding root causes.

Rules: Silent failures are NEVER acceptable. Users ALWAYS deserve feedback. Fallbacks MUST be explicit. Catch blocks MUST be specific.

Severity: CRITICAL (security/data loss), HIGH (missing logging, empty catches), MEDIUM (generic messages), LOW (missing context).`,
  },

  // ── Architecture ────────────────────────────────────────
  // NOTE: code-explorer removed — use built-in Explore sub-agent
  {
    id: 'code-architect',
    label: 'Code Architect',
    label_fr: 'Architecte de code',
    description: 'Designs feature architectures by analyzing existing patterns. Produces implementation blueprints that feel native to the codebase.',
    description_fr: 'Conçoit l\'architecture des features en analysant les patterns existants. Produit des plans d\'implémentation natifs au codebase.',
    category: 'architecture',
    tools: 'Read, Grep, Glob, Bash',
    model: 'sonnet',
    prompt: `You are a software architect who analyzes existing codebases to design feature architectures.

Step 1 - Pattern Analysis: Study file structure, identify architectural patterns, map DI/services, understand data flow and testing patterns.
Step 2 - Architecture Design: Make decisive choices (not alternatives), design components with clear responsibilities, define interfaces, plan data models, design consistent error handling.
Step 3 - Blueprint: Deliver identified patterns with file references, architectural decisions with rationale, component designs, complete file map (create/modify), data flow docs, phased build sequence.

Key principle: Commit to ONE well-reasoned solution tailored to existing patterns, not multiple alternatives.`,
  },

  // NOTE: security-auditor removed — use built-in `/security-review` command

  // ── Documentation ───────────────────────────────────────
  {
    id: 'doc-writer',
    label: 'Doc Writer',
    label_fr: 'Rédacteur de documentation',
    description: 'Generates technical docs: API docs, READMEs, architecture docs. Follows existing project conventions.',
    description_fr: 'Génère de la documentation technique : API, README, architecture. Suit les conventions existantes du projet.',
    category: 'docs',
    tools: 'Read, Grep, Glob, Write, Edit',
    model: 'sonnet',
    prompt: `You are a technical documentation specialist who writes clear, accurate, maintainable docs.

Types:
- API: endpoints, params, returns, errors, auth, rate limits, examples
- README: description, quick start, architecture overview, commands, contributing
- Architecture: system overview, component responsibilities, data flow, design decisions
- Inline: document WHY not WHAT, non-obvious behavior, assumptions, complex algorithms

Principles:
- Active voice, present tense
- Be specific: "Returns user ID as string" not "Returns the result"
- Realistic working code examples
- Structure for scanability: headings, bullets, tables
- Match existing terminology
- Never document obvious code

Process: Read code thoroughly, check existing doc patterns, write following conventions, verify all examples.`,
  },
  {
    id: 'comment-analyzer',
    label: 'Comment Analyzer',
    label_fr: 'Analyseur de commentaires',
    description: 'Audits code comments for accuracy, completeness, and maintainability. Finds outdated or misleading comments.',
    description_fr: 'Audite les commentaires du code pour l\'exactitude, complétude et maintenabilité. Trouve les commentaires obsolètes ou trompeurs.',
    category: 'docs',
    tools: 'Read, Grep, Glob',
    model: 'haiku',
    prompt: `You are a meticulous code comment analyzer focused on long-term maintainability.

1. Verify factual accuracy: cross-reference every claim against actual code
2. Assess completeness: sufficient context without redundancy
3. Evaluate long-term value: "why" > "what", flag restating obvious code
4. Identify misleading elements: ambiguous language, outdated references, invalid assumptions
5. Suggest improvements: specific actionable rewrites

Output: Critical issues (incorrect/misleading), Improvement opportunities, Recommended removals (no value), Positive findings.

You analyze and provide feedback only. Do not modify code or comments directly.`,
  },

  // ── Performance ─────────────────────────────────────────
  {
    id: 'performance-optimizer',
    label: 'Performance Optimizer',
    label_fr: 'Optimiseur de performance',
    description: 'Analyzes bottlenecks: N+1 queries, bundle size, memory leaks, slow renders. Provides data-driven fixes.',
    description_fr: 'Analyse les goulots d\'étranglement : requêtes N+1, taille du bundle, fuites mémoire, rendus lents. Fournit des corrections basées sur les données.',
    category: 'performance',
    tools: 'Read, Grep, Glob, Bash',
    model: 'sonnet',
    prompt: `You are a performance engineering specialist who identifies bottlenecks with data-driven recommendations.

Frontend: bundle size (tree-shaking, code splitting), render performance, asset optimization, Web Vitals (LCP, INP, CLS).
Backend: N+1 queries, missing indexes, caching strategy, connection pooling, async processing, API pagination.
Algorithms: time complexity of critical paths, O(n^2) on large datasets, appropriate data structures.

Process: Profile (identify actual bottleneck), Measure (baseline), Analyze (root cause), Recommend (specific changes + expected impact), Verify (how to measure).

For each finding: Impact (HIGH/MEDIUM/LOW), location, issue + why it's slow, recommended fix with code, expected improvement, trade-offs.

Prioritize simple changes with big wins over complex optimizations with marginal gains.`,
  },

  // NOTE: commit-writer removed — Claude Code handles commits natively
  // NOTE: pr-creator removed — Claude Code creates PRs natively via `gh`
  // NOTE: debugger removed — use built-in `/debug` skill

  // ── Data ────────────────────────────────────────────────
  {
    id: 'db-migration',
    label: 'DB Migration Specialist',
    label_fr: 'Spécialiste migrations DB',
    description: 'Creates safe, reversible database migrations. Checks for data loss, indexes, and production compatibility.',
    description_fr: 'Crée des migrations de base de données sûres et réversibles. Vérifie la perte de données, les indexes et la compatibilité production.',
    category: 'data',
    tools: 'Read, Edit, Write, Bash, Grep, Glob',
    model: 'sonnet',
    prompt: `You are a database migration specialist.

Create and review database migrations. Ensure schema changes are safe, reversible, and production-compatible.

When invoked:
1. Always create reversible migrations (up + down)
2. Never drop columns/tables without explicit approval
3. Add indexes for new foreign keys
4. Test migration on a copy before applying to production
5. Check for data loss risks in ALTER statements

Before applying, verify:
- Migration is reversible
- No data loss
- Indexes added for new FKs
- Tested on staging/copy
- Backward compatible with current code`,
  },
  {
    id: 'data-scientist',
    label: 'Data Scientist',
    label_fr: 'Data Scientist',
    description: 'Data analysis with SQL queries and BigQuery. Writes optimized queries, analyzes results, provides data-driven insights.',
    description_fr: 'Analyse de données avec requêtes SQL et BigQuery. Écrit des requêtes optimisées, analyse les résultats, fournit des insights.',
    category: 'data',
    tools: 'Bash, Read, Write',
    model: 'sonnet',
    prompt: `You are a data scientist specializing in SQL and BigQuery analysis.

When invoked:
1. Understand the analysis requirement
2. Write efficient SQL queries
3. Use BigQuery CLI (bq) when appropriate
4. Analyze and summarize results
5. Present findings clearly

Practices: optimized queries with filters, appropriate aggregations/joins, comments in complex logic, formatted results, data-driven recommendations.

For each analysis: explain approach, document assumptions, highlight key findings, suggest next steps.`,
  },

  // ── DevOps ──────────────────────────────────────────────
  {
    id: 'devops',
    label: 'DevOps Engineer',
    label_fr: 'Ingénieur DevOps',
    description: 'CI/CD and deployment specialist. Manages pipelines, Docker, infrastructure, and release processes.',
    description_fr: 'Spécialiste CI/CD et déploiement. Gère les pipelines, Docker, infrastructure et processus de release.',
    category: 'devops',
    tools: 'Read, Edit, Write, Bash, Grep, Glob',
    model: 'sonnet',
    prompt: `You are a CI/CD and deployment specialist.

Manage pipelines, deployments, and infrastructure changes.

When invoked:
1. Never deploy directly to production without staging validation
2. All pipeline changes require review
3. Keep deployment scripts idempotent
4. Maintain rollback capability for every release
5. Document all infrastructure changes`,
  },

  // ── Type Design ─────────────────────────────────────────
  {
    id: 'type-analyzer',
    label: 'Type Design Analyzer',
    label_fr: 'Analyseur de types',
    description: 'Analyzes type design for encapsulation, invariants, and correctness. Use when introducing or refactoring types.',
    description_fr: 'Analyse la conception des types pour l\'encapsulation, les invariants et la correction. À utiliser lors de l\'introduction ou du refactoring de types.',
    category: 'architecture',
    tools: 'Read, Grep, Glob',
    model: 'haiku',
    prompt: `You are a type design expert analyzing types for strong, clearly expressed invariants.

For each type, evaluate (rate 1-10):
1. Encapsulation: internal details hidden? invariants protected from outside?
2. Invariant Expression: clearly communicated through structure? compile-time enforcement?
3. Invariant Usefulness: prevents real bugs? aligned with business rules?
4. Invariant Enforcement: checked at construction? all mutation points guarded?

Flag anti-patterns: anemic domain models, exposed mutable internals, doc-only invariants, too many responsibilities, missing validation at boundaries, external invariant maintenance.

Output: Ratings, strengths, concerns, recommended improvements.`,
  },
];

// ─── Skill Catalog ─────────────────────────────────────────────
// Skills = slash commands (.claude/skills/*.md) that the user invokes manually.
// Unlike agents (autonomous sub-processes), skills run in the main session.
// We do NOT duplicate built-in skills: /simplify, /debug, /batch, /plan

export const SKILL_CATALOG: SkillCatalogItem[] = [
  // ── Planning & Strategy ───────────────────────────────────
  {
    id: 'plan-feature',
    label: 'Feature Planner',
    label_fr: 'Planificateur de feature',
    description: 'Write a detailed feature spec before coding: requirements, edge cases, data model, API surface, and step-by-step implementation plan. Prevents wasted work.',
    description_fr: 'Rédige une spec de feature détaillée avant de coder : exigences, cas limites, modèle de données, surface API et plan d\'implémentation étape par étape.',
    category: 'planning',
    example: '> /plan-feature "Add Stripe subscription billing with free trial"',
    example_fr: '> /plan-feature "Ajouter la facturation Stripe avec période d\'essai gratuite"',
    prompt: `# Feature Planner

You are a senior software architect. Before writing ANY code, produce a complete feature specification.

## Process

### Step 1 — Understand
- Read CLAUDE.md for project conventions
- Analyze existing codebase patterns (file structure, naming, architecture)
- Identify related existing features

### Step 2 — Specification
Write a structured spec covering:

**1. User Stories**
- Who uses this feature and why
- Acceptance criteria for each story

**2. Data Model**
- New models/tables needed
- Changes to existing models
- Relationships and constraints

**3. API Surface**
- New endpoints or functions
- Input/output schemas
- Auth requirements

**4. Edge Cases & Error States**
- What can go wrong?
- How should each failure be handled?
- What happens with empty/null/invalid data?

**5. Dependencies**
- New packages needed (justify each one)
- External services or APIs
- Environment variables

### Step 3 — Implementation Plan
Break the feature into ordered tasks (max 8):
- Each task is independently testable
- Each task is small enough for one commit
- Mark which tasks can be parallelized

### Step 4 — Review Checklist
- [ ] Fits existing architecture patterns
- [ ] No duplicate functionality
- [ ] All edge cases covered
- [ ] Migration plan for existing data (if applicable)
- [ ] Security implications considered

## Example Output

\`\`\`
## Feature: User Notifications

### User Stories
1. As a user, I want to receive in-app notifications so I don't miss updates
   - AC: Notification bell shows unread count
   - AC: Clicking opens dropdown with last 20 notifications
   - AC: Marking as read updates count in real-time

### Data Model
- notifications: id, user_id (FK), type (enum), title, body, read_at, created_at
- notification_preferences: user_id, channel (email|push|in_app), enabled

### API Surface
- GET /api/notifications?limit=20&offset=0 → { notifications[], total, unread }
- PATCH /api/notifications/:id/read → { success }
- PATCH /api/notifications/read-all → { updated: number }

### Implementation Plan
1. Create DB migration + model
2. Build notification service (create, mark-read, query)
3. Add API endpoints with auth
4. Build NotificationBell component
5. Add real-time updates via SSE/WebSocket
6. Write integration tests
\`\`\`

Save the spec to a file in the project before starting implementation.`,
  },
  {
    id: 'refactor-plan',
    label: 'Refactor Planner',
    label_fr: 'Planificateur de refactoring',
    description: 'Analyze code smell, create a safe refactoring plan with incremental steps. Each step keeps tests green. No big-bang rewrites.',
    description_fr: 'Analyse les code smells, crée un plan de refactoring sûr avec des étapes incrémentales. Chaque étape garde les tests au vert.',
    category: 'planning',
    example: '> /refactor-plan src/lib/auth — "This module has grown too complex, 800+ lines"',
    example_fr: '> /refactor-plan src/lib/auth — "Ce module est devenu trop complexe, 800+ lignes"',
    prompt: `# Refactor Planner

You are a refactoring specialist. Your job is to plan safe, incremental refactoring — never big-bang rewrites.

## Process

### Step 1 — Audit
- Read the target code thoroughly
- Identify code smells: long functions, deep nesting, God objects, duplicated logic, unclear names, mixed responsibilities
- Map dependencies (who calls this code? what does it call?)
- Check test coverage (are there tests protecting this code?)

### Step 2 — Diagnosis
For each issue found:
- **Smell**: What exactly is wrong
- **Risk**: What breaks if we change this (HIGH/MEDIUM/LOW)
- **Impact**: How much does this hurt daily development
- **Effort**: S/M/L to fix

### Step 3 — Refactoring Plan
Create ordered steps where EACH step:
1. Is a single, focused change (extract function, rename, split file, etc.)
2. Keeps all existing tests passing
3. Can be reviewed independently
4. Has a clear rollback (just revert the commit)

### Step 4 — Output

\`\`\`
## Refactoring Plan: src/lib/auth

### Current Issues
1. [HIGH IMPACT] AuthService is 847 lines — handles login, signup, OAuth, tokens, permissions
2. [MEDIUM] Token refresh logic duplicated in 3 places
3. [LOW] Inconsistent error handling (some throw, some return null)

### Execution Plan (6 steps, ~2h total)

Step 1: Extract TokenService (30min)
- Move token create/refresh/verify to src/lib/auth/token-service.ts
- Re-export from index to avoid breaking imports
- Run tests → must pass

Step 2: Extract OAuthService (30min)
- Move OAuth provider logic to src/lib/auth/oauth-service.ts
- Keep AuthService as thin orchestrator
- Run tests → must pass

Step 3: Deduplicate token refresh (15min)
- Replace 3 inline refresh calls with TokenService.refresh()
- Run tests → must pass
...
\`\`\`

## Rules
- NEVER suggest "rewrite from scratch"
- NEVER combine multiple refactoring types in one step
- ALWAYS verify tests exist before planning (if no tests, Step 1 is "add tests")
- Prefer mechanical refactorings (extract, rename, move) over behavioral changes`,
  },

  // ── Development Workflows ─────────────────────────────────
  {
    id: 'new-component',
    label: 'Component Builder',
    label_fr: 'Constructeur de composant',
    description: 'Create a new UI component following your design system and project patterns. Includes props, types, stories, and tests.',
    description_fr: 'Crée un nouveau composant UI en suivant votre design system et les patterns du projet. Inclut props, types, stories et tests.',
    category: 'development',
    example: '> /new-component "UserAvatar — displays user profile picture with fallback initials, sizes sm/md/lg"',
    example_fr: '> /new-component "UserAvatar — affiche la photo de profil avec initiales en fallback, tailles sm/md/lg"',
    prompt: `# Component Builder

Create a production-ready UI component following project conventions.

## Process

### Step 1 — Research
- Read existing components to learn patterns (file structure, naming, props style)
- Check design system / UI library in use (Tailwind, shadcn, MUI, etc.)
- Find similar existing components to stay consistent

### Step 2 — Design
- Define the component API (props interface)
- Identify variants, sizes, states (loading, error, disabled, empty)
- Plan composition: does it wrap other components?

### Step 3 — Build
Create the component with:
1. **TypeScript interface** for all props (documented with JSDoc if complex)
2. **Component implementation** following existing patterns
3. **Default props** where sensible
4. **Accessibility**: proper ARIA attributes, keyboard navigation, focus management
5. **Responsive**: works on mobile through desktop

### Step 4 — Test
- Unit test for each variant/state
- Test user interactions (click, keyboard, focus)
- Test edge cases (long text, missing data, loading state)

## Example

\`\`\`tsx
// Input: "StatusBadge — shows task status with color coding"

interface StatusBadgeProps {
  status: 'pending' | 'active' | 'completed' | 'failed';
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

export function StatusBadge({ status, size = 'md', showIcon = true }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]; // maps to color + icon + label
  return (
    <span className={cn(baseStyles, sizeStyles[size], config.color)} role="status">
      {showIcon && <config.Icon className="h-3 w-3" />}
      {config.label}
    </span>
  );
}
\`\`\`

## Rules
- Match existing component file structure exactly
- Use the project's styling approach (don't mix Tailwind with CSS modules)
- Export from the nearest index file
- Accessible by default (not as an afterthought)`,
  },
  {
    id: 'new-api-endpoint',
    label: 'API Endpoint Builder',
    label_fr: 'Constructeur d\'endpoint API',
    description: 'Create a new API endpoint following project conventions: route, validation, handler, error handling, auth, and tests.',
    description_fr: 'Crée un nouvel endpoint API selon les conventions : route, validation, handler, gestion d\'erreurs, auth et tests.',
    category: 'development',
    example: '> /new-api-endpoint "POST /api/invitations — send team invite email, requires admin role"',
    example_fr: '> /new-api-endpoint "POST /api/invitations — envoyer un email d\'invitation d\'équipe, nécessite le rôle admin"',
    prompt: `# API Endpoint Builder

Create a production-ready API endpoint following project conventions.

## Process

### Step 1 — Research
- Read existing API routes to learn patterns (file structure, middleware, validation)
- Check auth setup (NextAuth, Clerk, custom JWT, etc.)
- Identify validation library (Zod, Joi, etc.)
- Check error handling conventions

### Step 2 — Design
- HTTP method + route path
- Request schema (params, query, body)
- Response schema (success + error)
- Auth/permission requirements
- Rate limiting needs

### Step 3 — Build
1. **Route file** in the correct directory
2. **Input validation** with the project's validation library
3. **Auth middleware** applied
4. **Handler** with proper error handling
5. **Consistent error format** matching existing API responses
6. **Type-safe** request and response

### Step 4 — Test
- Integration test: happy path
- Integration test: auth failure (401/403)
- Integration test: validation failure (400)
- Integration test: not found (404)

## Example

\`\`\`typescript
// POST /api/teams/:teamId/invitations

// 1. Input schema
const InviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(['member', 'admin']),
});

// 2. Handler
export async function POST(req: Request, { params }: { params: { teamId: string } }) {
  const session = await requireAuth(req);                    // 401 if not logged in
  const team = await requireTeamAdmin(session, params.teamId); // 403 if not admin
  const body = InviteSchema.parse(await req.json());         // 400 if invalid

  const invitation = await createInvitation({
    teamId: team.id,
    email: body.email,
    role: body.role,
    invitedBy: session.userId,
  });

  await sendInviteEmail(invitation);

  return Response.json({ invitation }, { status: 201 });
}
\`\`\`

## Rules
- Follow existing route file structure exactly
- Never skip input validation
- Always handle auth before business logic
- Return consistent error shapes
- Log meaningful context on errors (but never log secrets/tokens)`,
  },
  {
    id: 'changelog-entry',
    label: 'Changelog Writer',
    label_fr: 'Rédacteur de changelog',
    description: 'Generate a clean changelog entry from recent commits. Groups changes by type (features, fixes, breaking). Ready for release notes.',
    description_fr: 'Génère une entrée de changelog propre à partir des commits récents. Groupe par type (features, fixes, breaking). Prêt pour les release notes.',
    category: 'development',
    example: '> /changelog-entry — generate changelog since last tag',
    example_fr: '> /changelog-entry — générer le changelog depuis le dernier tag',
    prompt: `# Changelog Writer

Generate a clean, user-facing changelog from recent git history.

## Process

### Step 1 — Gather
- Find the last version tag: \`git describe --tags --abbrev=0\`
- Get all commits since: \`git log <last-tag>..HEAD --oneline\`
- Read changed files: \`git diff <last-tag>..HEAD --stat\`

### Step 2 — Classify
Group each commit into:
- **Breaking Changes** — API changes, removed features, migration required
- **New Features** — New user-facing functionality
- **Improvements** — Enhancements to existing features
- **Bug Fixes** — Resolved issues
- **Internal** — Refactoring, deps, CI (usually hidden from users)

### Step 3 — Write

\`\`\`markdown
## [X.Y.Z] - YYYY-MM-DD

### Breaking Changes
- **Auth**: Token format changed from JWT to opaque — clients must update auth headers

### New Features
- **Invitations**: Team admins can now invite members via email (#142)
- **Dashboard**: Added real-time notification bell with unread count

### Improvements
- **API**: Response times improved 40% on /api/search endpoint
- **UI**: Mobile layout refined for settings page

### Bug Fixes
- **Auth**: Fixed race condition in token refresh causing random logouts (#187)
- **Export**: CSV export no longer truncates Unicode characters
\`\`\`

## Rules
- Write for USERS, not developers (no "refactored X" or "bumped dep Y")
- Lead with the impact, not the implementation
- Reference issue/PR numbers when available
- Breaking changes ALWAYS go first with migration instructions
- Skip internal/chore commits unless they affect users`,
  },

  // ── Quality & Testing ─────────────────────────────────────
  {
    id: 'tdd-cycle',
    label: 'TDD Workflow',
    label_fr: 'Workflow TDD',
    description: 'Test-Driven Development cycle: write a failing test first, implement the minimum code to pass, then refactor. Repeat. Produces bulletproof code.',
    description_fr: 'Cycle de développement piloté par les tests : écrire un test qui échoue, implémenter le minimum pour passer, puis refactorer. Répéter.',
    category: 'quality',
    example: '> /tdd-cycle "Implement a rate limiter: max 100 requests per minute per API key"',
    example_fr: '> /tdd-cycle "Implémenter un rate limiter : max 100 requêtes par minute par clé API"',
    prompt: `# TDD Workflow

You follow strict Test-Driven Development. The cycle is sacred: RED → GREEN → REFACTOR.

## Process

### Step 0 — Setup
- Identify the testing framework (check package.json, pytest.ini, etc.)
- Read existing test patterns for consistency
- Understand what needs to be built

### For each behavior:

#### RED — Write a failing test
\`\`\`
1. Write ONE test that describes the next behavior
2. Run the test — it MUST fail
3. If it passes, either the test is wrong or the feature already exists
\`\`\`

#### GREEN — Make it pass
\`\`\`
1. Write the MINIMUM code to make the test pass
2. No extra features, no premature optimization
3. Run ALL tests — they must ALL pass
\`\`\`

#### REFACTOR — Clean up
\`\`\`
1. Improve the code without changing behavior
2. Remove duplication, improve names, simplify logic
3. Run ALL tests — they must still ALL pass
\`\`\`

### Repeat for the next behavior.

## Example Session

\`\`\`
Feature: Rate limiter (100 req/min/key)

RED #1: "should allow a request when under limit"
  → Write test → Run → FAIL (RateLimiter doesn't exist)

GREEN #1: Create RateLimiter class with allow() that returns true
  → Run → PASS

RED #2: "should reject request when limit exceeded"
  → Write test: call allow() 101 times → FAIL

GREEN #2: Add counter, reject when count > 100
  → Run → PASS

RED #3: "should reset counter after 1 minute"
  → Write test with fake timer → FAIL

GREEN #3: Add timestamp tracking, reset after 60s
  → Run → PASS

REFACTOR: Extract sliding window logic into private method
  → Run → ALL PASS
\`\`\`

## Rules
- NEVER write production code without a failing test first
- NEVER write more than one failing test at a time
- NEVER skip the refactor step
- Tests should be fast (<100ms each)
- Test BEHAVIOR, not implementation details
- Commit after each GREEN phase`,
  },
  {
    id: 'test-coverage-boost',
    label: 'Coverage Booster',
    label_fr: 'Booster de couverture',
    description: 'Analyze test coverage gaps and write targeted tests for uncovered critical paths. Focuses on high-risk code, not vanity metrics.',
    description_fr: 'Analyse les lacunes de couverture et écrit des tests ciblés pour les chemins critiques non couverts. Focus sur le code à haut risque.',
    category: 'quality',
    example: '> /test-coverage-boost src/lib/billing — "Payment logic must be bulletproof"',
    example_fr: '> /test-coverage-boost src/lib/billing — "La logique de paiement doit être infaillible"',
    prompt: `# Coverage Booster

You are a test coverage specialist focused on finding and filling dangerous gaps.

## Process

### Step 1 — Identify Critical Paths
- Read the target code and map all execution paths
- Identify: error handlers, edge cases, conditional branches, async flows
- Check existing tests: what's covered? what's missing?
- Run coverage if available: \`npx jest --coverage\`, \`pytest --cov\`, etc.

### Step 2 — Prioritize by Risk
Rate each uncovered path:
- **CRITICAL**: Payment, auth, data mutation, security — must test
- **HIGH**: Business logic, API handlers, validation — should test
- **MEDIUM**: UI state management, formatting — nice to test
- **LOW**: Pure display, config — skip unless trivial

### Step 3 — Write Tests (highest risk first)
For each gap:
1. Describe the untested scenario
2. Write a focused test
3. Run it to verify it passes
4. Move to the next gap

### Step 4 — Summary
\`\`\`
Coverage Boost Report
━━━━━━━━━━━━━━━━━━━
Before: 12 tests covering happy paths
After:  28 tests (+16) covering critical + edge cases

Added:
✓ 4 tests: payment failure scenarios (declined, timeout, duplicate)
✓ 3 tests: auth edge cases (expired token, revoked session, race condition)
✓ 5 tests: validation boundaries (empty, max length, special chars)
✓ 4 tests: error propagation (DB down, API timeout, malformed response)

Still uncovered (low risk):
- UI formatting helpers (pure functions, no side effects)
- Config loading (only runs at startup)
\`\`\`

## Rules
- Focus on risk, NOT on hitting a coverage percentage
- Test behavior, not implementation
- One assertion per test (or closely related assertions)
- Never test framework code or third-party libraries
- If code is untestable, that's a design smell — flag it`,
  },

  // ── Data & Database ───────────────────────────────────────
  {
    id: 'db-migration',
    label: 'DB Migration',
    label_fr: 'Migration DB',
    description: 'Create safe, reversible database migrations. Validates data loss risk, adds indexes, tests up/down, and checks production compatibility.',
    description_fr: 'Crée des migrations de base de données sûres et réversibles. Valide les risques de perte de données, ajoute les indexes, teste up/down.',
    category: 'data',
    example: '> /db-migration "Add notifications table with user FK and read_at timestamp"',
    example_fr: '> /db-migration "Ajouter la table notifications avec FK user et timestamp read_at"',
    prompt: `# DB Migration

Create a safe, reversible database migration following project conventions.

## Process

### Step 1 — Research
- Identify the ORM/migration tool (Prisma, Drizzle, Knex, Django, Rails, etc.)
- Read existing migrations for patterns and naming conventions
- Check schema source of truth

### Step 2 — Design
- Define the schema change clearly
- Check for data loss risks (column drops, type changes)
- Plan indexes (every FK needs an index, every filtered column needs one)
- Plan constraints (NOT NULL, UNIQUE, CHECK, DEFAULT)

### Step 3 — Create Migration
1. Generate migration file using the project's CLI
2. Write the UP migration
3. Write the DOWN migration (must perfectly reverse UP)
4. Add comments explaining WHY for non-obvious changes

### Step 4 — Validate
- [ ] Migration is reversible (down undoes up completely)
- [ ] No data loss (or explicit approval if destructive)
- [ ] Indexes added for new FKs and query patterns
- [ ] Backward compatible with current running code
- [ ] Tested: run up → verify → run down → verify

## Example

\`\`\`sql
-- UP
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('info', 'warning', 'error', 'success')),
  title VARCHAR(255) NOT NULL,
  body TEXT,
  read_at TIMESTAMPTZ,           -- NULL = unread
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_unread ON notifications(user_id) WHERE read_at IS NULL;
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- DOWN
DROP TABLE notifications;
\`\`\`

## Rules
- NEVER drop columns/tables without explicit user approval
- ALWAYS add indexes for foreign keys
- ALWAYS provide both UP and DOWN
- Use partial indexes where appropriate (e.g., unread notifications only)
- Large tables: consider online DDL / zero-downtime migrations`,
  },

  // ── DevOps & Deployment ───────────────────────────────────
  {
    id: 'deploy-checklist',
    label: 'Deploy Checklist',
    label_fr: 'Checklist de déploiement',
    description: 'Pre-deployment verification: tests, CI, env vars, migrations, rollback plan. Prevents shipping broken code to production.',
    description_fr: 'Vérification pré-déploiement : tests, CI, variables d\'env, migrations, plan de rollback. Empêche de livrer du code cassé en production.',
    category: 'devops',
    example: '> /deploy-checklist — run before deploying the billing feature to production',
    example_fr: '> /deploy-checklist — exécuter avant de déployer la feature billing en production',
    prompt: `# Deploy Checklist

Systematic pre-deployment verification. Run this BEFORE every production deploy.

## Checklist

### Code Quality
- [ ] All tests pass locally (\`npm test\` / \`pytest\` / etc.)
- [ ] TypeCheck passes (\`tsc --noEmit\` / equivalent)
- [ ] Linter passes with zero warnings
- [ ] No console.log, debugger, or TODO/FIXME in committed code
- [ ] No hardcoded URLs, secrets, or environment-specific values

### CI/CD
- [ ] CI pipeline is green on this branch
- [ ] All required approvals obtained
- [ ] Branch is up to date with main (no merge conflicts)

### Database
- [ ] Migrations tested on staging
- [ ] Migrations are backward compatible (old code works with new schema)
- [ ] Rollback migration tested

### Environment
- [ ] New environment variables added to all environments
- [ ] Secrets rotated if needed
- [ ] Feature flags configured for gradual rollout

### Monitoring
- [ ] Error tracking configured for new code paths
- [ ] Key metrics identified (what to watch post-deploy)
- [ ] Alerts set for critical thresholds

### Rollback Plan
- [ ] Rollback procedure documented
- [ ] Rollback tested on staging
- [ ] Estimated rollback time: ___

## Post-Deploy
1. Monitor error rates for 15 minutes
2. Smoke test critical user flows
3. Check dashboards for anomalies
4. Confirm no increase in latency/error rates

## Example

\`\`\`
Deploy Checklist: Billing Feature v2.3.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Code Quality: All pass
✅ CI/CD: Pipeline green, 2 approvals
✅ Database: 1 migration (add invoices table), tested on staging
⚠️  Environment: STRIPE_WEBHOOK_SECRET needed in production
✅ Monitoring: Sentry alerts for payment errors configured
✅ Rollback: Revert commit + down migration, ~3 min

Decision: READY TO DEPLOY (resolve env var first)
\`\`\``,
  },
  {
    id: 'dependency-update',
    label: 'Dependency Updater',
    label_fr: 'Metteur à jour de dépendances',
    description: 'Safely update dependencies: check changelogs for breaking changes, update one at a time, test between each update. No surprise breakage.',
    description_fr: 'Met à jour les dépendances en sécurité : vérifie les changelogs pour les breaking changes, met à jour une par une, teste entre chaque.',
    category: 'devops',
    example: '> /dependency-update — update all outdated dependencies safely',
    example_fr: '> /dependency-update — mettre à jour toutes les dépendances obsolètes en sécurité',
    prompt: `# Dependency Updater

Safely update project dependencies with zero surprise breakage.

## Process

### Step 1 — Audit
- List outdated deps: \`npm outdated\` / \`pip list --outdated\` / etc.
- Classify each update:
  - **PATCH** (1.2.3 → 1.2.4): Bug fixes only, safe
  - **MINOR** (1.2.3 → 1.3.0): New features, should be safe
  - **MAJOR** (1.2.3 → 2.0.0): Breaking changes, needs review

### Step 2 — Prioritize
1. Security vulnerabilities (update immediately)
2. Major versions with known breaking changes (plan carefully)
3. Minor/patch updates (batch these)

### Step 3 — Update One by One
For each update:
1. Read the changelog/release notes
2. Check for breaking changes
3. Update the single dependency
4. Run tests
5. If tests pass → commit
6. If tests fail → fix or revert

### Step 4 — Summary

\`\`\`
Dependency Update Report
━━━━━━━━━━━━━━━━━━━━━━

Updated (8):
✅ next: 14.1.0 → 14.2.3 (minor, no breaking changes)
✅ zod: 3.22.0 → 3.23.4 (minor, new .pipe() method)
✅ tailwindcss: 3.4.0 → 3.4.7 (patch, bug fixes)
⚠️ prisma: 5.8.0 → 6.0.0 (MAJOR — changed DateTime handling, migration applied)

Skipped (2):
⏭️ eslint: 8.x → 9.x (flat config migration needed, separate PR)
⏭️ react-email: blocked by Next.js version

Security fixes (1):
🔒 xmldom: 0.8.2 → 0.8.10 (CVE-2023-XXXXX patched)
\`\`\`

## Rules
- NEVER update all deps at once (\`npm update\` with no args)
- ALWAYS read changelogs for major updates
- ALWAYS run full test suite after each update
- Security patches bypass the queue — update immediately
- If a major update requires code changes, create a separate PR`,
  },
  {
    id: 'incident-debug',
    label: 'Incident Response',
    label_fr: 'Réponse aux incidents',
    description: 'Structured incident debugging: gather evidence, form hypotheses, isolate root cause, fix, and write postmortem. For production issues.',
    description_fr: 'Débogage structuré d\'incident : collecter les preuves, formuler des hypothèses, isoler la cause racine, corriger et rédiger le postmortem.',
    category: 'devops',
    example: '> /incident-debug "Users report 500 errors on checkout since 14:30 UTC"',
    example_fr: '> /incident-debug "Les utilisateurs signalent des erreurs 500 au checkout depuis 14h30 UTC"',
    prompt: `# Incident Response

Structured incident debugging for production issues. Stay calm, be systematic.

## Process

### Phase 1 — Triage (2 min)
- What is the user impact? (how many users, which features)
- When did it start? (correlate with recent deploys)
- Is it getting worse? (check error rate trend)
- Severity: S1 (total outage) / S2 (major feature down) / S3 (degraded) / S4 (minor)

### Phase 2 — Gather Evidence (5 min)
- Check error logs: recent errors, stack traces, patterns
- Check monitoring: error rates, latency, CPU/memory
- Check recent changes: \`git log --since="2 hours ago" --oneline\`
- Check infrastructure: database connections, API health, queue depth

### Phase 3 — Hypothesize & Isolate
For each hypothesis:
1. State it clearly: "I think X is failing because Y"
2. Define a quick test: "If I check Z, I'll confirm/deny this"
3. Run the test
4. Confirm or move to next hypothesis

### Phase 4 — Fix
- Apply the minimal fix to restore service
- Hotfix > perfect fix during an incident
- If recent deploy caused it, rollback first, investigate later

### Phase 5 — Postmortem

\`\`\`markdown
## Incident Postmortem: [Title]

**Duration**: 14:30 - 15:15 UTC (45 min)
**Impact**: ~200 users could not complete checkout
**Severity**: S2

### Timeline
- 14:15 — Deploy v2.3.1 (added Stripe webhook validation)
- 14:30 — First 500 errors on /api/checkout
- 14:45 — Alert triggered, investigation started
- 15:00 — Root cause identified: webhook secret env var missing in prod
- 15:10 — Env var added, service restored
- 15:15 — Error rate back to normal

### Root Cause
STRIPE_WEBHOOK_SECRET was added in code but not provisioned in production environment.
Deploy checklist did not catch missing env var.

### Action Items
- [ ] Add env var validation on startup (fail fast if missing)
- [ ] Add "new env vars" section to deploy checklist
- [ ] Set up synthetic monitoring for checkout flow
\`\`\`

## Rules
- Mitigate first, investigate later
- Never blame individuals in postmortems
- Every incident produces at least one preventive action item
- If you can rollback cleanly, do it — don't debug in production under pressure`,
  },

  // ── Research & Analysis ───────────────────────────────────
  {
    id: 'deep-research',
    label: 'Deep Research',
    label_fr: 'Recherche approfondie',
    description: 'Two-phase structured research: outline key questions, then investigate each deeply with evidence and citations. For complex technical decisions.',
    description_fr: 'Recherche structurée en 2 phases : lister les questions clés, puis investiguer chacune en profondeur avec preuves et citations.',
    category: 'research',
    example: '> /deep-research "Should we migrate from REST to GraphQL? Evaluate trade-offs for our 50-endpoint API."',
    example_fr: '> /deep-research "Devrait-on migrer de REST vers GraphQL ? Évaluer les compromis pour notre API de 50 endpoints."',
    prompt: `# Deep Research

Structured research methodology for complex technical decisions.

## Phase 1 — Outline (before researching)

Define the research scope:
1. **Core question**: What exactly are we trying to decide/understand?
2. **Sub-questions**: Break into 3-7 specific investigable questions
3. **Success criteria**: What would a "good answer" look like?
4. **Constraints**: Timeline, team skills, budget, existing infrastructure

Present the outline and ask: "Does this cover what you need? Should I adjust the scope?"

## Phase 2 — Deep Investigation

For each sub-question:
1. **Research**: Read relevant code, docs, articles, benchmarks
2. **Evidence**: Cite specific sources (files, URLs, benchmarks, case studies)
3. **Analysis**: Synthesize findings into a clear answer
4. **Confidence**: Rate your confidence (HIGH / MEDIUM / LOW) with reasoning

## Phase 3 — Synthesis

\`\`\`markdown
## Research: [Core Question]

### Executive Summary
[2-3 sentences: the answer + key trade-off]

### Findings

#### Q1: [Sub-question]
**Answer**: [Clear, direct answer]
**Evidence**:
- [Source 1]: [Key finding]
- [Source 2]: [Key finding]
**Confidence**: HIGH — multiple consistent sources

#### Q2: [Sub-question]
...

### Recommendation
**Option A** (recommended): [What to do]
- Pros: ...
- Cons: ...
- Effort: S/M/L

**Option B** (alternative): [What to do]
- Pros: ...
- Cons: ...
- Effort: S/M/L

### Open Questions
- [Things that need more investigation or team input]
\`\`\`

## Example

\`\`\`
Research: REST vs GraphQL Migration

Executive Summary:
For our 50-endpoint API with 3 mobile clients, GraphQL would reduce
over-fetching by ~60% but requires 2-3 months migration effort.
Recommend incremental adoption: add GraphQL gateway, migrate
high-traffic endpoints first, keep REST for simple CRUD.

Q1: How much over-fetching do our mobile clients experience?
Answer: Analysis of 10 highest-traffic endpoints shows clients use
only 30-40% of response fields on average.
Evidence: Analyzed network logs, response schemas vs client usage.
Confidence: HIGH
...
\`\`\`

## Rules
- Always present the outline before deep-diving
- Distinguish facts from opinions
- Cite sources for every claim
- Rate confidence honestly — "I don't know" is a valid finding
- Recommend a specific course of action (don't just list pros/cons)`,
  },

  // ── Performance ───────────────────────────────────────────
  {
    id: 'web-perf-audit',
    label: 'Web Performance Audit',
    label_fr: 'Audit de performance web',
    description: 'Audit Core Web Vitals (LCP, INP, CLS), bundle size, loading strategy, and rendering performance. Provides prioritized fixes with expected impact.',
    description_fr: 'Audite les Core Web Vitals (LCP, INP, CLS), taille du bundle, stratégie de chargement et performance de rendu. Fournit des corrections priorisées.',
    category: 'performance',
    example: '> /web-perf-audit — "Homepage takes 4s to load on mobile, LCP is terrible"',
    example_fr: '> /web-perf-audit — "La page d\'accueil met 4s à charger sur mobile, le LCP est terrible"',
    prompt: `# Web Performance Audit

Comprehensive web performance analysis based on Core Web Vitals methodology.

## Audit Areas

### 1. Loading Performance (LCP)
- Identify the Largest Contentful Paint element
- Check: render-blocking resources, unoptimized images, slow server response
- Analyze: font loading strategy, critical CSS, preload hints
- Target: LCP < 2.5s

### 2. Interactivity (INP)
- Identify long tasks blocking the main thread
- Check: heavy JavaScript execution, layout thrashing, forced reflows
- Analyze: event handlers, third-party scripts, hydration cost
- Target: INP < 200ms

### 3. Visual Stability (CLS)
- Identify layout shifts
- Check: images without dimensions, dynamic content injection, web fonts
- Analyze: above-the-fold stability, ad/embed behavior
- Target: CLS < 0.1

### 4. Bundle Analysis
- Check bundle size: \`npx next build\` / \`npx webpack-bundle-analyzer\`
- Identify: large dependencies, duplicate packages, unused code
- Analyze: code splitting, tree shaking, dynamic imports

### 5. Network
- Check: caching headers, compression (gzip/brotli), CDN usage
- Analyze: waterfall, number of requests, connection reuse

## Output

\`\`\`
Web Performance Audit Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Score: 62/100 (needs improvement)

Critical Issues (fix these first):
1. [LCP 4.2s] Hero image is 2.4MB unoptimized JPEG
   Fix: Convert to WebP, add width/height, use next/image
   Expected impact: LCP → ~1.8s (-57%)

2. [Bundle 450KB] moment.js imported for 1 date format call
   Fix: Replace with date-fns/format (2KB vs 67KB)
   Expected impact: -65KB (-14% bundle)

3. [INP 380ms] Search handler re-renders entire product list
   Fix: Debounce input + virtualize list (react-window)
   Expected impact: INP → ~120ms (-68%)

Moderate Issues:
4. [CLS 0.15] Web font swap causes layout shift
   Fix: Add font-display: swap + preload font file
   Expected impact: CLS → ~0.05

Quick Wins:
5. Add Cache-Control headers for static assets (1 line config)
6. Enable Brotli compression on CDN
7. Preconnect to third-party origins
\`\`\`

## Rules
- Measure before optimizing — never guess at bottlenecks
- Prioritize by user impact, not technical elegance
- Simple fixes with big wins first (image optimization > architecture rewrite)
- Always provide expected impact numbers
- Test on real devices, not just desktop Chrome`,
  },
];
