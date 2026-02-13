import { NextRequest, NextResponse } from 'next/server';
import { QuestionnaireSchema } from '@/lib/questionnaire/schemas';
import { generateClaudeMd } from '@/lib/generation/generate';
import { logger } from '@/lib/utils/logger';

/** Recursively strip empty strings → undefined so Zod optional/enum fields pass */
function stripEmptyStrings(obj: unknown): unknown {
  if (typeof obj === 'string') return obj.trim() === '' ? undefined : obj;
  if (Array.isArray(obj)) return obj.map(stripEmptyStrings).filter((v) => v !== undefined);
  if (obj && typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleaned = stripEmptyStrings(value);
      if (cleaned !== undefined) result[key] = cleaned;
    }
    return Object.keys(result).length > 0 ? result : undefined;
  }
  return obj;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const cleaned = stripEmptyStrings(body.questionnaire) ?? {};
    logger.info('Generate API called', { cleanedKeys: Object.keys(cleaned as Record<string, unknown>) });

    const parseResult = QuestionnaireSchema.partial().safeParse(cleaned);
    if (!parseResult.success) {
      logger.error('Questionnaire validation failed', { errors: parseResult.error.flatten() });
      return NextResponse.json(
        { error: 'Invalid questionnaire data', details: parseResult.error.flatten() },
        { status: 400 },
      );
    }

    const useAI = body.useAI !== false;
    const result = await generateClaudeMd(parseResult.data, { useAI });

    logger.info('Generation complete', { method: result.method, length: result.markdown.length });

    return NextResponse.json({
      markdown: result.markdown,
      method: result.method,
      model: result.model,
      tokenUsage: result.tokenUsage,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Generation failed. Please try again.';
    logger.error('Generation endpoint error', { error: message });
    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
