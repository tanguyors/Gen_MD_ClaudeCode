import type { Questionnaire, SectionKey } from './types';
import { SECTIONS } from './sections';

export interface SectionScore {
  key: SectionKey;
  title: string;
  filled: number;
  total: number;
  percentage: number;
}

export interface OverallScore {
  sections: SectionScore[];
  overallPercentage: number;
  requiredComplete: boolean;
}

export function scoreQuestionnaire(data: Partial<Questionnaire>): OverallScore {
  const sections: SectionScore[] = SECTIONS.map((section) => {
    const sectionData = data[section.key];
    if (!sectionData || typeof sectionData !== 'object') {
      return { key: section.key, title: section.title, filled: 0, total: 1, percentage: 0 };
    }

    const entries = Object.entries(sectionData);
    const total = entries.length;
    const filled = entries.filter(([, v]) => {
      if (typeof v === 'string') return v.trim().length > 0;
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === 'boolean') return true;
      return v != null;
    }).length;

    return {
      key: section.key,
      title: section.title,
      filled,
      total: Math.max(total, 1),
      percentage: Math.round((filled / Math.max(total, 1)) * 100),
    };
  });

  const totalFilled = sections.reduce((sum, s) => sum + s.filled, 0);
  const totalFields = sections.reduce((sum, s) => sum + s.total, 0);
  const overallPercentage = Math.round((totalFilled / Math.max(totalFields, 1)) * 100);

  const requiredSections = SECTIONS.filter((s) => s.isRequired);
  const requiredComplete = requiredSections.every((s) => {
    const score = sections.find((sc) => sc.key === s.key);
    return score && score.percentage > 0;
  });

  return { sections, overallPercentage, requiredComplete };
}
