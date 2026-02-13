'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/storage/store';
import { MarkdownEditor } from '@/components/preview/markdown-editor';
import { QualityReportPanel } from '@/components/preview/quality-report';
import { ExportActions } from '@/components/preview/export-actions';
import { splitIntoFiles } from '@/lib/generation/splitter';
import { Sparkles, AlertCircle, RefreshCw, ArrowLeft, FileText, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useT } from '@/lib/i18n';

export default function PreviewPage() {
  const router = useRouter();
  const { t } = useT();
  const [hydrated, setHydrated] = useState(false);
  const generationAttempted = useRef(false);
  const [activeTab, setActiveTab] = useState<string>('CLAUDE.md');
  const {
    generatedMarkdown,
    editedMarkdown,
    qualityReport,
    isGenerating,
    generationError,
    splitMode,
    setGeneratedMarkdown,
    setEditedMarkdown,
    setQualityReport,
    setIsGenerating,
    setGenerationError,
    setSplitMode,
  } = useAppStore();

  // Wait for Zustand persist to fully hydrate from localStorage
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
    console.log('[ClaudeMD] Generation started, questionnaire keys:', Object.keys(currentQuestionnaire));

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionnaire: currentQuestionnaire, useAI: true }),
      });

      console.log('[ClaudeMD] API status:', res.status);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(errData.error || 'Generation failed');
      }

      const data = await res.json();
      console.log('[ClaudeMD] Generated:', data.markdown?.length, 'chars, method:', data.method);

      if (!data.markdown) {
        throw new Error('Empty response from generation API');
      }

      setGeneratedMarkdown(data.markdown);

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
      console.error('[ClaudeMD] Generation error:', err);
      setGenerationError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
    }
  }, [setIsGenerating, setGenerationError, setGeneratedMarkdown, setQualityReport]);

  useEffect(() => {
    if (!hydrated) return;
    if (generationAttempted.current) return;

    const state = useAppStore.getState();
    console.log('[ClaudeMD] Hydrated. generatedMarkdown:', state.generatedMarkdown?.length ?? 'null', 'questionnaire keys:', Object.keys(state.questionnaire));

    if (!state.generatedMarkdown && !state.isGenerating) {
      generationAttempted.current = true;
      handleGenerate();
    }
  }, [hydrated, handleGenerate]);

  const displayMarkdown = editedMarkdown ?? generatedMarkdown ?? '';

  // Compute split output when split mode is active
  const splitOutput = useMemo(() => {
    if (!splitMode || !displayMarkdown) return null;
    return splitIntoFiles(displayMarkdown);
  }, [splitMode, displayMarkdown]);

  // Get content for the active tab
  const activeTabContent = useMemo(() => {
    if (!splitMode || !splitOutput) return displayMarkdown;
    if (activeTab === 'CLAUDE.md') return splitOutput.root;
    const doc = splitOutput.agentDocs.find((d) => `agent_docs/${d.filename}` === activeTab);
    return doc?.content ?? '';
  }, [splitMode, splitOutput, activeTab, displayMarkdown]);

  // Reset active tab when split mode changes or when a tab no longer exists
  useEffect(() => {
    if (!splitMode) {
      setActiveTab('CLAUDE.md');
    } else if (splitOutput) {
      const validTabs = ['CLAUDE.md', ...splitOutput.agentDocs.map((d) => `agent_docs/${d.filename}`)];
      if (!validTabs.includes(activeTab)) {
        setActiveTab('CLAUDE.md');
      }
    }
  }, [splitMode, splitOutput, activeTab]);

  // Before hydration, show loading
  if (!hydrated) {
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
        </div>
      </div>
    );
  }

  if (isGenerating) {
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
          <p className="text-slate-600 font-medium">{t('preview.generatingDesc')}</p>
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

  return (
    <div className="min-h-screen bg-[#FAF9F6] px-6 py-12 lg:py-20 font-sans relative overflow-hidden">
      {/* Background Orbs */}
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

          <div className="flex items-center gap-6">
            {/* Split mode toggle */}
            <div className="flex items-center gap-3">
              <span className={cn('text-sm font-bold transition-colors', !splitMode ? 'text-slate-700' : 'text-slate-400')}>
                {t('preview.singleFile')}
              </span>
              <button
                onClick={() => setSplitMode(!splitMode)}
                className={cn(
                  'relative w-12 h-6 rounded-full transition-colors duration-200',
                  splitMode ? 'bg-[#FF8A71]' : 'bg-slate-200',
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200',
                    splitMode ? 'translate-x-6' : 'translate-x-0.5',
                  )}
                />
              </button>
              <span className={cn('text-sm font-bold transition-colors', splitMode ? 'text-[#FF8A71]' : 'text-slate-400')}>
                {t('preview.splitFiles')}
              </span>
            </div>

            <button
              onClick={() => router.push('/questionnaire')}
              className="group flex items-center gap-2 text-slate-500 font-bold hover:text-[#FF8A71] transition-colors"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              {t('preview.backToQuestionnaire')}
            </button>
          </div>
        </header>

        {/* File tabs (split mode) */}
        {splitMode && splitOutput && splitOutput.agentDocs.length > 0 && (
          <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
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
            {splitOutput.agentDocs.map((doc) => {
              const tabKey = `agent_docs/${doc.filename}`;
              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-bold whitespace-nowrap rounded-xl transition-all border-2',
                    activeTab === tabKey
                      ? 'bg-[#FF8A71]/10 text-[#FF8A71] border-[#FF8A71]/20'
                      : 'bg-white/50 text-slate-400 border-transparent hover:text-slate-600 hover:bg-white',
                  )}
                >
                  <FolderOpen size={14} />
                  {doc.filename}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6 h-full">
            <MarkdownEditor
              value={activeTabContent}
              onChange={
                !splitMode || activeTab === 'CLAUDE.md'
                  ? setEditedMarkdown
                  : () => {} // agent_docs are read-only in split mode
              }
            />
          </div>

          <div className="flex flex-col gap-6">
            <ExportActions
              markdown={activeTabContent}
              splitOutput={splitOutput}
              splitMode={splitMode}
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
