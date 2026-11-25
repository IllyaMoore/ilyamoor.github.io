export const summary =
  'Started as a software engineer (backend: TypeScript/Deno, Supabase). Over time I moved to DevOps, and now I mostly work on infrastructure and deployments.';

export const job = {
  role: 'DevOps engineer',
  org: 'StoryFunnels',
  period: '2024 → now',
  note: 'Started as a backend developer',
  achievements: [
    'Migrated a production SaaS from Kamatera to Hetzner.',
    'Moving a legacy multi-service Node.js app (15 microservices, RabbitMQ, Redis) from AWS to Hetzner. Inventoried the AWS account, removed unused resources and cut the monthly bill from about $165 to about $90.',
    'Kubernetes cluster updates and patching; changed node types to lower costs.',
    'Hardened CI/CD and set up GitHub environments for different workflows: multi-environment, trunk-based with feature flags, canary deployments.',
    'Fixed access-control issues in a multi-tenant API (scoped tokens, role checks).',
    'Deployed and benchmarked a video-rendering service (FFmpeg workers, Postgres job queue), with monitoring in Prometheus and Grafana.',
  ],
};

export const skills = [
  { area: 'Infrastructure as Code', items: 'Mostly Terraform' },
  { area: 'Kubernetes',             items: 'Talos, GitOps with ArgoCD' },
  { area: 'CI/CD',                  items: 'GitHub Actions, Docker Compose, multi-environment deploys' },
  { area: 'Databases',              items: 'PostgreSQL, MongoDB: migrations, access policies' },
  { area: 'Monitoring',             items: 'Prometheus, Grafana' },
  { area: 'Secrets',                items: '1Password, Bitwarden' },
  { area: 'Cloud',                  items: 'Hetzner, AWS, cost optimization' },
  { area: 'Languages',              items: 'TypeScript, Python, Deno' },
];

export const education = {
  degree: 'BSc, ML/AI',
  org: 'Kyiv-Mohyla Academy',
  period: '2022 → 2026',
};

export const wants = [
  'To grow as a DevOps / Platform engineer',
  'A team where I can learn from more experienced engineers',
  'Remote work or a flexible schedule',
];

export const doesNotWant = [
  'Pure support or on-call work with no engineering tasks',
];
