// Data model for the execution plan
export type NodeStatus = 'not-started' | 'in-progress' | 'blocked' | 'completed';
export type PhaseMode = 'learning-heavy' | 'building-heavy' | 'interview-heavy' | 'risk-heavy';
export type AIPolicy = 'forbidden' | 'coach-only' | 'allowed';

export interface AtomicAction {
  id: string;
  description: string;
  estimatedEffort: number;
  aiPolicy: AIPolicy;
  outputArtifact: string;
  isKillerProject?: boolean;
}

export interface WeekData {
  weekNumber: number;
  prerequisites?: string[];
  lanes: {
    coreBuild: AtomicAction[];
    dsaReasoning: AtomicAction[];
    genAiSystemDesign: AtomicAction[];
    enforcement: AtomicAction[];
    deliverables: AtomicAction[];
  };
}

export interface MonthData {
  monthNumber: number;
  title: string;
  objective: string;
  mode: PhaseMode;
  weeks: WeekData[];
  exitCriteria: string[];
  failureRisk: string;
}

export interface PhaseData {
  id: string;
  title: string;
  months: number[];
  description: string;
  mode: PhaseMode;
}

export interface DarkForestProtocol {
  trigger: string;
  steps: string[];
  applicableMonths: number[];
}

export interface AIContractGate {
  redZone: string[];
  yellowZone: string[];
  greenZone: string[];
  violationConsequences: string[];
}

// Plan configuration
export const PLAN_START_DATE = '2025-12-24';

export const phases: PhaseData[] = [
  {
    id: 'gearing-up',
    title: 'Phase 0: Gearing Up (The Biological & Digital Reboot)',
    months: [0, 1],
    description: 'Hardware, Linux, Deep Work habits, and Fundamental CS Reboot.',
    mode: 'risk-heavy'
  },
  {
    id: 'logic-cleanse',
    title: 'Phase 1: The Fundamental "Logic" Cleanse',
    months: [2, 3, 4],
    description: 'Restore independent reasoning. AI-forbidden DSA and Core Syntax.',
    mode: 'learning-heavy'
  },
  {
    id: 'system-reality',
    title: 'Phase 2: System Reality & Backend Depth',
    months: [5, 6, 7],
    description: 'Transition from "snippets" to world-class APIs and Distributed Systems (Go focus).',
    mode: 'building-heavy'
  },
  {
    id: 'genai-mastery',
    title: 'Phase 3: GenAI Engineering (Non-Hype)',
    months: [8, 9, 10],
    description: 'Build LLM-powered infrastructure, Agentic systems, and RAG optimization.',
    mode: 'building-heavy'
  },
  {
    id: 'portfolio-conversion',
    title: 'Phase 4: High-Stakes Portfolio & Conversion',
    months: [11, 12, 13, 14],
    description: 'System Design gauntlet, 3 Killer Projects, and high-paying offer conversion.',
    mode: 'interview-heavy'
  }
];

export const monthsData: MonthData[] = [
  {
    monthNumber: 0,
    title: 'Month 0: The Pro-Windows & Discipline Reboot',
    objective: 'Transform your Windows machine into a world-class dev environment and reset your focus muscle',
    mode: 'risk-heavy',
    exitCriteria: [
      'WSL2 (Ubuntu) running seamlessly with Zsh',
      'PowerShell Mastery (Piping, Streams, Environment Variables)',
      'Digital "Kill-Switch" active on all non-essential apps',
      'Completed Pro-Sentinel CLI (Automation Project)'
    ],
    failureRisk: 'Using "normal" Windows without WSL2 or Shell mastery; treating deep work as optional',
    weeks: [
      {
        weekNumber: 0,
        lanes: {
          coreBuild: [
            { id: 'm0w0-cb1', description: 'WSL2 Gauntlet: Installing Ubuntu/Debian, kernel updates, and Vhdx management', estimatedEffort: 8, aiPolicy: 'coach-only', outputArtifact: 'WSL Console' },
            { id: 'm0w0-cb2', description: 'Terminal Mastery: Windows Terminal setup, Fonts (Fira Code), and Zsh/Oh-My-Zsh integration', estimatedEffort: 6, aiPolicy: 'allowed', outputArtifact: 'Terminal Screenshot' },
            { id: 'm0w0-cb3', description: 'Dev Tooling: Winget/Chocolatey setup, VS Code extensions (Remote-WSL, GitLens)', estimatedEffort: 5, aiPolicy: 'allowed', outputArtifact: 'Tooling List' }
          ],
          dsaReasoning: [],
          genAiSystemDesign: [],
          enforcement: [
            { id: 'm0w0-enf1', description: 'Distraction Purge: Removing all social media from browser/phone', estimatedEffort: 3, aiPolicy: 'forbidden', outputArtifact: 'Confirmation' },
            { id: 'm0w0-enf2', description: 'Router-Sentry: Setting up NextDNS or hosts-level site blocking', estimatedEffort: 5, aiPolicy: 'coach-only', outputArtifact: 'Blocklist' }
          ],
          deliverables: []
        }
      },
      {
        weekNumber: 1,
        lanes: {
          coreBuild: [
            { id: 'm0w1-cb1', description: 'Shell Fluency: Mastering cd, ls, mkdir, rm -rf, and move in both PowerShell & Bash', estimatedEffort: 10, aiPolicy: 'forbidden', outputArtifact: 'Command Cheat-sheet' },
            { id: 'm0w1-cb2', description: 'Pipes & Streams: Understanding stdin, stdout, stderr and ">" vs ">>" vs "|"', estimatedEffort: 8, aiPolicy: 'forbidden', outputArtifact: 'Piping Script' },
            { id: 'm0w1-cb3', description: 'Environment Mastery: Managing PATH, Alias creation, and Profile customization', estimatedEffort: 7, aiPolicy: 'coach-only', outputArtifact: '.bashrc / $PROFILE' }
          ],
          dsaReasoning: [],
          genAiSystemDesign: [],
          enforcement: [
            { id: 'm0w1-enf1', description: 'Habit Tracking: Establishing a "25-5" Pomodoro ritual for all focus hours', estimatedEffort: 5, aiPolicy: 'forbidden', outputArtifact: 'Focus Log' }
          ],
          deliverables: []
        }
      },
      {
        weekNumber: 2,
        lanes: {
          coreBuild: [
            { id: 'm0w2-cb1', description: 'Automation Basics: Writing .bat and .sh scripts for common folder cleanups', estimatedEffort: 10, aiPolicy: 'coach-only', outputArtifact: 'Cleanup Suite' },
            { id: 'm0w2-cb2', description: 'System Internals: Investigating Task Manager, Registry (Introduction), and Services', estimatedEffort: 6, aiPolicy: 'coach-only', outputArtifact: 'System Report' },
            { id: 'm0w2-cb3', description: 'Cloud Gate: Setting up SSH keys (v2) for GitHub/Server access', estimatedEffort: 5, aiPolicy: 'forbidden', outputArtifact: 'Public Key' }
          ],
          dsaReasoning: [],
          genAiSystemDesign: [],
          enforcement: [
            { id: 'm0w2-enf1', description: '48h Brain Reset: Total digital detox (No screens for 48 hours)', estimatedEffort: 48, aiPolicy: 'forbidden', outputArtifact: 'Detox Essay' }
          ],
          deliverables: []
        }
      },
      {
        weekNumber: 3,
        lanes: {
          coreBuild: [
            { id: 'm0w3-cb1', description: 'Project: Pro-Sentinel CLI (Python). Audits Windows/WSL health metrics and exports to JSON', estimatedEffort: 20, aiPolicy: 'coach-only', outputArtifact: 'Sentinel_Pro', isKillerProject: true },
            { id: 'm0w3-cb2', description: 'Error Handling: Implementing Try/Catch in your Sentinel scripts', estimatedEffort: 8, aiPolicy: 'coach-only', outputArtifact: 'Robust Code' }
          ],
          dsaReasoning: [],
          genAiSystemDesign: [],
          enforcement: [],
          deliverables: [
            { id: 'm0w3-del1', description: 'Demo Video: Explaining the "State" management in your CLI', estimatedEffort: 4, aiPolicy: 'allowed', outputArtifact: 'Presentation' }
          ]
        }
      }
    ]
  },
  {
    monthNumber: 1,
    title: 'Month 1: The Computer Science Gateway',
    objective: 'Learn how data, networks, and memory actually function beneath the OS abstractions',
    mode: 'learning-heavy',
    exitCriteria: [
      'Built a Bit-to-Char-to-Pixel visualizer',
      'Performed manual HTTP Handshake analysis',
      'Mastered Git rebase & reflog',
      'Detailed "Memory Map" of a Windows Process'
    ],
    failureRisk: 'Ignoring low-level "boring" theory in favor of library-hunting',
    weeks: [
      {
        weekNumber: 4,
        lanes: {
          coreBuild: [
            { id: 'm1w4-cb1', description: 'Bit-Level Logic: Logic Gates (AND/OR/NOT), Half-adders on paper', estimatedEffort: 12, aiPolicy: 'forbidden', outputArtifact: 'Gate Diagrams' },
            { id: 'm1w4-cb2', description: 'Data Encoding: Converting binary to ASCII/UTF-8 and Hex manually', estimatedEffort: 10, aiPolicy: 'forbidden', outputArtifact: 'Workbook' },
            { id: 'm1w4-cb3', description: 'Endianness: Understanding how Windows (Little Endian) stores multibyte integers', estimatedEffort: 8, aiPolicy: 'coach-only', outputArtifact: 'Memory Trace' }
          ],
          dsaReasoning: [],
          genAiSystemDesign: [],
          enforcement: [],
          deliverables: []
        }
      },
      {
        weekNumber: 5,
        lanes: {
          coreBuild: [
            { id: 'm1w5-cb1', description: 'Networking Internals: TCP/IP Stack, DNS resolution (the manual path)', estimatedEffort: 15, aiPolicy: 'coach-only', outputArtifact: 'DNS Trace' },
            { id: 'm1w5-cb2', description: 'Packet Analysis: Using Wireshark on Windows to sniff a simple HTTP request', estimatedEffort: 12, aiPolicy: 'allowed', outputArtifact: 'PCAP Analysis' },
            { id: 'm1w5-cb3', description: 'Socket Basics: Understanding Ports, IPs, and Listen/Dial logic', estimatedEffort: 10, aiPolicy: 'coach-only', outputArtifact: 'Netstat Report' }
          ],
          dsaReasoning: [],
          genAiSystemDesign: [],
          enforcement: [],
          deliverables: []
        }
      },
      {
        weekNumber: 6,
        lanes: {
          coreBuild: [
            { id: 'm1w6-cb1', description: 'Professional Git: Objects, Hashes, and the ".git" directory anatomy', estimatedEffort: 12, aiPolicy: 'coach-only', outputArtifact: 'Exploded Repo' },
            { id: 'm1w6-cb2', description: 'The Gauntlet: Resolving 10 artificial complex merge conflicts in CLI', estimatedEffort: 10, aiPolicy: 'forbidden', outputArtifact: 'Clean History' },
            { id: 'm1w6-cb3', description: 'Git Recovery: Using `reflog` and `cherry-pick` to fix "broken" branches', estimatedEffort: 8, aiPolicy: 'coach-only', outputArtifact: 'Solution Log' }
          ],
          dsaReasoning: [],
          genAiSystemDesign: [],
          enforcement: [],
          deliverables: []
        }
      },
      {
        weekNumber: 7,
        lanes: {
          coreBuild: [
            { id: 'm1w7-cb1', description: 'OS Core: Memory (Stack vs Heap), Process isolation, and Paging', estimatedEffort: 15, aiPolicy: 'coach-only', outputArtifact: 'OS Notes' },
            { id: 'm1w7-cb2', description: 'Logic Blueprints: Mapping the flowchart of 5 algorithms BEFORE coding', estimatedEffort: 10, aiPolicy: 'forbidden', outputArtifact: 'The Blueprint' }
          ],
          dsaReasoning: [],
          genAiSystemDesign: [],
          enforcement: [],
          deliverables: [
            { id: 'm1w7-del1', description: 'Essay: How a Byte travels from Disk to RAM on Windows', estimatedEffort: 6, aiPolicy: 'coach-only', outputArtifact: 'The Journey Essay' }
          ]
        }
      }
    ]
  },
  {
    monthNumber: 2,
    title: 'Logic Cleanse: Python (AI FORBIDDEN)',
    objective: 'Rebuild neural paths for independent problem solving',
    mode: 'learning-heavy',
    exitCriteria: ['40 LC Easy/Medium solo', 'Zero syntax errors on first-try', 'Full BUGS.md log'],
    failureRisk: 'Peeking at AI for "just syntax"',
    weeks: [
      { weekNumber: 8, lanes: { coreBuild: [{ id: 'm2w8-cb1', description: 'Memory model: Variables & Scope', estimatedEffort: 10, aiPolicy: 'forbidden', outputArtifact: 'trace.py' }], dsaReasoning: [{ id: 'm2w8-dsa1', description: 'Dry-run 5 loops on paper', estimatedEffort: 8, aiPolicy: 'forbidden', outputArtifact: 'Paper Slips' }], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 9, lanes: { coreBuild: [{ id: 'm2w9-cb1', description: 'Functions: Recursion vs Iteration', estimatedEffort: 12, aiPolicy: 'forbidden', outputArtifact: 'recursion.py' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 10, lanes: { coreBuild: [{ id: 'm2w10-cb1', description: 'Closures, Decorators, Iterators', estimatedEffort: 15, aiPolicy: 'forbidden', outputArtifact: 'patterns.py' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 11, lanes: { coreBuild: [{ id: 'm2w11-cb1', description: 'Graduation: Build "LogicBox" Utils', estimatedEffort: 20, aiPolicy: 'forbidden', outputArtifact: 'LogicBox Repo' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } }
    ]
  },
  {
    monthNumber: 3,
    title: 'Data Structures Internalized',
    objective: 'Master memory and data organization',
    mode: 'learning-heavy',
    exitCriteria: ['Custom Hashmap from scratch', 'Linked List & B-Tree from scratch', 'Big O of all projects'],
    failureRisk: 'Using built-ins without knowing O(n)',
    weeks: [
      { weekNumber: 12, lanes: { coreBuild: [{ id: 'm3w12-cb1', description: 'Linear: Linked List, Stack, Queue', estimatedEffort: 15, aiPolicy: 'forbidden', outputArtifact: 'linear_ds.py' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 13, lanes: { coreBuild: [{ id: 'm3w13-cb1', description: 'Non-Linear: Heap, BST, Graphs', estimatedEffort: 18, aiPolicy: 'forbidden', outputArtifact: 'graph_ds.py' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 14, lanes: { coreBuild: [{ id: 'm3w14-cb1', description: 'Hashing: Custom Hash & Bucket logic', estimatedEffort: 15, aiPolicy: 'forbidden', outputArtifact: 'hashmap.py' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 15, lanes: { coreBuild: [{ id: 'm3w15-cb1', description: 'Sorting & Searching: Profiling 5 algos', estimatedEffort: 12, aiPolicy: 'forbidden', outputArtifact: 'profile.json' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [{ id: 'm3w15-del1', description: 'Talk: How HashMaps scale', estimatedEffort: 5, aiPolicy: 'coach-only', outputArtifact: 'Video' }] } }
    ]
  },
  {
    monthNumber: 4,
    title: 'Computational Thinking & Scale',
    objective: 'Transition from single scripts to architectures',
    mode: 'learning-heavy',
    exitCriteria: ['Master OS: Processes & Mutexes', 'Multi-threaded Web Scraper', 'Explain GIL'],
    failureRisk: 'Treating threads as "magic"',
    weeks: [
      { weekNumber: 16, lanes: { coreBuild: [{ id: 'm4w16-cb1', description: 'OS: Scheduling, Paging, IPC', estimatedEffort: 15, aiPolicy: 'coach-only', outputArtifact: 'sys_notes.md' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 17, lanes: { coreBuild: [{ id: 'm4w17-cb1', description: 'Concurrency: Threads vs Processes', estimatedEffort: 12, aiPolicy: 'forbidden', outputArtifact: 'race.py' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 18, lanes: { coreBuild: [{ id: 'm4w18-cb1', description: 'Asyncio: Event loops & Coroutines', estimatedEffort: 15, aiPolicy: 'coach-only', outputArtifact: 'async_scraper.py' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 19, lanes: { coreBuild: [{ id: 'm4w19-cb1', description: 'Project: Distributed Scraper Master', estimatedEffort: 20, aiPolicy: 'coach-only', outputArtifact: 'ScraperCloud' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [{ id: 'm4w19-del1', description: 'Writeup: Python Concurrency', estimatedEffort: 4, aiPolicy: 'allowed', outputArtifact: 'Blog' }] } }
    ]
  },
  {
    monthNumber: 5,
    title: 'The Backend Engine (Go Focus)',
    objective: 'Transition to systems backend with Go',
    mode: 'building-heavy',
    exitCriteria: ['Mastered Go & Concurrency', 'Built Producer-Consumer', 'Explain Go for 15+ LPA'],
    failureRisk: 'Treating Go like Python',
    weeks: [
      { weekNumber: 20, lanes: { coreBuild: [{ id: 'm5w20-cb1', description: 'Go: Types, Structs, Interfaces', estimatedEffort: 15, aiPolicy: 'forbidden', outputArtifact: 'basics.go' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 21, lanes: { coreBuild: [{ id: 'm5w21-cb1', description: 'Concurrency: Goroutines & Channels', estimatedEffort: 20, aiPolicy: 'forbidden', outputArtifact: 'concy.go' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 22, lanes: { coreBuild: [{ id: 'm5w22-cb1', description: 'Project: Log Processor in Go', estimatedEffort: 15, aiPolicy: 'coach-only', outputArtifact: 'GLog' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 23, lanes: { coreBuild: [{ id: 'm5w23-cb1', description: 'Go Tooling: Pprof & Testing', estimatedEffort: 10, aiPolicy: 'allowed', outputArtifact: 'report.pdf' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [{ id: 'm5w23-del1', description: 'Deep-dive: Pointers', estimatedEffort: 5, aiPolicy: 'coach-only', outputArtifact: 'Video' }] } }
    ]
  },
  {
    monthNumber: 6,
    title: 'Distributed Reality',
    objective: 'Build systems at real-world scale',
    mode: 'building-heavy',
    exitCriteria: ['Distributed URL Shortener', 'Custom Rate Limiter', 'Explain CAP Theorem'],
    failureRisk: 'Ignoring networking edge cases',
    weeks: [
      { weekNumber: 24, lanes: { coreBuild: [{ id: 'm6w24-cb1', description: 'Networking in Go: Dial/Listen', estimatedEffort: 15, aiPolicy: 'coach-only', outputArtifact: 'serv.go' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 25, lanes: { coreBuild: [{ id: 'm6w25-cb1', description: 'Distributed Logic: UUIDs & Sharding', estimatedEffort: 12, aiPolicy: 'coach-only', outputArtifact: 'shard.go' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 26, lanes: { coreBuild: [{ id: 'm6w26-cb1', description: 'Project: GoShort (Killer #1)', estimatedEffort: 25, aiPolicy: 'coach-only', outputArtifact: 'GoShort', isKillerProject: true }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 27, lanes: { coreBuild: [{ id: 'm6w27-cb1', description: 'Deployment: Docker & Cloud', estimatedEffort: 10, aiPolicy: 'allowed', outputArtifact: 'Live' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } }
    ]
  },
  {
    monthNumber: 7,
    title: 'Production Infrastructure',
    objective: 'Master Databases and Caching',
    mode: 'building-heavy',
    exitCriteria: ['PostgreSQL Indexing expert', 'Redis Write-through Cache', 'Explain MVCC'],
    failureRisk: 'ORM reliance',
    weeks: [
      { weekNumber: 28, lanes: { coreBuild: [{ id: 'm7w28-cb1', description: 'SQL: Indexing B-Tree vs Hash', estimatedEffort: 15, aiPolicy: 'forbidden', outputArtifact: 'plan.sql' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 29, lanes: { coreBuild: [{ id: 'm7w29-cb1', description: 'Redis: Data types & Pub/Sub', estimatedEffort: 12, aiPolicy: 'coach-only', outputArtifact: 'cache.go' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 30, lanes: { coreBuild: [{ id: 'm7w30-cb1', description: 'Project: Distributed Task Queue', estimatedEffort: 25, aiPolicy: 'coach-only', outputArtifact: 'GQueue' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 31, lanes: { coreBuild: [{ id: 'm7w31-cb1', description: 'Monitoring: Prometheus/Grafana', estimatedEffort: 15, aiPolicy: 'allowed', outputArtifact: 'Metrics' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } }
    ]
  },
  {
    monthNumber: 8,
    title: 'GenAI Engineering (Non-Hype)',
    objective: 'Build AI products, not prompt-wrappers',
    mode: 'building-heavy',
    exitCriteria: ['Vector DB internals', 'RAG with Observability', 'Zero-shot vs Few-shot mastery'],
    failureRisk: 'Focusing on prompt hacks',
    weeks: [
      { weekNumber: 32, lanes: { coreBuild: [{ id: 'm8w32-cb1', description: 'LLM Fundamentals: Eval notes', estimatedEffort: 10, aiPolicy: 'coach-only', outputArtifact: 'evals.md' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 33, lanes: { coreBuild: [{ id: 'm8w33-cb1', description: 'Vector Search: Retrieval & Chunking', estimatedEffort: 15, aiPolicy: 'coach-only', outputArtifact: 'vopt.py' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 34, lanes: { coreBuild: [{ id: 'm8w34-cb1', description: 'AI Observability: Logging Outputs', estimatedEffort: 12, aiPolicy: 'allowed', outputArtifact: 'eval.json' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 35, lanes: { coreBuild: [{ id: 'm8w35-cb1', description: 'Project: Automated Code Reviewer', estimatedEffort: 20, aiPolicy: 'coach-only', outputArtifact: 'Reviewer' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } }
    ]
  },
  {
    monthNumber: 9,
    title: 'Agentic Infrastructure',
    objective: 'Autonomous systems that fix themselves',
    mode: 'building-heavy',
    exitCriteria: ['Agentic Infra Medic built', 'Safe Tool Use implemented', 'Explain Agent Loops'],
    failureRisk: 'Agent permission sprawl',
    weeks: [
      { weekNumber: 36, lanes: { coreBuild: [{ id: 'm9w36-cb1', description: 'Agentic workflows: Planning', estimatedEffort: 15, aiPolicy: 'coach-only', outputArtifact: 'loops.py' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 37, lanes: { coreBuild: [{ id: 'm9w37-cb1', description: 'Function Calling & Tool Spec', estimatedEffort: 12, aiPolicy: 'coach-only', outputArtifact: 'tools.json' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 38, lanes: { coreBuild: [{ id: 'm9w38-cb1', description: 'Killer Project #2: Infra Medic', estimatedEffort: 25, aiPolicy: 'coach-only', isKillerProject: true, outputArtifact: 'Medic' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 39, lanes: { coreBuild: [{ id: 'm9w39-cb1', description: 'Sandboxing: Secure Exec', estimatedEffort: 15, aiPolicy: 'coach-only', outputArtifact: 'sandbox.yaml' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [{ id: 'm9w39-del1', description: 'Demo: Agent fix', estimatedEffort: 6, aiPolicy: 'allowed', outputArtifact: 'Video' }] } }
    ]
  },
  {
    monthNumber: 10,
    title: 'Full-Stack & Integration',
    objective: 'Combine Frontend, Backend & AI',
    mode: 'building-heavy',
    exitCriteria: ['Built Smart Diary with AI', 'Next.js + Python API', 'Live Cloud Deploy'],
    failureRisk: 'CSS obsession',
    weeks: [
      { weekNumber: 40, lanes: { coreBuild: [{ id: 'm10w40-cb1', description: 'Next.js: Components & Props', estimatedEffort: 15, aiPolicy: 'coach-only', outputArtifact: 'App.tsx' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 41, lanes: { coreBuild: [{ id: 'm10w41-cb1', description: 'API Integration: Axios & State', estimatedEffort: 12, aiPolicy: 'coach-only', outputArtifact: 'api.ts' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 42, lanes: { coreBuild: [{ id: 'm10w42-cb1', description: 'Project: Agentic OS Portal', estimatedEffort: 20, aiPolicy: 'coach-only', outputArtifact: 'Portal' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 43, lanes: { coreBuild: [{ id: 'm10w43-cb1', description: 'Launch: Monitoring & Analytics', estimatedEffort: 10, aiPolicy: 'allowed', outputArtifact: 'Live Link' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } }
    ]
  },
  {
    monthNumber: 11,
    title: 'Pattern Recognition (Interview)',
    objective: 'Crush technical interviews',
    mode: 'interview-heavy',
    exitCriteria: ['50+ LC Mediums', 'Instagram/Twitter System Design', 'Outcome-driven Resume'],
    failureRisk: 'Memorization',
    weeks: [
      { weekNumber: 44, lanes: { coreBuild: [], dsaReasoning: [{ id: 'm11w44-dsa1', description: 'Two Pointers & Sliding Window', estimatedEffort: 15, aiPolicy: 'forbidden', outputArtifact: 'LC_Log' }], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 45, lanes: { coreBuild: [], dsaReasoning: [{ id: 'm11w45-dsa1', description: 'DFS/BFS on Graphs', estimatedEffort: 20, aiPolicy: 'forbidden', outputArtifact: 'Graph_Log' }], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 46, lanes: { coreBuild: [], dsaReasoning: [{ id: 'm11w46-dsa1', description: 'Dynamic Programming basics', estimatedEffort: 15, aiPolicy: 'forbidden', outputArtifact: 'DP_Log' }], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 47, lanes: { coreBuild: [], dsaReasoning: [], genAiSystemDesign: [{ id: 'm11w47-sd1', description: 'Sys Design: CDNs & Load Balancers', estimatedEffort: 10, aiPolicy: 'coach-only', outputArtifact: 'SD_Plan' }], enforcement: [], deliverables: [{ id: 'm11w47-del1', description: 'Resume V1', estimatedEffort: 5, aiPolicy: 'coach-only', outputArtifact: 'resume.pdf' }] } }
    ]
  },
  {
    monthNumber: 12,
    title: 'The Mock Gauntlet',
    objective: 'Simulate high-pressure interviews',
    mode: 'interview-heavy',
    exitCriteria: ['5 Mock interviews done', 'Zero hesitation on Core skills', 'Designed Newsfeed at scale'],
    failureRisk: 'Performance anxiety',
    weeks: [
      { weekNumber: 48, lanes: { coreBuild: [], dsaReasoning: [{ id: 'm12w48-dsa1', description: 'Timed Coding Practice', estimatedEffort: 12, aiPolicy: 'forbidden', outputArtifact: 'Excel' }], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 49, lanes: { coreBuild: [], dsaReasoning: [], genAiSystemDesign: [{ id: 'm12w49-sd1', description: 'Deep Dive: Redis vs Indexing', estimatedEffort: 12, aiPolicy: 'coach-only', outputArtifact: 'Brief' }], enforcement: [], deliverables: [] } },
      { weekNumber: 50, lanes: { coreBuild: [], dsaReasoning: [], genAiSystemDesign: [], enforcement: [{ id: 'm12w50-enf1', description: 'Behavioral: STAR Method', estimatedEffort: 8, aiPolicy: 'allowed', outputArtifact: 'stories.md' }], deliverables: [] } },
      { weekNumber: 51, lanes: { coreBuild: [], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [{ id: 'm12w51-del1', description: 'Final Senior Mock', estimatedEffort: 10, aiPolicy: 'forbidden', outputArtifact: 'Scorecard' }] } }
    ]
  },
  {
    monthNumber: 13,
    title: 'Offer Conversion',
    objective: 'Convert engineers into assets',
    mode: 'interview-heavy',
    exitCriteria: ['2+ offers 15-20 LPA', 'Negotiation script mastered', 'Brand optimized'],
    failureRisk: 'Accepting low offers',
    weeks: [
      { weekNumber: 52, lanes: { coreBuild: [], dsaReasoning: [], genAiSystemDesign: [], enforcement: [{ id: 'm13w52-enf1', description: 'Outreach: 50 Hiring Managers', estimatedEffort: 15, aiPolicy: 'allowed', outputArtifact: 'Log' }], deliverables: [] } },
      { weekNumber: 53, lanes: { coreBuild: [], dsaReasoning: [], genAiSystemDesign: [], enforcement: [{ id: 'm13w53-enf1', description: 'Referral Hunting', estimatedEffort: 15, aiPolicy: 'allowed', outputArtifact: 'Ref_Log' }], deliverables: [] } },
      { weekNumber: 54, lanes: { coreBuild: [], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [{ id: 'm13w54-del1', description: 'Salary Matrix', estimatedEffort: 4, aiPolicy: 'coach-only', outputArtifact: 'Strategy' }] } },
      { weekNumber: 55, lanes: { coreBuild: [], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [{ id: 'm13w55-del1', description: 'OFFER SIGNED (Min 15 LPA)', estimatedEffort: 2, aiPolicy: 'forbidden', outputArtifact: 'Signed' }] } }
    ]
  },
  {
    monthNumber: 14,
    title: 'Professional Onboarding',
    objective: 'Prepare for Day 1',
    mode: 'learning-heavy',
    exitCriteria: ['Git Workflow mastery', 'Agile/Scrum basics', 'Testing suite setup'],
    failureRisk: 'Skill rust',
    weeks: [
      { weekNumber: 56, lanes: { coreBuild: [{ id: 'm14w56-cb1', description: 'Git: Rebase, Cherry-pick', estimatedEffort: 10, aiPolicy: 'coach-only', outputArtifact: 'git.sh' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 57, lanes: { coreBuild: [{ id: 'm14w57-cb1', description: 'Testing: PyTest & Mocking', estimatedEffort: 12, aiPolicy: 'coach-only', outputArtifact: 'tests.py' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 58, lanes: { coreBuild: [{ id: 'm14w58-cb1', description: 'Agile: JIRA & Sprints', estimatedEffort: 8, aiPolicy: 'allowed', outputArtifact: 'agile.md' }], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [] } },
      { weekNumber: 59, lanes: { coreBuild: [], dsaReasoning: [], genAiSystemDesign: [], enforcement: [], deliverables: [{ id: 'm14w59-del1', description: 'Day 1 Checklist', estimatedEffort: 4, aiPolicy: 'allowed', outputArtifact: 'ready.pdf' }] } }
    ]
  }
];

export const darkForestProtocol: DarkForestProtocol = {
  trigger: 'Stuck >4 hours with zero progress',
  steps: [
    '1. Close laptop. Go for a 20 min walk.',
    '2. Draw logic flows on physical paper.',
    '3. Explain problem to a rubber duck.',
    '4. Write down what you ARE sure about.',
    '5. Ask a HUMAN mentor or niche Discord.'
  ],
  applicableMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

export const aiContract: AIContractGate = {
  redZone: ['Syntax learning (0-4)', 'Algorithm logic (DSA)', 'DB Schema'],
  yellowZone: ['Error explanation', 'Refactoring', 'Boilerplate (6+)'],
  greenZone: ['Documentation', 'Dummy data', 'CSS styling'],
  violationConsequences: [
    'Penalty 1: ₹500 to Escrow',
    'Penalty 2: Redo week without AI',
    'Penalty 3: Project Reset'
  ]
};
