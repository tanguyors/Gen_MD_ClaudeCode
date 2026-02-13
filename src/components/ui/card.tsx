import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white/70 backdrop-blur-sm border-2 border-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8',
        className,
      )}
    >
      {children}
    </div>
  );
}
