/**
 * Generates .claude/hooks/ scripts and .claude/settings.json
 * for intelligent memory persistence across context compactions.
 *
 * The system works in two phases:
 * 1. PreCompact: reads the conversation JSONL, sends to AI API for structured summary, saves to file
 * 2. PostCompact (SessionStart with "compact" matcher): re-injects the saved summary into context
 *
 * Pure function — no side effects, no React dependencies.
 */

import type { Questionnaire } from '@/lib/questionnaire/types';

export interface HookFile {
  /** Relative path from project root */
  path: string;
  /** Display name for UI */
  label: string;
  /** File content */
  content: string;
}

export interface HooksOutput {
  /** All generated hook files */
  files: HookFile[];
  /** Whether hooks were generated (user opted in) */
  enabled: boolean;
}

// ── Main generator ──────────────────────────────────────────────────────────

export function generateHookScripts(data: Partial<Questionnaire>): HooksOutput {
  const prefs = data.agentPrefs;

  // Check if user opted into persistent memory
  const memoryProvider = prefs?.memoryProvider;
  if (!memoryProvider || memoryProvider === 'none') {
    return { files: [], enabled: false };
  }

  const projectName = data.identity?.projectName ?? 'Project';
  const agentLanguage = data.identity?.agentLanguage ?? 'en';
  const isFr = agentLanguage === 'fr';

  const files: HookFile[] = [];

  // 1. Summarize prompt template
  files.push({
    path: '.claude/hooks/prompt-templates/summarize.txt',
    label: 'summarize-prompt',
    content: generateSummarizePrompt(projectName, isFr),
  });

  // 2. Pre-compact backup script (Node.js)
  files.push({
    path: '.claude/hooks/pre-compact-backup.mjs',
    label: 'pre-compact-backup',
    content: generatePreCompactScript(memoryProvider),
  });

  // 3. Post-compact restore script (bash)
  files.push({
    path: '.claude/hooks/post-compact-restore.sh',
    label: 'post-compact-restore',
    content: generatePostCompactScript(),
  });

  // 4. Settings.local.json with hook configuration (uses .local to avoid overwriting existing settings.json)
  files.push({
    path: '.claude/settings.local.json',
    label: 'hooks-config',
    content: generateSettingsJson(),
  });

  // 5. Setup instructions
  files.push({
    path: '.claude/hooks/README.md',
    label: 'hooks-readme',
    content: generateHooksReadme(memoryProvider, isFr),
  });

  return { files, enabled: true };
}

// ── Summarize prompt ────────────────────────────────────────────────────────

function generateSummarizePrompt(projectName: string, isFr: boolean): string {
  if (isFr) {
    return `Tu es un assistant de mémoire pour le projet "${projectName}".
Ton rôle est de résumer une conversation de développement pour préserver le contexte après une compaction.

Résume la conversation en préservant OBLIGATOIREMENT :

## 1. DÉCISIONS PRISES
Chaque choix technique ou produit, avec le pourquoi.
Format: "- [DÉCISION] Choisi X plutôt que Y — raison: ..."

## 2. FICHIERS MODIFIÉS
Liste complète avec ce qui a changé et pourquoi.
Format: "- \`path/to/file\` — description du changement"

## 3. ÉTAT ACTUEL DU TRAVAIL
Où en est le travail exactement. Qu'est-ce qui est terminé, qu'est-ce qui reste.

## 4. CONTEXTE APPRIS
Informations importantes sur le projet, l'utilisateur, ses préférences, découvertes.

## 5. PROBLÈMES RENCONTRÉS
Bugs, blocages, erreurs, et les solutions trouvées ou en cours.

## 6. PROCHAINES ÉTAPES
Ce qui était prévu ensuite, dans l'ordre de priorité.

## 7. INSTRUCTIONS ACTIVES
Toute instruction spécifique donnée par l'utilisateur qui doit persister.

RÈGLES:
- Sois concis mais ne perds AUCUNE décision ni contexte technique
- Utilise le markdown structuré
- Maximum 200 lignes
- Ne reformule pas les instructions — cite-les telles quelles
- Inclus les noms de fichiers exacts, les numéros de ligne si mentionnés
- Si un plan était en cours, reproduis-le avec l'état de chaque étape
`;
  }

  return `You are a memory assistant for the project "${projectName}".
Your role is to summarize a development conversation to preserve context after compaction.

Summarize the conversation preserving ALL of the following:

## 1. DECISIONS MADE
Every technical or product choice, with the reasoning.
Format: "- [DECISION] Chose X over Y — reason: ..."

## 2. FILES MODIFIED
Complete list with what changed and why.
Format: "- \`path/to/file\` — description of change"

## 3. CURRENT STATE OF WORK
Where the work stands exactly. What's done, what remains.

## 4. LEARNED CONTEXT
Important info about the project, user, their preferences, discoveries.

## 5. PROBLEMS ENCOUNTERED
Bugs, blockers, errors, and solutions found or in progress.

## 6. NEXT STEPS
What was planned next, in priority order.

## 7. ACTIVE INSTRUCTIONS
Any specific instruction from the user that must persist.

RULES:
- Be concise but lose ZERO decisions or technical context
- Use structured markdown
- Maximum 200 lines
- Do not rephrase instructions — quote them as-is
- Include exact file names, line numbers if mentioned
- If a plan was in progress, reproduce it with each step's status
`;
}

// ── Pre-compact backup script ───────────────────────────────────────────────

function generatePreCompactScript(provider: string): string {
  const isOpenAI = provider === 'openai';
  const apiKeyEnv = isOpenAI ? 'OPENAI_API_KEY' : 'ANTHROPIC_API_KEY';
  const defaultModel = isOpenAI ? 'gpt-4o-mini' : 'claude-haiku-4-5-20251001';

  return `#!/usr/bin/env node
/**
 * Pre-compact backup hook
 * Reads the conversation transcript, sends to AI for structured summary,
 * and saves the summary for re-injection after compaction.
 *
 * Triggered by: PreCompact hook event
 * Input: JSON on stdin with { transcript_path, session_id, cwd }
 * Output: JSON on stdout (optional additionalContext)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  // Read hook input from stdin
  let input;
  try {
    const raw = readFileSync('/dev/stdin', 'utf-8');
    input = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const { transcript_path, session_id, cwd } = input;
  if (!transcript_path) {
    process.exit(0);
  }

  // Read the JSONL transcript
  let transcriptContent;
  try {
    transcriptContent = readFileSync(transcript_path, 'utf-8');
  } catch {
    console.error('Could not read transcript file');
    process.exit(0);
  }

  // Parse JSONL lines
  const lines = transcriptContent.trim().split('\\n').filter(Boolean);
  const messages = [];

  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      if (entry.type === 'user' || entry.type === 'assistant') {
        const content = extractTextContent(entry.message?.content);
        if (content) {
          messages.push({ role: entry.type, content });
        }
      }
    } catch {
      // Skip malformed lines
    }
  }

  if (messages.length === 0) {
    process.exit(0);
  }

  // Truncate to last ~50 exchanges to stay within token limits
  const recentMessages = messages.slice(-100);
  const conversationText = recentMessages
    .map(m => \`[\${m.role.toUpperCase()}]: \${m.content}\`)
    .join('\\n\\n');

  // Read the summarize prompt template
  const promptPath = join(__dirname, 'prompt-templates', 'summarize.txt');
  let systemPrompt;
  try {
    systemPrompt = readFileSync(promptPath, 'utf-8');
  } catch {
    systemPrompt = 'Summarize this development conversation preserving all decisions, file changes, current state, problems, and next steps. Be concise but complete. Max 200 lines.';
  }

  // Call AI API for intelligent summary
  const apiKey = process.env['${apiKeyEnv}'];
  const model = process.env.MEMORY_MODEL || '${defaultModel}';

  if (!apiKey) {
    // Fallback: save raw last messages without AI summary
    saveFallbackSummary(cwd, session_id, recentMessages);
    process.exit(0);
  }

  try {
    const summary = await callAI(apiKey, model, systemPrompt, conversationText, ${JSON.stringify(isOpenAI)});
    saveSummary(cwd, session_id, summary);
  } catch (err) {
    // Fallback on API error
    saveFallbackSummary(cwd, session_id, recentMessages);
  }

  process.exit(0);
}

// ── AI API call ─────────────────────────────────────────────────────────────

async function callAI(apiKey, model, systemPrompt, conversation, isOpenAI) {
  if (isOpenAI) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${apiKey}\`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: \`Here is the conversation to summarize:\\n\\n\${conversation}\` },
        ],
        max_tokens: 4000,
      }),
    });

    if (!res.ok) throw new Error(\`OpenAI API error: \${res.status}\`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  } else {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 4000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: \`Here is the conversation to summarize:\\n\\n\${conversation}\` },
        ],
      }),
    });

    if (!res.ok) throw new Error(\`Anthropic API error: \${res.status}\`);
    const data = await res.json();
    return data.content?.[0]?.text || '';
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function extractTextContent(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\\n');
  }
  return '';
}

function saveSummary(cwd, sessionId, summary) {
  const dir = join(cwd, '.claude', 'memory-backup');
  mkdirSync(dir, { recursive: true });

  const timestamp = new Date().toISOString();
  const header = \`<!-- Memory backup | Session: \${sessionId} | Date: \${timestamp} -->\\n\\n\`;

  // Save session-specific file
  writeFileSync(join(dir, \`\${sessionId}.md\`), header + summary, 'utf-8');

  // Also save as latest (for restore script)
  writeFileSync(join(dir, 'latest-summary.md'), header + summary, 'utf-8');
}

function saveFallbackSummary(cwd, sessionId, messages) {
  const dir = join(cwd, '.claude', 'memory-backup');
  mkdirSync(dir, { recursive: true });

  // Simple fallback: save the last 20 user messages
  const userMessages = messages
    .filter(m => m.role === 'user')
    .slice(-20)
    .map(m => \`- \${m.content.substring(0, 300)}\`)
    .join('\\n');

  const fallback = \`# Conversation Backup (fallback — no AI summary)\\n\\n## Recent User Messages\\n\${userMessages}\\n\`;

  writeFileSync(join(dir, \`\${sessionId}.md\`), fallback, 'utf-8');
  writeFileSync(join(dir, 'latest-summary.md'), fallback, 'utf-8');
}

main().catch(() => process.exit(0));
`;
}

// ── Post-compact restore script ─────────────────────────────────────────────

function generatePostCompactScript(): string {
  return `#!/bin/bash
# Post-compact restore hook
# Re-injects the saved memory summary after context compaction.
#
# Triggered by: SessionStart hook with "compact" matcher
# Output: stdout content is added to Claude's context

INPUT=$(cat)
CWD=$(echo "$INPUT" | grep -o '"cwd":"[^"]*"' | cut -d'"' -f4)

# Use project dir from hook input, fallback to current dir
DIR="\${CWD:-.}/.claude/memory-backup"

if [ -f "$DIR/latest-summary.md" ]; then
  echo ""
  echo "=== MEMORY RESTORED AFTER COMPACTION ==="
  echo ""
  cat "$DIR/latest-summary.md"
  echo ""
  echo "=== END OF RESTORED MEMORY ==="
  echo ""
fi

exit 0
`;
}

// ── Settings.json with hooks config ─────────────────────────────────────────

function generateSettingsJson(): string {
  const settings = {
    hooks: {
      PreCompact: [
        {
          matcher: '',
          hooks: [
            {
              type: 'command',
              command: 'node .claude/hooks/pre-compact-backup.mjs',
              timeout: 30000,
            },
          ],
        },
      ],
      SessionStart: [
        {
          matcher: 'compact',
          hooks: [
            {
              type: 'command',
              command: 'bash .claude/hooks/post-compact-restore.sh',
              timeout: 5000,
            },
          ],
        },
      ],
    },
  };

  return JSON.stringify(settings, null, 2) + '\n';
}

// ── Hooks README ────────────────────────────────────────────────────────────

function generateHooksReadme(provider: string, isFr: boolean): string {
  const apiKeyEnv = provider === 'openai' ? 'OPENAI_API_KEY' : 'ANTHROPIC_API_KEY';
  const providerName = provider === 'openai' ? 'OpenAI' : 'Anthropic';

  if (isFr) {
    return `# Hooks de Mémoire Persistante

## Installation

1. Copiez le dossier \`.claude/\` à la racine de votre projet
2. Les hooks sont dans \`.claude/settings.local.json\` (fusionné automatiquement avec \`settings.json\`, sans conflit)
3. Configurez votre clé API :

\`\`\`bash
export ${apiKeyEnv}="votre-clé-api"
\`\`\`

Ajoutez cette variable à votre \`.bashrc\`, \`.zshrc\`, ou \`.env\`.

## Comment ça marche

- **Avant compaction** : le script lit votre conversation, l'envoie à ${providerName} pour un résumé structuré, et le sauvegarde dans \`.claude/memory-backup/\`
- **Après compaction** : le résumé est automatiquement réinjecté dans le contexte de Claude
- **Coût** : ~$0.01 par compaction

## Fichiers

- \`pre-compact-backup.mjs\` — Script de sauvegarde (Node.js)
- \`post-compact-restore.sh\` — Script de restauration (Bash)
- \`prompt-templates/summarize.txt\` — Prompt de résumé

## Dépannage

Si le résumé ne fonctionne pas :
1. Vérifiez que \`${apiKeyEnv}\` est défini : \`echo $${apiKeyEnv}\`
2. Vérifiez les logs dans \`.claude/memory-backup/\`
3. Sans clé API, un fallback basique (derniers messages) est utilisé
`;
  }

  return `# Persistent Memory Hooks

## Setup

1. Copy the \`.claude/\` folder to your project root
2. The hooks are in \`.claude/settings.local.json\` (auto-merged with \`settings.json\`, no conflicts)
3. Set your API key:

\`\`\`bash
export ${apiKeyEnv}="your-api-key"
\`\`\`

Add this to your \`.bashrc\`, \`.zshrc\`, or \`.env\`.

## How it works

- **Before compaction**: the script reads your conversation, sends it to ${providerName} for a structured summary, and saves it to \`.claude/memory-backup/\`
- **After compaction**: the summary is automatically re-injected into Claude's context
- **Cost**: ~$0.01 per compaction

## Files

- \`pre-compact-backup.mjs\` — Backup script (Node.js)
- \`post-compact-restore.sh\` — Restore script (Bash)
- \`prompt-templates/summarize.txt\` — Summary prompt template

## Troubleshooting

If the summary doesn't work:
1. Check that \`${apiKeyEnv}\` is set: \`echo $${apiKeyEnv}\`
2. Check logs in \`.claude/memory-backup/\`
3. Without an API key, a basic fallback (last messages) is used
`;
}
