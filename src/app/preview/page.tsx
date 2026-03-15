'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/storage/store';
import { MarkdownEditor } from '@/components/preview/markdown-editor';
import { QualityReportPanel } from '@/components/preview/quality-report';
import { ExportActions } from '@/components/preview/export-actions';
import { generateStubs } from '@/lib/generation/agent-stubs';
import { generateHookScripts } from '@/lib/generation/hook-scripts';
import { Sparkles, AlertCircle, RefreshCw, ArrowLeft, FileText, Shield, FolderOpen, Bot } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useT } from '@/lib/i18n';

export default function PreviewPage() {
  const router = useRouter();
  const { t } = useT();
  const [hydrated, setHydrated] = useState(false);
  const generationAttempted = useRef(false);
  const [activeTab, setActiveTab] = useState<string>('CLAUDE.md');
  const {
    questionnaire,
    generatedMarkdown,
    generatedRules,
    generatedDocs,
    editedMarkdown,
    qualityReport,
    isGenerating,
    generationError,
    setGeneratedMarkdown,
    setGeneratedRules,
    setGeneratedDocs,
    setEditedMarkdown,
    setQualityReport,
    setIsGenerating,
    setGenerationError,
  } = useAppStore();

  useEffect(() => {
    if (useAppStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    const unsub = useAppStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    return () => unsub();
  }, []);

  const handleGenerate = useCallback(async () => {
    if (useAppStore.getState().isGenerating) return;

    setIsGenerating(true);
    setGenerationError(null);

    const currentQuestionnaire = useAppStore.getState().questionnaire;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionnaire: currentQuestionnaire, useAI: true }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(errData.error || 'Generation failed');
      }

      const data = await res.json();

      if (!data.markdown) {
        throw new Error('Empty response from generation API');
      }

      setGeneratedMarkdown(data.markdown);
      setGeneratedRules(data.rules ?? []);
      setGeneratedDocs(data.docs ?? []);

      fetch('/api/quality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: data.markdown, questionnaire: currentQuestionnaire }),
      })
        .then((qRes) => (qRes.ok ? qRes.json() : null))
        .then((qData) => {
          if (qData?.report) setQualityReport(qData.report);
        })
        .catch(() => {});
    } catch (err) {
      setGenerationError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
    }
  }, [setIsGenerating, setGenerationError, setGeneratedMarkdown, setGeneratedRules, setGeneratedDocs, setQualityReport]);

  useEffect(() => {
    if (!hydrated) return;
    if (generationAttempted.current) return;

    const state = useAppStore.getState();
    if (!state.generatedMarkdown && !state.isGenerating) {
      generationAttempted.current = true;
      handleGenerate();
    }
  }, [hydrated, handleGenerate]);

  const displayMarkdown = editedMarkdown ?? generatedMarkdown ?? '';

  // Agent/skill stubs from questionnaire
  const stubsOutput = useMemo(() => generateStubs(questionnaire), [questionnaire]);
  const hooksOutput = useMemo(() => generateHookScripts(questionnaire), [questionnaire]);

  const allStubs = useMemo(() => {
    if (!stubsOutput) return [];
    return [...stubsOutput.agents, ...stubsOutput.skills];
  }, [stubsOutput]);

  // All browseable files
  const allFiles = useMemo(() => {
    const files: Array<{ path: string; label: string; content: string; group: 'root' | 'rules' | 'docs' | 'stubs' }> = [];

    for (const rule of generatedRules) {
      files.push({ path: rule.path, label: rule.label, content: rule.content, group: 'rules' });
    }
    for (const doc of generatedDocs) {
      files.push({ path: doc.path, label: doc.label, content: doc.content, group: 'docs' });
    }
    for (const stub of allStubs) {
      files.push({ path: stub.path, label: stub.label, content: stub.content, group: 'stubs' });
    }

    return files;
  }, [generatedRules, generatedDocs, allStubs]);

  // Get content for active tab
  const activeTabContent = useMemo(() => {
    if (activeTab === 'CLAUDE.md') return displayMarkdown;
    const file = allFiles.find((f) => f.path === activeTab);
    return file?.content ?? '';
  }, [activeTab, displayMarkdown, allFiles]);

  // Reset tab if it no longer exists
  useEffect(() => {
    if (activeTab === 'CLAUDE.md') return;
    const exists = allFiles.some((f) => f.path === activeTab);
    if (!exists) setActiveTab('CLAUDE.md');
  }, [activeTab, allFiles]);

  // Loading states
  if (!hydrated || isGenerating) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#FFD1C1] top-[-10%] left-[-5%] rounded-full blur-3xl -z-10 opacity-40" />
        <div className="absolute w-[30rem] h-[30rem] bg-[#D1FAE5] bottom-[-10%] right-[-5%] rounded-full blur-3xl -z-10 opacity-40" />
        <div className="flex flex-col items-center text-center max-w-md">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-[#FF8A71]/20 border-t-[#FF8A71] rounded-full animate-spin" />
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FF8A71]" size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">{t('preview.generating')}</h2>
          {isGenerating && <p className="text-slate-600 font-medium">{t('preview.generatingDesc')}</p>}
        </div>
      </div>
    );
  }

  if (generationError) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
        <div className="bg-white/70 backdrop-blur-sm border-2 border-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-12 text-center max-w-lg">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border-2 border-red-100">
            <AlertCircle size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">{t('preview.failed')}</h2>
          <p className="text-slate-600 mb-8">{generationError}</p>
          <button
            onClick={() => {
              generationAttempted.current = false;
              handleGenerate();
            }}
            className="px-8 py-4 bg-[#FF8A71] text-white font-bold rounded-[2rem] shadow-[0_10px_25px_rgba(255,138,113,0.3)] hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={20} />
            {t('preview.retry')}
          </button>
        </div>
      </div>
    );
  }

  const rulesFiles = allFiles.filter((f) => f.group === 'rules');
  const docsFiles = allFiles.filter((f) => f.group === 'docs');
  const stubFiles = allFiles.filter((f) => f.group === 'stubs');

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-6 py-12 lg:py-20 font-sans relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-[#FFD1C1] top-[-5%] left-[-5%] rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute w-[35rem] h-[35rem] bg-[#D1FAE5] bottom-[-10%] right-[-5%] rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute w-80 h-80 bg-[#E9D5FF] top-[20%] right-[10%] rounded-full blur-3xl -z-10 opacity-40" />

      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 shadow-sm mb-4">
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">
                {t('preview.badge')}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              {t('preview.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A71] to-[#FFB2A1]">
                CLAUDE.md
              </span>
            </h1>
          </div>

          <button
            onClick={() => router.push('/questionnaire')}
            className="group flex items-center gap-2 text-slate-500 font-bold hover:text-[#FF8A71] transition-colors"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            {t('preview.backToQuestionnaire')}
          </button>
        </header>

        {/* File tabs */}
        {allFiles.length > 0 && (
          <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
            {/* Root */}
            <button
              onClick={() => setActiveTab('CLAUDE.md')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-bold whitespace-nowrap rounded-xl transition-all border-2',
                activeTab === 'CLAUDE.md'
                  ? 'bg-[#FF8A71]/10 text-[#FF8A71] border-[#FF8A71]/20'
                  : 'bg-white/50 text-slate-400 border-transparent hover:text-slate-600 hover:bg-white',
              )}
            >
              <FileText size={14} />
              CLAUDE.md
            </button>

            {/* Rules separator + tabs */}
            {rulesFiles.length > 0 && (
              <>
                <div className="w-px bg-slate-200 mx-1 self-stretch" />
                {rulesFiles.map((f) => (
                  <button
                    key={f.path}
                    onClick={() => setActiveTab(f.path)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 text-sm font-bold whitespace-nowrap rounded-xl transition-all border-2',
                      activeTab === f.path
                        ? 'bg-[#0EA5E9]/10 text-[#0EA5E9] border-[#0EA5E9]/20'
                        : 'bg-white/50 text-slate-400 border-transparent hover:text-slate-600 hover:bg-white',
                    )}
                  >
                    <Shield size={14} />
                    {f.label}.md
                  </button>
                ))}
              </>
            )}

            {/* Docs separator + tabs */}
            {docsFiles.length > 0 && (
              <>
                <div className="w-px bg-slate-200 mx-1 self-stretch" />
                {docsFiles.map((f) => (
                  <button
                    key={f.path}
                    onClick={() => setActiveTab(f.path)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 text-sm font-bold whitespace-nowrap rounded-xl transition-all border-2',
                      activeTab === f.path
                        ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20'
                        : 'bg-white/50 text-slate-400 border-transparent hover:text-slate-600 hover:bg-white',
                    )}
                  >
                    <FolderOpen size={14} />
                    {f.label}.md
                  </button>
                ))}
              </>
            )}

            {/* Stubs separator + tabs */}
            {stubFiles.length > 0 && (
              <>
                <div className="w-px bg-slate-200 mx-1 self-stretch" />
                {stubFiles.map((f) => (
                  <button
                    key={f.path}
                    onClick={() => setActiveTab(f.path)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 text-sm font-bold whitespace-nowrap rounded-xl transition-all border-2',
                      activeTab === f.path
                        ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20'
                        : 'bg-white/50 text-slate-400 border-transparent hover:text-slate-600 hover:bg-white',
                    )}
                  >
                    <Bot size={14} />
                    {f.label}.md
                  </button>
                ))}
              </>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6 h-full">
            <MarkdownEditor
              value={activeTabContent}
              onChange={
                activeTab === 'CLAUDE.md'
                  ? setEditedMarkdown
                  : () => {}
              }
            />
          </div>

          <div className="flex flex-col gap-6">
            <ExportActions
              markdown={displayMarkdown}
              rulesFiles={generatedRules}
              docsFiles={generatedDocs}
              stubsOutput={stubsOutput}
              hooksOutput={hooksOutput}
              onRegenerate={handleGenerate}
              isGenerating={isGenerating}
            />
            {qualityReport && <QualityReportPanel report={qualityReport} />}
          </div>
        </div>
      </div>
    </div>
  );
}
