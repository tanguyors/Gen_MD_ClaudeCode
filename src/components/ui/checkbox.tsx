import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1">
        <label htmlFor={checkboxId} className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            ref={ref}
            id={checkboxId}
            className={cn(
              'h-5 w-5 rounded border-2 border-slate-200 text-[#FF8A71] focus:ring-[#FF8A71] transition-all',
              'checked:bg-[#FF8A71] checked:border-[#FF8A71]',
              className,
            )}
            {...props}
          />
          {label && (
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
              {label}
            </span>
          )}
        </label>
        {error && <p className="text-xs font-medium text-red-500 ml-1">{error}</p>}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';
