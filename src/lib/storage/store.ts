import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Questionnaire } from '@/lib/questionnaire/types';
import type { QualityReport } from '@/lib/quality/types';
import type { RuleFile } from '@/lib/generation/rules-generator';
import type { DocFile } from '@/lib/generation/docs-generator';

interface AppState {
  questionnaire: Partial<Questionnaire>;
  currentStep: number;
  generatedMarkdown: string | null;
  generatedRules: RuleFile[];
  generatedDocs: DocFile[];
  qualityReport: QualityReport | null;
  editedMarkdown: string | null;
  isGenerating: boolean;
  generationError: string | null;

  updateSection: <K extends keyof Questionnaire>(
    key: K,
    data: Partial<Questionnaire[K]>,
  ) => void;
  setCurrentStep: (step: number) => void;
  setGeneratedMarkdown: (md: string) => void;
  setGeneratedRules: (rules: RuleFile[]) => void;
  setGeneratedDocs: (docs: DocFile[]) => void;
  setEditedMarkdown: (md: string) => void;
  setQualityReport: (report: QualityReport) => void;
  setIsGenerating: (val: boolean) => void;
  setGenerationError: (err: string | null) => void;
  resetAll: () => void;
  resetGeneration: () => void;
}

const INITIAL_STATE = {
  questionnaire: {} as Partial<Questionnaire>,
  currentStep: 0,
  generatedMarkdown: null as string | null,
  generatedRules: [] as RuleFile[],
  generatedDocs: [] as DocFile[],
  qualityReport: null as QualityReport | null,
  editedMarkdown: null as string | null,
  isGenerating: false,
  generationError: null as string | null,
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
      setGeneratedRules: (rules) => set({ generatedRules: rules }),
      setGeneratedDocs: (docs) => set({ generatedDocs: docs }),
      setEditedMarkdown: (md) => set({ editedMarkdown: md }),
      setQualityReport: (report) => set({ qualityReport: report }),
      setIsGenerating: (val) => set({ isGenerating: val }),
      setGenerationError: (err) => set({ generationError: err }),
      resetAll: () => set(INITIAL_STATE),
      resetGeneration: () =>
        set({ generatedMarkdown: null, editedMarkdown: null, generatedRules: [], generatedDocs: [], qualityReport: null }),
    }),
    {
      name: 'claudemd-generator-v1',
      storage: createJSONStorage(() => localStorage),
      version: 4,
      migrate: (persisted, version) => {
        const state = persisted as Record<string, unknown>;
        if (version < 4) {
          // Remove old splitMode, add new fields
          const { splitMode: _sm, ...rest } = state as Record<string, unknown> & { splitMode?: boolean };
          return { ...rest, generatedRules: [], generatedDocs: [] };
        }
        return persisted as AppState;
      },
      partialize: (state) => ({
        questionnaire: state.questionnaire,
        currentStep: state.currentStep,
        generatedMarkdown: state.generatedMarkdown,
        editedMarkdown: state.editedMarkdown,
        generatedRules: state.generatedRules,
        generatedDocs: state.generatedDocs,
      }),
    },
  ),
);
