/**
 * Generates .claude/agents/ and .claude/skills/ stub files
 * based on questionnaire responses.
 * Pure function — no side effects, no React dependencies.
 */

import type { Questionnaire } from '@/lib/questionnaire/types';

export interface StubFile {
  /** Relative path from project root, e.g. ".claude/agents/security-reviewer.md" */
  path: string;
  /** Display name for tabs / UI */
  label: string;
  /** File content */
  content: string;
  /** Category for grouping */
  category: 'agent' | 'skill';
}

export interface StubsOutput {
  agents: StubFile[];
  skills: StubFile[];
}

// ── Generator ───────────────────────────────────────────────────────────────

export function generateStubs(data: Partial<Questionnaire>): StubsOutput {
  const agents: StubFile[] = [];
  const skills: StubFile[] = [];

  const projectName = data.identity?.projectName ?? 'Project';
  const langs = data.stack?.languages ?? [];
  const langStr = langs.length > 0 ? langs.join(', ') : 'the project language';

  // ── Agents ──────────────────────────────────────────────────────────

  // 1. Security Reviewer — if security section has content
  if (data.security && hasAnyField(data.security)) {
    const secPriorities = data.security.securityPriorities ?? '';
    const compliance = data.security.complianceRequirements ?? '';
    const secretPolicy = data.security.secretsPolicy ?? '';

    agents.push({
      path: '.claude/agents/security-reviewer.md',
      label: 'security-reviewer',
      category: 'agent',
      content: trimLines(`
# Security Reviewer Agent

You are a security-focused code reviewer for **${projectName}**.

## Role
Review code changes for security vulnerabilities, compliance issues, and secret leaks.

## Context
${secPriorities ? `- **Security priorities**: ${secPriorities}` : '- Follow OWASP Top 10 guidelines'}
${compliance ? `- **Compliance**: ${compliance}` : ''}
${secretPolicy ? `- **Secrets policy**: ${secretPolicy}` : '- Never commit secrets, tokens, or API keys'}

## Instructions
1. Check for injection vulnerabilities (SQL, XSS, command injection)
2. Verify authentication and authorization patterns
3. Ensure secrets are not hardcoded or logged
4. Validate input sanitization at system boundaries
5. Flag any compliance-related concerns
${data.security.securityReviewProcess ? `6. Follow the security review process: ${data.security.securityReviewProcess}` : ''}

## Output Format
For each finding:
- **Severity**: critical / high / medium / low
- **Location**: file:line
- **Issue**: what's wrong
- **Fix**: how to fix it
`),
    });
  }

  // 2. DB Migration Agent — if database section has content
  if (data.database && hasAnyField(data.database)) {
    const schemaSource = data.database.schemaSource ?? 'project schema files';
    const migrationPolicy = data.database.migrationPolicy ?? '';

    agents.push({
      path: '.claude/agents/db-migration.md',
      label: 'db-migration',
      category: 'agent',
      content: trimLines(`
# Database Migration Agent

You are a database migration specialist for **${projectName}**.

## Role
Create and review database migrations. Ensure schema changes are safe, reversible, and production-compatible.

## Context
- **Schema source of truth**: ${schemaSource}
${migrationPolicy ? `- **Migration policy**: ${migrationPolicy}` : ''}
${data.database.criticalTables ? `- **Critical tables** (extra caution): ${data.database.criticalTables}` : ''}
${data.database.integrityConstraints ? `- **Integrity constraints**: ${data.database.integrityConstraints}` : ''}

## Instructions
1. Always create reversible migrations (up + down)
2. Never drop columns/tables without explicit approval
3. Add indexes for new foreign keys
4. Test migration on a copy before applying to production
5. Check for data loss risks in ALTER statements
${data.database.prodMigrationCompat ? `6. Production compatibility: ${data.database.prodMigrationCompat}` : ''}

## Checklist Before Applying
- [ ] Migration is reversible
- [ ] No data loss
- [ ] Indexes added for new FKs
- [ ] Tested on staging/copy
- [ ] Backward compatible with current code
`),
    });
  }

  // 3. Test Writer Agent — if testing section has content
  if (data.testing && hasAnyField(data.testing)) {
    const strategy = data.testing.testStrategy ?? '';
    const ratio = data.testing.testDistribution ?? '';
    const tools = data.testing.testTools ?? '';

    agents.push({
      path: '.claude/agents/test-writer.md',
      label: 'test-writer',
      category: 'agent',
      content: trimLines(`
# Test Writer Agent

You are a testing specialist for **${projectName}**.

## Role
Write and improve tests. Ensure critical paths are covered and tests are reliable.

## Context
${strategy ? `- **Strategy**: ${strategy}` : '- Write unit tests for business logic, integration tests for API endpoints'}
${ratio ? `- **Target ratio**: ${ratio}` : ''}
${tools ? `- **Tools**: ${tools}` : ''}
${data.testing.coverageThreshold ? `- **Coverage threshold**: ${data.testing.coverageThreshold}` : ''}

## Instructions
1. Write tests that verify behavior, not implementation
2. Use descriptive test names: \`should [expected] when [condition]\`
3. Prefer integration tests for API endpoints
4. Mock external services, not internal modules
5. Every bug fix must include a regression test
${data.testing.criticalTestCases ? `6. Always test these critical cases: ${data.testing.criticalTestCases}` : ''}

## Anti-Patterns to Avoid
- Testing implementation details (private methods, internal state)
- Snapshot tests for dynamic content
- Tests that depend on execution order
${data.testing.flakyTests ? `- Known flaky tests: ${data.testing.flakyTests}` : ''}
`),
    });
  }

  // 4. Code Reviewer Agent — if code standards has content
  if (data.codeStandards && hasAnyField(data.codeStandards)) {
    agents.push({
      path: '.claude/agents/code-reviewer.md',
      label: 'code-reviewer',
      category: 'agent',
      content: trimLines(`
# Code Reviewer Agent

You are a code reviewer enforcing standards for **${projectName}**.

## Role
Review code for quality, consistency, and adherence to project conventions.

## Standards
${data.codeStandards.namingConventions ? `- **Naming**: ${data.codeStandards.namingConventions}` : ''}
${data.codeStandards.architectureStyle ? `- **Architecture**: ${data.codeStandards.architectureStyle}` : ''}
${data.codeStandards.errorHandling ? `- **Error handling**: ${data.codeStandards.errorHandling}` : ''}
${data.codeStandards.importConvention ? `- **Imports**: ${data.codeStandards.importConvention}` : ''}
${data.codeStandards.apiConvention ? `- **API style**: ${data.codeStandards.apiConvention}` : ''}

## Instructions
1. Check naming consistency across the codebase
2. Verify error handling follows conventions
3. Ensure imports use project aliases
4. Flag any anti-patterns or code smells
5. Suggest improvements without over-engineering

## Output Format
For each suggestion:
- **File**: path
- **Type**: style / bug / perf / suggestion
- **Comment**: what to change and why
`),
    });
  }

  // 5. DevOps/CI Agent — if cicd section has content
  if (data.cicd && hasAnyField(data.cicd)) {
    agents.push({
      path: '.claude/agents/devops.md',
      label: 'devops',
      category: 'agent',
      content: trimLines(`
# DevOps Agent

You are a CI/CD and deployment specialist for **${projectName}**.

## Role
Manage pipelines, deployments, and infrastructure changes.

## Context
${data.cicd.ciPipeline ? `- **Pipeline steps**: ${data.cicd.ciPipeline}` : ''}
${data.cicd.branchStrategy ? `- **Branch strategy**: ${data.cicd.branchStrategy}` : ''}
${data.cicd.releaseStrategy ? `- **Release strategy**: ${data.cicd.releaseStrategy}` : ''}
${data.cicd.rollbackProcedure ? `- **Rollback**: ${data.cicd.rollbackProcedure}` : ''}

## Instructions
1. Never deploy directly to production without staging validation
2. All pipeline changes require review
3. Keep deployment scripts idempotent
4. Maintain rollback capability for every release
${data.cicd.hotfixProcess ? `5. Hotfix process: ${data.cicd.hotfixProcess}` : ''}
`),
    });
  }

  // ── Skills ──────────────────────────────────────────────────────────

  // 1. DB Migration Skill — if database section has content
  if (data.database && hasAnyField(data.database)) {
    const orm = data.stack?.orm ?? '';
    const db = data.stack?.database ?? '';

    skills.push({
      path: '.claude/skills/db-migration.md',
      label: 'db-migration',
      category: 'skill',
      content: trimLines(`
# Skill: Create Database Migration

## Description
Create a new database migration file following project conventions.

## Steps
${orm ? `1. Use ${orm} migration CLI to generate a new migration file` : '1. Create a new migration file in the migrations directory'}
${db ? `2. Write the migration SQL/code for ${db}` : '2. Write the migration code'}
3. Add both \`up\` and \`down\` methods
4. Test the migration locally: run up, verify, run down, verify
5. Update schema types/models if needed
${data.database.schemaSource ? `6. Update schema source of truth: ${data.database.schemaSource}` : ''}

## Template
\`\`\`
-- Migration: [description]
-- Created: [date]

-- UP
[migration SQL]

-- DOWN
[rollback SQL]
\`\`\`
`),
    });
  }

  // 2. API Endpoint Skill — if apiContracts section has content
  if (data.apiContracts && hasAnyField(data.apiContracts)) {
    skills.push({
      path: '.claude/skills/new-api-endpoint.md',
      label: 'new-api-endpoint',
      category: 'skill',
      content: trimLines(`
# Skill: Create New API Endpoint

## Description
Add a new API endpoint following project conventions.

## Steps
1. Define the route and HTTP method
2. Add input validation with ${langStr.includes('TypeScript') ? 'Zod schema' : 'validation library'}
3. Implement the handler with proper error handling
${data.apiContracts.errorFormat ? `4. Use error format: ${data.apiContracts.errorFormat}` : '4. Return consistent error responses'}
${data.apiContracts.authRules ? `5. Apply auth rules: ${data.apiContracts.authRules}` : '5. Add authentication/authorization if needed'}
6. Add integration test for the new endpoint
${data.apiContracts.apiVersioning ? `7. Follow versioning policy: ${data.apiContracts.apiVersioning}` : ''}

## Checklist
- [ ] Input validated
- [ ] Auth applied
- [ ] Error handling consistent
- [ ] Rate limiting configured
- [ ] Test written
- [ ] Documented in API docs
`),
    });
  }

  // 3. New Component Skill — if uxUi section has content
  if (data.uxUi && hasAnyField(data.uxUi)) {
    skills.push({
      path: '.claude/skills/new-component.md',
      label: 'new-component',
      category: 'skill',
      content: trimLines(`
# Skill: Create New UI Component

## Description
Create a new UI component following the design system.

## Steps
${data.uxUi.designSystem ? `1. Check existing ${data.uxUi.designSystem} components first` : '1. Check existing design system components first'}
2. Create the component file in the appropriate directory
${data.uxUi.uiLibrary ? `3. Use ${data.uxUi.uiLibrary} as the base library` : '3. Use the project UI library'}
${data.uxUi.accessibilityLevel ? `4. Ensure ${data.uxUi.accessibilityLevel} accessibility compliance` : '4. Add ARIA labels and keyboard navigation'}
5. Add responsive styles for mobile/tablet/desktop
6. Write unit tests for component behavior
${data.uxUi.designTokensLocation ? `7. Use design tokens from: ${data.uxUi.designTokensLocation}` : ''}

## Anti-Patterns
${data.uxUi.uiAntiPatterns ? `${data.uxUi.uiAntiPatterns}` : '- Avoid inline styles\n- Don\'t duplicate existing components'}
`),
    });
  }

  // 4. Feature Flag / Deploy Skill — if cicd section has content
  if (data.cicd && hasAnyField(data.cicd)) {
    skills.push({
      path: '.claude/skills/deploy-checklist.md',
      label: 'deploy-checklist',
      category: 'skill',
      content: trimLines(`
# Skill: Deploy Checklist

## Description
Pre-deployment verification checklist.

## Before Deploy
- [ ] All tests pass locally
- [ ] CI pipeline is green
${data.cicd.mergeConditions ? `- [ ] Merge conditions met: ${data.cicd.mergeConditions}` : '- [ ] PR approved by at least one reviewer'}
${data.testing?.prChecks ? `- [ ] PR checks: ${data.testing.prChecks}` : ''}
- [ ] No console.log or debug code
- [ ] Migration tested on staging (if applicable)
- [ ] Environment variables configured

## During Deploy
${data.cicd.releaseStrategy ? `- Follow release strategy: ${data.cicd.releaseStrategy}` : '- Deploy to staging first, then production'}
- Monitor logs during rollout
- Watch error rates and latency

## After Deploy
- [ ] Smoke test critical user flows
- [ ] Check error monitoring dashboard
- [ ] Verify new features work in production
${data.cicd.rollbackProcedure ? `- **Rollback procedure**: ${data.cicd.rollbackProcedure}` : '- Ready to rollback if needed'}
`),
    });
  }

  // 5. i18n Skill — if i18n section has content
  if (data.i18n && hasAnyField(data.i18n)) {
    skills.push({
      path: '.claude/skills/add-translation.md',
      label: 'add-translation',
      category: 'skill',
      content: trimLines(`
# Skill: Add New Translation

## Description
Add translated strings for a new feature or component.

## Steps
${data.i18n.i18nStrategy ? `1. Follow i18n strategy: ${data.i18n.i18nStrategy}` : '1. Add keys to the default locale first'}
${data.i18n.supportedLanguages ? `2. Add translations for all supported languages: ${data.i18n.supportedLanguages}` : '2. Add translations for all supported locales'}
3. Use consistent key naming: \`section.component.label\`
4. Never hardcode user-facing strings
${data.i18n.pluralizationRules ? `5. Pluralization: ${data.i18n.pluralizationRules}` : '5. Handle pluralization correctly'}
${data.i18n.formatRules ? `6. Date/number formats: ${data.i18n.formatRules}` : '6. Use locale-aware date/number formatting'}

## Checklist
- [ ] All user-facing strings extracted
- [ ] Keys added to all locale files
- [ ] Pluralization handled
- [ ] No hardcoded strings remaining
`),
    });
  }

  return { agents, skills };
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function hasAnyField(obj: Record<string, unknown>): boolean {
  return Object.values(obj).some((v) => {
    if (v === null || v === undefined || v === '') return false;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'object') return hasAnyField(v as Record<string, unknown>);
    return true;
  });
}

function trimLines(str: string): string {
  return str
    .split('\n')
    .map((line) => line.trimStart())
    .join('\n')
    .replace(/^\n+/, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';
}
