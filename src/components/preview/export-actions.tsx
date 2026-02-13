'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { Download, Copy, Check, RefreshCw, Package } from 'lucide-react';
import { useT } from '@/lib/i18n';
import type { SplitOutput } from '@/lib/generation/splitter';

interface ExportActionsProps {
  markdown: string;
  splitOutput: SplitOutput | null;
  splitMode: boolean;
  onRegenerate?: () => void;
  isGenerating?: boolean;
}

export function ExportActions({ markdown, splitOutput, splitMode, onRegenerate, isGenerating }: ExportActionsProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useT();

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CLAUDE.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    if (!splitOutput) return;
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    zip.file('CLAUDE.md', splitOutput.root);

    const agentDocsFolder = zip.folder('agent_docs');
    for (const doc of splitOutput.agentDocs) {
      agentDocsFolder!.file(doc.filename, doc.content);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'claude-md-bundle.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = markdown;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const showZip = splitMode && splitOutput && splitOutput.agentDocs.length > 0;

  return (
    <div className="bg-white/70 backdrop-blur-sm border-2 border-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
      <h3 className="text-lg font-black text-slate-900 mb-6">{t('export.title')}</h3>

      {showZip && (
        <div className="text-xs font-bold text-slate-400 text-center mb-4">
          <Package size={14} className="inline mr-1 -mt-0.5" />
          {splitOutput.agentDocs.length + 1} {t('export.filesInBundle')}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {showZip ? (
          <button
            onClick={handleDownloadZip}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#FF8A71] text-white font-black rounded-2xl shadow-[0_10px_20px_rgba(255,138,113,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Package size={20} />
            {t('export.downloadZip')}
          </button>
        ) : (
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#FF8A71] text-white font-black rounded-2xl shadow-[0_10px_20px_rgba(255,138,113,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Download size={20} />
            {t('export.download')}
          </button>
        )}

        {showZip && (
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-slate-100 text-slate-600 font-black rounded-2xl hover:border-[#FF8A71] hover:text-[#FF8A71] transition-all"
          >
            <Download size={18} />
            {t('export.download')}
          </button>
        )}

        <button
          onClick={handleCopy}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-6 py-4 border-2 font-black rounded-2xl transition-all',
            copied
              ? 'bg-[#F0FFF4] border-[#C6F6D5] text-[#48BB78]'
              : 'bg-white border-slate-100 text-slate-600 hover:border-[#FF8A71] hover:text-[#FF8A71]',
          )}
        >
          {copied ? <Check size={20} /> : <Copy size={20} />}
          {copied ? t('export.copied') : t('export.copy')}
        </button>

        <div className="h-px bg-slate-100 my-2" />
        <button
          disabled
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 border-2 border-slate-100 text-slate-300 font-bold rounded-2xl cursor-not-allowed transition-all"
        >
          <RefreshCw size={18} />
          {t('export.regenerate')}
          <span className="ml-1 text-[10px] font-black tracking-widest uppercase bg-slate-200 text-slate-400 px-2 py-0.5 rounded-full">
            soon
          </span>
        </button>
      </div>
    </div>
  );
}
