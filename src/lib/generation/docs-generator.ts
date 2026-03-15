/**
 * Generates docs/*.md files for progressive disclosure.
 * These are referenced from CLAUDE.md and read on-demand by the agent.
 */

import type { Questionnaire } from '@/lib/questionnaire/types';
import { hasContent, renderKeyValueList } from '@/lib/templates/helpers';
import { getGeminiDesignWorkflow } from './mcp-blocks';

export interface DocFile {
  path: string;
  label: string;
  triggerHint: string;
  content: string;
  category: 'docs';
}

export interface DocsOutput {
  files: DocFile[];
}

// ── Main generator ──────────────────────────────────────────────────────────

export function generateDocs(data: Partial<Questionnaire>): DocsOutput {
  const files: DocFile[] = [];

  // ── business-goals.md ─────────────────────────────────────────────────
  const hasBiz = hasContent(data.business as Record<string, unknown>);
  const hasTech = hasContent(data.techGoals as Record<string, unknown>);
  if (hasBiz || hasTech) {
    const parts: string[] = ['# Business Goals & Technical Direction', ''];

    if (hasBiz) {
      const b = data.business!;
      if (b.problemSolved) {
        parts.push('## Problem');
        parts.push('');
        parts.push(b.problemSolved);
        parts.push('');
      }
      if (b.valueProposition || b.expectedOutcome) {
        parts.push('## Solution');
        parts.push('');
        if (b.valueProposition) parts.push(b.valueProposition);
        if (b.expectedOutcome) parts.push(`\n**Expected outcome:** ${b.expectedOutcome}`);
        parts.push('');
      }
      if (b.targetUsers) {
        parts.push('## Target Users');
        parts.push('');
        parts.push(b.targetUsers);
        parts.push('');
      }
      if (b.successKpis) {
        parts.push('## Success Metrics');
        parts.push('');
        parts.push(b.successKpis);
        parts.push('');
      }
      if (b.businessConstraints) {
        parts.push('## Constraints');
        parts.push('');
        parts.push(b.businessConstraints);
        parts.push('');
      }
      if (b.outOfScope) {
        parts.push('## Out of Scope');
        parts.push('');
        parts.push(b.outOfScope);
        parts.push('');
      }
    }

    if (hasTech) {
      const t = data.techGoals!;
      parts.push('## Technical Goals');
      parts.push('');
      const items: Array<[string, string | undefined]> = [
        ['Primary goal', t.primaryGoal],
        ['Priority qualities', t.priorityQualities?.join(', ')],
        ['Existing tech debt', t.existingTechDebt],
        ['Critical components', t.criticalComponents],
        ['Risk tolerance', t.riskTolerance],
      ];
      const list = renderKeyValueList(items);
      if (list) parts.push(list);
    }

    files.push({
      path: 'docs/business-goals.md',
      label: 'business-goals',
      triggerHint: 'before product decisions',
      content: parts.join('\n'),
      category: 'docs',
    });
  }

  // ── architecture.md ───────────────────────────────────────────────────
  const hasRepo = hasContent(data.repoMap as Record<string, unknown>);
  const hasEnv = hasContent(data.environments as Record<string, unknown>);
  const hasStack = hasContent(data.stack as Record<string, unknown>);
  if (hasRepo || hasEnv || hasStack) {
    const parts: string[] = ['# Architecture & Infrastructure', ''];

    if (hasStack && !data.stack?._claudeDecide) {
      const s = data.stack!;
      const items: Array<[string, string | undefined]> = [
        ['Languages', s.languages?.join(', ')],
        ['Frontend', s.frontendFramework],
        ['Backend', s.backendFramework],
        ['Database', s.database],
        ['ORM', s.orm],
        ['Cache/Queue', s.cacheQueueBroker],
        ['Auth', s.authTools],
        ['Observability', s.observabilityTools],
        ['CI/CD', s.cicdTools],
        ['Hosting', s.hosting],
        ['Package manager', s.packageManager],
        ['Runtime versions', s.runtimeVersions],
        ['Forbidden deps', s.forbiddenDeps],
      ];
      const list = renderKeyValueList(items);
      if (list) {
        parts.push('## Stack Details');
        parts.push('');
        parts.push(list);
        parts.push('');
      }
    }

    if (hasRepo) {
      const r = data.repoMap!;
      const items: Array<[string, string | undefined]> = [
        ['Repo type', r.repoType],
        ['Main apps', r.mainApps],
        ['Shared packages', r.sharedPackages],
        ['Contracts location', r.contractsLocation],
        ['Config location', r.globalConfigLocation],
        ['Migrations location', r.migrationsLocation],
        ['Tests location', r.testsLocation],
        ['Sensitive dirs', r.sensitiveDirs],
        ['Generated files', r.generatedFiles],
        ['Legacy zones', r.legacyZones],
      ];
      const list = renderKeyValueList(items);
      if (list) {
        parts.push('## Repo Map');
        parts.push('');
        parts.push(list);
        parts.push('');
      }
      if (r.directoryStructure) {
        parts.push('## Directory Structure');
        parts.push('');
        parts.push(`\`\`\`\n${r.directoryStructure}\n\`\`\``);
        parts.push('');
      }
    }

    if (hasEnv) {
      const e = data.environments!;
      const items: Array<[string, string | undefined]> = [
        ['Environments', e.environmentList],
        ['Key differences', e.envDifferences],
        ['Env vars source', e.envVarsSource],
        ['Required local vars', e.requiredLocalVars],
        ['Secrets policy', e.secretsPolicy],
        ['Never log', e.neverLog],
        ['New var process', e.newVarProcess],
      ];
      const list = renderKeyValueList(items);
      if (list) {
        parts.push('## Environments & Configuration');
        parts.push('');
        parts.push(list);
      }
    }

    files.push({
      path: 'docs/architecture.md',
      label: 'architecture',
      triggerHint: 'before changing project structure',
      content: parts.join('\n'),
      category: 'docs',
    });
  }

  // ── collaboration.md ──────────────────────────────────────────────────
  const hasPrefs = hasContent(data.agentPrefs as Record<string, unknown>);
  const hasPolicy = hasContent(data.codePolicy as Record<string, unknown>);
  const hasDod = hasContent(data.dod as Record<string, unknown>);
  const hasGov = hasContent(data.governance as Record<string, unknown>);
  const hasDoc = hasContent(data.documentation as Record<string, unknown>);
  if (hasPrefs || hasPolicy || hasDod || hasGov || hasDoc) {
    const parts: string[] = ['# Collaboration & Governance', ''];

    if (hasPrefs) {
      const a = data.agentPrefs!;
      const items: Array<[string, string | undefined]> = [
        ['Task types', a.taskTypes],
        ['Autonomy', a.autonomyLevel],
        ['Plan before coding', a.planBeforeCoding != null ? (a.planBeforeCoding ? 'Yes' : 'No') : undefined],
        ['Response format', a.responseFormat],
        ['Detail level', a.detailLevel],
        ['Explain tradeoffs', a.alwaysExplainTradeoffs != null ? (a.alwaysExplainTradeoffs ? 'Yes' : 'No') : undefined],
        ['Change preference', a.changePreference],
        ['Speed vs robustness', a.speedVsRobustness],
        ['Prototype vs production', a.prototypeVsProduction],
      ];
      const list = renderKeyValueList(items);
      if (list) {
        parts.push('## Agent Preferences');
        parts.push('');
        parts.push(list);
        parts.push('');
      }
    }

    if (hasPolicy) {
      const c = data.codePolicy!;
      const boolItems: string[] = [];
      if (c.canCreateFiles != null) boolItems.push(`- Can create files: ${c.canCreateFiles ? 'Yes' : 'No'}`);
      if (c.canRenameMove != null) boolItems.push(`- Can rename/move: ${c.canRenameMove ? 'Yes' : 'No'}`);
      if (c.canModifyDbSchema != null) boolItems.push(`- Can modify DB schema: ${c.canModifyDbSchema ? 'Yes' : 'No'}`);
      if (c.canModifyCiCd != null) boolItems.push(`- Can modify CI/CD: ${c.canModifyCiCd ? 'Yes' : 'No'}`);
      if (c.canAddRemoveDeps != null) boolItems.push(`- Can add/remove deps: ${c.canAddRemoveDeps ? 'Yes' : 'No'}`);
      if (c.humanValidationRequired) boolItems.push(`- **Human validation required:** ${c.humanValidationRequired}`);
      if (c.alwaysForbidden) boolItems.push(`- **Always forbidden:** ${c.alwaysForbidden}`);
      if (boolItems.length) {
        parts.push('## Code Modification Policy');
        parts.push('');
        parts.push(boolItems.join('\n'));
        parts.push('');
      }
    }

    if (hasDod) {
      const d = data.dod!;
      const items: Array<[string, string | undefined]> = [
        ['Done when', d.doneWhen],
        ['Technical validation', d.technicalValidation],
        ['Product validation', d.productValidation],
        ['Security validation', d.securityValidation],
        ['Performance validation', d.performanceValidation],
        ['Deliverables', d.expectedDeliverables],
        ['Acceptance criteria', d.acceptanceCriteria],
      ];
      const list = renderKeyValueList(items);
      if (list) {
        parts.push('## Definition of Done');
        parts.push('');
        parts.push(list);
        parts.push('');
      }
    }

    if (hasGov) {
      const g = data.governance!;
      const items: Array<[string, string | undefined]> = [
        ['Architecture validator', g.architectureValidator],
        ['DB migration validator', g.dbMigrationValidator],
        ['Security validator', g.securityValidator],
        ['Conflict arbiter', g.conflictArbiter],
        ['Communication', g.communicationChannels],
        ['Review SLA', g.reviewSla],
      ];
      const list = renderKeyValueList(items);
      if (list) {
        parts.push('## Governance');
        parts.push('');
        parts.push(list);
        parts.push('');
      }
    }

    if (hasDoc) {
      const d = data.documentation!;
      const items: Array<[string, string | undefined]> = [
        ['Existing docs', d.existingDocs],
        ['Descriptions', d.docDescriptions],
        ['When to read', d.whenToRead],
        ['ADR location', d.adrLocation],
        ['Obsolete docs', d.obsoleteDocs],
      ];
      const list = renderKeyValueList(items);
      if (list) {
        parts.push('## Documentation');
        parts.push('');
        parts.push(list);
      }
    }

    files.push({
      path: 'docs/collaboration.md',
      label: 'collaboration',
      triggerHint: 'for team practices and DoD',
      content: parts.join('\n'),
      category: 'docs',
    });
  }

  // ── examples-pitfalls.md ──────────────────────────────────────────────
  const hasExamples = hasContent(data.examples as Record<string, unknown>);
  const hasPitfalls = hasContent(data.pitfalls as Record<string, unknown>);
  if (hasExamples || hasPitfalls) {
    const parts: string[] = ['# Examples & Known Pitfalls', ''];

    if (hasExamples) {
      const e = data.examples!;
      const items: Array<[string, string | undefined]> = [
        ['Good PR', e.goodPrExample],
        ['Bad PR', e.badPrExample],
        ['Good refactor', e.goodRefactorExample],
        ['Bad refactor', e.badRefactorExample],
        ['Patterns to follow', e.patternsToFollow],
        ['Anti-patterns', e.antiPatterns],
      ];
      const list = renderKeyValueList(items);
      if (list) {
        parts.push('## Examples');
        parts.push('');
        parts.push(list);
        parts.push('');
      }
    }

    if (hasPitfalls) {
      const p = data.pitfalls!;
      const items: Array<[string, string | undefined]> = [
        ['Known bugs', p.knownBugs],
        ['Counter-intuitive behaviors', p.counterIntuitiveBehaviors],
        ['Unstable tools', p.unstableTools],
        ['False good ideas', p.falseGoodIdeas],
        ['Critical checks', p.criticalChecks],
      ];
      const list = renderKeyValueList(items);
      if (list) {
        parts.push('## Known Pitfalls');
        parts.push('');
        parts.push(list);
      }
    }

    files.push({
      path: 'docs/examples-pitfalls.md',
      label: 'examples-pitfalls',
      triggerHint: 'for reference patterns and anti-patterns',
      content: parts.join('\n'),
      category: 'docs',
    });
  }

  // ── ai-ml.md ──────────────────────────────────────────────────────────
  if (hasContent(data.aiMl as Record<string, unknown>)) {
    const a = data.aiMl!;
    const items: Array<[string, string | undefined]> = [
      ['Use cases', a.useCases],
      ['Data sources', a.dataSources],
      ['Data quality', a.dataQualityConstraints],
      ['Evaluation', a.evaluationPolicy],
      ['Prompt management', a.promptManagement],
      ['Safety', a.safetyGuardrails],
      ['Monitoring', a.modelMonitoring],
      ['Versioning', a.modelVersioning],
    ];
    const list = renderKeyValueList(items);
    if (list) {
      files.push({
        path: 'docs/ai-ml.md',
        label: 'ai-ml',
        triggerHint: 'before working on AI features',
        content: `# AI/ML\n\n${list}\n`,
        category: 'docs',
      });
    }
  }

  // ── mcp-workflows/gemini-design.md ────────────────────────────────────
  const mcpIds = data.references?.mcpIntegrations ?? [];
  if (mcpIds.includes('gemini-design')) {
    const workflow = getGeminiDesignWorkflow();
    if (workflow) {
      files.push({
        path: 'docs/mcp-workflows/gemini-design.md',
        label: 'gemini-design',
        triggerHint: 'BEFORE any UI/frontend work',
        content: workflow,
        category: 'docs',
      });
    }
  }

  return { files };
}
