/**
 * Generates the root CLAUDE.md (< 50 lines).
 * All detailed content goes to .claude/rules/ and docs/.
 */

import type { Questionnaire, Commands } from '@/lib/questionnaire/types';
import { hasContent } from '@/lib/templates/helpers';
import { renderAlwaysOnBlock } from '@/lib/templates/sections';
import { getMcpTableRows } from '@/lib/generation/mcp-blocks';
import type { RuleFile } from './rules-generator';
import type { DocFile } from './docs-generator';

interface GeneratedFiles {
  rules: RuleFile[];
  docs: DocFile[];
}

export function generateFromTemplate(
  data: Partial<Questionnaire>,
  generatedFiles: GeneratedFiles = { rules: [], docs: [] },
): string {
  const sections: string[] = [];

  // 1. Always-on block at the top
  if (data.alwaysOnBlock?.shortRules?.length) {
    sections.push(renderAlwaysOnBlock(data.alwaysOnBlock.shortRules));
  }

  // 2. Project header (one-liner)
  const header = renderCompactHeader(data);
  if (header) sections.push(header);

  // 3. Commands (compact bash block)
  if (hasContent(data.commands as Record<string, unknown>)) {
    const cmds = renderCompactCommands(data.commands!);
    if (cmds) sections.push(cmds);
  }

  // 4. MCP table
  const mcpTable = renderMcpTable(data);
  if (mcpTable) sections.push(mcpTable);

  // 5. Reference links (stays in root — short list)
  const refs = renderReferenceLinks(data);
  if (refs) sections.push(refs);

  // 6. Agent Team pointer (if enabled)
  if (data.agentTeam?.enableAgentTeam) {
    sections.push('## Agent Team\n\n> Agent Team mode is enabled. For complex multi-step tasks, spawn a team of specialized sub-agents.');
  }

  // 7. Documentation pointers
  const pointers = renderDocPointers(generatedFiles);
  if (pointers) sections.push(pointers);

  return sections.filter(Boolean).join('\n\n');
}

// ── Compact header ──────────────────────────────────────────────────────────

function renderCompactHeader(data: Partial<Questionnaire>): string {
  const id = data.identity;
  if (!id) return '';

  const stackParts: string[] = [];
  if (data.stack?.frontendFramework) stackParts.push(data.stack.frontendFramework);
  if (data.stack?.backendFramework && data.stack.backendFramework !== data.stack.frontendFramework) {
    stackParts.push(data.stack.backendFramework);
  }
  if (data.stack?.database) stackParts.push(data.stack.database);
  if (data.stack?.languages?.length && stackParts.length === 0) {
    stackParts.push(...data.stack.languages);
  }

  let line = `**Type:** ${id.projectType} | **Stage:** ${id.currentStage}`;
  if (stackParts.length > 0) {
    line += ` | **Stack:** ${stackParts.join(', ')}`;
  }

  const lines = [`# ${id.projectName || 'Project'}`, line];
  if (id.owner) lines.push(`**Owner:** ${id.owner}`);
  if (id.devEnvironment) lines.push(`**Dev Environment:** ${id.devEnvironment}`);

  return lines.join('\n');
}

// ── Compact commands ────────────────────────────────────────────────────────

function renderCompactCommands(commands: Partial<Commands>): string {
  const entries: Array<[string, string | undefined]> = [
    ['Install', commands.installCmd],
    ['Dev', commands.devCmd],
    ['Build', commands.buildCmd],
    ['Typecheck', commands.typecheckCmd],
    ['Lint', commands.lintCmd],
    ['Format', commands.formatCmd],
    ['Unit tests', commands.unitTestCmd],
    ['Integration tests', commands.integrationTestCmd],
    ['E2E tests', commands.e2eTestCmd],
    ['Codegen', commands.codegenCmd],
    ['Seed/Reset DB', commands.seedResetCmd],
  ];

  const cmdLines: string[] = [];
  for (const [label, cmd] of entries) {
    if (cmd) cmdLines.push(`${cmd}    # ${label.toLowerCase()}`);
  }

  if (cmdLines.length === 0) return '';

  return `## Commands\n\n\`\`\`bash\n${cmdLines.join('\n')}\n\`\`\``;
}

// ── MCP table ───────────────────────────────────────────────────────────────

function renderMcpTable(data: Partial<Questionnaire>): string {
  const ids = data.references?.mcpIntegrations;
  if (!ids?.length) return '';

  const rows = getMcpTableRows(ids);
  if (rows.length === 0) return '';

  const lines = ['## MCP Integrations', '', '| MCP | Usage |', '|-----|-------|'];
  for (const row of rows) {
    const name = row.docLink ? `${row.name} ([workflow](${row.docLink}))` : row.name;
    lines.push(`| ${name} | ${row.purpose} |`);
  }

  return lines.join('\n');
}

// ── Reference links ─────────────────────────────────────────────────────────

function renderReferenceLinks(data: Partial<Questionnaire>): string {
  const refs = data.references;
  if (!refs) return '';
  const urls = refs.referenceUrls?.filter((r) => r.url?.trim());
  if (!urls?.length) return '';

  const lines = ['## References', '', '> Claude: fetch these URLs for context.', ''];
  for (const ref of urls) {
    const desc = ref.description ? ` — ${ref.description}` : '';
    lines.push(`- ${ref.url}${desc}`);
  }
  return lines.join('\n');
}

// ── Documentation pointers ──────────────────────────────────────────────────

function renderDocPointers(generatedFiles: GeneratedFiles): string {
  const { rules, docs } = generatedFiles;
  if (rules.length === 0 && docs.length === 0) return '';

  const lines = ['## Documentation'];
  lines.push('');

  if (rules.length > 0) {
    lines.push('> Conventions are in `.claude/rules/` (auto-loaded by Claude Code)');
  }

  for (const doc of docs) {
    lines.push(`> Read \`${doc.path}\` ${doc.triggerHint}`);
  }

  return lines.join('\n');
}
