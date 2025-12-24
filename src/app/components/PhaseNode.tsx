import { Handle, Position } from '@xyflow/react';
import type { PhaseData } from '../data/planData';

interface PhaseNodeProps {
  data: {
    phase: PhaseData;
    isCurrent: boolean;
    onClick: () => void;
  };
}

const modeColors = {
  'learning-heavy': 'dark:bg-slate-900 bg-gradient-to-br from-blue-500/10 dark:from-blue-500/20 to-blue-600/5 dark:to-blue-600/10 border-blue-500/30 dark:border-blue-500/50',
  'building-heavy': 'dark:bg-slate-900 bg-gradient-to-br from-green-500/10 dark:from-green-500/20 to-green-600/5 dark:to-green-600/10 border-green-500/30 dark:border-green-500/50',
  'interview-heavy': 'dark:bg-slate-900 bg-gradient-to-br from-purple-500/10 dark:from-purple-500/20 to-purple-600/5 dark:to-purple-600/10 border-purple-500/30 dark:border-purple-500/50',
  'risk-heavy': 'dark:bg-slate-900 bg-gradient-to-br from-red-500/10 dark:from-red-500/20 to-red-600/5 dark:to-red-600/10 border-red-500/30 dark:border-red-500/50',
};

const currentHighlight = 'ring-4 ring-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-pulse';

const modeBadgeColors = {
  'learning-heavy': 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
  'building-heavy': 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-500/30',
  'interview-heavy': 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30',
  'risk-heavy': 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30',
};

export function PhaseNode({ data }: PhaseNodeProps) {
  const { phase, onClick, isCurrent } = data;

  return (
    <div
      className={`
        relative w-[280px] p-4 rounded-lg border-2 bg-white dark:bg-slate-900 cursor-pointer
        transition-all hover:scale-105 hover:shadow-lg
        ${modeColors[phase.mode]}
        ${isCurrent ? currentHighlight : 'hover:shadow-blue-500/20'}
      `}
      onClick={onClick}
    >
      {isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-lg z-10 w-max">
          You are here
        </div>
      )}

      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-slate-400 border-2 border-white dark:border-slate-800" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-slate-400 border-2 border-white dark:border-slate-800" />

      <div className="space-y-2 text-left">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-slate-900 dark:text-slate-100 font-bold leading-tight text-sm">{phase.title}</h3>
          <div className={`px-2 py-0.5 rounded text-[10px] border font-bold uppercase ${modeBadgeColors[phase.mode]} whitespace-nowrap`}>
            {phase.mode.split('-')[0]}
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
          {phase.description}
        </p>

        <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-white/5">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            Months: <span className="text-slate-700 dark:text-slate-100 font-bold">{phase.months.join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
