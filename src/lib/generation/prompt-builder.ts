import type { Questionnaire } from '@/lib/questionnaire/types';

export function buildSystemPrompt(agentLanguage: string): string {
  const lang =
    agentLanguage === 'fr'
      ? 'French'
      : agentLanguage === 'en'
        ? 'English'
        : agentLanguage;

  return `You are an expert at writing CLAUDE.md files -- configuration files that instruct AI coding agents.

Your task: Given a template-generated root CLAUDE.md, polish it while keeping it UNDER 50 LINES.

This root file is part of a modular architecture:
- \`.claude/rules/*.md\` contains all conventions (code style, testing, security, etc.) — auto-loaded by Claude Code
- \`docs/*.md\` contains detailed context (architecture, business goals, collaboration) — progressive disclosure
- \`.claude/agents/*.md\` and \`.claude/commands/*.md\` contain agent/skill definitions

The root CLAUDE.md should ONLY contain:
1. Always-on rules block (top, 3-8 rules max)
2. Project name + one-liner stack summary
3. Commands in a compact bash block
4. MCP integrations table (if any)
5. Documentation pointers to .claude/rules/ and docs/

Rules:
- MUST stay under 50 lines — this is the most important constraint
- Commands must be exact — do NOT invent or modify them
- Do NOT include conventions, business context, architecture details, testing rules, security rules, etc. — those are in .claude/rules/ and docs/
- Do NOT add sections, headings, or content not present in the template output
- Remove any empty section heading
- Prefer compact formats: single bash block for commands, table for MCPs
- Write in ${lang}

Output ONLY the enhanced CLAUDE.md content. No preamble, no explanation.`;
}

export function buildUserPrompt(
  templateOutput: string,
  rawAnswers: Partial<Questionnaire>,
): string {
  return `Here is the template-generated root CLAUDE.md (already concise, polish it further):

<template_output>
${templateOutput}
</template_output>

Here are the raw questionnaire answers for additional context (do NOT expand into the root — details go to .claude/rules/ and docs/):

<raw_answers>
${JSON.stringify(rawAnswers, null, 2)}
</raw_answers>

Polish this CLAUDE.md: improve wording, tighten formatting, stay under 50 lines. Output only the final content.`;
}
