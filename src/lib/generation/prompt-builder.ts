import type { Questionnaire } from '@/lib/questionnaire/types';

export function buildSystemPrompt(agentLanguage: string): string {
  const lang =
    agentLanguage === 'fr'
      ? 'French'
      : agentLanguage === 'en'
        ? 'English'
        : agentLanguage;

  return `You are an expert at writing CLAUDE.md files -- configuration files that instruct AI coding agents.

Your task: Given a template-generated CLAUDE.md and the raw questionnaire answers, enhance the CLAUDE.md to be:
1. More concise and actionable
2. Better structured with clear WHY / WHAT / HOW sections
3. Under 300 lines (unless the project complexity justifies more)
4. Using universal rules only (no task-specific noise)
5. Referencing agent_docs/*.md for detailed/specialized content

Rules:
- Keep the always-on block at the very top, ultra-short (5-8 rules max)
- Commands must be exact -- do NOT invent or modify them
- Prefer bullet lists and code blocks over prose
- Remove redundant or overly verbose content
- Ensure a new contributor can understand the file in under 5 minutes
- If an Agent Team section is present, preserve each agent's @name, role, specialty, scope, and rules. Format them clearly so each sub-agent's responsibilities are unambiguous. Keep coordination rules and delegation strategy concise.
- Write in ${lang}

Output ONLY the enhanced CLAUDE.md content. No preamble, no explanation.`;
}

export function buildUserPrompt(
  templateOutput: string,
  rawAnswers: Partial<Questionnaire>,
): string {
  return `Here is the template-generated CLAUDE.md:

<template_output>
${templateOutput}
</template_output>

Here are the raw questionnaire answers for additional context:

<raw_answers>
${JSON.stringify(rawAnswers, null, 2)}
</raw_answers>

Please enhance this CLAUDE.md following all the rules in your instructions. Output only the final CLAUDE.md content.`;
}
