import type { z } from 'zod';
import type {
  QuestionnaireSchema,
  ProjectIdentitySchema,
  AgentTeamSchema,
  AgentTeamMemberSchema,
  ReferencesSchema,
  BusinessContextSchema,
  TechnicalGoalsSchema,
  RepoMapSchema,
  StackSchema,
  CommandsSchema,
  EnvironmentsSchema,
  CodeStandardsSchema,
  AlwaysOnRulesSchema,
  DatabaseSchema,
  ApiContractsSchema,
  SecuritySchema,
  PerformanceSchema,
  TestingSchema,
  CiCdSchema,
  ObservabilitySchema,
  UxUiSchema,
  I18nSchema,
  AiMlSchema,
  DocumentationSchema,
  AgentPrefsSchema,
  CodePolicySchema,
  DodSchema,
  ExamplesSchema,
  PitfallsSchema,
  GovernanceSchema,
  AlwaysOnBlockSchema,
  FinalValidationSchema,
} from './schemas';

export type ProjectIdentity = z.infer<typeof ProjectIdentitySchema>;
export type AgentTeam = z.infer<typeof AgentTeamSchema>;
export type AgentTeamMember = z.infer<typeof AgentTeamMemberSchema>;
export type References = z.infer<typeof ReferencesSchema>;
export type BusinessContext = z.infer<typeof BusinessContextSchema>;
export type TechnicalGoals = z.infer<typeof TechnicalGoalsSchema>;
export type RepoMap = z.infer<typeof RepoMapSchema>;
export type Stack = z.infer<typeof StackSchema>;
export type Commands = z.infer<typeof CommandsSchema>;
export type Environments = z.infer<typeof EnvironmentsSchema>;
export type CodeStandards = z.infer<typeof CodeStandardsSchema>;
export type AlwaysOnRules = z.infer<typeof AlwaysOnRulesSchema>;
export type Database = z.infer<typeof DatabaseSchema>;
export type ApiContracts = z.infer<typeof ApiContractsSchema>;
export type Security = z.infer<typeof SecuritySchema>;
export type Performance = z.infer<typeof PerformanceSchema>;
export type Testing = z.infer<typeof TestingSchema>;
export type CiCd = z.infer<typeof CiCdSchema>;
export type Observability = z.infer<typeof ObservabilitySchema>;
export type UxUi = z.infer<typeof UxUiSchema>;
export type I18n = z.infer<typeof I18nSchema>;
export type AiMl = z.infer<typeof AiMlSchema>;
export type Documentation = z.infer<typeof DocumentationSchema>;
export type AgentPrefs = z.infer<typeof AgentPrefsSchema>;
export type CodePolicy = z.infer<typeof CodePolicySchema>;
export type Dod = z.infer<typeof DodSchema>;
export type Examples = z.infer<typeof ExamplesSchema>;
export type Pitfalls = z.infer<typeof PitfallsSchema>;
export type Governance = z.infer<typeof GovernanceSchema>;
export type AlwaysOnBlock = z.infer<typeof AlwaysOnBlockSchema>;
export type FinalValidation = z.infer<typeof FinalValidationSchema>;
export type Questionnaire = z.infer<typeof QuestionnaireSchema>;

export type SectionKey = keyof Questionnaire;

export type OutputVerbosity = 'minimal' | 'standard' | 'detailed';

export interface SectionMeta {
  key: SectionKey;
  index: number;
  title: string;
  description: string;
  title_fr?: string;
  description_fr?: string;
  isRequired: boolean;
  isApplicable: (data: Partial<Questionnaire>) => boolean;
  category: 'core' | 'technical' | 'process' | 'collaboration';
  minVerbosity: OutputVerbosity;
}
