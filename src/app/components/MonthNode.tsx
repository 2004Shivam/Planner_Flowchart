import { Handle, Position } from '@xyflow/react';
import type { MonthData } from '../data/planData';

interface MonthNodeProps {
  data: {
    month: MonthData;
    isCurrent: boolean;
    onClick: () => void;
  };
}

const modeColors = {
  'learning-heavy': 'dark:bg-slate-900 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/50',
  'building-heavy': 'dark:bg-slate-900 bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/50',
  'interview-heavy': 'dark:bg-slate-900 bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/50',
  'risk-heavy': 'dark:bg-slate-900 bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/50',
};

const currentHighlight = 'ring-4 ring-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-pulse';

export function MonthNode({ data }: MonthNodeProps) {
  const { month, onClick, isCurrent } = data;

  return (
    <div
      className={`
        relative w-[320px] p-4 rounded-lg border-2 bg-white dark:bg-slate-900 cursor-pointer
        transition-all hover:scale-105 hover:shadow-lg
        ${modeColors[month.mode]}
        ${isCurrent ? currentHighlight : 'hover:shadow-green-500/20'}
      `}
      onClick={onClick}
    >
      {isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-600 text-white text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-lg z-10 w-max">
          You are here
        </div>
      )}

      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-slate-400 border-2 border-white dark:border-slate-800" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-slate-400 border-2 border-white dark:border-slate-800" />

      <div className="space-y-3 text-left">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="text-[10px] text-slate-500 mb-1 uppercase font-bold tracking-widest">Month {month.monthNumber}</div>
            <h3 className="text-slate-900 dark:text-slate-100 font-bold leading-tight text-base">{month.title}</h3>
          </div>
        </div>

        <div className="text-xs text-slate-700 dark:text-slate-200 leading-snug bg-slate-50 dark:bg-slate-900/30 p-2 rounded border border-slate-100 dark:border-white/5">
          <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wide font-bold">Objective:</span>
          <div className="mt-1 font-medium">{month.objective}</div>
        </div>

        {month.failureRisk && (
          <div className="text-[10px] text-red-700 dark:text-red-300/80 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-2 rounded">
            <span className="font-bold uppercase tracking-tighter">⚠ Risk:</span> {month.failureRisk}
          </div>
        )}

        <div className="text-[10px] text-slate-500 dark:text-slate-400 pt-1 flex items-center justify-between font-bold uppercase tracking-widest">
          <span>{month.weeks.length} weeks</span>
          <span className="opacity-75">Click to expand →</span>
        </div>
      </div>
    </div>
  );
}
