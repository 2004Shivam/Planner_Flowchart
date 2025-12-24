import { useState, useEffect } from 'react';
import { monthsData } from '../data/planData';
import { ActionCard } from './ActionCard';
import { SundaySnapshot } from './SundaySnapshot';
import { ShieldAlert } from 'lucide-react';


interface WeekViewProps {
  monthNumber: number;
}

const laneNames = {
  coreBuild: 'Core Build Work',
  dsaReasoning: 'DSA / Reasoning Work',
  genAiSystemDesign: 'GenAI / System Design',
  enforcement: 'Enforcement & Accountability',
  deliverables: 'Deliverables & Proof',
};

const laneColors = {
  coreBuild: 'border-green-500/30 dark:border-green-500/30 bg-green-500/[0.02] dark:bg-green-500/5',
  dsaReasoning: 'border-blue-500/30 dark:border-blue-500/30 bg-blue-500/[0.02] dark:bg-blue-500/5',
  genAiSystemDesign: 'border-purple-500/30 dark:border-purple-500/30 bg-purple-500/[0.02] dark:bg-purple-500/5',
  enforcement: 'border-orange-500/30 dark:border-orange-500/30 bg-orange-500/[0.02] dark:bg-orange-500/5',
  deliverables: 'border-cyan-500/30 dark:border-cyan-500/30 bg-cyan-500/[0.02] dark:bg-cyan-500/5',
};

export function WeekView({ monthNumber }: WeekViewProps) {
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [showSnapshot, setShowSnapshot] = useState(false);

  const month = monthsData.find(m => m.monthNumber === monthNumber);

  useEffect(() => {
    if (month && month.weeks.length > 0) {
      setSelectedWeek(month.weeks[0].weekNumber);
    }
  }, [monthNumber, month]);

  if (!month) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-400">Month not found</div>
      </div>
    );
  }

  const week = month.weeks.find(w => w.weekNumber === selectedWeek) || month.weeks[0];

  if (!week) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-400">No weeks available for this month</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 animate-in fade-in duration-500 transition-colors graph-paper text-slate-200/[0.03] dark:text-white/[0.02]">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3 md:p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <span className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium whitespace-nowrap">Week:</span>
            <div className="flex gap-1.5 md:gap-2">
              {month.weeks.map((w) => (
                <button
                  key={w.weekNumber}
                  onClick={() => setSelectedWeek(w.weekNumber)}
                  className={`
                    px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap
                    ${selectedWeek === w.weekNumber
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  W{w.weekNumber}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-1 justify-center">
            {week.prerequisites && week.prerequisites.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg max-w-md">
                <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest whitespace-nowrap">Requires:</span>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {week.prerequisites.map((pre, idx) => (
                    <span key={idx} className="text-xs text-blue-700 dark:text-blue-200/80 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 whitespace-nowrap">
                      {pre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setShowSnapshot(true)}
              className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-blue-500/30 rounded-lg text-xs md:text-sm font-bold transition-all shadow-sm"
            >
              <ShieldAlert className="w-3 h-3 md:w-4 md:h-4" />
              Report
            </button>

            {month.failureRisk && (
              <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-red-500/10 border border-red-500/20 rounded-lg max-w-[150px] md:max-w-none">
                <span className="text-red-500 text-sm md:text-lg">⚠️</span>
                <div className="overflow-hidden">
                  <div className="text-[8px] md:text-[10px] uppercase tracking-tighter text-red-600 dark:text-red-400/70 font-bold truncate">Risk</div>
                  <div className="text-[10px] md:text-xs text-red-700 dark:text-red-200/90 font-medium truncate">{month.failureRisk}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {Object.entries(week.lanes).map(([laneKey, actions]) => (
            <div
              key={laneKey}
              className={`
                flex flex-col rounded-xl border p-4 transition-all
                ${laneColors[laneKey as keyof typeof laneColors]}
              `}
            >
              <div className="mb-4 pb-3 border-b border-black/5 dark:border-white/5">
                <h3 className="text-slate-900 dark:text-slate-100 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                  {laneNames[laneKey as keyof typeof laneNames]}
                </h3>
                <div className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  {actions.length} {actions.length === 1 ? 'TASK' : 'TASKS'}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                {actions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center opacity-30">
                    <div className="text-2xl mb-2">💤</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold font-mono">Empty</div>
                  </div>
                ) : (
                  actions.map((action) => (
                    <ActionCard key={action.id} action={action} />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-3 md:p-4 backdrop-blur-sm bg-opacity-80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="flex-shrink-0">
            <h4 className="text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-widest">Exit Criteria</h4>
            <div className="text-xs text-slate-900 dark:text-white font-medium">Month {monthNumber} Targets</div>
          </div>
          <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 flex-1 w-full">
            {month.exitCriteria.map((criteria, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs group">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 group-hover:scale-125 transition-transform shadow-sm"></div>
                <span className="text-slate-600 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate">{criteria}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showSnapshot && (
        <SundaySnapshot
          monthNumber={monthNumber}
          weekNumber={selectedWeek}
          onClose={() => setShowSnapshot(false)}
        />
      )}
    </div>
  );
}


