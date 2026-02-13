import type { Questionnaire } from '@/lib/questionnaire/types';
import { normalizeQuestionnaire } from '@/lib/questionnaire/normalization';
import { generateFromTemplate } from './template-engine';
import { getOpenAIClient, getModel } from './openai-client';
import { buildSystemPrompt, buildUserPrompt } from './prompt-builder';
import { postProcess } from './post-processor';
import { logger } from '@/lib/utils/logger';

export interface GenerationOptions {
  useAI: boolean;
}

export interface GenerationResult {
  markdown: string;
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

  // Step 1: Generate from template (always runs)
  logger.info('Generating from template...', { sections: Object.keys(normalized) });
  const templateOutput = generateFromTemplate(normalized);
  logger.info('Template output length:', { length: templateOutput.length });

  // Validate template produced meaningful content
  const processedTemplate = postProcess(templateOutput);
  if (processedTemplate.replace(/^#.*\n*/m, '').trim().length < 10) {
    logger.warn('Template produced minimal content', { length: processedTemplate.length });
  }

  if (!options.useAI) {
    logger.info('AI enhancement skipped, returning template output');
    return {
      markdown: processedTemplate,
      method: 'template',
    };
  }

  // Step 2: Enhance with OpenAI
  try {
    logger.info('Enhancing with OpenAI...');
    const client = getOpenAIClient();
    const model = getModel();
    const agentLanguage = normalized.identity?.agentLanguage || 'en';

    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: buildSystemPrompt(agentLanguage) },
        { role: 'user', content: buildUserPrompt(templateOutput, normalized) },
      ],
      max_tokens: 8000,
    });

    const enhancedMarkdown = response.choices[0]?.message?.content;

    if (!enhancedMarkdown || enhancedMarkdown.trim().length < 50) {
      logger.warn('AI response too short, falling back to template');
      return {
        markdown: processedTemplate,
        method: 'template',
      };
    }

    return {
      markdown: postProcess(enhancedMarkdown),
      method: 'ai-enhanced',
      model,
      tokenUsage: {
        input: response.usage?.prompt_tokens ?? 0,
        output: response.usage?.completion_tokens ?? 0,
      },
    };
  } catch (error) {
    logger.error('OpenAI enhancement failed, falling back to template', { error });
    return {
      markdown: processedTemplate,
      method: 'template',
    };
  }
}
