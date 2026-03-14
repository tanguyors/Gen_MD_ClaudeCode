/**
 * Field-level help data (what/why/example) for FieldHelp component.
 * Keyed by "stepKey.fieldName" (e.g. "identity.projectName").
 * Only fields that benefit from explanation are included.
 */

export interface FieldHelpData {
  what: string;
  what_fr: string;
  why?: string;
  why_fr?: string;
  example?: string;
  example_fr?: string;
}

export const FIELD_HELP: Record<string, FieldHelpData> = {
  // ─── Step 00: Identity ──────────────────────────────────────
  'identity.projectName': {
    what: 'The name used in the generated CLAUDE.md header.',
    what_fr: 'Le nom utilisé dans l\'en-tête du CLAUDE.md généré.',
  },
  'identity.projectType': {
    what: 'Determines which sections appear in the questionnaire and how instructions are tailored.',
    what_fr: 'Détermine quelles sections apparaissent dans le questionnaire et comment les instructions sont adaptées.',
    why: 'A SaaS and a CLI have very different needs. The project type filters out irrelevant sections (e.g. no UX/UI for an API).',
    why_fr: 'Un SaaS et un CLI ont des besoins très différents. Le type de projet filtre les sections non pertinentes (ex: pas d\'UX/UI pour une API).',
  },
  'identity.currentStage': {
    what: 'Where the project is in its lifecycle. Affects which sections are shown.',
    what_fr: 'Où en est le projet dans son cycle de vie. Affecte les sections affichées.',
    why: 'A POC doesn\'t need CI/CD or governance rules. A production app does.',
    why_fr: 'Un POC n\'a pas besoin de règles CI/CD ou de gouvernance. Une app en production, si.',
  },
  'identity.owner': {
    what: 'Who owns the project (team, company, or client name).',
    what_fr: 'Qui possède le projet (équipe, entreprise ou nom du client).',
  },
  'identity.devEnvironment': {
    what: 'The OS used for development. Affects command syntax in the generated file.',
    what_fr: 'L\'OS utilisé pour le développement. Affecte la syntaxe des commandes dans le fichier généré.',
  },
  'identity.agentLanguage': {
    what: 'The language the agent will use to communicate (comments, commit messages, docs).',
    what_fr: 'La langue que l\'agent utilisera pour communiquer (commentaires, messages de commit, docs).',
  },
  'identity.useAgentTeam': {
    what: 'Enable sub-agents (specialists) that Claude can delegate tasks to.',
    what_fr: 'Active les sous-agents (spécialistes) à qui Claude peut déléguer des tâches.',
    why: 'Sub-agents let you define a "frontend agent" with its own rules, or a "test agent" that only runs tests. Each has a focused context.',
    why_fr: 'Les sous-agents permettent de définir un "agent frontend" avec ses propres règles, ou un "agent test" qui ne lance que les tests. Chacun a un contexte ciblé.',
  },

  // ─── Step 01: Business ──────────────────────────────────────
  'business.problemSolved': {
    what: 'What concrete problem does this project solve for its users?',
    what_fr: 'Quel problème concret ce projet résout-il pour ses utilisateurs ?',
    why: 'When the agent knows the "why", it makes better trade-offs. It can prioritize features that matter to users.',
    why_fr: 'Quand l\'agent connaît le "pourquoi", il fait de meilleurs compromis. Il peut prioriser les fonctionnalités qui comptent pour les utilisateurs.',
    example: '"Help small businesses manage invoices without an accountant"',
    example_fr: '"Aider les petites entreprises à gérer leurs factures sans comptable"',
  },
  'business.expectedOutcome': {
    what: 'What should users be able to do after using the product?',
    what_fr: 'Que devraient pouvoir faire les utilisateurs après avoir utilisé le produit ?',
    example: '"Create and send professional invoices in under 2 minutes"',
    example_fr: '"Créer et envoyer des factures professionnelles en moins de 2 minutes"',
  },
  'business.valueProposition': {
    what: 'What makes this project better than alternatives?',
    what_fr: 'Qu\'est-ce qui rend ce projet meilleur que les alternatives ?',
    example: '"10x faster than Xero for freelancers, with AI-powered categorization"',
    example_fr: '"10x plus rapide que Xero pour les freelances, avec catégorisation IA"',
  },
  'business.outOfScope': {
    what: 'Features or concerns explicitly excluded from this project.',
    what_fr: 'Fonctionnalités ou préoccupations explicitement exclues de ce projet.',
    why: 'Prevents the agent from building features you don\'t want. Saves time and context.',
    why_fr: 'Empêche l\'agent de construire des fonctionnalités que vous ne voulez pas. Économise du temps et du contexte.',
    example: '"No mobile app, no multi-currency support, no inventory management"',
    example_fr: '"Pas d\'app mobile, pas de support multi-devises, pas de gestion d\'inventaire"',
  },

  // ─── Step 02: Tech Goals ────────────────────────────────────
  'techGoals.techDebt': {
    what: 'Known technical debt that the agent should be aware of.',
    what_fr: 'Dette technique connue dont l\'agent devrait être informé.',
    example: '"Auth module is a monolith, needs refactoring. Tests are missing for the payment flow."',
    example_fr: '"Le module d\'auth est un monolithe, a besoin de refactoring. Les tests manquent pour le flux de paiement."',
  },
  'techGoals.criticalComponents': {
    what: 'Parts of the system where bugs would have the worst impact.',
    what_fr: 'Parties du système où les bugs auraient le pire impact.',
    example: '"Payment processing, user authentication, data export pipeline"',
    example_fr: '"Traitement des paiements, authentification utilisateur, pipeline d\'export de données"',
  },

  // ─── Step 03: Repo Map ──────────────────────────────────────
  'repoMap.rootStructure': {
    what: 'Describe your project\'s top-level folders and what each one contains.',
    what_fr: 'Décrivez les dossiers de premier niveau de votre projet et ce que chacun contient.',
    example: '"src/ → app code, tests/ → test suites, docs/ → documentation, infra/ → Terraform"',
    example_fr: '"src/ → code app, tests/ → suites de tests, docs/ → documentation, infra/ → Terraform"',
  },
  'repoMap.sensitiveDirectories': {
    what: 'Folders where changes need extra caution or human review.',
    what_fr: 'Dossiers où les modifications nécessitent une prudence accrue ou une revue humaine.',
    why: 'The agent will avoid touching these folders without explicit permission.',
    why_fr: 'L\'agent évitera de toucher à ces dossiers sans permission explicite.',
    example: '"infra/, db/migrations/, .github/workflows/"',
    example_fr: '"infra/, db/migrations/, .github/workflows/"',
  },
  'repoMap.generatedFiles': {
    what: 'Files that are auto-generated and should never be edited by hand.',
    what_fr: 'Fichiers auto-générés qui ne doivent jamais être édités manuellement.',
    example: '"prisma/client/, src/generated/, dist/"',
    example_fr: '"prisma/client/, src/generated/, dist/"',
  },

  // ─── Step 04: Stack ─────────────────────────────────────────
  'stack.runtimeVersions': {
    what: 'Required runtime versions for the project.',
    what_fr: 'Versions de runtime requises pour le projet.',
    example: '"Node >= 20, Python 3.11+"',
    example_fr: '"Node >= 20, Python 3.11+"',
  },
  'stack.forbiddenDeps': {
    what: 'Packages or libraries that must NOT be used in this project.',
    what_fr: 'Packages ou bibliothèques qui ne doivent PAS être utilisés dans ce projet.',
    why: 'Prevents the agent from introducing unwanted dependencies that conflict with your architecture or licensing.',
    why_fr: 'Empêche l\'agent d\'introduire des dépendances indésirables qui entrent en conflit avec votre architecture ou vos licences.',
    example: '"moment.js (use date-fns), lodash (use native), axios (use fetch)"',
    example_fr: '"moment.js (utiliser date-fns), lodash (utiliser natif), axios (utiliser fetch)"',
  },
  'stack.cacheQueueBroker': {
    what: 'Caching, message queue, or event broker tools used in your project.',
    what_fr: 'Outils de cache, file de messages ou broker d\'événements utilisés dans votre projet.',
    example: '"Redis for caching, BullMQ for job queues"',
    example_fr: '"Redis pour le cache, BullMQ pour les files de jobs"',
  },

  // ─── Step 05: Commands ──────────────────────────────────────
  'commands.installCmd': {
    what: 'The command to install all project dependencies.',
    what_fr: 'La commande pour installer toutes les dépendances du projet.',
  },
  'commands.devCmd': {
    what: 'The command to start the development server.',
    what_fr: 'La commande pour démarrer le serveur de développement.',
  },
  'commands.buildCmd': {
    what: 'The command to create a production build.',
    what_fr: 'La commande pour créer un build de production.',
  },
  'commands.typecheckCmd': {
    what: 'The command to run type checking (e.g. tsc --noEmit).',
    what_fr: 'La commande pour lancer la vérification de types (ex: tsc --noEmit).',
  },
  'commands.codegenCmd': {
    what: 'The command to generate code (types, GraphQL, Prisma client, etc.).',
    what_fr: 'La commande pour générer du code (types, GraphQL, client Prisma, etc.).',
    example: '"pnpm prisma generate" or "pnpm graphql-codegen"',
    example_fr: '"pnpm prisma generate" ou "pnpm graphql-codegen"',
  },
  'commands.seedResetCmd': {
    what: 'The command to seed or reset the local database.',
    what_fr: 'La commande pour peupler ou réinitialiser la base de données locale.',
    example: '"pnpm prisma db seed" or "pnpm db:reset"',
    example_fr: '"pnpm prisma db seed" ou "pnpm db:reset"',
  },
  'commands.localEnvCmd': {
    what: 'The command to start the full local environment (useful for microservices).',
    what_fr: 'La commande pour démarrer l\'environnement local complet (utile pour les microservices).',
    example: '"docker-compose up -d" or "tilt up"',
    example_fr: '"docker-compose up -d" ou "tilt up"',
  },
  'commands.systemPrerequisites': {
    what: 'System-level tools that must be installed before the project can run.',
    what_fr: 'Outils système qui doivent être installés avant que le projet ne puisse tourner.',
    example: '"Docker, Node 20+, PostgreSQL 15, Redis"',
    example_fr: '"Docker, Node 20+, PostgreSQL 15, Redis"',
  },

  // ─── Step 06: Environments ──────────────────────────────────
  'environments.envList': {
    what: 'List all environments (local, staging, production, preview, etc.).',
    what_fr: 'Listez tous les environnements (local, staging, production, preview, etc.).',
  },
  'environments.envDifferences': {
    what: 'Key differences between environments.',
    what_fr: 'Différences clés entre les environnements.',
    example: '"Staging uses a shared DB, prod has read replicas and Redis cluster"',
    example_fr: '"Staging utilise une DB partagée, prod a des replicas en lecture et un cluster Redis"',
  },
  'environments.minLocalVars': {
    what: 'The minimum environment variables needed to run the project locally.',
    what_fr: 'Les variables d\'environnement minimales nécessaires pour faire tourner le projet en local.',
    example: '"DATABASE_URL, NEXTAUTH_SECRET, STRIPE_TEST_KEY"',
    example_fr: '"DATABASE_URL, NEXTAUTH_SECRET, STRIPE_TEST_KEY"',
  },
  'environments.neverLog': {
    what: 'Values that must never appear in logs, error messages, or debugging output.',
    what_fr: 'Valeurs qui ne doivent jamais apparaître dans les logs, messages d\'erreur ou sortie de débogage.',
    example: '"API keys, user passwords, credit card numbers, PII"',
    example_fr: '"Clés API, mots de passe utilisateur, numéros de carte de crédit, PII"',
  },

  // ─── Step 07: Code Standards ────────────────────────────────
  'codeStandards.loggingConvention': {
    what: 'How should log messages be structured?',
    what_fr: 'Comment les messages de log doivent-ils être structurés ?',
    example: '"Use structured JSON logs with { level, message, context, timestamp }"',
    example_fr: '"Utiliser des logs JSON structurés avec { level, message, context, timestamp }"',
  },
  'codeStandards.commentConvention': {
    what: 'When and how should code comments be written?',
    what_fr: 'Quand et comment les commentaires de code doivent-ils être écrits ?',
    example: '"Only comment WHY, not WHAT. No JSDoc on internal functions."',
    example_fr: '"Ne commenter que le POURQUOI, pas le QUOI. Pas de JSDoc sur les fonctions internes."',
  },
  'codeStandards.versioningConvention': {
    what: 'How are versions managed? (SemVer, CalVer, etc.)',
    what_fr: 'Comment les versions sont-elles gérées ? (SemVer, CalVer, etc.)',
    example: '"SemVer with conventional commits. Breaking changes = major bump."',
    example_fr: '"SemVer avec commits conventionnels. Breaking changes = bump majeur."',
  },
  'codeStandards.prStructure': {
    what: 'Expected structure for pull requests.',
    what_fr: 'Structure attendue pour les pull requests.',
    example: '"Title: type(scope): description. Body: ## What, ## Why, ## How to test"',
    example_fr: '"Titre : type(scope): description. Corps : ## Quoi, ## Pourquoi, ## Comment tester"',
  },
  'codeStandards.linterFormatter': {
    what: 'Which linter and formatter tools are used?',
    what_fr: 'Quels outils de linter et formatter sont utilisés ?',
    example: '"ESLint with @typescript-eslint, Prettier with default config"',
    example_fr: '"ESLint avec @typescript-eslint, Prettier avec config par défaut"',
  },
  'codeStandards.blockingLintRules': {
    what: 'Lint rules that block commits or CI. The agent must never violate these.',
    what_fr: 'Règles de lint qui bloquent les commits ou la CI. L\'agent ne doit jamais les violer.',
    example: '"no-any, no-unused-vars, no-console (except logger)"',
    example_fr: '"no-any, no-unused-vars, no-console (sauf logger)"',
  },

  // ─── Step 08: Always-On Rules ───────────────────────────────
  'alwaysOnRules.rules': {
    what: 'Universal rules the agent must follow on EVERY task, no exceptions.',
    what_fr: 'Règles universelles que l\'agent doit suivre à CHAQUE tâche, sans exception.',
    why: 'Keep this to 3-10 rules. Studies show adherence drops above 10. Only include rules the agent can\'t discover from the code.',
    why_fr: 'Gardez 3-10 règles. Les études montrent que l\'adhérence baisse au-delà de 10. N\'incluez que les règles que l\'agent ne peut pas découvrir dans le code.',
    example: '"Never modify .env files. Always run tests before committing. Use French for all user-facing strings."',
    example_fr: '"Ne jamais modifier les fichiers .env. Toujours lancer les tests avant de commit. Utiliser le français pour toutes les chaînes visibles par l\'utilisateur."',
  },

  // ─── Step 09: Database ──────────────────────────────────────
  'database.schemaSource': {
    what: 'Where is the authoritative definition of your database schema?',
    what_fr: 'Où se trouve la définition de référence de votre schéma de base de données ?',
    example: '"Prisma schema at prisma/schema.prisma" or "SQL migrations in db/migrations/"',
    example_fr: '"Schéma Prisma dans prisma/schema.prisma" ou "Migrations SQL dans db/migrations/"',
  },
  'database.prodMigrationCompat': {
    what: 'Rules for database migrations that will run on production.',
    what_fr: 'Règles pour les migrations de base de données qui tourneront en production.',
    why: 'Production migrations can break things. The agent needs to know constraints like "no column drops" or "always additive".',
    why_fr: 'Les migrations en production peuvent tout casser. L\'agent a besoin de connaître les contraintes comme "pas de suppression de colonne" ou "toujours additif".',
    example: '"Migrations must be backward-compatible. Never drop columns without a 2-release deprecation."',
    example_fr: '"Les migrations doivent être rétrocompatibles. Ne jamais supprimer de colonnes sans une dépréciation sur 2 releases."',
  },
  'database.criticalTables': {
    what: 'Tables where a mistake would have severe consequences.',
    what_fr: 'Tables où une erreur aurait de graves conséquences.',
    example: '"users, payments, subscriptions, audit_logs"',
    example_fr: '"users, payments, subscriptions, audit_logs"',
  },
  'database.piiConstraints': {
    what: 'Rules for handling personally identifiable information in the database.',
    what_fr: 'Règles pour la gestion des informations personnellement identifiables dans la base de données.',
    example: '"Encrypt email and phone at rest. Never log PII. GDPR deletion within 30 days."',
    example_fr: '"Chiffrer email et téléphone au repos. Ne jamais logger de PII. Suppression RGPD sous 30 jours."',
  },

  // ─── Step 11: Security ──────────────────────────────────────
  'security.complianceRequirements': {
    what: 'Regulatory or compliance requirements (GDPR, SOC2, HIPAA, etc.).',
    what_fr: 'Exigences réglementaires ou de conformité (RGPD, SOC2, HIPAA, etc.).',
    example: '"GDPR for EU users, SOC2 Type II audit in progress"',
    example_fr: '"RGPD pour les utilisateurs EU, audit SOC2 Type II en cours"',
  },
  'security.secretsPolicy': {
    what: 'How secrets, tokens, and API keys should be managed.',
    what_fr: 'Comment les secrets, tokens et clés API doivent être gérés.',
    example: '"All secrets in Vault. Never in code or .env committed to git. Rotate every 90 days."',
    example_fr: '"Tous les secrets dans Vault. Jamais dans le code ou .env commité sur git. Rotation tous les 90 jours."',
  },

  // ─── Step 20: Agent Prefs ───────────────────────────────────
  'agentPrefs.taskTypes': {
    what: 'What kind of tasks will you typically give the agent?',
    what_fr: 'Quel type de tâches donnerez-vous typiquement à l\'agent ?',
    example: '"Bug fixes, new features, refactoring, code reviews, writing tests"',
    example_fr: '"Corrections de bugs, nouvelles fonctionnalités, refactoring, revues de code, écriture de tests"',
  },
  'agentPrefs.responseFormat': {
    what: 'How should the agent format its responses?',
    what_fr: 'Comment l\'agent doit-il formater ses réponses ?',
    example: '"Concise bullet points. Show code diffs, not full files. No emoji."',
    example_fr: '"Points concis. Montrer les diffs de code, pas les fichiers entiers. Pas d\'emoji."',
  },

  // ─── Step 21: Code Policy ───────────────────────────────────
  'codePolicy.canCreateFiles': {
    what: 'Can the agent create new files and folders?',
    what_fr: 'L\'agent peut-il créer de nouveaux fichiers et dossiers ?',
  },
  'codePolicy.canRenameMove': {
    what: 'Can the agent rename or move existing files?',
    what_fr: 'L\'agent peut-il renommer ou déplacer des fichiers existants ?',
  },
  'codePolicy.canModifySchema': {
    what: 'Can the agent modify the database schema or create migrations?',
    what_fr: 'L\'agent peut-il modifier le schéma de base de données ou créer des migrations ?',
    why: 'Schema changes are high-risk. Many teams require human review for these.',
    why_fr: 'Les changements de schéma sont à haut risque. Beaucoup d\'équipes exigent une revue humaine pour ceux-ci.',
  },
  'codePolicy.canModifyCICD': {
    what: 'Can the agent modify CI/CD pipelines (GitHub Actions, etc.)?',
    what_fr: 'L\'agent peut-il modifier les pipelines CI/CD (GitHub Actions, etc.) ?',
  },
  'codePolicy.canAddRemoveDeps': {
    what: 'Can the agent add or remove dependencies from package.json?',
    what_fr: 'L\'agent peut-il ajouter ou supprimer des dépendances du package.json ?',
  },
  'codePolicy.humanValidationRequired': {
    what: 'Actions that always need explicit human approval before proceeding.',
    what_fr: 'Actions qui nécessitent toujours une approbation humaine explicite avant de procéder.',
    example: '"Deleting files, modifying auth logic, changing database schema, touching .env"',
    example_fr: '"Supprimer des fichiers, modifier la logique d\'auth, changer le schéma DB, toucher .env"',
  },
  'codePolicy.forbiddenActions': {
    what: 'Actions the agent must NEVER do, under any circumstances.',
    what_fr: 'Actions que l\'agent ne doit JAMAIS faire, en aucune circonstance.',
    example: '"Never force push. Never delete migrations. Never modify production .env."',
    example_fr: '"Ne jamais force push. Ne jamais supprimer de migrations. Ne jamais modifier .env de production."',
  },

  // ─── Step 22: DoD ───────────────────────────────────────────
  'dod.completionCriteria': {
    what: 'When is a task considered "done"?',
    what_fr: 'Quand une tâche est-elle considérée comme "terminée" ?',
    example: '"Tests pass, types check, no lint errors, PR description complete, changelog updated"',
    example_fr: '"Tests passent, types vérifiés, pas d\'erreurs lint, description de PR complète, changelog mis à jour"',
  },

  // ─── Step 26: Always-On Block ───────────────────────────────
  'alwaysOnBlock.rules': {
    what: '5-8 ultra-short rules that appear at the very top of CLAUDE.md.',
    what_fr: '5-8 règles ultra-courtes qui apparaissent tout en haut du CLAUDE.md.',
    why: 'These are always in the agent\'s context window. Keep them short and imperative: "Use TypeScript strict", "Run tests before committing".',
    why_fr: 'Celles-ci sont toujours dans la fenêtre de contexte de l\'agent. Gardez-les courtes et impératives : "Utilise TypeScript strict", "Lance les tests avant de commit".',
    example: '"Use pnpm. TypeScript strict. French UI strings. Never modify .env. Run pnpm check before PR."',
    example_fr: '"Utilise pnpm. TypeScript strict. Chaînes UI en français. Ne jamais modifier .env. Lance pnpm check avant PR."',
  },
};

/**
 * Get localized help data for a field.
 */
export function getFieldHelp(key: string, locale: string): { what: string; why?: string; example?: string } | null {
  const data = FIELD_HELP[key];
  if (!data) return null;

  return {
    what: locale === 'fr' ? data.what_fr : data.what,
    why: locale === 'fr' ? data.why_fr : data.why,
    example: locale === 'fr' ? data.example_fr : data.example,
  };
}
