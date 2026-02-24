export interface McpOption {
  id: string;
  label: string;
  label_fr: string;
  description: string;
  description_fr: string;
  category: string;
}

export const MCP_OPTIONS: McpOption[] = [
  {
    id: 'ai-brain',
    label: 'AI Brain',
    label_fr: 'AI Brain',
    description: '3 IA debattent, 1 reponse consolidee',
    description_fr: '3 IA debattent, 1 reponse consolidee',
    category: 'ai-debate',
  },
  {
    id: 'airtable',
    label: 'Airtable',
    label_fr: 'Airtable',
    description: 'Gestion de bases Airtable via Claude',
    description_fr: 'Gestion de bases Airtable via Claude',
    category: 'database',
  },
  {
    id: 'apify',
    label: 'Apify',
    label_fr: 'Apify',
    description: 'Web scraping et extraction de donnees',
    description_fr: 'Web scraping et extraction de donnees',
    category: 'search',
  },
  {
    id: 'atlassian',
    label: 'Atlassian',
    label_fr: 'Atlassian',
    description: 'Jira et Confluence via MCP',
    description_fr: 'Jira et Confluence via MCP',
    category: 'productivity',
  },
  {
    id: 'auth0',
    label: 'Auth0',
    label_fr: 'Auth0',
    description: 'Gestion d\'identite et authentification Auth0',
    description_fr: 'Gestion d\'identite et authentification Auth0',
    category: 'security',
  },
  {
    id: 'aws',
    label: 'AWS',
    label_fr: 'AWS',
    description: 'Suite MCP pour les services Amazon Web Services',
    description_fr: 'Suite MCP pour les services Amazon Web Services',
    category: 'devops',
  },
  {
    id: 'axiom',
    label: 'Axiom',
    label_fr: 'Axiom',
    description: 'Analyse de logs et evenements avec Axiom',
    description_fr: 'Analyse de logs et evenements avec Axiom',
    category: 'devops',
  },
  {
    id: 'blender-mcp',
    label: 'Blender MCP',
    label_fr: 'Blender MCP',
    description: 'Modelisation 3D assistee par IA avec Blender',
    description_fr: 'Modelisation 3D assistee par IA avec Blender',
    category: 'design',
  },
  {
    id: 'brave-search',
    label: 'Brave Search',
    label_fr: 'Brave Search',
    description: 'Web search powered by Brave',
    description_fr: 'Web search powered by Brave',
    category: 'search',
  },
  {
    id: 'browserbase',
    label: 'Browserbase',
    label_fr: 'Browserbase',
    description: 'Navigateur cloud pour agents IA',
    description_fr: 'Navigateur cloud pour agents IA',
    category: 'search',
  },
  {
    id: 'cloudflare',
    label: 'Cloudflare',
    label_fr: 'Cloudflare',
    description: 'Manage Cloudflare Workers, DNS and Pages',
    description_fr: 'Manage Cloudflare Workers, DNS and Pages',
    category: 'devops',
  },
  {
    id: 'context7',
    label: 'Context7',
    label_fr: 'Context7',
    description: 'Live documentation for any library',
    description_fr: 'Live documentation for any library',
    category: 'code-review',
  },
  {
    id: 'datadog',
    label: 'Datadog',
    label_fr: 'Datadog',
    description: 'Monitoring, traces et incidents Datadog',
    description_fr: 'Monitoring, traces et incidents Datadog',
    category: 'devops',
  },
  {
    id: 'desktop-commander',
    label: 'Desktop Commander',
    label_fr: 'Desktop Commander',
    description: 'Commandes terminal et gestion de fichiers avancee',
    description_fr: 'Commandes terminal et gestion de fichiers avancee',
    category: 'productivity',
  },
  {
    id: 'discord',
    label: 'Discord',
    label_fr: 'Discord',
    description: 'Integration Discord pour Claude',
    description_fr: 'Integration Discord pour Claude',
    category: 'productivity',
  },
  {
    id: 'docker',
    label: 'Docker',
    label_fr: 'Docker',
    description: 'Gestion de conteneurs Docker via Claude',
    description_fr: 'Gestion de conteneurs Docker via Claude',
    category: 'devops',
  },
  {
    id: 'e2b',
    label: 'E2B Code Interpreter',
    label_fr: 'E2B Code Interpreter',
    description: 'Sandbox d\'execution de code securisee',
    description_fr: 'Sandbox d\'execution de code securisee',
    category: 'devops',
  },
  {
    id: 'elasticsearch',
    label: 'Elasticsearch',
    label_fr: 'Elasticsearch',
    description: 'Recherche full-text et analytics avec Elastic',
    description_fr: 'Recherche full-text et analytics avec Elastic',
    category: 'search',
  },
  {
    id: 'everart',
    label: 'EverArt',
    label_fr: 'EverArt',
    description: 'Generation d\'images IA avec EverArt',
    description_fr: 'Generation d\'images IA avec EverArt',
    category: 'design',
  },
  {
    id: 'exa-search',
    label: 'Exa Search',
    label_fr: 'Exa Search',
    description: 'Recherche web semantique et intelligente',
    description_fr: 'Recherche web semantique et intelligente',
    category: 'search',
  },
  {
    id: 'excalidraw',
    label: 'Excalidraw',
    label_fr: 'Excalidraw',
    description: 'Diagrammes et whiteboard collaboratif',
    description_fr: 'Diagrammes et whiteboard collaboratif',
    category: 'design',
  },
  {
    id: 'fetch',
    label: 'Fetch',
    label_fr: 'Fetch',
    description: 'HTTP requests and web content fetching',
    description_fr: 'HTTP requests and web content fetching',
    category: 'productivity',
  },
  {
    id: 'figma',
    label: 'Figma',
    label_fr: 'Figma',
    description: 'Design-to-code avec Figma officiel',
    description_fr: 'Design-to-code avec Figma officiel',
    category: 'design',
  },
  {
    id: 'filesystem',
    label: 'Filesystem',
    label_fr: 'Filesystem',
    description: 'Secure file operations for Claude',
    description_fr: 'Secure file operations for Claude',
    category: 'productivity',
  },
  {
    id: 'firecrawl',
    label: 'Firecrawl',
    label_fr: 'Firecrawl',
    description: 'Web scraping avance avec rendu JavaScript',
    description_fr: 'Web scraping avance avec rendu JavaScript',
    category: 'search',
  },
  {
    id: 'gemini-design',
    label: 'MCP Gemini Design',
    label_fr: 'MCP Gemini Design',
    description: 'Delegates all frontend/UI code to Gemini via MCP tools (create, modify, snippet)',
    description_fr: 'Délègue tout le code frontend/UI à Gemini via les outils MCP (create, modify, snippet)',
    category: 'design',
  },
  {
    id: 'git',
    label: 'Git',
    label_fr: 'Git',
    description: 'Full git operations from Claude',
    description_fr: 'Full git operations from Claude',
    category: 'devops',
  },
  {
    id: 'github',
    label: 'GitHub',
    label_fr: 'GitHub',
    description: 'Manage repos, PRs and issues from Claude',
    description_fr: 'Manage repos, PRs and issues from Claude',
    category: 'devops',
  },
  {
    id: 'gitlab',
    label: 'GitLab',
    label_fr: 'GitLab',
    description: 'Gestion de projets et CI/CD GitLab',
    description_fr: 'Gestion de projets et CI/CD GitLab',
    category: 'devops',
  },
  {
    id: 'google-calendar',
    label: 'Google Calendar',
    label_fr: 'Google Calendar',
    description: 'Gestion d\'agenda Google Calendar',
    description_fr: 'Gestion d\'agenda Google Calendar',
    category: 'productivity',
  },
  {
    id: 'google-drive',
    label: 'Google Drive',
    label_fr: 'Google Drive',
    description: 'Acces aux fichiers Google Drive',
    description_fr: 'Acces aux fichiers Google Drive',
    category: 'productivity',
  },
  {
    id: 'google-maps',
    label: 'Google Maps',
    label_fr: 'Google Maps',
    description: 'Geocodage, itineraires et recherche de lieux',
    description_fr: 'Geocodage, itineraires et recherche de lieux',
    category: 'search',
  },
  {
    id: 'google-workspace',
    label: 'Google Workspace',
    label_fr: 'Google Workspace',
    description: 'Suite complete Google Workspace',
    description_fr: 'Suite complete Google Workspace',
    category: 'productivity',
  },
  {
    id: 'grafana',
    label: 'Grafana',
    label_fr: 'Grafana',
    description: 'Dashboards, alertes et observabilite Grafana',
    description_fr: 'Dashboards, alertes et observabilite Grafana',
    category: 'devops',
  },
  {
    id: 'kubernetes',
    label: 'Kubernetes',
    label_fr: 'Kubernetes',
    description: 'Gestion de clusters Kubernetes et OpenShift',
    description_fr: 'Gestion de clusters Kubernetes et OpenShift',
    category: 'devops',
  },
  {
    id: 'linear',
    label: 'Linear',
    label_fr: 'Linear',
    description: 'Gestion de projets et issues avec Linear',
    description_fr: 'Gestion de projets et issues avec Linear',
    category: 'productivity',
  },
  {
    id: 'memory',
    label: 'Memory',
    label_fr: 'Memory',
    description: 'Persistent memory across sessions',
    description_fr: 'Persistent memory across sessions',
    category: 'productivity',
  },
  {
    id: 'mintlify',
    label: 'Mintlify',
    label_fr: 'Mintlify',
    description: 'Documentation technique automatisee',
    description_fr: 'Documentation technique automatisee',
    category: 'code-review',
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
    label_fr: 'MongoDB',
    description: 'Connecteur MongoDB pour requetes et gestion',
    description_fr: 'Connecteur MongoDB pour requetes et gestion',
    category: 'database',
  },
  {
    id: 'mysql',
    label: 'MySQL',
    label_fr: 'MySQL',
    description: 'Serveur MCP pour bases MySQL et SQL Server',
    description_fr: 'Serveur MCP pour bases MySQL et SQL Server',
    category: 'database',
  },
  {
    id: 'neon',
    label: 'Neon',
    label_fr: 'Neon',
    description: 'Postgres serverless avec branches et migrations',
    description_fr: 'Postgres serverless avec branches et migrations',
    category: 'database',
  },
  {
    id: 'notion',
    label: 'Notion',
    label_fr: 'Notion',
    description: 'Manage Notion pages and databases',
    description_fr: 'Manage Notion pages and databases',
    category: 'productivity',
  },
  {
    id: 'obsidian',
    label: 'Obsidian',
    label_fr: 'Obsidian',
    description: 'Notes et base de connaissances Obsidian',
    description_fr: 'Notes et base de connaissances Obsidian',
    category: 'productivity',
  },
  {
    id: 'openrouter',
    label: 'OpenRouter',
    label_fr: 'OpenRouter',
    description: 'Acces multi-modeles via OpenRouter',
    description_fr: 'Acces multi-modeles via OpenRouter',
    category: 'ai-debate',
  },
  {
    id: 'perplexity',
    label: 'Perplexity',
    label_fr: 'Perplexity',
    description: 'Recherche IA avec Perplexity',
    description_fr: 'Recherche IA avec Perplexity',
    category: 'search',
  },
  {
    id: 'playwright',
    label: 'Playwright',
    label_fr: 'Playwright',
    description: 'Browser automation and E2E testing',
    description_fr: 'Browser automation and E2E testing',
    category: 'code-review',
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    label_fr: 'PostgreSQL',
    description: 'Query and manage PostgreSQL databases',
    description_fr: 'Query and manage PostgreSQL databases',
    category: 'database',
  },
  {
    id: 'prisma',
    label: 'Prisma',
    label_fr: 'Prisma',
    description: 'ORM Prisma avec MCP integre pour gestion de base',
    description_fr: 'ORM Prisma avec MCP integre pour gestion de base',
    category: 'database',
  },
  {
    id: 'puppeteer',
    label: 'Puppeteer',
    label_fr: 'Puppeteer',
    description: 'Browser automation with Puppeteer',
    description_fr: 'Browser automation with Puppeteer',
    category: 'code-review',
  },
  {
    id: 'qdrant',
    label: 'Qdrant',
    label_fr: 'Qdrant',
    description: 'Base vectorielle pour recherche semantique et RAG',
    description_fr: 'Base vectorielle pour recherche semantique et RAG',
    category: 'database',
  },
  {
    id: 'raygun',
    label: 'Raygun',
    label_fr: 'Raygun',
    description: 'Crash reporting et monitoring utilisateur',
    description_fr: 'Crash reporting et monitoring utilisateur',
    category: 'devops',
  },
  {
    id: 'remotion',
    label: 'Remotion',
    label_fr: 'Remotion',
    description: 'Documentation Remotion indexee pour l\'IA - creez des videos en React',
    description_fr: 'Documentation Remotion indexee pour l\'IA - creez des videos en React',
    category: 'design',
  },
  {
    id: 'remotion-media',
    label: 'Remotion Media',
    label_fr: 'Remotion Media',
    description: 'Generation IA d\'images, videos, musique et voix pour Remotion',
    description_fr: 'Generation IA d\'images, videos, musique et voix pour Remotion',
    category: 'design',
  },
  {
    id: 'resend',
    label: 'Resend',
    label_fr: 'Resend',
    description: 'Envoi d\'emails transactionnels avec Resend',
    description_fr: 'Envoi d\'emails transactionnels avec Resend',
    category: 'productivity',
  },
  {
    id: 'rodumani',
    label: 'Rodumani',
    label_fr: 'Rodumani',
    description: 'Editeur video web avec MCP base sur Remotion',
    description_fr: 'Editeur video web avec MCP base sur Remotion',
    category: 'design',
  },
  {
    id: 'semgrep',
    label: 'Semgrep',
    label_fr: 'Semgrep',
    description: 'Analyse statique de code et securite',
    description_fr: 'Analyse statique de code et securite',
    category: 'security',
  },
  {
    id: 'sentry',
    label: 'Sentry',
    label_fr: 'Sentry',
    description: 'Error monitoring and debugging',
    description_fr: 'Error monitoring and debugging',
    category: 'devops',
  },
  {
    id: 'sequential-thinking',
    label: 'Sequential Thinking',
    label_fr: 'Sequential Thinking',
    description: 'Step-by-step reasoning for complex tasks',
    description_fr: 'Step-by-step reasoning for complex tasks',
    category: 'ai-debate',
  },
  {
    id: 'shodan',
    label: 'Shodan',
    label_fr: 'Shodan',
    description: 'Renseignement reseau et reconnaissance securite',
    description_fr: 'Renseignement reseau et reconnaissance securite',
    category: 'security',
  },
  {
    id: 'slack',
    label: 'Slack',
    label_fr: 'Slack',
    description: 'Integration Slack pour Claude',
    description_fr: 'Integration Slack pour Claude',
    category: 'productivity',
  },
  {
    id: 'snyk',
    label: 'Snyk',
    label_fr: 'Snyk',
    description: 'Scan de vulnerabilites des dependances',
    description_fr: 'Scan de vulnerabilites des dependances',
    category: 'security',
  },
  {
    id: 'sqlite',
    label: 'SQLite',
    label_fr: 'SQLite',
    description: 'Base de donnees SQLite locale pour Claude',
    description_fr: 'Base de donnees SQLite locale pour Claude',
    category: 'database',
  },
  {
    id: 'stripe',
    label: 'Stripe',
    label_fr: 'Stripe',
    description: 'API Stripe pour paiements et facturation',
    description_fr: 'API Stripe pour paiements et facturation',
    category: 'productivity',
  },
  {
    id: 'supabase',
    label: 'Supabase',
    label_fr: 'Supabase',
    description: 'Manage your Supabase project from Claude',
    description_fr: 'Manage your Supabase project from Claude',
    category: 'database',
  },
  {
    id: 'tavily',
    label: 'Tavily',
    label_fr: 'Tavily',
    description: 'Recherche web optimisee pour les LLM',
    description_fr: 'Recherche web optimisee pour les LLM',
    category: 'search',
  },
  {
    id: 'terraform',
    label: 'Terraform',
    label_fr: 'Terraform',
    description: 'Infrastructure as Code avec HashiCorp Terraform',
    description_fr: 'Infrastructure as Code avec HashiCorp Terraform',
    category: 'devops',
  },
  {
    id: 'todoist',
    label: 'Todoist',
    label_fr: 'Todoist',
    description: 'Gestion de taches Todoist via Claude',
    description_fr: 'Gestion de taches Todoist via Claude',
    category: 'productivity',
  },
  {
    id: 'turso',
    label: 'Turso',
    label_fr: 'Turso',
    description: 'SQLite distribue et edge avec LibSQL',
    description_fr: 'SQLite distribue et edge avec LibSQL',
    category: 'database',
  },
  {
    id: 'twilio',
    label: 'Twilio',
    label_fr: 'Twilio',
    description: 'SMS, appels et communications Twilio',
    description_fr: 'SMS, appels et communications Twilio',
    category: 'productivity',
  },
  {
    id: 'upstash-redis',
    label: 'Upstash Redis',
    label_fr: 'Upstash Redis',
    description: 'Redis serverless avec gestion via langage naturel',
    description_fr: 'Redis serverless avec gestion via langage naturel',
    category: 'database',
  },
  {
    id: 'vercel',
    label: 'Vercel',
    label_fr: 'Vercel',
    description: 'Deployez et gerez vos projets Vercel',
    description_fr: 'Deployez et gerez vos projets Vercel',
    category: 'devops',
  },
];

const GEMINI_DESIGN_BLOCK = `# MCP Gemini Design - MANDATORY UNIQUE WORKFLOW

## ABSOLUTE RULE

You NEVER write frontend/UI code yourself. Gemini is your frontend developer.

---

## AVAILABLE TOOLS

### \`generate_vibes\`
Generates a visual page with 5 differently styled sections. The user opens the page, sees all 5 vibes, and picks their favorite. The code from the chosen vibe becomes the design-system.md.

### \`create_frontend\`
Creates a NEW complete file (page, component, section).

### \`modify_frontend\`
Makes ONE design modification to existing code. Returns a FIND/REPLACE block to apply.

### \`snippet_frontend\`
Generates a code snippet to INSERT into an existing file. For adding elements without rewriting the entire file.

---

## WORKFLOW (NO ALTERNATIVES)

### STEP 1: Check for design-system.md

BEFORE any frontend call → check if \`design-system.md\` exists at project root.

### STEP 2A: If design-system.md DOES NOT EXIST

1. Call \`generate_vibes\` with projectDescription, projectType, techStack
2. Receive the code for a page with 5 visual sections
3. Ask: "You don't have a design system. Can I create vibes-selection.tsx so you can visually choose your style?"
4. If yes → Write the page to the file
5. User chooses: "vibe 3" or "the 5th one"
6. Extract THE ENTIRE CODE between \`<!-- VIBE_X_START -->\` and \`<!-- VIBE_X_END -->\`
7. Save it to \`design-system.md\`
8. Ask: "Delete vibes-selection.tsx?"
9. Continue normally

### STEP 2B: If design-system.md EXISTS

Read it and use its content for frontend calls.

### STEP 3: Frontend Calls

For EVERY call (create_frontend, modify_frontend, snippet_frontend), you MUST pass:

- \`designSystem\`: Copy-paste the ENTIRE content of design-system.md (all the code, not a summary)
- \`context\`: Functional/business context WITH ALL REAL DATA. Include:
  - What it does, features, requirements
  - ALL real text/labels to display (status labels, button text, titles...)
  - ALL real data values (prices, stats, numbers...)
  - Enum values and their exact meaning
  - Any business-specific information

**WHY**: Gemini will use placeholders \`[Title]\`, \`[Price]\` for missing info. If you don't provide real data, you'll get placeholders or worse - fake data.

---

## FORBIDDEN

- Writing frontend without Gemini
- Skipping the vibes workflow when design-system.md is missing
- Extracting "rules" instead of THE ENTIRE code
- Manually creating design-system.md
- Passing design/styling info in \`context\` (that goes in \`designSystem\`)
- Summarizing the design system instead of copy-pasting it entirely
- Calling Gemini without providing real data (labels, stats, prices, etc.) → leads to fake info

## EXPECTED

- Check for design-system.md BEFORE anything
- Follow the complete vibes workflow if missing
- Pass the FULL design-system.md content in \`designSystem\`
- Pass functional context in \`context\` (purpose, features, requirements)

## EXCEPTIONS (you can code these yourself)

- Text-only changes
- JS logic without UI
- Non-visual bug fixes
- Data wiring (useQuery, etc.)`;

const MCP_BLOCKS: Record<string, string> = {
  'gemini-design': GEMINI_DESIGN_BLOCK,
  'ai-brain': '# MCP AI Brain - Multi-AI Debate & Code Review\n\n## Available Tools\n- `debate`: Launch a multi-AI debate (3 AI models argue different perspectives on a technical question). Costs 3 credits.\n- `quick_review`: Get a fast code review from an AI. Costs 1 credit.\n\n## When to Use\n- Use `debate` when facing architectural decisions, technology choices, or design trade-offs where multiple perspectives are valuable.\n- Use `quick_review` when you want a second opinion on a code snippet, function, or module.\n\n## Rules\n- Always present the debate results clearly with each AI\'s position and the final synthesis.\n- For `quick_review`, pass the relevant code snippet directly — don\'t summarize it.\n- Check the user\'s credit balance before launching expensive operations (debate = 3 credits).',
  'airtable': '# MCP Airtable\n\n## Quand utiliser\n- Pour CRUD sur des bases Airtable\n- Pour automatiser la gestion de donnees no-code\n\n## Regles\n- Verifier le nom de la base et table avant toute operation\n- Ne pas supprimer d\'enregistrements sans confirmation\n- Respecter les types de champs definis',
  'apify': '# MCP Apify\n\n## Quand utiliser\n- Pour du web scraping et extraction de donnees\n- Pour des donnees de reseaux sociaux\n\n## Regles\n- Respecter les robots.txt et conditions d\'utilisation\n- Ne pas scraper des donnees personnelles sans consentement\n- Utiliser des delais entre les requetes',
  'atlassian': '# MCP Atlassian\n\n## Quand utiliser\n- Pour gerer des tickets Jira et pages Confluence\n- Pour les sprints et backlogs agiles\n\n## Regles\n- Toujours specifier le projet pour les operations Jira\n- Utiliser JQL pour les recherches complexes\n- Ne pas modifier les pages Confluence partagees sans accord',
  'auth0': '# MCP Auth0\n\n## Quand utiliser\n- Pour gerer l\'authentification et les utilisateurs Auth0\n- Pour configurer des connexions OAuth\n\n## Regles\n- Ne jamais modifier les regles de production sans test\n- Verifier les permissions avant de les attribuer\n- Toujours utiliser HTTPS pour les callback URLs',
  'aws': '# MCP AWS\n\n## Quand utiliser\n- Pour gerer des ressources AWS (S3, Lambda, EC2, etc.)\n- Pour du monitoring CloudWatch\n\n## Regles\n- Toujours verifier la region avant les operations\n- Ne jamais supprimer de ressources sans confirmation\n- Utiliser des politiques IAM minimales\n- Verifier les couts avant de creer des ressources',
  'axiom': '# MCP Axiom\n\n## Quand utiliser\n- Pour analyser des logs et evenements\n- Pour des requetes APL sur vos datasets\n\n## Regles\n- Toujours specifier le dataset cible\n- Limiter les requetes dans le temps pour la performance\n- Utiliser des filtres precis pour eviter les scans complets',
  'blender-mcp': '# MCP Blender\n\n## Quand utiliser\n- Pour de la modelisation 3D assistee\n- Pour creer des scenes et animations\n\n## Regles\n- Commencer par des formes simples et iterer\n- Nommer les objets de maniere descriptive\n- Sauvegarder le fichier avant les operations complexes',
  'brave-search': '# MCP Brave Search - Web Search\n\n## When to Use\n- Use Brave Search when you need up-to-date information from the web (documentation, news, solutions to errors).\n- Prefer this over guessing or using outdated knowledge.\n\n## Rules\n- Always cite sources when presenting search results.\n- Use specific, targeted queries — avoid vague searches.\n- When searching for technical docs, include the version number or year in the query.\n- Summarize results concisely — don\'t dump raw search results to the user.',
  'browserbase': '# MCP Browserbase\n\n## Quand utiliser\n- Pour l\'automatisation web et les tests visuels\n- Pour le scraping avec rendu JavaScript\n\n## Regles\n- Respecter les conditions d\'utilisation des sites\n- Ne pas automatiser de connexions sur des services tiers sans autorisation\n- Utiliser des timeouts raisonnables',
  'cloudflare': '# MCP Cloudflare - Infrastructure Management\n\n## When to Use\n- Use for managing Cloudflare Workers, DNS records, KV stores, R2 buckets, and D1 databases.\n- Use for deploying and debugging Workers.\n\n## Rules\n- Always confirm before making destructive changes (deleting workers, DNS records, etc.).\n- When deploying, show a summary of changes before executing.\n- Never expose API tokens or account IDs in outputs.\n- Check Worker logs when debugging errors before making code changes.',
  'context7': '# MCP Context7 - Up-to-Date Documentation\n\n## When to Use\n- Use Context7 BEFORE writing code that depends on a library or framework.\n- Use when the user asks about a specific library\'s API, especially for recent versions.\n- Prefer Context7 over your built-in knowledge for any library documentation.\n\n## Rules\n- Always fetch the latest docs before suggesting API usage — your training data may be outdated.\n- When the user mentions a library, proactively check Context7 for the correct, current API.\n- Include code examples from the official docs when available.',
  'datadog': '# MCP Datadog\n\n## Quand utiliser\n- Pour monitorer des applications en production\n- Pour l\'investigation d\'incidents\n\n## Regles\n- Utiliser des tags pour filtrer les requetes\n- Ne pas creer de monitors trop sensibles (eviter les faux positifs)\n- Toujours specifier une fenetre temporelle',
  'desktop-commander': '# MCP Desktop Commander\n\n## Quand utiliser\n- Pour executer des commandes systeme\n- Pour la gestion avancee de fichiers\n\n## Regles\n- Ne jamais executer de commandes destructives sans confirmation\n- Verifier le repertoire courant avant les operations\n- Eviter les commandes avec sudo sauf si necessaire',
  'discord': '# MCP Discord\n\n## Quand utiliser\n- Pour interagir avec des serveurs Discord\n- Pour envoyer des messages et lire l\'historique\n\n## Regles\n- Ne jamais envoyer de messages sans confirmation\n- Respecter les permissions des channels\n- Ne pas spammer les channels',
  'docker': '# MCP Docker\n\n## Quand utiliser\n- Pour gerer des conteneurs Docker locaux ou distants\n\n## Regles\n- Ne pas supprimer de conteneurs en cours d\'execution sans confirmation\n- Toujours taguer les images avec des versions\n- Utiliser des volumes pour la persistance des donnees',
  'e2b': '# MCP E2B Code Interpreter\n\n## Quand utiliser\n- Pour executer du code dans un sandbox securise\n- Pour l\'analyse de donnees et la visualisation\n\n## Regles\n- Le sandbox est ephemere: les donnees sont perdues apres la session\n- Installer les dependances necessaires avant execution\n- Ne pas executer de code malveillant ou non fiable',
  'elasticsearch': '# MCP Elasticsearch\n\n## Quand utiliser\n- Pour la recherche full-text et les analytics\n- Pour gerer des index et des clusters\n\n## Regles\n- Definir les mappings avant d\'indexer\n- Utiliser des alias pour les mises a jour zero-downtime\n- Limiter les resultats avec size pour eviter les surcharges',
  'everart': '# MCP EverArt\n\n## Quand utiliser\n- Pour generer des images et illustrations\n- Pour des logos, mockups et visuels\n\n## Regles\n- Decrire precisement le style et les elements souhaites\n- Specifier les dimensions et le format\n- Iterer sur les resultats avec des prompts ajustes',
  'exa-search': '# MCP Exa Search\n\n## Quand utiliser\n- Pour des recherches web semantiques\n- Pour la veille technologique et concurrentielle\n\n## Regles\n- Utiliser des requetes precises pour de meilleurs resultats\n- Verifier la date des sources\n- Croiser les informations de plusieurs sources',
  'excalidraw': '# MCP Excalidraw\n\n## Quand utiliser\n- Pour creer des diagrammes et wireframes\n- Pour visualiser des architectures\n\n## Regles\n- Garder les diagrammes simples et lisibles\n- Utiliser des couleurs pour differencier les composants\n- Ajouter des labels a tous les elements',
  'fetch': '# MCP Fetch - HTTP Requests & Web Content\n\n## When to Use\n- Use to fetch content from URLs (web pages, APIs, documentation).\n- Use when the user provides a URL and wants you to read or analyze its content.\n\n## Rules\n- Never fetch URLs that could contain sensitive data without the user\'s explicit request.\n- For API responses, parse and present the JSON in a readable format.\n- Handle errors gracefully — if a fetch fails, explain what went wrong.\n- Respect rate limits — don\'t make rapid repeated requests to the same domain.',
  'figma': '# MCP Figma\n\n## Quand utiliser\n- Pour generer du code a partir de designs Figma\n- Pour inspecter les specs de design\n\n## Regles\n- Toujours respecter le design system existant\n- Generer du code responsive par defaut\n- Utiliser des composants reutilisables',
  'filesystem': '# MCP Filesystem - File System Access\n\n## When to Use\n- Use for reading, writing, and managing files on the user\'s local filesystem.\n- Use for exploring project structures, searching across files, and batch operations.\n\n## Rules\n- Never modify files outside the allowed directories without explicit permission.\n- Always read a file before modifying it — understand existing content first.\n- When creating files, check if the parent directory exists.\n- Prefer editing existing files over creating new ones to avoid file bloat.\n- Never write sensitive data (passwords, API keys) to files.',
  'firecrawl': '# MCP Firecrawl\n\n## Quand utiliser\n- Pour convertir des pages web en Markdown\n- Pour du crawling et extraction structuree\n\n## Regles\n- Respecter les limites de rate de l\'API\n- Utiliser le filtrage pour eviter le contenu irrelevant\n- Verifier la qualite du Markdown genere',
  'git': '# MCP Git - Version Control\n\n## When to Use\n- Use for all git operations: status, diff, log, branch, commit, merge.\n- Use to understand project history and changes.\n\n## Rules\n- NEVER run destructive git commands (push --force, reset --hard, clean -f) without explicit user confirmation.\n- Always check `git status` before committing to understand what will be included.\n- Write clear, descriptive commit messages that explain WHY, not just WHAT.\n- Never commit sensitive files (.env, credentials, API keys).\n- Prefer creating new commits over amending existing ones.',
  'github': '# MCP GitHub - GitHub API Integration\n\n## When to Use\n- Use for managing GitHub repositories: issues, pull requests, reviews, actions, releases.\n- Use `gh` CLI commands for all GitHub-related operations.\n\n## Rules\n- Always confirm before creating/closing issues or PRs — these actions are visible to the whole team.\n- When creating PRs, include a clear title (<70 chars), description with summary and test plan.\n- When reviewing PRs, read ALL commits, not just the latest one.\n- Never force-push to main/master without explicit permission.\n- Include relevant labels and assignees when creating issues.',
  'gitlab': '# MCP GitLab\n\n## Quand utiliser\n- Pour gerer des repos, MR et issues GitLab\n- Pour monitorer les pipelines CI/CD\n\n## Regles\n- Ne jamais merger sans review\n- Verifier le statut du pipeline avant de merger\n- Utiliser des labels pour organiser les issues',
  'google-calendar': '# MCP Google Calendar\n\n## Quand utiliser\n- Pour gerer des evenements de calendrier\n- Pour trouver des creneaux disponibles\n\n## Regles\n- Ne jamais creer d\'evenement sans confirmation\n- Toujours specifier le fuseau horaire\n- Verifier les conflits avant de creer un evenement',
  'google-drive': '# MCP Google Drive\n\n## Quand utiliser\n- Pour acceder aux fichiers Google Drive\n- Pour lire des Google Docs, Sheets, Slides\n\n## Regles\n- Respecter les permissions de partage\n- Ne pas telecharger de fichiers sensibles\n- Utiliser la recherche pour trouver des fichiers plutot que de tout lister',
  'google-maps': '# MCP Google Maps\n\n## Quand utiliser\n- Pour le geocodage et la recherche de lieux\n- Pour les calculs d\'itineraires et distances\n\n## Regles\n- Respecter les quotas de l\'API Google Maps\n- Utiliser des coordonnees precises quand possible\n- Specifier le mode de transport pour les itineraires',
  'google-workspace': '# MCP Google Workspace\n\n## Quand utiliser\n- Pour gerer Gmail, Calendar, Docs, Sheets et plus\n- Pour automatiser des workflows Google\n\n## Regles\n- Ne pas envoyer d\'emails sans confirmation\n- Respecter les permissions de partage\n- Ne pas modifier les documents partages sans accord',
  'grafana': '# MCP Grafana\n\n## Quand utiliser\n- Pour monitorer des applications via Grafana\n- Pour investiguer des incidents\n\n## Regles\n- Utiliser le mode read-only en production\n- Verifier les sources de donnees avant les requetes\n- Ne pas modifier les dashboards partages sans accord',
  'kubernetes': '# MCP Kubernetes\n\n## Quand utiliser\n- Pour gerer des clusters Kubernetes\n- Pour deployer, monitorer et debugger des pods\n\n## Regles\n- Toujours specifier le namespace\n- Ne jamais supprimer des ressources en production sans confirmation\n- Utiliser des labels pour organiser les ressources',
  'linear': '# MCP Linear\n\n## Quand utiliser\n- Pour gerer des issues et projets dans Linear\n- Pour tracker les sprints et backlogs\n\n## Regles\n- Toujours assigner une priorite aux issues\n- Utiliser des labels pour categoriser\n- Mettre a jour le statut quand le travail avance',
  'memory': '# MCP Memory - Persistent Knowledge Store\n\n## When to Use\n- Use to store and recall information across conversations: project context, user preferences, technical decisions, architecture choices.\n- Proactively save important context that will be useful in future sessions.\n\n## Rules\n- Store facts, not opinions — save concrete decisions and technical details.\n- Use clear, searchable entity names (e.g., "project-auth-system", "user-preference-testing").\n- Update existing memories when information changes — don\'t create duplicates.\n- When the user asks about a topic, check memory FIRST before asking them to repeat themselves.',
  'mintlify': '# MCP Mintlify\n\n## Quand utiliser\n- Pour generer de la documentation technique\n- Pour des docs API et README\n\n## Regles\n- Garder la documentation a jour avec le code\n- Inclure des exemples de code dans la doc\n- Utiliser un langage clair et concis',
  'mongodb': '# MCP MongoDB\n\n## Quand utiliser\n- Pour interagir avec des bases MongoDB\n- Pour des requetes NoSQL, agregations, CRUD\n\n## Regles\n- Toujours verifier la collection avant d\'inserer\n- Utiliser des index pour les requetes frequentes\n- Ne jamais supprimer une collection sans confirmation',
  'mysql': '# MCP MySQL\n\n## Quand utiliser\n- Pour interagir avec des bases MySQL/MariaDB/SQL Server\n\n## Regles\n- Toujours utiliser des requetes parametrees\n- Verifier l\'impact avant un ALTER TABLE\n- Faire un backup avant les operations destructives',
  'neon': '# MCP Neon\n\n## Quand utiliser\n- Pour gerer des bases PostgreSQL serverless Neon\n- Pour creer des branches, migrations\n\n## Regles\n- Tester les migrations sur une branche avant de merger\n- Ne jamais modifier la branche main directement\n- Toujours verifier le projet cible avant les operations',
  'notion': '# MCP Notion - Notion Workspace Integration\n\n## When to Use\n- Use to read, create, and update pages in the user\'s Notion workspace.\n- Use for managing documentation, meeting notes, project wikis, and databases.\n\n## Rules\n- Always search for existing pages before creating new ones to avoid duplicates.\n- Preserve existing page formatting and structure when updating content.\n- Use Notion\'s block types appropriately (headings, callouts, code blocks, tables).\n- Never delete pages without explicit user confirmation.',
  'obsidian': '# MCP Obsidian\n\n## Quand utiliser\n- Pour lire et ecrire dans un vault Obsidian\n- Pour la gestion de connaissances\n\n## Regles\n- Ne pas modifier de notes sans confirmation\n- Respecter la structure de dossiers existante\n- Utiliser des liens [[wikilinks]] pour connecter les notes',
  'openrouter': '# MCP OpenRouter\n\n## Quand utiliser\n- Pour acceder a plusieurs modeles IA\n- Pour comparer les reponses entre modeles\n\n## Regles\n- Choisir le modele adapte a la tache\n- Surveiller les couts d\'API\n- Utiliser des modeles plus petits pour les taches simples',
  'perplexity': '# MCP Perplexity\n\n## Quand utiliser\n- Pour des recherches qui necessitent des reponses sourcees\n- Pour de la veille technologique\n\n## Regles\n- Verifier les sources citees\n- Croiser avec d\'autres sources pour les informations critiques\n- Privilegier les recherches factuelles',
  'playwright': '# MCP Playwright - Browser Automation & Testing\n\n## When to Use\n- Use for end-to-end testing: navigating pages, filling forms, clicking buttons, verifying content.\n- Use for taking screenshots (visual regression, debugging).\n- Use for scraping/reading web page content that requires JavaScript rendering.\n\n## Rules\n- Always wait for elements to be visible/ready before interacting with them.\n- Take screenshots at key steps to document the test flow.\n- Use specific selectors (data-testid, aria-label) over fragile CSS selectors.\n- Clean up after tests — close browsers, clear state.\n- When testing forms, use realistic but fake test data (never real credentials).',
  'postgresql': '# MCP PostgreSQL - Database Management\n\n## When to Use\n- Use for exploring database schemas, running queries, and managing PostgreSQL databases.\n- Use for writing and optimizing SQL queries.\n\n## Rules\n- NEVER run DROP, TRUNCATE, or DELETE without WHERE clause without explicit user confirmation.\n- Always use transactions for multi-step data modifications.\n- Prefer SELECT queries to understand data before modifying it.\n- When suggesting indexes, explain the performance trade-offs.\n- Never expose connection strings or credentials in outputs.',
  'prisma': '# MCP Prisma\n\n## Quand utiliser\n- Pour gerer des schemas de base de donnees\n- Pour generer et appliquer des migrations\n- Pour construire des requetes type-safe\n\n## Regles\n- Toujours faire prisma generate apres un changement de schema\n- Tester les migrations sur un environnement de dev\n- Utiliser les relations Prisma plutot que des jointures manuelles',
  'puppeteer': '# MCP Puppeteer - Browser Automation\n\n## When to Use\n- Use for browser automation: navigating pages, interacting with elements, taking screenshots.\n- Use for testing web applications and scraping JavaScript-rendered content.\n\n## Rules\n- Always wait for page load and element visibility before interacting.\n- Take screenshots to verify visual state at important steps.\n- Handle navigation errors gracefully — pages may timeout or fail to load.\n- Close the browser when done to free resources.\n- Use headless mode by default for efficiency.',
  'qdrant': '# MCP Qdrant\n\n## Quand utiliser\n- Pour la recherche semantique et le RAG\n- Pour stocker et rechercher des embeddings\n\n## Regles\n- Verifier la dimension des vecteurs avant insertion\n- Utiliser des filtres pour affiner les recherches\n- Nommer les collections de maniere descriptive',
  'raygun': '# MCP Raygun\n\n## Quand utiliser\n- Pour investiguer des erreurs et crashes\n- Pour monitorer l\'experience utilisateur\n\n## Regles\n- Prioriser les erreurs par nombre d\'utilisateurs affectes\n- Corriger les erreurs critiques en premier\n- Verifier les regressions apres chaque deploiement',
  'remotion': '# MCP Remotion\n\n## Quand utiliser\n- Pour creer des videos programmatiques avec React\n- Pour generer des animations, transitions et effets visuels\n- Pour rendre des videos avec des donnees dynamiques\n\n## Regles\n- Toujours utiliser les composants Remotion (Composition, Sequence, AbsoluteFill)\n- Definir fps et durationInFrames pour chaque composition\n- Utiliser useCurrentFrame() et interpolate() pour les animations\n- Tester le rendu avec npx remotion preview avant le render final',
  'remotion-media': '# MCP Remotion Media\n\n## Quand utiliser\n- Pour generer des assets media (images, videos, musique, voix) pour Remotion\n- Pour ajouter des sous-titres automatiques a des videos\n\n## Prerequis\n- Cle API KIE (kie.ai) requise\n- Les fichiers generes sont sauvegardes dans public/\n\n## Regles\n- Toujours specifier les dimensions pour les images (1920x1080 par defaut)\n- Verifier les droits d\'utilisation des assets generes\n- Utiliser Whisper local pour les sous-titres (pas de cle API requise)',
  'resend': '# MCP Resend\n\n## Quand utiliser\n- Pour envoyer des emails transactionnels\n- Pour gerer des domaines et contacts\n\n## Regles\n- Toujours verifier le destinataire avant envoi\n- Ne jamais envoyer d\'emails en masse sans consentement\n- Tester les templates avant envoi en production',
  'rodumani': '# MCP Rodumani\n\n## Quand utiliser\n- Pour editer des videos via un editeur web Remotion\n- Pour couper, assembler et ajouter des effets\n\n## Regles\n- Verifier que le serveur Rodumani est lance localement\n- Toujours previsualiser avant d\'exporter\n- Supporter les formats mp4, webm et mov',
  'semgrep': '# MCP Semgrep\n\n## Quand utiliser\n- Pour scanner du code pour des vulnerabilites\n- Pour verifier les bonnes pratiques de securite\n\n## Regles\n- Scanner avant chaque merge en production\n- Prioriser les vulnerabilites par severite\n- Corriger les critiques immediatement',
  'sentry': '# MCP Sentry - Error Monitoring & Debugging\n\n## When to Use\n- Use to investigate errors, crashes, and performance issues reported in Sentry.\n- Use to check application stability and identify regressions.\n\n## Rules\n- When investigating an error, always fetch the full stack trace and context (breadcrumbs, tags, user info).\n- Group related errors together — don\'t treat each occurrence as a separate issue.\n- Prioritize errors by frequency and impact (users affected).\n- When suggesting fixes, reference the exact line from the stack trace.\n- Check if the error is a regression (was it recently introduced?).',
  'sequential-thinking': '# MCP Sequential Thinking - Step-by-Step Reasoning\n\n## When to Use\n- Use for complex problems that require structured, multi-step reasoning.\n- Use when you need to break down a large task into sequential, manageable steps.\n- Use for architectural planning, migration strategies, and debugging complex issues.\n\n## Rules\n- Think through each step thoroughly before moving to the next.\n- Make your reasoning transparent — show your thought process at each step.\n- Be willing to revise earlier steps if new information emerges.\n- Use this for PLANNING, not for simple tasks that don\'t need decomposition.',
  'shodan': '# MCP Shodan\n\n## Quand utiliser\n- Pour de la reconnaissance reseau et securite\n- Pour verifier l\'exposition de services\n\n## Regles\n- N\'utiliser que sur des infrastructures autorisees\n- Documenter toutes les analyses effectuees\n- Signaler immediatement les vulnerabilites critiques',
  'slack': '# MCP Slack\n\n## Quand utiliser\n- Pour envoyer/lire des messages Slack\n- Pour automatiser des notifications\n\n## Regles\n- Ne jamais envoyer de messages sans confirmation explicite\n- Respecter les channels prives\n- Utiliser des threads pour les reponses longues',
  'snyk': '# MCP Snyk\n\n## Quand utiliser\n- Pour scanner les dependances pour des vulnerabilites\n- Pour des audits de securite\n\n## Regles\n- Scanner regulierement, pas seulement au deploiement\n- Mettre a jour les deps vulnerables rapidement\n- Documenter les exceptions de securite',
  'sqlite': '# MCP SQLite\n\n## Quand utiliser\n- Pour interagir avec des bases SQLite locales\n- Pour analyser des donnees, executer des requetes SQL\n\n## Regles\n- Toujours faire un SELECT avant un UPDATE/DELETE\n- Ne jamais DROP TABLE sans confirmation explicite\n- Utiliser des transactions pour les operations multiples',
  'stripe': '# MCP Stripe\n\n## Quand utiliser\n- Pour gerer des paiements, abonnements et clients Stripe\n- Pour creer des produits et prix\n\n## Regles\n- Toujours utiliser le mode test pour le developpement\n- Ne jamais exposer les cles secretes\n- Verifier les montants avant de creer des charges',
  'supabase': '# MCP Supabase - Database & Backend Management\n\n## When to Use\n- Use for managing Supabase projects: tables, migrations, auth, edge functions, storage.\n- Use for writing and applying SQL migrations (DDL operations).\n- Use for querying data and debugging issues.\n\n## Rules\n- Always use `apply_migration` for DDL operations (CREATE TABLE, ALTER, etc.) — never raw `execute_sql`.\n- Enable RLS (Row Level Security) on all new tables by default.\n- Run security advisors after DDL changes to catch missing RLS policies.\n- Never expose service role keys in outputs.\n- When creating tables, always include `created_at` and `updated_at` timestamps.',
  'tavily': '# MCP Tavily\n\n## Quand utiliser\n- Pour des recherches web en temps reel\n- Pour alimenter des agents IA avec des donnees fraiches\n\n## Regles\n- Privilegier les sources fiables\n- Verifier les dates de publication\n- Utiliser le mode \'advanced\' pour les recherches complexes',
  'terraform': '# MCP Terraform\n\n## Quand utiliser\n- Pour generer du code Terraform HCL\n- Pour explorer la documentation des providers\n\n## Regles\n- Toujours faire terraform plan avant apply\n- Utiliser des modules pour la reutilisabilite\n- Stocker l\'etat dans un backend distant (S3, etc.)',
  'todoist': '# MCP Todoist\n\n## Quand utiliser\n- Pour gerer des taches et projets dans Todoist\n\n## Regles\n- Toujours assigner une priorite et une date\n- Ne pas supprimer de taches sans confirmation\n- Utiliser des projets pour organiser les taches',
  'turso': '# MCP Turso\n\n## Quand utiliser\n- Pour des bases SQLite distribuees/edge\n- Pour des applications qui necessite une latence faible\n\n## Regles\n- Utiliser des replicas pour la lecture\n- Synchroniser regulierement les replicas\n- Preferer Turso pour les apps edge/serverless',
  'twilio': '# MCP Twilio\n\n## Quand utiliser\n- Pour envoyer des SMS et gerer des communications\n\n## Regles\n- Verifier le numero de destination avant envoi\n- Ne jamais envoyer de messages en masse sans consentement\n- Respecter les reglementations telecoms locales',
  'upstash-redis': '# MCP Upstash Redis\n\n## Quand utiliser\n- Pour du cache, rate limiting, sessions\n- Pour des operations Redis serverless\n\n## Regles\n- Toujours definir un TTL pour les cles de cache\n- Ne jamais utiliser FLUSHALL sans confirmation\n- Utiliser des prefixes pour organiser les cles',
  'vercel': '# MCP Vercel\n\n## Quand utiliser\n- Pour deployer et gerer des projets sur Vercel\n- Pour configurer des variables d\'environnement et domaines\n\n## Regles\n- Toujours verifier l\'environnement cible (preview/production)\n- Ne pas exposer de secrets dans les logs\n- Utiliser les preview deployments pour tester',
};

export function getMcpBlock(id: string): string | undefined {
  return MCP_BLOCKS[id];
}

export function getMcpBlocks(ids: string[]): string[] {
  return ids.map((id) => MCP_BLOCKS[id]).filter((b): b is string => !!b);
}
