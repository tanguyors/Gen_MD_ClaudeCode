/**
 * Generates .claude/rules/*.md files from questionnaire data.
 * Rules are auto-loaded by Claude Code and can be path-targeted via globs.
 */

import type { Questionnaire } from '@/lib/questionnaire/types';
import { hasContent, renderKeyValueList } from '@/lib/templates/helpers';

export interface RuleFile {
  path: string;
  label: string;
  content: string;
  category: 'rules';
}

export interface RulesOutput {
  files: RuleFile[];
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function ruleFrontmatter(description: string, globs?: string[]): string {
  const lines = ['---', `description: ${description}`];
  if (globs?.length) {
    lines.push('globs:');
    for (const g of globs) {
      lines.push(`  - "${g}"`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

function kvSection(title: string, items: Array<[string, string | undefined]>): string {
  const list = renderKeyValueList(items);
  if (!list) return '';
  return `## ${title}\n\n${list}`;
}

// ── Main generator ──────────────────────────────────────────────────────────

export function generateRules(data: Partial<Questionnaire>): RulesOutput {
  const files: RuleFile[] = [];

  // ── code-style.md ─────────────────────────────────────────────────────
  if (hasContent(data.codeStandards as Record<string, unknown>)) {
    const c = data.codeStandards!;
    const parts: string[] = [];

    parts.push(ruleFrontmatter('Code conventions, naming, architecture and style rules'));

    const items: Array<[string, string | undefined]> = [
      ['Naming', c.namingConventions],
      ['Architecture', c.architectureStyle],
      ['Error handling', c.errorHandling],
      ['Logging', c.loggingConvention],
      ['Comments', c.commentConvention],
      ['Imports', c.importConvention],
      ['API style', c.apiConvention],
      ['Versioning', c.versioningConvention],
      ['PR structure', c.prStructure],
      ['Linter/Formatter', c.linterFormatter],
      ['Blocking lint rules', c.blockingLintRules],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(list);

    // Append detailed always-on rules if present
    if (data.alwaysOnRules?.universalRules?.length) {
      parts.push('');
      parts.push('## Always-On Rules');
      parts.push('');
      for (const r of data.alwaysOnRules.universalRules) {
        const prefix = r.isHard ? '[HARD]' : '[SOFT]';
        parts.push(`- ${prefix} ${r.rule}`);
      }
      if (data.alwaysOnRules.emergencyCompromises) {
        parts.push('');
        parts.push(`**Emergency compromises:** ${data.alwaysOnRules.emergencyCompromises}`);
      }
    }

    files.push({
      path: '.claude/rules/code-style.md',
      label: 'code-style',
      content: parts.join('\n'),
      category: 'rules',
    });
  }

  // ── security.md ───────────────────────────────────────────────────────
  if (hasContent(data.security as Record<string, unknown>)) {
    const s = data.security!;
    const section = kvSection('Security & Compliance', [
      ['Security priorities', s.securityPriorities],
      ['Compliance', s.complianceRequirements],
      ['Secrets policy', s.secretsPolicy],
      ['Sensitive data access', s.sensitiveDataAccess],
      ['Security review', s.securityReviewProcess],
      ['Audit triggers', s.auditTriggers],
    ]);
    if (section) {
      files.push({
        path: '.claude/rules/security.md',
        label: 'security',
        content: ruleFrontmatter('Security and compliance rules — always active') + section,
        category: 'rules',
      });
    }
  }

  // ── testing.md ────────────────────────────────────────────────────────
  if (hasContent(data.testing as Record<string, unknown>)) {
    const t = data.testing!;
    const section = kvSection('Testing & Quality', [
      ['Strategy', t.testStrategy],
      ['Distribution', t.testDistribution],
      ['Coverage threshold', t.coverageThreshold],
      ['Critical cases', t.criticalTestCases],
      ['Flaky tests', t.flakyTests],
      ['Tools', t.testTools],
      ['PR checks', t.prChecks],
      ['Prod checks', t.prodChecks],
    ]);
    if (section) {
      files.push({
        path: '.claude/rules/testing.md',
        label: 'testing',
        content: ruleFrontmatter('Testing conventions and quality rules', [
          '**/*.test.ts',
          '**/*.spec.ts',
          '**/*.test.tsx',
          '**/*.spec.tsx',
        ]) + section,
        category: 'rules',
      });
    }
  }

  // ── frontend.md ───────────────────────────────────────────────────────
  const hasUx = hasContent(data.uxUi as Record<string, unknown>);
  const hasWebDesign = hasContent(data.webDesignStyle as Record<string, unknown>);
  if (hasUx || hasWebDesign) {
    const parts: string[] = [];
    parts.push(ruleFrontmatter('Frontend, UI and design rules', ['**/*.tsx', '**/*.jsx']));

    if (hasUx) {
      const u = data.uxUi!;
      const section = kvSection('UX/UI', [
        ['Design system', u.designSystem],
        ['UI library', u.uiLibrary],
        ['Accessibility', u.accessibilityLevel],
        ['Responsive', u.responsivePriorities],
        ['Copy rules', u.copyRules],
        ['Anti-patterns', u.uiAntiPatterns],
        ['Design tokens', u.designTokensLocation],
      ]);
      if (section) parts.push(section);
    }

    if (hasWebDesign) {
      const d = data.webDesignStyle!;
      const section = kvSection('Web Design Style', [
        ['Layout style', d.layoutStyle],
        ['Visual style', d.visualStyle],
        ['Hero section', d.heroStyle],
        ['Design notes', d.designNotes],
      ]);
      if (section) parts.push(section);
    }

    if (parts.length > 1) {
      files.push({
        path: '.claude/rules/frontend.md',
        label: 'frontend',
        content: parts.join('\n\n'),
        category: 'rules',
      });
    }
  }

  // ── api.md ────────────────────────────────────────────────────────────
  if (hasContent(data.apiContracts as Record<string, unknown>)) {
    const a = data.apiContracts!;
    const section = kvSection('API & Contracts', [
      ['Contracts location', a.contractsLocation],
      ['API versioning', a.apiVersioning],
      ['Breaking changes', a.breakingChangePolicy],
      ['Error format', a.errorFormat],
      ['Auth rules', a.authRules],
      ['Rate limiting', a.rateLimiting],
      ['Idempotence', a.idempotence],
      ['Input validation', a.inputValidation],
    ]);
    if (section) {
      files.push({
        path: '.claude/rules/api.md',
        label: 'api',
        content: ruleFrontmatter('API conventions and contract rules', [
          'src/api/**',
          'app/api/**',
          '**/routes/**',
        ]) + section,
        category: 'rules',
      });
    }
  }

  // ── database.md ───────────────────────────────────────────────────────
  if (hasContent(data.database as Record<string, unknown>)) {
    const d = data.database!;
    const section = kvSection('Database & Data', [
      ['Schema source', d.schemaSource],
      ['Migration policy', d.migrationPolicy],
      ['Seed policy', d.seedPolicy],
      ['Prod migration compat', d.prodMigrationCompat],
      ['Critical tables', d.criticalTables],
      ['Integrity constraints', d.integrityConstraints],
      ['PII constraints', d.piiConstraints],
      ['Backup notes', d.backupNotes],
    ]);
    if (section) {
      files.push({
        path: '.claude/rules/database.md',
        label: 'database',
        content: ruleFrontmatter('Database conventions and migration rules', [
          '**/migrations/**',
          '**/schema.*',
          '**/prisma/**',
          '**/drizzle/**',
        ]) + section,
        category: 'rules',
      });
    }
  }

  // ── performance.md ────────────────────────────────────────────────────
  if (hasContent(data.performance as Record<string, unknown>)) {
    const p = data.performance!;
    const section = kvSection('Performance & Reliability', [
      ['SLO/SLA', p.sloSla],
      ['Targets', p.performanceTargets],
      ['Budgets', p.performanceBudgets],
      ['Cache strategy', p.cacheStrategy],
      ['Retry strategy', p.retryStrategy],
      ['Graceful degradation', p.gracefulDegradation],
      ['Bottlenecks', p.knownBottlenecks],
      ['Optimization priorities', p.optimizationPriorities],
    ]);
    if (section) {
      files.push({
        path: '.claude/rules/performance.md',
        label: 'performance',
        content: ruleFrontmatter('Performance targets and optimization rules') + section,
        category: 'rules',
      });
    }
  }

  // ── cicd.md ───────────────────────────────────────────────────────────
  if (hasContent(data.cicd as Record<string, unknown>)) {
    const c = data.cicd!;
    const section = kvSection('CI/CD & Release', [
      ['CI pipeline', c.ciPipeline],
      ['Merge conditions', c.mergeConditions],
      ['Branch strategy', c.branchStrategy],
      ['Release strategy', c.releaseStrategy],
      ['Rollback', c.rollbackProcedure],
      ['Release checklist', c.releaseChecklist],
      ['Final validators', c.finalValidators],
      ['Hotfix process', c.hotfixProcess],
    ]);
    if (section) {
      files.push({
        path: '.claude/rules/cicd.md',
        label: 'cicd',
        content: ruleFrontmatter('CI/CD and release rules', [
          '.github/**',
          'Dockerfile',
          'docker-compose.*',
        ]) + section,
        category: 'rules',
      });
    }
  }

  // ── observability.md ──────────────────────────────────────────────────
  if (hasContent(data.observability as Record<string, unknown>)) {
    const o = data.observability!;
    const section = kvSection('Observability & Incidents', [
      ['Logs location', o.logsLocation],
      ['Metrics location', o.metricsLocation],
      ['Mandatory events', o.mandatoryEvents],
      ['Incident diagnosis', o.incidentDiagnosis],
      ['Runbooks', o.runbooks],
      ['Post-mortem', o.postMortemProcess],
      ['Ops KPIs', o.opsKpis],
    ]);
    if (section) {
      files.push({
        path: '.claude/rules/observability.md',
        label: 'observability',
        content: ruleFrontmatter('Observability and incident response rules') + section,
        category: 'rules',
      });
    }
  }

  // ── i18n.md ───────────────────────────────────────────────────────────
  if (hasContent(data.i18n as Record<string, unknown>)) {
    const i = data.i18n!;
    const items: Array<[string, string | undefined]> = [
      ['Languages', i.supportedLanguages?.join(', ')],
      ['Strategy', i.i18nStrategy],
      ['Format rules', i.formatRules],
      ['Pluralization', i.pluralizationRules],
      ['Anti-hardcode', i.antiHardcodeRules],
      ['New locale', i.newLocaleProcess],
    ];
    const section = kvSection('Internationalization', items);
    if (section) {
      files.push({
        path: '.claude/rules/i18n.md',
        label: 'i18n',
        content: ruleFrontmatter('Internationalization rules', [
          '**/locales/**',
          '**/i18n/**',
          '**/*.locale.*',
        ]) + section,
        category: 'rules',
      });
    }
  }

  return { files };
}
