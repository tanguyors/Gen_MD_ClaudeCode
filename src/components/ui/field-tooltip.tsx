'use client';

import * as Popover from '@radix-ui/react-popover';
import { HelpCircle, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface FieldTooltipProps {
  tooltip: string;
  examples?: string[];
}

export function FieldTooltip({ tooltip, examples }: FieldTooltipProps) {
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center text-slate-400 hover:text-[#FF8A71] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFB2A1] rounded-full p-0.5"
          aria-label="More information"
        >
          <HelpCircle size={16} strokeWidth={2.5} />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align="start"
          className={cn(
            'z-50 w-72 p-5',
            'bg-white/90 backdrop-blur-md border-2 border-white rounded-2xl',
            'shadow-[0_12px_40px_rgba(0,0,0,0.08)] outline-none',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          )}
        >
          <div className="flex flex-col gap-3">
            <p className="text-sm leading-relaxed text-slate-700 font-medium">
              {tooltip}
            </p>

            {examples && examples.length > 0 && (
              <div className="mt-1 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsExamplesOpen(!isExamplesOpen)}
                  className="flex items-center justify-between w-full group text-left"
                >
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF8A71]">
                    <Lightbulb size={14} />
                    Examples
                  </span>
                  {isExamplesOpen ? (
                    <ChevronUp size={14} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={14} className="text-slate-400" />
                  )}
                </button>

                {isExamplesOpen && (
                  <ul className="mt-3 space-y-2">
                    {examples.map((example, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-600 bg-[#FAF9F6] border border-white p-2 rounded-xl italic leading-snug"
                      >
                        &quot;{example}&quot;
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <Popover.Arrow className="fill-white" width={16} height={8} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
