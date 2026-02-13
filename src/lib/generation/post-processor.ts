export function postProcess(markdown: string): string {
  let result = markdown;

  // Remove triple+ blank lines
  result = result.replace(/\n{4,}/g, '\n\n\n');

  // Ensure file starts with # heading or always-on block
  const trimmed = result.trimStart();
  if (!trimmed.startsWith('#') && !trimmed.startsWith('<!--')) {
    result = `# CLAUDE.md\n\n${result}`;
  }

  // Ensure file ends with a single newline
  result = result.trimEnd() + '\n';

  // Remove any AI preamble/postamble (markdown fences)
  result = removeWrapping(result);

  return result;
}

function removeWrapping(text: string): string {
  const fenceMatch = text.match(/^```(?:markdown|md)?\n([\s\S]*?)```\s*$/);
  if (fenceMatch?.[1]) {
    return fenceMatch[1];
  }
  return text;
}

export function countLines(markdown: string): number {
  return markdown.split('\n').length;
}

export function countAlwaysOnRules(markdown: string): number {
  const match = markdown.match(/<!-- ALWAYS-ON RULES -->([\s\S]*?)<!-- \/ALWAYS-ON RULES -->/);
  if (!match?.[1]) return 0;
  return match[1].split('\n').filter((l) => l.trim().startsWith('-')).length;
}
