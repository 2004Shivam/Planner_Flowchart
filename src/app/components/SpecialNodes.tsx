import { useState } from 'react';
import { darkForestProtocol, aiContract } from '../data/planData';
import { Shield, Zap, AlertTriangle } from 'lucide-react';

export function SpecialNodes() {
  const [showAIContract, setShowAIContract] = useState(false);
  const [showDarkForest, setShowDarkForest] = useState(false);

  return (
    <div className="space-y-3">
      <h4 className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">Protocols</h4>

      <div className="relative">
        <button
          onClick={() => setShowAIContract(!showAIContract)}
          className="flex items-center gap-2 text-xs md:text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors font-medium bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-200 dark:border-slate-800 w-full"
        >
          <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          AI Contract Gate
        </button>

        {showAIContract && (
          <div className="absolute bottom-full right-0 mb-2 w-[280px] md:w-[400px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-2xl z-20 overflow-y-auto max-h-[40vh] md:max-h-none">
            <div className="space-y-3">
              <div>
                <h5 className="text-[10px] md:text-xs font-black uppercase tracking-wide text-red-600 dark:text-red-400 mb-2">🚫 Red Zone</h5>
                <ul className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300 space-y-1 font-medium">
                  {aiContract.redZone.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-red-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-[10px] md:text-xs font-black uppercase tracking-wide text-amber-600 dark:text-yellow-400 mb-2">⚠️ Yellow Zone</h5>
                <ul className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300 space-y-1 font-medium">
                  {aiContract.yellowZone.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-[10px] md:text-xs font-black uppercase tracking-wide text-green-600 dark:text-green-400 mb-2">✅ Green Zone</h5>
                <ul className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300 space-y-1 font-medium">
                  {aiContract.greenZone.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-green-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                <h5 className="text-[10px] md:text-xs font-black uppercase tracking-wide text-red-600 dark:text-red-400 mb-2">Consequences</h5>
                <ul className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 space-y-1 font-medium italic leading-tight">
                  {aiContract.violationConsequences.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setShowDarkForest(!showDarkForest)}
          className="flex items-center gap-2 text-xs md:text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors font-medium bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-200 dark:border-slate-800 w-full"
        >
          <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          Dark Forest Protocol
        </button>

        {showDarkForest && (
          <div className="absolute bottom-full right-0 mb-2 w-[280px] md:w-[380px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-2xl z-20 overflow-y-auto max-h-[40vh] md:max-h-none">
            <div className="space-y-3">
              <div className="text-[10px] md:text-xs text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-500/30 p-2 rounded font-bold leading-normal">
                <span className="uppercase text-[8px] md:text-[9px] opacity-70 block mb-1">Trigger:</span> {darkForestProtocol.trigger}
              </div>

              <div>
                <h5 className="text-[10px] md:text-xs font-black uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Required Steps:</h5>
                <ol className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300 space-y-2 font-medium">
                  {darkForestProtocol.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-2 leading-relaxed">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700 font-bold uppercase italic">
                Months {darkForestProtocol.applicableMonths.join(', ')}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-800/30 rounded border border-slate-200 dark:border-slate-800">
        <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-600 dark:text-yellow-400" />
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight">₹5,000 Escrow Active</span>
      </div>
    </div>
  );
}
