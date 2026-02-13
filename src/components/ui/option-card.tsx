'use client';

import { Plus, Minus, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useLocale, useT } from '@/lib/i18n';

export interface OptionItem {
  value: string;
  label: string;
  label_fr?: string;
  pros?: string[];
  pros_fr?: string[];
  cons?: string[];
  cons_fr?: string[];
}

export interface OptionCardGroupProps {
  label?: string;
  options: OptionItem[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  allowCustom?: boolean;
  customPlaceholder?: string;
}

function useLocalizedOption(option: OptionItem, locale: string) {
  return {
    label: locale === 'fr' && option.label_fr ? option.label_fr : option.label,
    pros: locale === 'fr' && option.pros_fr ? option.pros_fr : option.pros,
    cons: locale === 'fr' && option.cons_fr ? option.cons_fr : option.cons,
  };
}

export function OptionCardGroup({
  label,
  options,
  value,
  onChange,
  multiple = false,
  allowCustom = false,
  customPlaceholder,
}: OptionCardGroupProps) {
  const { locale } = useLocale();
  const { t } = useT();

  const isSelected = (val: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(val);
    }
    return value === val;
  };

  const getCustomValue = () => {
    if (multiple && Array.isArray(value)) {
      const custom = value.find((v) => v.startsWith('custom:'));
      return custom ? custom.replace('custom:', '') : '';
    }
    return typeof value === 'string' && value.startsWith('custom:')
      ? value.replace('custom:', '')
      : '';
  };

  const isCustomActive = () => {
    if (multiple && Array.isArray(value)) {
      return value.some((v) => v.startsWith('custom:'));
    }
    return typeof value === 'string' && value.startsWith('custom:');
  };

  const handleSelect = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      if (value.includes(optionValue)) {
        onChange(value.filter((v) => v !== optionValue));
      } else {
        onChange([...value, optionValue]);
      }
    } else {
      onChange(optionValue === value ? '' : optionValue);
    }
  };

  const handleCustomToggle = () => {
    if (multiple && Array.isArray(value)) {
      if (isCustomActive()) {
        onChange(value.filter((v) => !v.startsWith('custom:')));
      } else {
        onChange([...value, 'custom:']);
      }
    } else {
      if (isCustomActive()) {
        onChange('');
      } else {
        onChange('custom:');
      }
    }
  };

  const handleCustomTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = `custom:${e.target.value}`;
    if (multiple && Array.isArray(value)) {
      const filtered = value.filter((v) => !v.startsWith('custom:'));
      onChange([...filtered, newVal]);
    } else {
      onChange(newVal);
    }
  };

  return (
    <div className="w-full space-y-4">
      {label && (
        <h3 className="text-base font-bold text-slate-800 ml-1">{label}</h3>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((option) => {
          const selected = isSelected(option.value);
          const localized = useLocalizedOption(option, locale);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                'group relative flex flex-col text-left p-5 transition-all duration-300 rounded-2xl border-2 outline-none',
                selected
                  ? 'bg-[#FFF0ED] border-[#FF8A71] shadow-[0_10px_25px_rgba(255,138,113,0.1)] scale-[1.02]'
                  : 'bg-white/70 backdrop-blur-sm border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-slate-100',
              )}
            >
              <div className="flex justify-between items-start mb-3 w-full">
                <span
                  className={cn(
                    'text-sm font-bold transition-colors',
                    selected ? 'text-[#FF8A71]' : 'text-slate-800',
                  )}
                >
                  {localized.label}
                </span>
                {selected && (
                  <div className="bg-[#FF8A71] rounded-full p-1 text-white shadow-sm">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </div>

              <div className="space-y-1.5 mt-auto">
                {localized.pros?.map((pro, i) => (
                  <div key={`pro-${i}`} className="flex items-start gap-1.5 text-xs text-slate-600">
                    <Plus size={12} className="mt-0.5 shrink-0 text-[#48BB78]" strokeWidth={3} />
                    <span>{pro}</span>
                  </div>
                ))}
                {localized.cons?.map((con, i) => (
                  <div key={`con-${i}`} className="flex items-start gap-1.5 text-xs text-slate-600">
                    <Minus size={12} className="mt-0.5 shrink-0 text-[#FF8A71]" strokeWidth={3} />
                    <span>{con}</span>
                  </div>
                ))}
              </div>
            </button>
          );
        })}

        {allowCustom && (
          <button
            type="button"
            onClick={handleCustomToggle}
            className={cn(
              'group relative flex flex-col items-center justify-center p-5 transition-all duration-300 rounded-2xl border-2 border-dashed min-h-[120px] outline-none',
              isCustomActive()
                ? 'bg-[#FFF0ED] border-[#FF8A71] shadow-[0_10px_25px_rgba(255,138,113,0.1)]'
                : 'bg-white/40 border-slate-200 hover:border-[#FF8A71] hover:bg-white/60',
            )}
          >
            <span
              className={cn(
                'text-sm font-bold mb-1',
                isCustomActive() ? 'text-[#FF8A71]' : 'text-slate-400 group-hover:text-slate-600',
              )}
            >
              {t('optionCard.other')}
            </span>
            <span className="text-xs text-slate-400 text-center">{t('optionCard.specifyOwn')}</span>
          </button>
        )}
      </div>

      {allowCustom && isCustomActive() && (
        <div className="mt-3">
          <textarea
            autoFocus
            className="w-full min-h-[100px] p-4 bg-white border-2 border-[#FFD9D1] rounded-2xl shadow-sm focus:border-[#FF8A71] focus:ring-4 focus:ring-[#FF8A71]/5 outline-none transition-all placeholder:text-slate-300 text-sm text-slate-700"
            placeholder={customPlaceholder ?? t('optionCard.tellUsMore')}
            value={getCustomValue()}
            onChange={handleCustomTextChange}
          />
        </div>
      )}
    </div>
  );
}
