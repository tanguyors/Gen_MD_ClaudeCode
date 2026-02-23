import type { Questionnaire } from '@/lib/questionnaire/types';
import { hasContent, renderKeyValueList, renderBulletList, renderSection } from '@/lib/templates/helpers';
import { renderAlwaysOnBlock, renderCommandsSection, renderAlwaysOnRulesSection } from '@/lib/templates/sections';
import { getMcpBlocks } from '@/lib/generation/mcp-blocks';

export function generateFromTemplate(data: Partial<Questionnaire>): string {
  const sections: string[] = [];

  // Always-on block at the top
  if (data.alwaysOnBlock?.shortRules?.length) {
    sections.push(renderAlwaysOnBlock(data.alwaysOnBlock.shortRules));
  }

  // Project header
  const header = renderProjectHeader(data);
  if (header) sections.push(header);

  // Agent Team section (if enabled)
  if (data.identity?.useAgentTeam && data.agentTeam?.members?.length) {
    const agentTeam = renderAgentTeamSection(data);
    if (agentTeam) sections.push(agentTeam);
  }

  // References & Inspirations
  const refs = renderReferencesSection(data);
  if (refs) sections.push(refs);

  // MCP Integration blocks
  if (data.references?.mcpIntegrations?.length) {
    const mcpBlocks = getMcpBlocks(data.references.mcpIntegrations);
    for (const block of mcpBlocks) {
      sections.push(block);
    }
  }

  // WHY section
  const why = renderWhySection(data);
  if (why) sections.push(why);

  // WHAT section
  const what = renderWhatSection(data);
  if (what) sections.push(what);

  // HOW section
  const how = renderHowSection(data);
  if (how) sections.push(how);

  // Supplementary sections
  const supp = renderSupplementarySection(data);
  if (supp) sections.push(supp);

  // Appendix
  const appendix = renderAppendixSection(data);
  if (appendix) sections.push(appendix);

  return sections.filter(Boolean).join('\n\n---\n\n');
}

function renderProjectHeader(data: Partial<Questionnaire>): string {
  const id = data.identity;
  if (!id) return '';
  const lines = [
    `# ${id.projectName}`,
    '',
    `**Type:** ${id.projectType} | **Stage:** ${id.currentStage}`,
  ];
  if (id.owner) lines.push(`**Owner:** ${id.owner}`);
  if (data.stack?.languages?.length) {
    lines.push(`**Languages:** ${data.stack.languages.join(', ')}`);
  }
  if (id.devEnvironment) lines.push(`**Dev Environment:** ${id.devEnvironment}`);
  return lines.join('\n');
}

function renderReferencesSection(data: Partial<Questionnaire>): string {
  const refs = data.references;
  if (!refs) return '';
  const urls = refs.referenceUrls?.filter((r) => r.url?.trim());
  if (!urls?.length && !refs.designNotes) return '';

  const lines: string[] = [];
  if (urls?.length) {
    lines.push('### Reference Links');
    lines.push('');
    lines.push('> Claude: fetch these URLs for context on project preferences.');
    lines.push('');
    for (const ref of urls) {
      const desc = ref.description ? ` — ${ref.description}` : '';
      lines.push(`- ${ref.url}${desc}`);
    }
  }
  if (refs.designNotes) {
    lines.push('');
    lines.push('### Design & Style Preferences');
    lines.push('');
    lines.push(refs.designNotes);
  }
  return renderSection('References & Inspirations', 2, lines.join('\n'));
}

function renderWhySection(data: Partial<Questionnaire>): string {
  const parts: string[] = [];

  if (hasContent(data.business as Record<string, unknown>)) {
    const b = data.business!;
    const items: Array<[string, string | undefined]> = [
      ['Problem', b.problemSolved],
      ['Users', b.targetUsers],
      ['Expected outcome', b.expectedOutcome],
      ['Value proposition', b.valueProposition],
      ['Success KPIs', b.successKpis],
      ['Constraints', b.businessConstraints],
      ['Out of scope', b.outOfScope],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(list);
  }

  if (hasContent(data.techGoals as Record<string, unknown>)) {
    const t = data.techGoals!;
    const items: Array<[string, string | undefined]> = [
      ['Primary technical goal', t.primaryGoal],
      ['Priority qualities', t.priorityQualities?.join(', ')],
      ['Existing tech debt', t.existingTechDebt],
      ['Critical components', t.criticalComponents],
      ['Risk tolerance', t.riskTolerance],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(list);
  }

  return parts.length > 0 ? renderSection('WHY (Business Context & Goals)', 2, parts.join('\n\n')) : '';
}

function renderWhatSection(data: Partial<Questionnaire>): string {
  const parts: string[] = [];

  if (hasContent(data.repoMap as Record<string, unknown>)) {
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
    if (list) parts.push(renderSection('Repo Map', 3, list));
    if (r.directoryStructure) {
      parts.push(renderSection('Directory Structure', 3, `\`\`\`\n${r.directoryStructure}\n\`\`\``));
    }
  }

  if (data.stack?._claudeDecide) {
    parts.push(renderSection('Stack', 3, '> **Agent:** Analyze the project structure, `package.json`, config files, and codebase to determine the full tech stack. Document your findings here before proceeding.'));
  } else if (hasContent(data.stack as Record<string, unknown>)) {
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
    if (list) parts.push(renderSection('Stack', 3, list));
  }

  if (hasContent(data.database as Record<string, unknown>)) {
    const d = data.database!;
    const items: Array<[string, string | undefined]> = [
      ['Schema source', d.schemaSource],
      ['Migration policy', d.migrationPolicy],
      ['Seed policy', d.seedPolicy],
      ['Prod migration compat', d.prodMigrationCompat],
      ['Critical tables', d.criticalTables],
      ['Integrity constraints', d.integrityConstraints],
      ['PII constraints', d.piiConstraints],
      ['Backup notes', d.backupNotes],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(renderSection('Database', 3, list));
  }

  if (hasContent(data.apiContracts as Record<string, unknown>)) {
    const a = data.apiContracts!;
    const items: Array<[string, string | undefined]> = [
      ['Contracts location', a.contractsLocation],
      ['API versioning', a.apiVersioning],
      ['Breaking changes', a.breakingChangePolicy],
      ['Error format', a.errorFormat],
      ['Auth rules', a.authRules],
      ['Rate limiting', a.rateLimiting],
      ['Idempotence', a.idempotence],
      ['Input validation', a.inputValidation],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(renderSection('API & Contracts', 3, list));
  }

  if (hasContent(data.environments as Record<string, unknown>)) {
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
    if (list) parts.push(renderSection('Environments', 3, list));
  }

  return parts.length > 0 ? renderSection('WHAT (Architecture & Stack)', 2, parts.join('\n\n')) : '';
}

function renderHowSection(data: Partial<Questionnaire>): string {
  const parts: string[] = [];

  if (hasContent(data.commands as Record<string, unknown>)) {
    const cmds = renderCommandsSection(data.commands!);
    if (cmds) parts.push(renderSection('Commands', 3, cmds));
  }

  if (hasContent(data.codeStandards as Record<string, unknown>)) {
    const c = data.codeStandards!;
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
    if (list) parts.push(renderSection('Code Standards', 3, list));
  }

  if (hasContent(data.alwaysOnRules as Record<string, unknown>)) {
    const rules = renderAlwaysOnRulesSection(data.alwaysOnRules!);
    if (rules) parts.push(renderSection('Always-On Rules (Detailed)', 3, rules));
  }

  if (hasContent(data.security as Record<string, unknown>)) {
    const s = data.security!;
    const items: Array<[string, string | undefined]> = [
      ['Security priorities', s.securityPriorities],
      ['Compliance', s.complianceRequirements],
      ['Secrets policy', s.secretsPolicy],
      ['Sensitive data access', s.sensitiveDataAccess],
      ['Security review', s.securityReviewProcess],
      ['Audit triggers', s.auditTriggers],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(renderSection('Security', 3, list));
  }

  if (hasContent(data.performance as Record<string, unknown>)) {
    const p = data.performance!;
    const items: Array<[string, string | undefined]> = [
      ['SLO/SLA', p.sloSla],
      ['Targets', p.performanceTargets],
      ['Budgets', p.performanceBudgets],
      ['Cache strategy', p.cacheStrategy],
      ['Retry strategy', p.retryStrategy],
      ['Graceful degradation', p.gracefulDegradation],
      ['Bottlenecks', p.knownBottlenecks],
      ['Optimization priorities', p.optimizationPriorities],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(renderSection('Performance', 3, list));
  }

  if (hasContent(data.testing as Record<string, unknown>)) {
    const t = data.testing!;
    const items: Array<[string, string | undefined]> = [
      ['Strategy', t.testStrategy],
      ['Distribution', t.testDistribution],
      ['Coverage threshold', t.coverageThreshold],
      ['Critical cases', t.criticalTestCases],
      ['Flaky tests', t.flakyTests],
      ['Tools', t.testTools],
      ['PR checks', t.prChecks],
      ['Prod checks', t.prodChecks],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(renderSection('Testing', 3, list));
  }

  if (hasContent(data.cicd as Record<string, unknown>)) {
    const c = data.cicd!;
    const items: Array<[string, string | undefined]> = [
      ['CI pipeline', c.ciPipeline],
      ['Merge conditions', c.mergeConditions],
      ['Branch strategy', c.branchStrategy],
      ['Release strategy', c.releaseStrategy],
      ['Rollback', c.rollbackProcedure],
      ['Release checklist', c.releaseChecklist],
      ['Final validators', c.finalValidators],
      ['Hotfix process', c.hotfixProcess],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(renderSection('CI/CD', 3, list));
  }

  if (hasContent(data.observability as Record<string, unknown>)) {
    const o = data.observability!;
    const items: Array<[string, string | undefined]> = [
      ['Logs location', o.logsLocation],
      ['Metrics location', o.metricsLocation],
      ['Mandatory events', o.mandatoryEvents],
      ['Incident diagnosis', o.incidentDiagnosis],
      ['Runbooks', o.runbooks],
      ['Post-mortem', o.postMortemProcess],
      ['Ops KPIs', o.opsKpis],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(renderSection('Observability', 3, list));
  }

  return parts.length > 0 ? renderSection('HOW (Working Rules)', 2, parts.join('\n\n')) : '';
}

function renderSupplementarySection(data: Partial<Questionnaire>): string {
  const parts: string[] = [];

  if (hasContent(data.uxUi as Record<string, unknown>)) {
    const u = data.uxUi!;
    const items: Array<[string, string | undefined]> = [
      ['Design system', u.designSystem],
      ['UI library', u.uiLibrary],
      ['Accessibility', u.accessibilityLevel],
      ['Responsive', u.responsivePriorities],
      ['Copy rules', u.copyRules],
      ['Anti-patterns', u.uiAntiPatterns],
      ['Design tokens', u.designTokensLocation],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(renderSection('UX/UI', 3, list));
  }

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
    const list = renderKeyValueList(items);
    if (list) parts.push(renderSection('i18n', 3, list));
  }

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
    if (list) parts.push(renderSection('AI/ML', 3, list));
  }

  if (hasContent(data.documentation as Record<string, unknown>)) {
    const d = data.documentation!;
    const items: Array<[string, string | undefined]> = [
      ['Existing docs', d.existingDocs],
      ['Descriptions', d.docDescriptions],
      ['When to read', d.whenToRead],
      ['ADR location', d.adrLocation],
      ['Obsolete docs', d.obsoleteDocs],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(renderSection('Documentation', 3, list));
  }

  if (hasContent(data.agentPrefs as Record<string, unknown>)) {
    const a = data.agentPrefs!;
    const items: Array<[string, string | undefined]> = [
      ['Task types', a.taskTypes],
      ['Autonomy', a.autonomyLevel],
      ['Plan before coding', a.planBeforeCoding?.toString()],
      ['Response format', a.responseFormat],
      ['Detail level', a.detailLevel],
      ['Explain tradeoffs', a.alwaysExplainTradeoffs?.toString()],
      ['Change preference', a.changePreference],
      ['Speed vs robustness', a.speedVsRobustness],
      ['Prototype vs production', a.prototypeVsProduction],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(renderSection('Agent Preferences', 3, list));
  }

  if (hasContent(data.codePolicy as Record<string, unknown>)) {
    const c = data.codePolicy!;
    const boolItems: string[] = [];
    if (c.canCreateFiles !== undefined) boolItems.push(`- Can create files: ${c.canCreateFiles ? 'Yes' : 'No'}`);
    if (c.canRenameMove !== undefined) boolItems.push(`- Can rename/move: ${c.canRenameMove ? 'Yes' : 'No'}`);
    if (c.canModifyDbSchema !== undefined) boolItems.push(`- Can modify DB schema: ${c.canModifyDbSchema ? 'Yes' : 'No'}`);
    if (c.canModifyCiCd !== undefined) boolItems.push(`- Can modify CI/CD: ${c.canModifyCiCd ? 'Yes' : 'No'}`);
    if (c.canAddRemoveDeps !== undefined) boolItems.push(`- Can add/remove deps: ${c.canAddRemoveDeps ? 'Yes' : 'No'}`);
    if (c.humanValidationRequired) boolItems.push(`- **Human validation required:** ${c.humanValidationRequired}`);
    if (c.alwaysForbidden) boolItems.push(`- **Always forbidden:** ${c.alwaysForbidden}`);
    if (boolItems.length) parts.push(renderSection('Code Modification Policy', 3, boolItems.join('\n')));
  }

  if (hasContent(data.dod as Record<string, unknown>)) {
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
    if (list) parts.push(renderSection('Definition of Done', 3, list));
  }

  if (hasContent(data.governance as Record<string, unknown>)) {
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
    if (list) parts.push(renderSection('Governance', 3, list));
  }

  return parts.length > 0 ? parts.join('\n\n') : '';
}

function renderAppendixSection(data: Partial<Questionnaire>): string {
  const parts: string[] = [];

  if (hasContent(data.examples as Record<string, unknown>)) {
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
    if (list) parts.push(renderSection('Examples', 3, list));
  }

  if (hasContent(data.pitfalls as Record<string, unknown>)) {
    const p = data.pitfalls!;
    const items: Array<[string, string | undefined]> = [
      ['Known bugs', p.knownBugs],
      ['Counter-intuitive behaviors', p.counterIntuitiveBehaviors],
      ['Unstable tools', p.unstableTools],
      ['False good ideas', p.falseGoodIdeas],
      ['Critical checks', p.criticalChecks],
    ];
    const list = renderKeyValueList(items);
    if (list) parts.push(renderSection('Known Pitfalls', 3, list));
  }

  return parts.length > 0 ? renderSection('Appendix', 2, parts.join('\n\n')) : '';
}

function renderAgentTeamSection(data: Partial<Questionnaire>): string {
  const team = data.agentTeam;
  if (!team?.members?.length) return '';

  const parts: string[] = [];

  parts.push(`> **Agent Team Mode** is enabled. For complex, multi-step tasks you MUST spawn a team of specialized sub-agents instead of doing everything yourself.

### When to use Agent Teams

**ALWAYS spawn a team when:**
- The task touches 3+ files or multiple modules
- The task involves both frontend and backend changes
- You need to refactor while keeping tests passing
- The task has independent sub-tasks that can run in parallel
- The user explicitly asks for a large feature, migration, or refactor

**Do it yourself (no team) when:**
- Single-file edits, bug fixes, or small tweaks
- Research / code exploration only
- The task takes fewer than 3 steps

### How to use teams

1. **Create a team** with \`TeamCreate\` and a descriptive name
2. **Break the task into sub-tasks** using \`TaskCreate\`
3. **Spawn teammates** from the roles below using the \`Task\` tool with \`team_name\`
4. **Assign tasks** to teammates and let them work in parallel
5. **Coordinate** via \`SendMessage\` if teammates need to sync
6. **Shut down** teammates when the work is done`);

  parts.push('### Available Roles\n');

  for (const member of team.members) {
    const memberLines: string[] = [];
    memberLines.push(`#### @${member.name} — ${member.role}`);
    if (member.specialty) memberLines.push(`- **Specialty:** ${member.specialty}`);
    if (member.scope) memberLines.push(`- **Scope:** \`${member.scope}\``);
    if (member.rules) {
      memberLines.push(`- **Rules:**`);
      const rules = member.rules.split('\n').filter((r) => r.trim());
      for (const rule of rules) {
        memberLines.push(`  - ${rule.trim()}`);
      }
    }
    parts.push(memberLines.join('\n'));
  }

  if (team.coordinationRules) {
    parts.push(renderSection('Coordination Rules', 3, team.coordinationRules));
  }

  if (team.delegationStrategy) {
    parts.push(renderSection('Delegation Strategy', 3, team.delegationStrategy));
  }

  return renderSection('Agent Team', 2, parts.join('\n\n'));
}
