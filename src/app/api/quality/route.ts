import { NextRequest, NextResponse } from 'next/server';
import { runQualityChecks } from '@/lib/quality/checker';
import { logger } from '@/lib/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.markdown || typeof body.markdown !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid markdown field' },
        { status: 400 },
      );
    }

    const report = runQualityChecks(body.markdown, body.questionnaire);

    return NextResponse.json({ report });
  } catch (error) {
    logger.error('Quality check endpoint error', { error });
    return NextResponse.json({ error: 'Quality check failed' }, { status: 500 });
  }
}
