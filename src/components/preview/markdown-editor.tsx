'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { Pencil, Eye } from 'lucide-react';
import { useT } from '@/lib/i18n';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const lineCount = value.split('\n').length;
  const { t } = useT();

  return (
    <div className="flex flex-col bg-white/70 backdrop-blur-sm border-2 border-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden h-full min-h-[700px]">
      <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-white/50">
        <div className="flex gap-6">
          <button
            onClick={() => setMode('edit')}
            className={cn(
              'flex items-center gap-2 py-2 text-sm font-bold transition-all border-b-2',
              mode === 'edit'
                ? 'border-[#FF8A71] text-[#FF8A71]'
                : 'border-transparent text-slate-400 hover:text-slate-600',
            )}
          >
            <Pencil size={16} />
            {t('editor.edit')}
          </button>
          <button
            onClick={() => setMode('preview')}
            className={cn(
              'flex items-center gap-2 py-2 text-sm font-bold transition-all border-b-2',
              mode === 'preview'
                ? 'border-[#FF8A71] text-[#FF8A71]'
                : 'border-transparent text-slate-400 hover:text-slate-600',
            )}
          >
            <Eye size={16} />
            {t('editor.preview')}
          </button>
        </div>
        <div className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          {lineCount} {t('editor.lines')}
        </div>
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        {mode === 'edit' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full bg-transparent font-mono text-sm text-slate-700 resize-none focus:outline-none"
            spellCheck={false}
          />
        ) : (
          <div className="w-full h-full overflow-auto">
            <pre className="bg-transparent p-0 font-mono text-sm whitespace-pre-wrap text-slate-800">
              {value}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
