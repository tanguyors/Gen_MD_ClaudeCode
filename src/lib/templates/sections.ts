import type { Commands, AlwaysOnRules } from '@/lib/questionnaire/types';
import { renderKeyValueList, renderBulletList } from './helpers';

export function renderAlwaysOnBlock(rules: string[]): string {
  return ['<!-- ALWAYS-ON RULES -->', ...rules.map((r) => `- ${r}`), '<!-- /ALWAYS-ON RULES -->'].join(
    '\n',
  );
}

export function renderCommandsSection(commands: Partial<Commands>): string {
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

  const lines: string[] = [];
  for (const [label, cmd] of entries) {
    if (cmd) {
      lines.push(`\`\`\`bash\n# ${label}\n${cmd}\n\`\`\``);
    }
  }

  return lines.length > 0 ? lines.join('\n\n') : '';
}

export function renderAlwaysOnRulesSection(rules: Partial<AlwaysOnRules>): string {
  const lines: string[] = [];

  if (rules.universalRules?.length) {
    for (const r of rules.universalRules) {
      const prefix = r.isHard ? '[HARD]' : '[SOFT]';
      lines.push(`- ${prefix} ${r.rule}`);
    }
  }

  if (rules.emergencyCompromises) {
    lines.push('');
    lines.push(`**Emergency compromises:** ${rules.emergencyCompromises}`);
  }

  return lines.join('\n');
}
