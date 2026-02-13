'use client';

import { useLocale } from './context';
import { en, type DictionaryKey } from './dictionaries/en';
import { fr } from './dictionaries/fr';

const dictionaries = { en, fr } as const;

export function useT() {
  const { locale } = useLocale();

  const t = (key: DictionaryKey, params?: Record<string, string | number>): string => {
    const dict = dictionaries[locale];
    let value = dict[key] ?? en[key] ?? key;

    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replace(`{${k}}`, String(v));
      }
    }

    return value;
  };

  return { t, locale };
}
