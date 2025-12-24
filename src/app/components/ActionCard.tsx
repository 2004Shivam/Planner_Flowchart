import { useState, useEffect } from 'react';
import type { AtomicAction, NodeStatus } from '../data/planData';
import { CheckCircle2, Circle, Ban, AlertCircle } from 'lucide-react';

interface ActionCardProps {
  action: AtomicAction;
}

const aiPolicyColors = {
  forbidden: 'border-red-500/50 bg-red-500/10',
  'coach-only': 'border-yellow-500/50 bg-yellow-500/10',
  allowed: 'border-green-500/50 bg-green-500/10',
};

const aiPolicyIcons = {
  forbidden: '🚫',
  'coach-only': '⚠️',
  allowed: '✅',
};

const statusColors = {
  'not-started': 'text-slate-500',
  'in-progress': 'text-blue-400',
  blocked: 'text-red-400',
  completed: 'text-green-400',
};

export function ActionCard({ action }: ActionCardProps) {
  const [status, setStatus] = useState<NodeStatus>('not-started');
  const [struggleMinutes, setStruggleMinutes] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  useEffect(() => {
    const savedStatus = localStorage.getItem(`action-${action.id}`);
    if (savedStatus) setStatus(savedStatus as NodeStatus);

    const savedStruggle = localStorage.getItem(`struggle-${action.id}`);
    if (savedStruggle) setStruggleMinutes(parseInt(savedStruggle));
  }, [action.id]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      const newMinutes = struggleMinutes + 25;
      setStruggleMinutes(newMinutes);
      localStorage.setItem(`struggle-${action.id}`, newMinutes.toString());
      setTimeLeft(25 * 60);
      alert(`Struggle session complete for: ${action.description.substring(0, 30)}...`);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, struggleMinutes, action.id, action.description]);

  const updateStatus = (newStatus: NodeStatus) => {
    setStatus(newStatus);
    localStorage.setItem(`action-${action.id}`, newStatus);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const StatusIcon = {
    'not-started': Circle,
    'in-progress': AlertCircle,
    blocked: Ban,
    completed: CheckCircle2,
  }[status];

  const struggleHours = (struggleMinutes / 60).toFixed(1);

  return (
    <div className={`
      bg-white dark:bg-slate-900 rounded-lg p-3 border transition-all group relative overflow-hidden shadow-sm hover:shadow-md
      ${action.isKillerProject
        ? 'border-amber-400 dark:border-amber-500/50 shadow-amber-100 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-amber-500'
        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}
      ${isTimerActive ? 'ring-2 ring-blue-500/50' : ''}
    `}>
      {action.isKillerProject && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-500/5 dark:from-amber-500/10 to-transparent pointer-events-none" />
      )}

      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => {
            const statuses: NodeStatus[] = ['not-started', 'in-progress', 'completed', 'blocked'];
            const currentIndex = statuses.indexOf(status);
            const nextIndex = (currentIndex + 1) % statuses.length;
            updateStatus(statuses[nextIndex]);
          }}
          className="flex-shrink-0 flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <StatusIcon className={`w-4 h-4 ${statusColors[status]}`} />
        </button>
        <div className="flex-1 text-xs font-semibold text-slate-800 dark:text-white leading-snug">
          {action.description}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex-items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">Effort:</span>
            <span className="text-slate-700 dark:text-slate-100 font-bold">{action.estimatedEffort}h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-bold tracking-tighter">STRUGGLE:</span>
            <span className={`${parseFloat(struggleHours) > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'} font-bold`}>{struggleHours}h / week</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className={`text-[10px] px-2 py-0.5 rounded border font-medium ${aiPolicyColors[action.aiPolicy]}`}>
            {aiPolicyIcons[action.aiPolicy]} {action.aiPolicy.replace('-', ' ')}
          </div>

          <button
            onClick={() => setIsTimerActive(!isTimerActive)}
            className={`
              flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold transition-all shadow-sm
              ${isTimerActive
                ? 'bg-red-500 text-white border border-red-600'
                : 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 hover:bg-blue-100 dark:hover:bg-blue-500/30'}
            `}
          >
            {isTimerActive ? `⏸ ${formatTime(timeLeft)}` : '🚀 STRUGGLE'}
          </button>
        </div>

        {action.outputArtifact && (
          <div className="text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1">
            <span className="opacity-50 dark:text-slate-500">OUTPUT:</span>
            <span className="text-slate-600 dark:text-slate-300 font-mono truncate font-medium">{action.outputArtifact}</span>
          </div>
        )}

        {action.isKillerProject && (
          <div className="mt-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-400/20">
            <span className="animate-pulse text-amber-500">★</span> Killer Project Anchor
          </div>
        )}
      </div>
    </div>
  );
}


