import type { Questionnaire } from './types';

export function normalizeQuestionnaire(data: Partial<Questionnaire>): Partial<Questionnaire> {
  return deepNormalize(data) as Partial<Questionnaire>;
}

function deepNormalize(obj: unknown): unknown {
  if (typeof obj === 'string') {
    return obj.trim();
  }
  if (Array.isArray(obj)) {
    return [
      ...new Set(
        obj
          .map((item) => deepNormalize(item))
          .filter((item) => {
            if (typeof item === 'string') return item.length > 0;
            return item != null;
          }),
      ),
    ];
  }
  if (obj && typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const normalized = deepNormalize(value);
      if (normalized !== '' && normalized !== null && normalized !== undefined) {
        if (Array.isArray(normalized) && normalized.length === 0) continue;
        result[key] = normalized;
      }
    }
    return result;
  }
  return obj;
}
