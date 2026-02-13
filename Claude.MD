# CLAUDE.md
# MCP Gemini Design - MANDATORY UNIQUE WORKFLOW

## ABSOLUTE RULE

You NEVER write frontend/UI code yourself. Gemini is your frontend developer.

---

## AVAILABLE TOOLS

### `generate_vibes`
Generates a visual page with 5 differently styled sections. The user opens the page, sees all 5 vibes, and picks their favorite. The code from the chosen vibe becomes the design-system.md.

### `create_frontend`
Creates a NEW complete file (page, component, section).

### `modify_frontend`
Makes ONE design modification to existing code. Returns a FIND/REPLACE block to apply.

### `snippet_frontend`
Generates a code snippet to INSERT into an existing file. For adding elements without rewriting the entire file.

---

## WORKFLOW (NO ALTERNATIVES)

### STEP 1: Check for design-system.md

BEFORE any frontend call → check if `design-system.md` exists at project root.

### STEP 2A: If design-system.md DOES NOT EXIST

1. Call `generate_vibes` with projectDescription, projectType, techStack
2. Receive the code for a page with 5 visual sections
3. Ask: "You don't have a design system. Can I create vibes-selection.tsx so you can visually choose your style?"
4. If yes → Write the page to the file
5. User chooses: "vibe 3" or "the 5th one"
6. Extract THE ENTIRE CODE between `<!-- VIBE_X_START -->` and `<!-- VIBE_X_END -->`
7. Save it to `design-system.md`
8. Ask: "Delete vibes-selection.tsx?"
9. Continue normally

### STEP 2B: If design-system.md EXISTS

Read it and use its content for frontend calls.

### STEP 3: Frontend Calls

For EVERY call (create_frontend, modify_frontend, snippet_frontend), you MUST pass:

- `designSystem`: Copy-paste the ENTIRE content of design-system.md (all the code, not a summary)
- `context`: Functional/business context WITH ALL REAL DATA. Include:
  - What it does, features, requirements
  - ALL real text/labels to display (status labels, button text, titles...)
  - ALL real data values (prices, stats, numbers...)
  - Enum values and their exact meaning
  - Any business-specific information

**WHY**: Gemini will use placeholders `[Title]`, `[Price]` for missing info. If you don't provide real data, you'll get placeholders or worse - fake data.

---

## FORBIDDEN

- Writing frontend without Gemini
- Skipping the vibes workflow when design-system.md is missing
- Extracting "rules" instead of THE ENTIRE code
- Manually creating design-system.md
- Passing design/styling info in `context` (that goes in `designSystem`)
- Summarizing the design system instead of copy-pasting it entirely
- Calling Gemini without providing real data (labels, stats, prices, etc.) → leads to fake info

## EXPECTED

- Check for design-system.md BEFORE anything
- Follow the complete vibes workflow if missing
- Pass the FULL design-system.md content in `designSystem`
- Pass functional context in `context` (purpose, features, requirements)

## EXCEPTIONS (you can code these yourself)

- Text-only changes
- JS logic without UI
- Non-visual bug fixes
- Data wiring (useQuery, etc.)
## Vue d’ensemble du projet

**Nom :** ClaudeMD Generator  
**Objectif :** Générer des `CLAUDE.md` de haute qualité à partir d’un questionnaire structuré, avec amélioration optionnelle via API GPT.  
**Utilisateurs cibles :** Développeurs, fondateurs, PM techniques, agences et équipes qui utilisent des agents de code.  
**Valeur principale :** Transformer le contexte projet en instructions agent concises, actionnables et universellement utiles.

---

## Objectifs produit (WHY)

1. Produire des `CLAUDE.md` :
   - concis
   - universellement applicables
   - à fort signal et faible bruit
2. Appliquer les bonnes pratiques :
   - peu de règles always-on
   - progressive disclosure via `agent_docs/*.md`
   - structure claire WHY / WHAT / HOW
3. Réduire le bruit d’instructions et améliorer la régularité des agents.

**Hors périmètre (pour l’instant) :**
- Outil complet de gestion de projet
- Indexation automatique de très grands mono-repos multi-organisations
- Modification automatique d’un repo utilisateur sans confirmation explicite

---

## Stack & architecture (WHAT)

> Si l’implémentation réelle diffère, cette section doit être mise à jour en priorité.

### Stack recommandée
- **Frontend :** Next.js (App Router), TypeScript, Tailwind
- **Backend :** API routes Next.js (ou service Node séparé)
- **Validation :** Zod
- **Base de données :** PostgreSQL + Prisma (ou Supabase)
- **Authentification :** NextAuth / Clerk (optionnel en v1)
- **IA :** OpenAI Responses API (modèle GPT configurable)
- **Observabilité :** logs structurés + suivi d’erreurs

### Modules principaux
- `apps/web` ou `/app` : interface, questionnaire, aperçu, export
- `src/lib/questionnaire` : schémas, scoring, normalisation
- `src/lib/generation` : construction de prompt, post-traitement
- `src/lib/templates` : templates `CLAUDE.md` canoniques
- `src/lib/quality` : règles de qualité/lint markdown
- `src/pages/api` ou `app/api` : endpoints de génération/export
- `agent_docs/` : documentation avancée optionnelle

### Modèle de données (conceptuel)
- Profil projet
- Réponses au questionnaire
- Sorties générées (versionnées)
- Rapport qualité (couverture, verbosité, nombre de règles)

---

## Règles de travail (HOW)

### Workflow principal
1. Capturer les réponses du questionnaire
2. Normaliser et valider les entrées
3. Construire le prompt à partir d’un template fiable
4. Générer le `CLAUDE.md`
5. Exécuter les contrôles qualité
6. Afficher un aperçu éditable
7. Exporter (`.md`, copier-coller, éventuel flux PR GitHub plus tard)

### Principes de génération
- Préférer une structure explicite à du texte libre
- Prioriser uniquement les règles universelles
- Garder une sortie concise (objectif < 300 lignes sauf justification)
- Déporter les détails spécifiques vers des docs référencées, pas dans le fichier racine


### Questionnaire pour généré .md

0) Identité du projet

Nom du projet

Type de projet (web, mobile, API, SaaS, infra, data, IA, desktop, autre)

Stade actuel (POC, MVP, production, scale)

Propriétaire (équipe/entreprise/client)

Environnement de développement principal (Windows/macOS/Linux)

Langage(s) principal(aux) du code

Langue souhaitée pour communiquer avec l’agent

1) Contexte business & produit (WHY)

Quel problème concret le projet résout-il ?

Qui sont les utilisateurs/personas cibles ?

Quel résultat utilisateur est attendu ?

Proposition de valeur principale ?

KPI de succès (conversion, rétention, latence, revenus, etc.)

Contraintes business non négociables (deadline, budget, SLA, conformité)

Éléments explicitement hors scope

2) Objectifs techniques

Objectif technique principal (fiabilité, vitesse, scalabilité, etc.)

Qualités prioritaires (lisibilité, testabilité, sécurité, etc.)

Dette technique existante

Composants critiques en production

Niveau de risque acceptable lors des changements

3) Cartographie du repo (WHAT)

Repo unique ou monorepo ?

Arborescence racine + rôle de chaque dossier clé

Apps/services principaux

Packages/libs partagés

Emplacement des contrats/types/schémas

Emplacement des configs globales

Emplacement des migrations DB

Emplacement des tests

Dossiers sensibles nécessitant validation

Fichiers générés à ne pas éditer manuellement

Zones legacy/fragiles connues

4) Stack & dépendances

Langages

Framework frontend

Framework backend

Base de données

ORM/query builder

Cache/queue/broker

Outils d’authentification

Outils d’observabilité

Outils CI/CD

Hébergement/infra

Gestionnaire de paquets

Versions runtime requises

Dépendances interdites/déconseillées

5) Setup local & commandes (HOW)

Commande d’installation

Commande de dev

Commande de build

Commande typecheck

Commande lint

Commande format

Commande tests unitaires

Commande tests intégration

Commande tests E2E

Commande codegen

Commande seed/reset DB

Commande environnement local complet (si microservices)

Prérequis système obligatoires

6) Environnements & configuration

Liste des environnements (local/staging/prod/preview)

Différences clés entre environnements

Source de vérité des variables d’environnement

Variables minimales requises en local

Règles de gestion des secrets

Ce qui ne doit jamais être loggé

Process d’ajout d’une nouvelle variable

7) Standards de code & conventions

Conventions de nommage

Style d’architecture préféré

Convention de gestion d’erreurs

Convention de logs

Convention commentaires/docstrings

Convention imports/alias

Convention API (REST/GraphQL/tRPC/gRPC)

Convention de versioning

Convention de structure de PR

Outils officiels linter/formatter

Règles bloquantes de lint/typecheck

8) Règles universelles always-on

Liste de 3 à 10 règles universelles à toujours respecter

Distinguer règles “hard” vs préférences “soft”

Compromis acceptables en urgence

9) Base de données & données

Source de vérité du schéma DB

Politique de migration

Politique seed/fake data

Politique de compatibilité des migrations prod

Tables/collections critiques

Contraintes d’intégrité à ne jamais violer

Contraintes PII/confidentialité

Notes backup/restauration

10) API & contrats

Emplacement des contrats

Politique de versioning API

Politique de breaking changes

Politique de format d’erreurs

Règles cœur AuthN/AuthZ

Politique rate limiting

Exigences d’idempotence

Politique validation des inputs

11) Sécurité & conformité

Exigences sécurité prioritaires

Exigences conformité (RGPD, etc.)

Politique secrets/tokens/clés

Politique d’accès aux données sensibles

Process de revue sécurité avant prod

Événements déclencheurs d’audit sécurité

12) Performance & fiabilité

Objectifs SLO/SLA

Objectifs performance clés (p95, TTFB, etc.)

Budgets performance

Stratégie de cache

Stratégie retry/timeout/circuit breaker

Stratégie de dégradation gracieuse

Goulots de contention connus

Zones d’optimisation prioritaires

13) Tests & qualité

Stratégie de test globale

Répartition cible (unit/intégration/E2E)

Seuil minimal de couverture (si applicable)

Cas critiques à toujours tester

Tests flaky connus

Outils de test

Checks obligatoires avant PR

Checks obligatoires avant déploiement prod

14) CI/CD & release

Étapes actuelles du pipeline CI

Conditions de merge

Stratégie de branches

Stratégie de release

Procédure de rollback

Checklist de release

Validateurs finaux

Process de hotfix

15) Observabilité & incidents

Emplacement des logs

Emplacement des métriques/alertes

Événements à tracer obligatoirement

Process de diagnostic incident rapide

Runbooks existants

Process post-mortem

KPI ops surveillés en continu

16) UX/UI & design system (si applicable)

Design system utilisé

Librairie UI

Niveau cible d’accessibilité

Priorités responsive

Règles de copy UI

Anti-patterns UI à éviter

Emplacement des design tokens

17) Internationalisation (si applicable)

Langues supportées

Stratégie i18n

Règles formats date/nombre/devise

Règles de pluralisation

Règles anti-hardcode

Process d’ajout d’une nouvelle locale

18) Data/IA/ML (si applicable)

Cas d’usage IA/ML

Sources de données

Contraintes de qualité data

Politique d’évaluation

Politique de gestion prompts/templates

Garde-fous safety

Politique de monitoring des modèles

Politique de versioning des modèles

19) Documentation & progressive disclosure

Docs utiles existantes (agent_docs/*.md, wiki, ADR...)

Description courte de chaque doc

Quand chaque doc doit être lue

Approbation requise avant lecture de docs sensibles ?

Emplacement des ADR

Docs obsolètes à ignorer

20) Préférences de collaboration avec l’agent

Types de tâches confiées à l’agent

Niveau d’autonomie attendu

Doit-il proposer un plan avant de coder ?

Format de réponse préféré

Niveau de détail préféré

Doit-il toujours expliquer les compromis ?

Préférence : changements minimaux vs refacto plus profond

Préférence : vitesse vs robustesse

Préférence : prototype vs production-ready

21) Politique de modification de code

L’agent peut-il créer des fichiers/dossiers ?

L’agent peut-il renommer/déplacer des fichiers ?

L’agent peut-il modifier le schéma DB ?

L’agent peut-il modifier CI/CD ?

L’agent peut-il ajouter/supprimer des dépendances ?

Actions nécessitant validation humaine explicite

Actions toujours interdites

22) Definition of Done (DoD)

La tâche est terminée quand...

Validation technique obligatoire

Validation produit/UX obligatoire

Validation sécurité obligatoire

Validation performance obligatoire

Livrables attendus (code/tests/docs/migrations/changelog)

Critères d’acceptation finaux

23) Exemples concrets bons/mauvais

Exemple de bonne PR

Exemple de mauvaise PR

Exemple de bon refactor

Exemple de mauvais refactor

Patterns à reproduire (références fichiers)

Anti-patterns à éviter (références fichiers)

24) Pièges connus

Bugs connus importants

Comportements contre-intuitifs

Outils instables/lents

Fausse bonne idée fréquente à éviter

Vérifications critiques avant toute intervention

25) Gouvernance

Qui valide les changements d’architecture ?

Qui valide les migrations DB ?

Qui valide les changements sécurité ?

Qui arbitre en cas de conflit technique ?

Canaux de communication

SLA de review attendu

26) Bloc always-on court

Écrire 5 à 8 règles universelles ultra-courtes à placer en haut du CLAUDE.md généré

27) Validation finale

Le fichier généré fait-il moins de ~300 lignes (sauf justification) ?

Toutes les règles sont-elles universellement applicables ?

Le bruit spécifique à une tâche est-il retiré du fichier racine ?

Les commandes cœur sont-elles complètes et exactes ?

Les docs de progressive disclosure sont-elles bien référencées ?

Les actions interdites et validations humaines sont-elles explicites ?

Un nouveau contributeur comprend-il le fichier en moins de 5 minutes ?

---

## Commandes

> Ces commandes doivent rester exactes. Toute modification doit être répercutée ici.

### Installation
```bash
pnpm install
