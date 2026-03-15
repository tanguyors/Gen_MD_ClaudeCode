'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { Download, Copy, Check, RefreshCw, Package, Bot, Brain, Shield, FileText } from 'lucide-react';
import { useT } from '@/lib/i18n';
import type { StubsOutput } from '@/lib/generation/agent-stubs';
import type { HooksOutput } from '@/lib/generation/hook-scripts';
import type { RuleFile } from '@/lib/generation/rules-generator';
import type { DocFile } from '@/lib/generation/docs-generator';

interface ExportActionsProps {
  markdown: string;
  rulesFiles: RuleFile[];
  docsFiles: DocFile[];
  stubsOutput: StubsOutput | null;
  hooksOutput: HooksOutput | null;
  onRegenerate?: () => void;
  isGenerating?: boolean;
}

export function ExportActions({ markdown, rulesFiles, docsFiles, stubsOutput, hooksOutput, onRegenerate, isGenerating }: ExportActionsProps) {
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
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    // Root CLAUDE.md
    zip.file('CLAUDE.md', markdown);

    // .claude/rules/*.md
    for (const rule of rulesFiles) {
      zip.file(rule.path, rule.content);
    }

    // docs/*.md
    for (const doc of docsFiles) {
      zip.file(doc.path, doc.content);
    }

    // .claude/agents/ and .claude/commands/
    if (stubsOutput) {
      for (const stub of [...stubsOutput.agents, ...stubsOutput.skills]) {
        zip.file(stub.path, stub.content);
      }
    }

    // .claude/hooks/
    if (hooksOutput?.enabled) {
      for (const hookFile of hooksOutput.files) {
        zip.file(hookFile.path, hookFile.content);
      }
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

  const agentCount = stubsOutput?.agents.length ?? 0;
  const commandCount = stubsOutput?.skills.length ?? 0;
  const hasStubs = agentCount > 0 || commandCount > 0;
  const hasHooks = hooksOutput?.enabled && hooksOutput.files.length > 0;
  const totalFiles = 1 + rulesFiles.length + docsFiles.length + agentCount + commandCount + (hasHooks ? hooksOutput!.files.length : 0);
  const showZip = rulesFiles.length > 0 || docsFiles.length > 0 || hasStubs || hasHooks;

  return (
    <div className="bg-white/70 backdrop-blur-sm border-2 border-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
      <h3 className="text-lg font-black text-slate-900 mb-6">{t('export.title')}</h3>

      {showZip && (
        <div className="space-y-1 text-center mb-4">
          <div className="text-xs font-bold text-slate-400">
            <Package size={14} className="inline mr-1 -mt-0.5" />
            {totalFiles} {t('export.filesInBundle')}
          </div>
          {rulesFiles.length > 0 && (
            <div className="text-[10px] font-bold text-[#0EA5E9]">
              <Shield size={12} className="inline mr-1 -mt-0.5" />
              {rulesFiles.length} rules
            </div>
          )}
          {docsFiles.length > 0 && (
            <div className="text-[10px] font-bold text-[#10B981]">
              <FileText size={12} className="inline mr-1 -mt-0.5" />
              {docsFiles.length} docs
            </div>
          )}
          {hasStubs && (
            <div className="text-[10px] font-bold text-[#8B5CF6]">
              <Bot size={12} className="inline mr-1 -mt-0.5" />
              {agentCount} {t('stubs.agentCount')} + {commandCount} commands
            </div>
          )}
          {hasHooks && (
            <div className="text-[10px] font-bold text-[#F59E0B]">
              <Brain size={12} className="inline mr-1 -mt-0.5" />
              Persistent Memory Hooks
            </div>
          )}
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
