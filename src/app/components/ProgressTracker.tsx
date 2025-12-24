import { useState, useEffect } from 'react';
import { monthsData, PLAN_START_DATE } from '../data/planData';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export function ProgressTracker() {
  const [completedActions, setCompletedActions] = useState(0);
  const [totalActions, setTotalActions] = useState(0);
  const [expectedProgress, setExpectedProgress] = useState(0);

  useEffect(() => {
    let total = 0;
    let completed = 0;

    monthsData.forEach(month => {
      month.weeks.forEach(week => {
        Object.values(week.lanes).forEach(actions => {
          actions.forEach(action => {
            total++;
            const status = localStorage.getItem(`action-${action.id}`);
            if (status === 'completed') {
              completed++;
            }
          });
        });
      });
    });

    setTotalActions(total);
    setCompletedActions(completed);

    // Expected progress calculation
    const start = new Date(PLAN_START_DATE);
    const now = new Date();
    const totalDays = 365; // Simple 12-month estimate
    const daysPassed = Math.max(0, (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    setExpectedProgress(Math.min(100, Math.round((daysPassed / totalDays) * 100)));
  }, []);

  const percentage = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;
  const isBehind = percentage < expectedProgress;

  return (
    <div className="flex flex-col gap-1 w-full sm:w-auto">
      <div className="flex items-center gap-3 px-3 md:px-4 py-1.5 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm shadow-sm">
        {isBehind ? (
          <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
        ) : (
          <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
        )}

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Live Progress</span>
            <span className={`text-xs font-bold ${isBehind ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
              {percentage}%
            </span>
            <span className="text-[9px] text-slate-400 dark:text-slate-600">Target {expectedProgress}%</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-24 md:w-32 h-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${isBehind ? 'bg-amber-500' : 'bg-green-500'}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="text-[9px] text-slate-500 font-mono font-bold">
              {completedActions}/{totalActions}
            </div>
          </div>
        </div>
      </div>

      {isBehind && (
        <div className="text-[9px] text-amber-600 dark:text-amber-500/80 font-bold uppercase tracking-tighter text-center">
          ⚠ PRIORITY RISK: Behind Schedule
        </div>
      )}
    </div>
  );
}

