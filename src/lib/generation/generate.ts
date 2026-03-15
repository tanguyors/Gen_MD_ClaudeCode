import type { Questionnaire } from '@/lib/questionnaire/types';
import { normalizeQuestionnaire } from '@/lib/questionnaire/normalization';
import { generateFromTemplate } from './template-engine';
import { generateRules, type RulesOutput } from './rules-generator';
import { generateDocs, type DocsOutput } from './docs-generator';
import { getOpenAIClient, getModel } from './openai-client';
import { buildSystemPrompt, buildUserPrompt } from './prompt-builder';
import { postProcess } from './post-processor';
import { logger } from '@/lib/utils/logger';

export interface GenerationOptions {
  useAI: boolean;
}

export interface GenerationResult {
  markdown: string;
  rules: RulesOutput;
  docs: DocsOutput;
  method: 'template' | 'ai-enhanced';
  model?: string;
  tokenUsage?: { input: number; output: number };
}

export async function generateClaudeMd(
  data: Partial<Questionnaire>,
  options: GenerationOptions = { useAI: true },
): Promise<GenerationResult> {
  const normalized = normalizeQuestionnaire(data);

  // Check that the questionnaire has at least some meaningful data
  const hasData = Object.values(normalized).some((section) => {
    if (!section || typeof section !== 'object') return false;
    return Object.values(section).some((v) => {
      if (typeof v === 'string') return v.trim().length > 0;
      if (Array.isArray(v)) return v.length > 0;
      return v != null;
    });
  });

  if (!hasData) {
    logger.warn('Questionnaire is empty, cannot generate meaningful output');
    throw new Error('Questionnaire is empty. Please fill in at least the project identity section before generating.');
  }

  // Step 1: Generate rules and docs (deterministic, no AI)
  const rules = generateRules(normalized);
  const docs = generateDocs(normalized);
  logger.info('Generated rules and docs', {
    rulesCount: rules.files.length,
    docsCount: docs.files.length,
  });

  // Step 2: Generate concise root CLAUDE.md from template
  logger.info('Generating root CLAUDE.md from template...');
  const templateOutput = generateFromTemplate(normalized, {
    rules: rules.files,
    docs: docs.files,
  });
  logger.info('Template output length:', { length: templateOutput.length });

  const processedTemplate = postProcess(templateOutput);

  if (!options.useAI) {
    logger.info('AI enhancement skipped, returning template output');
    return { markdown: processedTemplate, rules, docs, method: 'template' };
  }

  // Step 3: Enhance root with AI (rules/docs are NOT sent to AI)
  try {
    logger.info('Enhancing root CLAUDE.md with AI...');
    const client = getOpenAIClient();
    const model = getModel();
    const agentLanguage = normalized.identity?.agentLanguage || 'en';

    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: buildSystemPrompt(agentLanguage) },
        { role: 'user', content: buildUserPrompt(templateOutput, normalized) },
      ],
      max_tokens: 4000,
    });

    const enhancedMarkdown = response.choices[0]?.message?.content;

    if (!enhancedMarkdown || enhancedMarkdown.trim().length < 20) {
      logger.warn('AI response too short, falling back to template');
      return { markdown: processedTemplate, rules, docs, method: 'template' };
    }

    return {
      markdown: postProcess(enhancedMarkdown),
      rules,
      docs,
      method: 'ai-enhanced',
      model,
      tokenUsage: {
        input: response.usage?.prompt_tokens ?? 0,
        output: response.usage?.completion_tokens ?? 0,
      },
    };
  } catch (error) {
    logger.error('AI enhancement failed, falling back to template', { error });
    return { markdown: processedTemplate, rules, docs, method: 'template' };
  }
}
