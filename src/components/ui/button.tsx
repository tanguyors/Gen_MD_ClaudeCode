import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary:
        'bg-[#FF8A71] text-white shadow-[0_10px_25px_rgba(255,138,113,0.3)] hover:shadow-[0_15px_35px_rgba(255,138,113,0.4)] hover:scale-[1.02] active:scale-[0.98]',
      secondary: 'bg-[#FFF0ED] text-[#FF8A71] hover:bg-[#FFE4DE]',
      outline: 'border-2 border-[#FFD9D1] text-[#FF8A71] bg-white hover:bg-[#FFF0ED]',
      ghost: 'text-slate-600 hover:bg-[#FFF0ED] hover:text-[#FF8A71]',
      destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-5 text-sm',
      lg: 'h-12 px-8 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-[2rem] font-bold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
