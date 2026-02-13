export type Severity = 'error' | 'warning' | 'info';

export interface QualityRule {
  id: string;
  name: string;
  description: string;
  severity: Severity;
  check: (markdown: string, questionnaire?: unknown) => QualityIssue | null;
}

export interface QualityIssue {
  ruleId: string;
  severity: Severity;
  message: string;
  suggestion?: string;
}

export interface QualityReport {
  score: number;
  lineCount: number;
  alwaysOnRuleCount: number;
  sectionCoverage: number;
  verbosityRating: 'low' | 'medium' | 'high';
  issues: QualityIssue[];
  passed: boolean;
}
