import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Questionnaire } from '@/lib/questionnaire/types';
import type { QualityReport } from '@/lib/quality/types';

interface AppState {
  questionnaire: Partial<Questionnaire>;
  currentStep: number;
  generatedMarkdown: string | null;
  qualityReport: QualityReport | null;
  editedMarkdown: string | null;
  isGenerating: boolean;
  generationError: string | null;
  splitMode: boolean;

  updateSection: <K extends keyof Questionnaire>(
    key: K,
    data: Partial<Questionnaire[K]>,
  ) => void;
  setCurrentStep: (step: number) => void;
  setGeneratedMarkdown: (md: string) => void;
  setEditedMarkdown: (md: string) => void;
  setQualityReport: (report: QualityReport) => void;
  setIsGenerating: (val: boolean) => void;
  setGenerationError: (err: string | null) => void;
  setSplitMode: (val: boolean) => void;
  resetAll: () => void;
  resetGeneration: () => void;
}

const INITIAL_STATE = {
  questionnaire: {} as Partial<Questionnaire>,
  currentStep: 0,
  generatedMarkdown: null as string | null,
  qualityReport: null as QualityReport | null,
  editedMarkdown: null as string | null,
  isGenerating: false,
  generationError: null as string | null,
  splitMode: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      updateSection: (key, data) =>
        set((state) => ({
          questionnaire: {
            ...state.questionnaire,
            [key]: { ...(state.questionnaire[key] as Record<string, unknown>), ...data },
          },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),
      setGeneratedMarkdown: (md) => set({ generatedMarkdown: md, editedMarkdown: md }),
      setEditedMarkdown: (md) => set({ editedMarkdown: md }),
      setQualityReport: (report) => set({ qualityReport: report }),
      setIsGenerating: (val) => set({ isGenerating: val }),
      setGenerationError: (err) => set({ generationError: err }),
      setSplitMode: (val) => set({ splitMode: val }),
      resetAll: () => set(INITIAL_STATE),
      resetGeneration: () =>
        set({ generatedMarkdown: null, editedMarkdown: null, qualityReport: null }),
    }),
    {
      name: 'claudemd-generator-v1',
      storage: createJSONStorage(() => localStorage),
      version: 3,
      migrate: (persisted, version) => {
        const state = persisted as Record<string, unknown>;
        if (version < 2) {
          return { ...state, generatedMarkdown: null, editedMarkdown: null, splitMode: false };
        }
        if (version < 3) {
          return { ...state, splitMode: false };
        }
        return persisted as AppState;
      },
      partialize: (state) => ({
        questionnaire: state.questionnaire,
        currentStep: state.currentStep,
        generatedMarkdown: state.generatedMarkdown,
        editedMarkdown: state.editedMarkdown,
        splitMode: state.splitMode,
      }),
    },
  ),
);
