import { useRef } from 'react';
import { Printer, X, ShieldCheck, Clock, Target } from 'lucide-react';
import { monthsData } from '../data/planData';

interface SundaySnapshotProps {
    monthNumber: number;
    weekNumber: number;
    onClose: () => void;
}

export function SundaySnapshot({ monthNumber, weekNumber, onClose }: SundaySnapshotProps) {
    const printRef = useRef<HTMLDivElement>(null);
    const month = monthsData.find(m => m.monthNumber === monthNumber);
    const week = month?.weeks.find(w => w.weekNumber === weekNumber);

    if (!month || !week) return null;

    const handlePrint = () => {
        window.print();
    };

    const calculateWeekStats = () => {
        let totalEffort = 0;
        let completedEffort = 0;
        let totalStruggle = 0;
        let actionCount = 0;
        let completedCount = 0;

        Object.values(week.lanes).forEach(actions => {
            actions.forEach(action => {
                actionCount++;
                totalEffort += action.estimatedEffort;
                const status = localStorage.getItem(`action-${action.id}`);
                const struggle = localStorage.getItem(`struggle-${action.id}`);

                if (struggle) totalStruggle += parseInt(struggle);
                if (status === 'completed') {
                    completedCount++;
                    completedEffort += action.estimatedEffort;
                }
            });
        });

        return { totalEffort, completedEffort, totalStruggle, actionCount, completedCount };
    };

    const stats = calculateWeekStats();
    const struggleHours = (stats.totalStruggle / 60).toFixed(1);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 dark:bg-black/90 backdrop-blur-md p-2 md:p-4 animate-in fade-in zoom-in duration-300">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="p-3 md:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-500/10 p-2 rounded-lg">
                            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-slate-900 dark:text-slate-100 font-bold tracking-tight text-sm md:text-base">Sunday Report</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all text-xs md:text-sm font-bold shadow-lg"
                        >
                            <Printer className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            Print
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1.5 md:p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-8 bg-white text-slate-950 print:p-0" id="printable-report">
                    <div className="max-w-3xl mx-auto space-y-8">
                        {/* Header */}
                        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6">
                            <div>
                                <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900 italic">
                                    Execution Report
                                </h1>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">
                                    Month {monthNumber} • Week {weekNumber} • {new Date().toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black text-slate-900">{stats.completedCount}/{stats.actionCount}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase">Actions Completed</div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex items-center gap-2 text-slate-500 mb-1">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase">Struggle Hours</span>
                                </div>
                                <div className="text-2xl font-black">{struggleHours}h</div>
                                <p className="text-[9px] text-slate-400 mt-1 font-medium italic">Target: 6.0h deep work/week</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex items-center gap-2 text-slate-500 mb-1">
                                    <Target className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase">Work Completion</span>
                                </div>
                                <div className="text-2xl font-black">{Math.round((stats.completedEffort / stats.totalEffort) * 100)}%</div>
                                <p className="text-[9px] text-slate-400 mt-1 font-medium">{stats.completedEffort}h / {stats.totalEffort}h estimated</p>
                            </div>

                            <div className="bg-slate-900 p-4 rounded-xl text-white">
                                <div className="text-[10px] font-bold uppercase opacity-50 mb-1">Status</div>
                                <div className="text-lg font-black italic">
                                    {parseFloat(struggleHours) >= 6 ? '🛡️ FULL ENFORCEMENT' : '⚠️ AT RISK'}
                                </div>
                                <p className="text-[9px] opacity-70 mt-1">
                                    Escrow Penalty: {parseFloat(struggleHours) >= 6 ? 'None' : '₹500 Risk'}
                                </p>
                            </div>
                        </div>

                        {/* Task List */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest border-l-4 border-slate-900 pl-3">Weekly Action Log</h3>
                            <div className="space-y-2">
                                {Object.entries(week.lanes).map(([laneKey, actions]) => (
                                    actions.map(action => {
                                        const status = localStorage.getItem(`action-${action.id}`);
                                        return (
                                            <div key={action.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${status === 'completed' ? 'bg-green-500' : 'bg-slate-300'}`} />
                                                    <span className="text-xs font-bold text-slate-800">{action.description}</span>
                                                </div>
                                                <span className="text-[10px] font-mono text-slate-400 uppercase font-black">
                                                    {status || 'not started'}
                                                </span>
                                            </div>
                                        );
                                    })
                                ))}
                            </div>
                        </div>

                        {/* Signature Area */}
                        <div className="grid grid-cols-2 gap-12 pt-12">
                            <div className="border-t border-slate-300 pt-4">
                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-8">Learner Signature</div>
                                <div className="h-px w-full bg-slate-200" />
                            </div>
                            <div className="border-t border-slate-300 pt-4">
                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-8">Escrow Holder Verification</div>
                                <div className="h-px w-full bg-slate-200" />
                            </div>
                        </div>

                        <div className="text-center text-[9px] text-slate-300 font-medium">
                            Generated by BSc+MCA Execution Dashboard • Professional Accountability Instrument
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-report, #printable-report * { visibility: visible; }
          #printable-report { 
            position: absolute; 
            left: 0; 
            top: 0; 
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }
          .fixed { position: relative !important; }
        }
      `}</style>
        </div>
    );
}
