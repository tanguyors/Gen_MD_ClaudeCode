/**
 * Splits a single CLAUDE.md markdown into a concise root file + agent_docs/ files.
 * Pure function — no side effects, no React dependencies.
 */

export interface AgentDocFile {
  filename: string;
  title: string;
  triggerHint: string;
  content: string;
}

export interface SplitOutput {
  root: string;
  agentDocs: AgentDocFile[];
}

// ── Section classification map ──────────────────────────────────────────────

interface DocTarget {
  filename: string;
  title: string;
  triggerHint: string;
}

const DOC_TARGETS: Record<string, DocTarget> = {
  'business-goals': {
    filename: 'business-goals.md',
    title: 'Business Context & Goals',
    triggerHint: 'before making product or business-impacting decisions',
  },
  architecture: {
    filename: 'architecture.md',
    title: 'Architecture & Repository',
    triggerHint: 'before changing project structure or adding new modules',
  },
  database: {
    filename: 'database.md',
    title: 'Database & Data',
    triggerHint: 'before modifying the schema or running migrations',
  },
  api: {
    filename: 'api.md',
    title: 'API & Contracts',
    triggerHint: 'before modifying API endpoints or contracts',
  },
  security: {
    filename: 'security.md',
    title: 'Security & Compliance',
    triggerHint: 'before touching auth, secrets, or compliance-related code',
  },
  quality: {
    filename: 'quality.md',
    title: 'Testing & Performance',
    triggerHint: 'before writing tests or optimizing performance',
  },
  cicd: {
    filename: 'cicd.md',
    title: 'CI/CD & Observability',
    triggerHint: 'before modifying pipelines or deployment config',
  },
  standards: {
    filename: 'standards.md',
    title: 'Code Standards & Governance',
    triggerHint: 'before writing new code or setting up new patterns',
  },
  'ux-design': {
    filename: 'ux-design.md',
    title: 'UX/UI & Design',
    triggerHint: 'before working on UI components or design changes',
  },
  i18n: {
    filename: 'i18n.md',
    title: 'Internationalization',
    triggerHint: 'before adding translations or locale support',
  },
  'ai-ml': {
    filename: 'ai-ml.md',
    title: 'AI/ML',
    triggerHint: 'before working on AI features or model integration',
  },
  collaboration: {
    filename: 'collaboration.md',
    title: 'Documentation & Collaboration',
    triggerHint: 'for reference on documentation and team practices',
  },
};

// ── Heading → doc target mapping ────────────────────────────────────────────

interface HeadingRule {
  pattern: RegExp;
  target: string; // key in DOC_TARGETS
}

const DETAIL_HEADING_RULES: HeadingRule[] = [
  // WHY section → business-goals
  { pattern: /^##\s+(why|business\s*context|goals)/i, target: 'business-goals' },

  // WHAT sub-sections
  { pattern: /^###?\s+(repo\s*map|directory\s*structure)/i, target: 'architecture' },
  { pattern: /^###?\s+environments?/i, target: 'architecture' },
  { pattern: /^###?\s+database/i, target: 'database' },
  { pattern: /^###?\s+(api|contracts)/i, target: 'api' },

  // HOW sub-sections
  { pattern: /^###?\s+(code\s*standards?|naming|conventions?)/i, target: 'standards' },
  { pattern: /^###?\s+security/i, target: 'security' },
  { pattern: /^###?\s+performance/i, target: 'quality' },
  { pattern: /^###?\s+testing/i, target: 'quality' },
  { pattern: /^###?\s+(ci\/?cd|pipeline|release)/i, target: 'cicd' },
  { pattern: /^###?\s+observability/i, target: 'cicd' },

  // Supplementary
  { pattern: /^###?\s+(ux|ui|design\s*system)/i, target: 'ux-design' },
  { pattern: /^###?\s+i18n|^###?\s+internation/i, target: 'i18n' },
  { pattern: /^###?\s+(ai|ml|machine\s*learning)/i, target: 'ai-ml' },
  { pattern: /^###?\s+documentation/i, target: 'collaboration' },
  { pattern: /^###?\s+(agent\s*pref|collaboration)/i, target: 'collaboration' },
  { pattern: /^###?\s+(code\s*(modification\s*)?policy)/i, target: 'standards' },
  { pattern: /^###?\s+(definition\s*of\s*done|dod\b)/i, target: 'standards' },
  { pattern: /^###?\s+governance/i, target: 'standards' },

  // Appendix
  { pattern: /^###?\s+examples?/i, target: 'collaboration' },
  { pattern: /^###?\s+(pitfalls?|known\s*pitfalls?)/i, target: 'collaboration' },
];

const ROOT_HEADING_RULES: RegExp[] = [
  /^#\s+/,                                  // Project title (h1)
  /^##\s+(what|architecture|stack)/i,       // WHAT container heading
  /^##\s+(how|working\s*rules)/i,           // HOW container heading
  /^###?\s+stack/i,                         // Stack section
  /^###?\s+commands?/i,                     // Commands section
  /^###?\s+always[- ]on/i,                  // Always-on rules
  /^##\s+agent\s*team/i,                    // Agent Team
  /^##\s+(appendix|supplementary)/i,        // Container headings (not content)
];

// ── Core splitter ───────────────────────────────────────────────────────────

export function splitIntoFiles(markdown: string): SplitOutput {
  if (!markdown || markdown.trim().length === 0) {
    return { root: markdown, agentDocs: [] };
  }

  // Split by --- separator (template engine joins with \n\n---\n\n)
  const topBlocks = markdown.split(/\n\s*---\s*\n/).map((s) => s.trim()).filter(Boolean);

  // If no separators found, try splitting by ## headings
  const blocks = topBlocks.length <= 1 ? splitByHeadings(markdown) : topBlocks;

  const rootParts: string[] = [];
  const docBuckets = new Map<string, string[]>();

  for (const block of blocks) {
    classifyBlock(block, rootParts, docBuckets);
  }

  // Build agent doc files (only for buckets with content)
  const agentDocs = buildAgentDocs(docBuckets);

  // Build pointer section
  if (agentDocs.length > 0) {
    const pointerSection = buildPointerSection(agentDocs);
    rootParts.push(pointerSection);
  }

  const root = rootParts.join('\n\n---\n\n').trim() + '\n';

  return { root, agentDocs };
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function splitByHeadings(markdown: string): string[] {
  const blocks: string[] = [];
  const lines = markdown.split('\n');
  let current: string[] = [];

  for (const line of lines) {
    if (/^##\s+/.test(line) && current.length > 0) {
      blocks.push(current.join('\n'));
      current = [];
    }
    current.push(line);
  }
  if (current.length > 0) {
    blocks.push(current.join('\n'));
  }
  return blocks;
}

function getFirstHeading(block: string): string | null {
  const lines = block.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^#{1,4}\s+/.test(trimmed)) return trimmed;
  }
  return null;
}

function isPreamble(block: string): boolean {
  return (
    block.includes('<!-- ALWAYS-ON RULES -->') ||
    block.includes('<!-- /ALWAYS-ON RULES -->') ||
    /^<!--/.test(block.trim())
  );
}

function isContainerOnly(block: string): boolean {
  // A container heading like "## WHAT (Architecture & Stack)" followed only by sub-sections
  // These are empty wrappers — check if the content is very short (just the heading + maybe a blank line)
  const lines = block.split('\n').filter((l) => l.trim().length > 0);
  if (lines.length > 2) return false;
  const heading = getFirstHeading(block);
  if (!heading) return false;
  return /^##\s+(what|how|appendix|supplementary)/i.test(heading);
}

function hasMultipleSubSections(block: string): boolean {
  let count = 0;
  for (const line of block.split('\n')) {
    if (/^###\s+/.test(line.trim())) count++;
    if (count >= 2) return true;
  }
  return false;
}

function classifyBlock(
  block: string,
  rootParts: string[],
  docBuckets: Map<string, string[]>,
): void {
  // Preamble always goes to root
  if (isPreamble(block)) {
    rootParts.push(block);
    return;
  }

  const heading = getFirstHeading(block);

  // No heading → root
  if (!heading) {
    rootParts.push(block);
    return;
  }

  // Check if it's a root heading
  for (const pattern of ROOT_HEADING_RULES) {
    if (pattern.test(heading)) {
      // This block might be a container (## WHAT/HOW/Appendix) that has sub-sections
      if (/^##\s+(what|how|appendix|supplementary)/i.test(heading)) {
        splitContainerBlock(block, rootParts, docBuckets);
        return;
      }
      // Pure container headings without content go to root as-is
      if (isContainerOnly(block)) {
        return;
      }
      rootParts.push(block);
      return;
    }
  }

  // If the block contains multiple ### sub-sections, split them individually
  if (hasMultipleSubSections(block)) {
    splitContainerBlock(block, rootParts, docBuckets);
    return;
  }

  // Check if it matches a detail heading → agent_docs
  for (const rule of DETAIL_HEADING_RULES) {
    if (rule.pattern.test(heading)) {
      const bucket = docBuckets.get(rule.target) ?? [];
      bucket.push(block);
      docBuckets.set(rule.target, bucket);
      return;
    }
  }

  // Unrecognized → stays in root (fail-safe)
  rootParts.push(block);
}

function splitContainerBlock(
  block: string,
  rootParts: string[],
  docBuckets: Map<string, string[]>,
): void {
  // Split a container like ## WHAT or ## HOW into its ### sub-sections
  const lines = block.split('\n');
  const subBlocks: string[] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (/^###\s+/.test(line) && current.length > 0) {
      subBlocks.push(current.join('\n'));
      current = [];
    }
    current.push(line);
  }
  if (current.length > 0) {
    subBlocks.push(current.join('\n'));
  }

  for (const sub of subBlocks) {
    const subHeading = getFirstHeading(sub);
    if (!subHeading) {
      // Container heading line without content, skip
      continue;
    }

    // Check if this sub-section should stay in root
    let isRoot = false;
    for (const pattern of ROOT_HEADING_RULES) {
      if (pattern.test(subHeading)) {
        isRoot = true;
        break;
      }
    }
    if (isRoot) {
      rootParts.push(sub);
      continue;
    }

    // Check if it matches a detail rule
    let matched = false;
    for (const rule of DETAIL_HEADING_RULES) {
      if (rule.pattern.test(subHeading)) {
        const bucket = docBuckets.get(rule.target) ?? [];
        bucket.push(sub);
        docBuckets.set(rule.target, bucket);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Unrecognized sub-section → root
      rootParts.push(sub);
    }
  }
}

function buildAgentDocs(buckets: Map<string, string[]>): AgentDocFile[] {
  const docs: AgentDocFile[] = [];

  for (const [key, chunks] of buckets.entries()) {
    const target = DOC_TARGETS[key];
    if (!target) continue;

    const content = chunks.join('\n\n').trim();
    if (!content || content.length < 10) continue;

    // Check if we already have a doc with this filename (merge)
    const existing = docs.find((d) => d.filename === target.filename);
    if (existing) {
      existing.content += '\n\n' + content;
    } else {
      docs.push({
        filename: target.filename,
        title: target.title,
        triggerHint: target.triggerHint,
        content: `# ${target.title}\n\n${content}\n`,
      });
    }
  }

  // Sort by filename for consistent ordering
  docs.sort((a, b) => a.filename.localeCompare(b.filename));

  return docs;
}

function buildPointerSection(agentDocs: AgentDocFile[]): string {
  const lines = ['## Documentation (Progressive Disclosure)', ''];
  for (const doc of agentDocs) {
    lines.push(`> Read \`agent_docs/${doc.filename}\` ${doc.triggerHint}`);
  }
  return lines.join('\n');
}
