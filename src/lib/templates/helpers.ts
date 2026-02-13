export function hasContent(obj: Record<string, unknown> | undefined): boolean {
  if (!obj) return false;
  return Object.values(obj).some((v) => {
    if (typeof v === 'string') return v.trim().length > 0;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'boolean') return true;
    return v != null;
  });
}

export function renderKeyValueList(items: Array<[string, string | undefined]>): string {
  return items
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `- **${k}:** ${v}`)
    .join('\n');
}

export function renderBulletList(text: string | undefined): string {
  if (!text) return '';
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.startsWith('-') ? line : `- ${line}`))
    .join('\n');
}

export function renderSection(heading: string, level: number, content: string): string {
  if (!content.trim()) return '';
  const prefix = '#'.repeat(level);
  return `${prefix} ${heading}\n\n${content}`;
}
