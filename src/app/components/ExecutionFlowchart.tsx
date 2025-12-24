import { ThemeToggle } from './ThemeToggle';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Panel,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { PLAN_START_DATE, phases, monthsData } from '../data/planData';
import { PhaseNode } from './PhaseNode';
import { MonthNode } from './MonthNode';
import { WeekView } from './WeekView';
import { SpecialNodes } from './SpecialNodes';
import { ProgressTracker } from './ProgressTracker';
import { StorageControls } from './StorageControls';
import { Rocket, ChevronRight, Home, Calendar } from 'lucide-react';


const nodeTypes = {
  phase: PhaseNode,
  month: MonthNode,
};

type ViewMode = 'phases' | 'months' | 'weeks';

export function ExecutionFlowchart() {
  const [viewMode, setViewMode] = useState<ViewMode>('phases');
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { theme } = useTheme();


  // Calculate current month based on start date
  const getCurrentMonth = useCallback(() => {
    const start = new Date(PLAN_START_DATE);
    const now = new Date();
    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    return Math.max(0, Math.min(14, months));
  }, []);

  const currentMonth = getCurrentMonth();


  const generatePhaseNodes = useCallback((): { nodes: Node[]; edges: Edge[] } => {
    const nodeWidth = 280;
    const nodeHeight = 140;
    const horizontalGap = 100;
    const startX = 50;
    const startY = 150;

    const nodes: Node[] = phases.map((phase, index) => ({
      id: phase.id,
      type: 'phase',
      position: {
        x: startX + index * (nodeWidth + horizontalGap),
        y: startY
      },
      data: {
        phase,
        isCurrent: phase.months.includes(currentMonth),
        onClick: () => {
          setSelectedPhase(phase.id);
          setViewMode('months');
        }
      },

    }));

    const edges: Edge[] = [];
    for (let i = 0; i < phases.length - 1; i++) {
      edges.push({
        id: `phase-${i}-${i + 1}`,
        source: phases[i].id,
        target: phases[i + 1].id,
        animated: true,
        style: { stroke: '#64748b', strokeWidth: 2 },
      });
    }

    return { nodes, edges };
  }, []);

  const generateMonthNodes = useCallback((): { nodes: Node[]; edges: Edge[] } => {
    if (!selectedPhase) return { nodes: [], edges: [] };

    const phase = phases.find(p => p.id === selectedPhase);
    if (!phase) return { nodes: [], edges: [] };

    const relevantMonths = monthsData.filter(m => phase.months.includes(m.monthNumber));

    const nodeWidth = 320;
    const nodeHeight = 180;
    const horizontalGap = 80;
    const startX = 50;
    const startY = 100;

    const nodes: Node[] = relevantMonths.map((month, index) => ({
      id: `month-${month.monthNumber}`,
      type: 'month',
      position: {
        x: startX + index * (nodeWidth + horizontalGap),
        y: startY
      },
      data: {
        month,
        isCurrent: month.monthNumber === currentMonth,
        onClick: () => {
          setSelectedMonth(month.monthNumber);
          setViewMode('weeks');
        }
      },

    }));

    const edges: Edge[] = [];
    for (let i = 0; i < relevantMonths.length - 1; i++) {
      edges.push({
        id: `month-${relevantMonths[i].monthNumber}-${relevantMonths[i + 1].monthNumber}`,
        source: `month-${relevantMonths[i].monthNumber}`,
        target: `month-${relevantMonths[i + 1].monthNumber}`,
        animated: true,
        style: { stroke: '#64748b', strokeWidth: 2 },
      });
    }

    return { nodes, edges };
  }, [selectedPhase]);

  useEffect(() => {
    if (viewMode === 'phases') {
      const { nodes, edges } = generatePhaseNodes();
      setNodes(nodes);
      setEdges(edges);
    } else if (viewMode === 'months') {
      const { nodes, edges } = generateMonthNodes();
      setNodes(nodes);
      setEdges(edges);
    } else if (viewMode === 'weeks') {
      setNodes([]);
      setEdges([]);
    }
  }, [viewMode, selectedPhase, selectedMonth, generatePhaseNodes, generateMonthNodes, setNodes, setEdges]);

  const handleJumpToToday = () => {
    const month = monthsData.find(m => m.monthNumber === currentMonth);
    if (!month) return;
    const phase = phases.find(p => p.months.includes(currentMonth));
    if (phase) setSelectedPhase(phase.id);
    setSelectedMonth(currentMonth);
    setViewMode('weeks');
  };


  const handleBackToPhases = () => {
    setViewMode('phases');
    setSelectedPhase(null);
    setSelectedMonth(null);
  };

  const handleBackToMonths = () => {
    setViewMode('months');
    setSelectedMonth(null);
  };

  const getViewTitle = () => {
    if (viewMode === 'weeks' && selectedMonth !== null) {
      const month = monthsData.find(m => m.monthNumber === selectedMonth);
      return `Month ${selectedMonth}: ${month?.title || ''}`;
    }
    if (viewMode === 'months' && selectedPhase) {
      const phase = phases.find(p => p.id === selectedPhase);
      return phase?.title || '';
    }
    return 'BSc+MCA → 15-20 LPA in 12-15 Months';
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors overflow-hidden">
      {/* Enhanced Professional Navbar */}
      <header className="flex flex-col md:flex-row md:h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-3 md:py-0 items-center justify-between gap-4 z-50 shadow-sm relative">
        <div className="flex items-center gap-6 w-full md:w-auto">
          {/* Logo & Project Title */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={handleBackToPhases}>
            <div className="p-2 bg-blue-600 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white font-black text-sm md:text-lg tracking-tight leading-none">CAREER PLANNER</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Engineering Roadmap</span>
            </div>
          </div>

          <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

          {/* Dynamic Breadcrumb/Context */}
          <div className="flex items-center gap-2 overflow-hidden">
            <button
              onClick={handleBackToPhases}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500"
              title="Phases Home"
            >
              <Home className="w-4 h-4" />
            </button>
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-700 flex-shrink-0" />
            <h1 className="text-slate-700 dark:text-slate-300 font-semibold text-xs md:text-sm truncate max-w-[150px] md:max-w-none">
              {getViewTitle()}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto justify-between md:justify-end">
          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            {viewMode !== 'phases' && (
              <button
                onClick={viewMode === 'weeks' ? handleBackToMonths : handleBackToPhases}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-all text-[11px] font-bold border border-transparent hover:border-slate-300 dark:hover:border-slate-600"
              >
                BACK
              </button>
            )}

            <button
              onClick={handleJumpToToday}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-all text-[11px] font-bold border border-blue-100 dark:border-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/40"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">TODAY</span>
            </button>
          </div>

          <div className="hidden lg:block h-8 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Toolset */}
          <div className="flex items-center gap-3">
            <ProgressTracker />
            <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
              <ThemeToggle />
              <StorageControls />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 relative">
        {viewMode === 'weeks' && selectedMonth !== null ? (
          <WeekView monthNumber={selectedMonth} />
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            minZoom={0.1}
            maxZoom={1.5}
          >
            <Background
              variant={BackgroundVariant.Lines}
              color={theme === 'dark' ? '#1e293b' : '#e2e8f0'}
              gap={10}
              size={1}
            />
            <Controls className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white" />

            <Panel position="bottom-right" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-slate-200 dark:border-slate-800 p-3 md:p-4 rounded-xl m-2 md:m-4 shadow-2xl flex flex-col gap-3 md:gap-4 max-w-[90vw]">
              <button
                onClick={handleJumpToToday}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all animate-pulse"
              >
                <span className="text-xl">📍</span>
                <span className="font-bold">Jump to Today</span>
              </button>
              <SpecialNodes />
            </Panel>

          </ReactFlow>
        )}
      </div>
    </div>
  );
}
