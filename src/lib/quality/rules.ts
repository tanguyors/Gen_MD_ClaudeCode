import type { QualityRule } from './types';

export const QUALITY_RULES: QualityRule[] = [
  {
    id: 'line-count',
    name: 'Line Count',
    description: 'CLAUDE.md should be under 300 lines',
    severity: 'warning',
    check: (md) => {
      const lines = md.split('\n').length;
      if (lines > 300) {
        return {
          ruleId: 'line-count',
          severity: 'warning',
          message: `File has ${lines} lines (target: < 300)`,
          suggestion: 'Move detailed content to agent_docs/*.md files',
        };
      }
      return null;
    },
  },
  {
    id: 'has-always-on-block',
    name: 'Always-On Block Present',
    description: 'Should have an always-on rules block at the top',
    severity: 'warning',
    check: (md) => {
      if (!md.includes('ALWAYS-ON RULES')) {
        return {
          ruleId: 'has-always-on-block',
          severity: 'warning',
          message: 'No always-on rules block found',
          suggestion: 'Add 5-8 universal rules at the top of the file',
        };
      }
      return null;
    },
  },
  {
    id: 'always-on-count',
    name: 'Always-On Rule Count',
    description: 'Should have 3-10 always-on rules',
    severity: 'warning',
    check: (md) => {
      const match = md.match(
        /<!-- ALWAYS-ON RULES -->([\s\S]*?)<!-- \/ALWAYS-ON RULES -->/,
      );
      if (!match?.[1]) return null;
      const count = match[1].split('\n').filter((l) => l.trim().startsWith('-')).length;
      if (count < 3 || count > 10) {
        return {
          ruleId: 'always-on-count',
          severity: 'warning',
          message: `Always-on block has ${count} rules (target: 3-10)`,
          suggestion:
            count < 3 ? 'Add more universal rules' : 'Reduce to the most critical rules',
        };
      }
      return null;
    },
  },
  {
    id: 'has-commands',
    name: 'Commands Section',
    description: 'Should include core commands',
    severity: 'error',
    check: (md) => {
      const hasCodeBlock = md.includes('```bash') || md.includes('```shell');
      if (!hasCodeBlock) {
        return {
          ruleId: 'has-commands',
          severity: 'error',
          message: 'No command blocks found',
          suggestion: 'Add installation, dev, build, test commands',
        };
      }
      return null;
    },
  },
  {
    id: 'has-why-section',
    name: 'WHY Section',
    description: 'Should have a WHY/business context section',
    severity: 'info',
    check: (md) => {
      const lower = md.toLowerCase();
      if (!lower.includes('why') && !lower.includes('business') && !lower.includes('context')) {
        return {
          ruleId: 'has-why-section',
          severity: 'info',
          message: 'No WHY/business context section found',
          suggestion: 'Add context about what the project does and why',
        };
      }
      return null;
    },
  },
  {
    id: 'has-what-section',
    name: 'WHAT Section',
    description: 'Should have a WHAT/architecture section',
    severity: 'info',
    check: (md) => {
      const lower = md.toLowerCase();
      if (
        !lower.includes('architecture') &&
        !lower.includes('stack') &&
        !lower.includes('what')
      ) {
        return {
          ruleId: 'has-what-section',
          severity: 'info',
          message: 'No WHAT/architecture section found',
          suggestion: 'Add architecture overview and stack details',
        };
      }
      return null;
    },
  },
  {
    id: 'no-sensitive-data',
    name: 'No Sensitive Data',
    description: 'Should not contain API keys, tokens, or passwords',
    severity: 'error',
    check: (md) => {
      const patterns = [
        /sk-[a-zA-Z0-9]{20,}/,
        /password\s*[:=]\s*['"]\S+['"]/i,
        /token\s*[:=]\s*['"]\S+['"]/i,
        /secret\s*[:=]\s*['"]\S+['"]/i,
      ];
      for (const pattern of patterns) {
        if (pattern.test(md)) {
          return {
            ruleId: 'no-sensitive-data',
            severity: 'error',
            message: 'Potential sensitive data detected',
            suggestion: 'Remove any API keys, tokens, or passwords from the file',
          };
        }
      }
      return null;
    },
  },
  {
    id: 'verbosity',
    name: 'Verbosity Check',
    description: 'Content should be concise',
    severity: 'info',
    check: (md) => {
      const lines = md.split('\n');
      const nonEmptyLines = lines.filter((l) => l.trim().length > 0);
      const avgLineLength =
        nonEmptyLines.reduce((sum, l) => sum + l.length, 0) /
        Math.max(nonEmptyLines.length, 1);
      if (avgLineLength > 120) {
        return {
          ruleId: 'verbosity',
          severity: 'info',
          message: `Average line length is ${Math.round(avgLineLength)} chars (prefer < 120)`,
          suggestion: 'Break long lines into bullet points or shorter sentences',
        };
      }
      return null;
    },
  },
];
