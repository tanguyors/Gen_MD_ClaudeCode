import type { QualityReport, QualityIssue } from './types';
import { QUALITY_RULES } from './rules';
import type { Questionnaire } from '@/lib/questionnaire/types';

export function runQualityChecks(
  markdown: string,
  questionnaire?: Partial<Questionnaire>,
): QualityReport {
  const issues: QualityIssue[] = [];

  for (const rule of QUALITY_RULES) {
    const issue = rule.check(markdown, questionnaire);
    if (issue) {
      issues.push(issue);
    }
  }

  const lineCount = markdown.split('\n').length;
  const alwaysOnRuleCount = countAlwaysOnRules(markdown);
  const sectionCoverage = computeSectionCoverage(questionnaire);
  const verbosityRating = computeVerbosity(markdown);

  const errorCount = issues.filter((i) => i.severity === 'error').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;

  const score = Math.max(0, 100 - errorCount * 20 - warningCount * 5 - issues.length * 2);

  return {
    score,
    lineCount,
    alwaysOnRuleCount,
    sectionCoverage,
    verbosityRating,
    issues,
    passed: errorCount === 0,
  };
}

function countAlwaysOnRules(md: string): number {
  const match = md.match(
    /<!-- ALWAYS-ON RULES -->([\s\S]*?)<!-- \/ALWAYS-ON RULES -->/,
  );
  if (!match?.[1]) return 0;
  return match[1].split('\n').filter((l) => l.trim().startsWith('-')).length;
}

function computeSectionCoverage(questionnaire?: Partial<Questionnaire>): number {
  if (!questionnaire) return 0;
  const filledKeys = Object.values(questionnaire).filter((v) => {
    if (!v) return false;
    if (typeof v === 'object') {
      return Object.values(v).some((val) => {
        if (typeof val === 'string') return val.trim().length > 0;
        if (Array.isArray(val)) return val.length > 0;
        return val != null;
      });
    }
    return true;
  }).length;
  return Math.round((filledKeys / 28) * 100);
}

function computeVerbosity(md: string): 'low' | 'medium' | 'high' {
  const lines = md.split('\n').length;
  if (lines < 100) return 'low';
  if (lines < 250) return 'medium';
  return 'high';
}
