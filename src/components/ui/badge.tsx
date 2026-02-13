import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'secondary';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const styles = {
    default: 'bg-[#FFF0ED] text-[#FF8A71] border-[#FFD9D1]',
    success: 'bg-[#F0FFF4] text-[#48BB78] border-[#C6F6D5]',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    destructive: 'bg-red-50 text-red-600 border-red-100',
    secondary: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border',
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
