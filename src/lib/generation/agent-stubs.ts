/**
 * Generates .claude/agents/ and .claude/skills/ stub files
 * based on user-selected agents and skills from the catalogs.
 * Pure function — no side effects, no React dependencies.
 */

import type { Questionnaire } from '@/lib/questionnaire/types';
import { AGENT_CATALOG, SKILL_CATALOG, type AgentCatalogItem } from '@/lib/questionnaire/option-data';

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

  // Generate agent files from catalog selection
  const selectedAgentIds = data.agentTeam?.selectedAgents ?? [];
  for (const id of selectedAgentIds) {
    const catalogItem = AGENT_CATALOG.find((a) => a.id === id);
    if (!catalogItem) continue;

    const agentContent = buildAgentFile(catalogItem, projectName, data);

    agents.push({
      path: `.claude/agents/${catalogItem.id}.md`,
      label: catalogItem.id,
      category: 'agent',
      content: agentContent,
    });
  }

  // Generate skill files from catalog selection
  const selectedSkillIds = data.agentTeam?.selectedSkills ?? [];
  for (const id of selectedSkillIds) {
    const skillItem = SKILL_CATALOG.find((s) => s.id === id);
    if (!skillItem) continue;

    let prompt = skillItem.prompt;
    prompt = injectSkillContext(prompt, skillItem, data);

    skills.push({
      path: `.claude/skills/${skillItem.id}.md`,
      label: skillItem.id,
      category: 'skill',
      content: `---
name: ${skillItem.id}
description: ${skillItem.description.replace(/\.$/, '')}
---

${prompt}
`,
    });
  }

  return { agents, skills };
}

// ── Agent file builder ──────────────────────────────────────────────────────

function buildAgentFile(item: AgentCatalogItem, projectName: string, data: Partial<Questionnaire>): string {
  // Build description with project context
  const description = item.description.replace(/\.$/, '') + `. Project: ${projectName}.`;

  // Inject project-specific context into the prompt
  let prompt = item.prompt;
  prompt = injectProjectContext(prompt, item, data);

  return `---
name: ${item.id}
description: ${description}
tools: ${item.tools}
model: ${item.model}
---

${prompt}
`;
}

// ── Project context injection ───────────────────────────────────────────────

function injectProjectContext(prompt: string, item: AgentCatalogItem, data: Partial<Questionnaire>): string {
  const contextLines: string[] = [];

  // Testing agents get testing context
  if ((item.category === 'testing' || item.id === 'test-writer') && data.testing) {
    if (data.testing.testStrategy) contextLines.push(`Test strategy: ${data.testing.testStrategy}`);
    if (data.testing.testTools) contextLines.push(`Test tools: ${data.testing.testTools}`);
    if (data.testing.coverageThreshold) contextLines.push(`Coverage threshold: ${data.testing.coverageThreshold}`);
  }

  // Review agents get code standards context
  if (item.category === 'review' && data.codeStandards) {
    if (data.codeStandards.namingConventions) contextLines.push(`Naming: ${data.codeStandards.namingConventions}`);
    if (data.codeStandards.architectureStyle) contextLines.push(`Architecture: ${data.codeStandards.architectureStyle}`);
    if (data.codeStandards.errorHandling) contextLines.push(`Error handling: ${data.codeStandards.errorHandling}`);
  }

  // DB agents get database context
  if (item.id === 'db-migration' && data.database) {
    if (data.database.schemaSource) contextLines.push(`Schema source: ${data.database.schemaSource}`);
    if (data.database.migrationPolicy) contextLines.push(`Migration policy: ${data.database.migrationPolicy}`);
    if (data.database.criticalTables) contextLines.push(`Critical tables: ${data.database.criticalTables}`);
  }

  // Performance agents get performance context
  if (item.category === 'performance' && data.performance) {
    if (data.performance.performanceTargets) contextLines.push(`Targets: ${data.performance.performanceTargets}`);
    if (data.performance.knownBottlenecks) contextLines.push(`Known bottlenecks: ${data.performance.knownBottlenecks}`);
  }

  // DevOps agents get CI/CD context
  if (item.category === 'devops' && data.cicd) {
    if (data.cicd.branchStrategy) contextLines.push(`Branch strategy: ${data.cicd.branchStrategy}`);
    if (data.cicd.releaseStrategy) contextLines.push(`Release strategy: ${data.cicd.releaseStrategy}`);
    if (data.cicd.rollbackProcedure) contextLines.push(`Rollback: ${data.cicd.rollbackProcedure}`);
  }

  if (contextLines.length === 0) return prompt;

  const contextBlock = `\n\nProject-specific context:\n${contextLines.map((l) => `- ${l}`).join('\n')}`;
  return prompt + contextBlock;
}

// ── Skill context injection ─────────────────────────────────────────────────

function injectSkillContext(prompt: string, item: { id: string; category: string }, data: Partial<Questionnaire>): string {
  const contextLines: string[] = [];
  const orm = data.stack?.orm ?? '';
  const db = data.stack?.database ?? '';
  const framework = data.stack?.frontendFramework ?? '';
  const testTools = data.testing?.testTools ?? '';

  // DB skills get database context
  if (item.id === 'db-migration' && (orm || db)) {
    if (orm) contextLines.push(`ORM: ${orm}`);
    if (db) contextLines.push(`Database: ${db}`);
    if (data.database?.schemaSource) contextLines.push(`Schema source of truth: ${data.database.schemaSource}`);
    if (data.database?.migrationPolicy) contextLines.push(`Migration policy: ${data.database.migrationPolicy}`);
    if (data.database?.criticalTables) contextLines.push(`Critical tables (extra care): ${data.database.criticalTables}`);
  }

  // Component skill gets frontend context
  if (item.id === 'new-component' && framework) {
    contextLines.push(`Frontend framework: ${framework}`);
    if (data.uxUi?.designSystem) contextLines.push(`Design system: ${data.uxUi.designSystem}`);
    if (data.uxUi?.uiLibrary) contextLines.push(`UI library: ${data.uxUi.uiLibrary}`);
    if (data.uxUi?.accessibilityLevel) contextLines.push(`Accessibility target: ${data.uxUi.accessibilityLevel}`);
  }

  // API skill gets API context
  if (item.id === 'new-api-endpoint' && data.apiContracts) {
    if (data.apiContracts.errorFormat) contextLines.push(`Error format: ${data.apiContracts.errorFormat}`);
    if (data.apiContracts.authRules) contextLines.push(`Auth rules: ${data.apiContracts.authRules}`);
    if (data.apiContracts.inputValidation) contextLines.push(`Validation: ${data.apiContracts.inputValidation}`);
  }

  // Test skills get testing context
  if ((item.id === 'tdd-cycle' || item.id === 'test-coverage-boost') && testTools) {
    contextLines.push(`Test tools: ${testTools}`);
    if (data.testing?.testStrategy) contextLines.push(`Test strategy: ${data.testing.testStrategy}`);
    if (data.testing?.coverageThreshold) contextLines.push(`Coverage threshold: ${data.testing.coverageThreshold}`);
  }

  // Deploy skill gets CI/CD context
  if (item.id === 'deploy-checklist' && data.cicd) {
    if (data.cicd.mergeConditions) contextLines.push(`Merge conditions: ${data.cicd.mergeConditions}`);
    if (data.cicd.releaseStrategy) contextLines.push(`Release strategy: ${data.cicd.releaseStrategy}`);
    if (data.cicd.rollbackProcedure) contextLines.push(`Rollback procedure: ${data.cicd.rollbackProcedure}`);
  }

  // Performance skill gets performance context
  if (item.id === 'web-perf-audit' && data.performance) {
    if (data.performance.performanceTargets) contextLines.push(`Targets: ${data.performance.performanceTargets}`);
    if (data.performance.knownBottlenecks) contextLines.push(`Known bottlenecks: ${data.performance.knownBottlenecks}`);
  }

  if (contextLines.length === 0) return prompt;

  const contextBlock = `\n\nProject-specific context:\n${contextLines.map((l) => `- ${l}`).join('\n')}`;
  return prompt + contextBlock;
}
