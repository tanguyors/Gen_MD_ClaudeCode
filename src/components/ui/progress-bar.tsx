import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  return (
    <div className={cn('h-2 w-full bg-[#FFF0ED] rounded-full overflow-hidden', className)}>
      <div
        className="h-full bg-gradient-to-r from-[#FF8A71] to-[#FFB2A1] rounded-full transition-all duration-500 ease-out"
        style={{ width: `${clampedValue}%` }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
