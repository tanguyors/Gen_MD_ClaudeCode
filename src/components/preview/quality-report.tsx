'use client';

import type { QualityReport } from '@/lib/quality/types';
import { cn } from '@/lib/utils/cn';
import { useT } from '@/lib/i18n';
import {
  FileText,
  Check,
  Sparkles,
  Info,
  AlertCircle,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';

interface QualityReportPanelProps {
  report: QualityReport;
}

export function QualityReportPanel({ report }: QualityReportPanelProps) {
  const { t } = useT();
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'bg-red-50 text-red-600 border-red-100';
      case 'warning':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const getIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <AlertCircle size={14} />;
      case 'warning':
        return <AlertTriangle size={14} />;
      default:
        return <Info size={14} />;
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm border-2 border-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-black text-slate-900">{t('quality.title')}</h3>
          <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            {t('quality.subtitle')}
          </p>
        </div>
        <div
          className={cn(
            'px-4 py-2 rounded-2xl border-2 font-black text-sm flex items-center gap-2',
            report.passed
              ? 'bg-[#F0FFF4] text-[#48BB78] border-[#C6F6D5]'
              : 'bg-red-50 text-red-500 border-red-100',
          )}
        >
          {report.passed ? <ShieldCheck size={18} /> : <AlertTriangle size={18} />}
          {report.passed ? t('quality.pass') : t('quality.issues')}
        </div>
      </div>

      <div className="mb-8 text-center">
        <div className="inline-flex flex-col items-center">
          <span className="text-5xl font-black text-slate-900">{report.score}</span>
          <span className="text-xs font-bold text-slate-400">{t('quality.score')}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: t('quality.lines'), val: report.lineCount, icon: FileText, color: 'text-slate-400' },
          { label: t('quality.rules'), val: report.alwaysOnRuleCount, icon: Check, color: 'text-[#48BB78]' },
          {
            label: t('quality.coverage'),
            val: `${report.sectionCoverage}%`,
            icon: Sparkles,
            color: 'text-[#8B5CF6]',
          },
          {
            label: t('quality.verbosity'),
            val: report.verbosityRating,
            icon: Info,
            color: 'text-[#FF8A71]',
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-1">
            <stat.icon className={cn('mb-1', stat.color)} size={16} />
            <span className="text-sm font-black text-slate-900">{String(stat.val)}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {report.issues.length > 0 && (
        <div className="space-y-3 max-h-[300px] overflow-auto pr-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {t('quality.feedback')}
          </h4>
          {report.issues.map((issue, idx) => (
            <div
              key={idx}
              className={cn('p-4 rounded-2xl border flex gap-3', getSeverityStyles(issue.severity))}
            >
              <div className="mt-0.5">{getIcon(issue.severity)}</div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold leading-tight">{issue.message}</p>
                {issue.suggestion && (
                  <p className="text-xs opacity-80 italic">{t('quality.tip')} {issue.suggestion}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
