export type ProjectStatus = 'shipping' | 'in-dev' | 'research' | 'archived';
export type ProjectGroup = 'selected' | 'research' | 'current';

export interface Project {
  slug: string;
  title: string;
  role: string;
  summary: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  group: ProjectGroup;
  github?: string;
  liveUrl?: string;
  images?: string[];
  domain?: string;
  year: string;                 // e.g. "2025", "2025 → now"
}

export const projects: Project[] = [
  // ─── SELECTED ───────────────────────────────────────────────────
  {
    slug: 'acoustic-uav-detector',
    title: 'Acoustic UAV Detector',
    role: 'Solo · hardware + firmware + DSP',
    summary: 'Passive three-mic array. Hears drone direction. No radio, no GNSS, nothing emitted.',
    description:
      "Three INMP441 mics on an equilateral triangle listen for propeller noise. An ESP32 measures per-pair time differences with GCC-PHAT and turns them into azimuth across the full 360°. Only listens. Works under jamming. No transmit permit.\n\nDesigned end to end — shared-clock I2S wiring, PETG frame tuned to a 1 mm geometric-error budget (1 mm ≈ 0.38° of azimuth error), joints that carry the budget, and a separate electronics box so nothing on the mast affects geometry. Documented in painful detail. Rebuildable in a weekend.",
    stack: ['ESP32', 'I2S', 'GCC-PHAT', 'Python', 'CAD / PETG', 'DSP'],
    status: 'in-dev',
    group: 'selected',
    github: 'https://github.com/IllyaMoore/Acoustic-UAV-detector',
    images: ['acoustic-uav-system.jpg', 'acoustic-uav-head.jpg', 'acoustic-uav-schema.jpg'],
    domain: 'Deftech',
    year: '2025 → now',
  },
  {
    slug: 'ci-cd-pipeline',
    title: 'AI-reviewed CI/CD',
    role: 'DevOps engineer',
    summary: 'Four-phase delivery pipeline. AI reviewer is the last gate before merge.',
    description:
      'Pre-commit: ESLint, Prettier, smoke E2E.\nPre-push: TS build, unit tests, local AI code review.\nCI: full Playwright E2E, 30%+ coverage gate, strict type checks.\nMerge gate: AI review reads the diff and blocks the PR — a real gate, not a summary tool.\n\nBuilt because review latency was the bottleneck, not review judgement. The AI catches the boring stuff. Humans spend their time on what matters.',
    stack: ['GitHub Actions', 'Husky', 'Playwright', 'Vitest', 'ESLint', 'lint-staged'],
    status: 'shipping',
    group: 'selected',
    images: ['ci-pipeline.jpg'],
    domain: 'DevOps',
    year: '2025',
  },
  {
    slug: 'node-ai-reviewer',
    title: 'Node AI Reviewer',
    role: 'Solo developer',
    summary: 'Pluggable AI code-review runner. Built to be a CI gate, not a summariser.',
    description:
      'Reads diffs. Injects repo context. Calls the model. Posts structured review comments back to the PR. Slots into CI as a required check so bad diffs actually get blocked.\n\nModel-agnostic — switch providers without rewriting the runner.',
    stack: ['TypeScript', 'Node.js', 'GitHub API'],
    status: 'in-dev',
    group: 'selected',
    github: 'https://github.com/IllyaMoore/Node_Ai_reviewer',
    domain: 'DevOps',
    year: '2025 → now',
  },

  // ─── RESEARCH ────────────────────────────────────────────────────
  {
    slug: 'cv-drone-detection',
    title: 'CV Drone Detection',
    role: 'Research',
    summary: 'Small-UAV detection from imagery. Visual companion to the acoustic array.',
    description:
      'Detection model for small drones against complex backgrounds. Same threat class as the acoustic detector, different sensor. The two are designed to eventually fuse.',
    stack: ['Python', 'OpenCV', 'PyTorch'],
    status: 'research',
    group: 'research',
    github: 'https://github.com/IllyaMoore/CV-Drone-Detection',
    domain: 'Deftech',
    year: '2025',
  },
  {
    slug: 'ukrainian-speech-translation',
    title: 'Ukrainian Speech Translation',
    role: 'Research paper',
    summary: 'Low-resource speech-to-speech translation for Ukrainian.',
    description:
      'Written work on speech-to-speech translation for Ukrainian as a lower-resource language. Where the usual model choices stop being obvious.',
    stack: ['ASR', 'MT', 'Research'],
    status: 'research',
    group: 'research',
    github: 'https://github.com/IllyaMoore/ukrainian-speech-translation-research',
    domain: 'Research',
    year: '2026',
  },

  // ─── CURRENT ─────────────────────────────────────────────────────
  {
    slug: 'command-center',
    title: 'Command Center',
    role: 'Solo developer',
    summary: 'Self-hosted AI assistant. Wired into WhatsApp and Telegram. Isolated multi-agent sessions.',
    description:
      'Routes messages from WhatsApp and Telegram through an LLM. Isolated per-agent sessions. Scheduled task automation. Google Workspace integration (Calendar, Gmail, Drive). Runs in Docker with a real-time Next.js dashboard.\n\nModel-agnostic — the SDK plug is swappable. Started as "an assistant on my phone". Grew into the platform I run day-to-day.',
    stack: ['Node.js', 'TypeScript', 'Next.js', 'SQLite', 'Docker', 'MCP'],
    status: 'in-dev',
    group: 'current',
    images: ['command-center-dashboard.jpg', 'command-center-chat.jpg'],
    domain: 'AI systems',
    year: '2024 → now',
  },
  {
    slug: 'storyfunnels',
    title: 'StoryFunnels',
    role: 'Co-developer · task module + CI/CD',
    summary: 'AI-driven marketing automation. 33+ modules across funnels, campaigns, scheduling.',
    description:
      'Full-stack SaaS. Funnel builders, email campaigns, social scheduling, ad management. I own the kanban task module and the delivery pipeline that keeps everything shippable at scale.',
    stack: ['React', 'TypeScript', 'Supabase', 'Tailwind', 'Vite'],
    status: 'in-dev',
    group: 'current',
    images: ['storyfunnels-landing.jpg', 'storyfunnels-kanban.jpg'],
    domain: 'AI systems',
    year: '2024 → now',
  },
];

export const selected = projects.filter((p) => p.group === 'selected');
export const research = projects.filter((p) => p.group === 'research');
export const current = projects.filter((p) => p.group === 'current');
