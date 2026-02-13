'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/storage/store';
import { WizardShell } from '@/components/questionnaire/wizard-shell';

export default function QuestionnairePage() {
  const resetAll = useAppStore((s) => s.resetAll);
  const didReset = useRef(false);

  useEffect(() => {
    if (!didReset.current) {
      didReset.current = true;
      resetAll();
    }
  }, [resetAll]);

  return <WizardShell />;
}
