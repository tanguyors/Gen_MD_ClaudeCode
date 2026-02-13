import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700 ml-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-white text-sm transition-all',
            'placeholder:text-slate-400 focus:outline-none focus:border-[#FF8A71] focus:ring-4 focus:ring-[#FF8A71]/10',
            'disabled:bg-slate-50 disabled:text-slate-500',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs font-medium text-red-500 ml-1">{error}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';
