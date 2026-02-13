import { z } from 'zod';

// Section 0: Project Identity (required fields)
export const ProjectIdentitySchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  projectType: z.enum(['website', 'web', 'mobile', 'api', 'saas', 'infra', 'data', 'ai', 'desktop', 'other']),
  currentStage: z.enum(['poc', 'mvp', 'production', 'scale']),
  owner: z.string().optional(),
  devEnvironment: z.enum(['windows', 'macos', 'linux']).optional(),
  agentLanguage: z.string().default('en'),
  useAgentTeam: z.boolean().default(false),
  outputVerbosity: z.enum(['minimal', 'standard', 'detailed']).default('standard'),
});

// Agent Team Member
export const AgentTeamMemberSchema = z.object({
  name: z.string().min(1, 'Agent name is required'),
  role: z.string().min(1, 'Role is required'),
  specialty: z.string().optional(),
  scope: z.string().optional(),
  rules: z.string().optional(),
});

// Agent Team Configuration
export const AgentTeamSchema = z.object({
  members: z.array(AgentTeamMemberSchema).max(5).optional(),
  coordinationRules: z.string().optional(),
  delegationStrategy: z.string().optional(),
});

// Section: References & Inspirations
export const ReferencesSchema = z.object({
  referenceUrls: z.array(z.object({
    url: z.string().url().or(z.string().length(0)),
    description: z.string().optional(),
  })).optional(),
  mcpIntegrations: z.array(z.string()).optional(),
  designNotes: z.string().optional(),
});

// Section 1: Business Context
export const BusinessContextSchema = z.object({
  problemSolved: z.string().optional(),
  targetUsers: z.string().optional(),
  expectedOutcome: z.string().optional(),
  valueProposition: z.string().optional(),
  successKpis: z.string().optional(),
  businessConstraints: z.string().optional(),
  outOfScope: z.string().optional(),
});

// Section 2: Technical Goals
export const TechnicalGoalsSchema = z.object({
  primaryGoal: z.string().optional(),
  priorityQualities: z.array(z.string()).optional(),
  existingTechDebt: z.string().optional(),
  criticalComponents: z.string().optional(),
  riskTolerance: z.enum(['low', 'medium', 'high']).optional(),
});

// Section 3: Repo Map
export const RepoMapSchema = z.object({
  repoType: z.enum(['single', 'monorepo']).optional(),
  directoryStructure: z.string().optional(),
  mainApps: z.string().optional(),
  sharedPackages: z.string().optional(),
  contractsLocation: z.string().optional(),
  globalConfigLocation: z.string().optional(),
  migrationsLocation: z.string().optional(),
  testsLocation: z.string().optional(),
  sensitiveDirs: z.string().optional(),
  generatedFiles: z.string().optional(),
  legacyZones: z.string().optional(),
});

// Section 4: Stack & Dependencies
export const StackSchema = z.object({
  languages: z.array(z.string()).optional(),
  frontendFramework: z.string().optional(),
  backendFramework: z.string().optional(),
  database: z.string().optional(),
  orm: z.string().optional(),
  cacheQueueBroker: z.string().optional(),
  authTools: z.string().optional(),
  observabilityTools: z.string().optional(),
  cicdTools: z.string().optional(),
  hosting: z.string().optional(),
  packageManager: z.string().optional(),
  runtimeVersions: z.string().optional(),
  forbiddenDeps: z.string().optional(),
});

// Section 5: Commands
export const CommandsSchema = z.object({
  installCmd: z.string().optional(),
  devCmd: z.string().optional(),
  buildCmd: z.string().optional(),
  typecheckCmd: z.string().optional(),
  lintCmd: z.string().optional(),
  formatCmd: z.string().optional(),
  unitTestCmd: z.string().optional(),
  integrationTestCmd: z.string().optional(),
  e2eTestCmd: z.string().optional(),
  codegenCmd: z.string().optional(),
  seedResetCmd: z.string().optional(),
  localEnvCmd: z.string().optional(),
  systemPrerequisites: z.string().optional(),
});

// Section 6: Environments
export const EnvironmentsSchema = z.object({
  environmentList: z.string().optional(),
  envDifferences: z.string().optional(),
  envVarsSource: z.string().optional(),
  requiredLocalVars: z.string().optional(),
  secretsPolicy: z.string().optional(),
  neverLog: z.string().optional(),
  newVarProcess: z.string().optional(),
});

// Section 7: Code Standards
export const CodeStandardsSchema = z.object({
  namingConventions: z.string().optional(),
  architectureStyle: z.string().optional(),
  errorHandling: z.string().optional(),
  loggingConvention: z.string().optional(),
  commentConvention: z.string().optional(),
  importConvention: z.string().optional(),
  apiConvention: z.string().optional(),
  versioningConvention: z.string().optional(),
  prStructure: z.string().optional(),
  linterFormatter: z.string().optional(),
  blockingLintRules: z.string().optional(),
});

// Section 8: Always-On Rules
export const AlwaysOnRulesSchema = z.object({
  universalRules: z
    .array(
      z.object({
        rule: z.string(),
        isHard: z.boolean().default(true),
      }),
    )
    .optional(),
  emergencyCompromises: z.string().optional(),
});

// Section 9: Database
export const DatabaseSchema = z.object({
  schemaSource: z.string().optional(),
  migrationPolicy: z.string().optional(),
  seedPolicy: z.string().optional(),
  prodMigrationCompat: z.string().optional(),
  criticalTables: z.string().optional(),
  integrityConstraints: z.string().optional(),
  piiConstraints: z.string().optional(),
  backupNotes: z.string().optional(),
});

// Section 10: API & Contracts
export const ApiContractsSchema = z.object({
  contractsLocation: z.string().optional(),
  apiVersioning: z.string().optional(),
  breakingChangePolicy: z.string().optional(),
  errorFormat: z.string().optional(),
  authRules: z.string().optional(),
  rateLimiting: z.string().optional(),
  idempotence: z.string().optional(),
  inputValidation: z.string().optional(),
});

// Section 11: Security
export const SecuritySchema = z.object({
  securityPriorities: z.string().optional(),
  complianceRequirements: z.string().optional(),
  secretsPolicy: z.string().optional(),
  sensitiveDataAccess: z.string().optional(),
  securityReviewProcess: z.string().optional(),
  auditTriggers: z.string().optional(),
});

// Section 12: Performance
export const PerformanceSchema = z.object({
  sloSla: z.string().optional(),
  performanceTargets: z.string().optional(),
  performanceBudgets: z.string().optional(),
  cacheStrategy: z.string().optional(),
  retryStrategy: z.string().optional(),
  gracefulDegradation: z.string().optional(),
  knownBottlenecks: z.string().optional(),
  optimizationPriorities: z.string().optional(),
});

// Section 13: Testing
export const TestingSchema = z.object({
  testStrategy: z.string().optional(),
  testDistribution: z.string().optional(),
  coverageThreshold: z.string().optional(),
  criticalTestCases: z.string().optional(),
  flakyTests: z.string().optional(),
  testTools: z.string().optional(),
  prChecks: z.string().optional(),
  prodChecks: z.string().optional(),
});

// Section 14: CI/CD
export const CiCdSchema = z.object({
  ciPipeline: z.string().optional(),
  mergeConditions: z.string().optional(),
  branchStrategy: z.string().optional(),
  releaseStrategy: z.string().optional(),
  rollbackProcedure: z.string().optional(),
  releaseChecklist: z.string().optional(),
  finalValidators: z.string().optional(),
  hotfixProcess: z.string().optional(),
});

// Section 15: Observability
export const ObservabilitySchema = z.object({
  logsLocation: z.string().optional(),
  metricsLocation: z.string().optional(),
  mandatoryEvents: z.string().optional(),
  incidentDiagnosis: z.string().optional(),
  runbooks: z.string().optional(),
  postMortemProcess: z.string().optional(),
  opsKpis: z.string().optional(),
});

// Section 16: UX/UI
export const UxUiSchema = z.object({
  designSystem: z.string().optional(),
  uiLibrary: z.string().optional(),
  accessibilityLevel: z.string().optional(),
  responsivePriorities: z.string().optional(),
  copyRules: z.string().optional(),
  uiAntiPatterns: z.string().optional(),
  designTokensLocation: z.string().optional(),
});

// Section 17: i18n
export const I18nSchema = z.object({
  supportedLanguages: z.array(z.string()).optional(),
  i18nStrategy: z.string().optional(),
  formatRules: z.string().optional(),
  pluralizationRules: z.string().optional(),
  antiHardcodeRules: z.string().optional(),
  newLocaleProcess: z.string().optional(),
});

// Section 18: AI/ML
export const AiMlSchema = z.object({
  useCases: z.string().optional(),
  dataSources: z.string().optional(),
  dataQualityConstraints: z.string().optional(),
  evaluationPolicy: z.string().optional(),
  promptManagement: z.string().optional(),
  safetyGuardrails: z.string().optional(),
  modelMonitoring: z.string().optional(),
  modelVersioning: z.string().optional(),
});

// Section 19: Documentation
export const DocumentationSchema = z.object({
  existingDocs: z.string().optional(),
  docDescriptions: z.string().optional(),
  whenToRead: z.string().optional(),
  sensitiveDocsApproval: z.boolean().optional(),
  adrLocation: z.string().optional(),
  obsoleteDocs: z.string().optional(),
});

// Section 20: Agent Preferences
export const AgentPrefsSchema = z.object({
  taskTypes: z.string().optional(),
  autonomyLevel: z.enum(['low', 'medium', 'high']).optional(),
  planBeforeCoding: z.boolean().optional(),
  responseFormat: z.string().optional(),
  detailLevel: z.enum(['minimal', 'moderate', 'detailed']).optional(),
  alwaysExplainTradeoffs: z.boolean().optional(),
  changePreference: z.enum(['minimal', 'refactor']).optional(),
  speedVsRobustness: z.enum(['speed', 'balanced', 'robustness']).optional(),
  prototypeVsProduction: z.enum(['prototype', 'balanced', 'production']).optional(),
});

// Section 21: Code Policy
export const CodePolicySchema = z.object({
  canCreateFiles: z.boolean().optional(),
  canRenameMove: z.boolean().optional(),
  canModifyDbSchema: z.boolean().optional(),
  canModifyCiCd: z.boolean().optional(),
  canAddRemoveDeps: z.boolean().optional(),
  humanValidationRequired: z.string().optional(),
  alwaysForbidden: z.string().optional(),
});

// Section 22: Definition of Done
export const DodSchema = z.object({
  doneWhen: z.string().optional(),
  technicalValidation: z.string().optional(),
  productValidation: z.string().optional(),
  securityValidation: z.string().optional(),
  performanceValidation: z.string().optional(),
  expectedDeliverables: z.string().optional(),
  acceptanceCriteria: z.string().optional(),
});

// Section 23: Examples
export const ExamplesSchema = z.object({
  goodPrExample: z.string().optional(),
  badPrExample: z.string().optional(),
  goodRefactorExample: z.string().optional(),
  badRefactorExample: z.string().optional(),
  patternsToFollow: z.string().optional(),
  antiPatterns: z.string().optional(),
});

// Section 24: Pitfalls
export const PitfallsSchema = z.object({
  knownBugs: z.string().optional(),
  counterIntuitiveBehaviors: z.string().optional(),
  unstableTools: z.string().optional(),
  falseGoodIdeas: z.string().optional(),
  criticalChecks: z.string().optional(),
});

// Section 25: Governance
export const GovernanceSchema = z.object({
  architectureValidator: z.string().optional(),
  dbMigrationValidator: z.string().optional(),
  securityValidator: z.string().optional(),
  conflictArbiter: z.string().optional(),
  communicationChannels: z.string().optional(),
  reviewSla: z.string().optional(),
});

// Section 26: Always-On Block Short
export const AlwaysOnBlockSchema = z.object({
  shortRules: z.array(z.string().min(1)).max(10).optional(),
});

// Section 27: Final Validation
export const FinalValidationSchema = z.object({
  under300Lines: z.boolean().optional(),
  allRulesUniversal: z.boolean().optional(),
  noTaskSpecificNoise: z.boolean().optional(),
  commandsComplete: z.boolean().optional(),
  docsReferenced: z.boolean().optional(),
  forbiddenActionsExplicit: z.boolean().optional(),
  readableIn5Min: z.boolean().optional(),
});

// Master Schema
export const QuestionnaireSchema = z.object({
  identity: ProjectIdentitySchema,
  agentTeam: AgentTeamSchema,
  references: ReferencesSchema,
  business: BusinessContextSchema,
  techGoals: TechnicalGoalsSchema,
  repoMap: RepoMapSchema,
  stack: StackSchema,
  commands: CommandsSchema,
  environments: EnvironmentsSchema,
  codeStandards: CodeStandardsSchema,
  alwaysOnRules: AlwaysOnRulesSchema,
  database: DatabaseSchema,
  apiContracts: ApiContractsSchema,
  security: SecuritySchema,
  performance: PerformanceSchema,
  testing: TestingSchema,
  cicd: CiCdSchema,
  observability: ObservabilitySchema,
  uxUi: UxUiSchema,
  i18n: I18nSchema,
  aiMl: AiMlSchema,
  documentation: DocumentationSchema,
  agentPrefs: AgentPrefsSchema,
  codePolicy: CodePolicySchema,
  dod: DodSchema,
  examples: ExamplesSchema,
  pitfalls: PitfallsSchema,
  governance: GovernanceSchema,
  alwaysOnBlock: AlwaysOnBlockSchema,
  finalValidation: FinalValidationSchema,
});

export type Questionnaire = z.infer<typeof QuestionnaireSchema>;
