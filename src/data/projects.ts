export type ProjectStatus = 'shipping' | 'in-dev' | 'research' | 'archived';

export interface Project {
  slug: string;
  title: string;
  role: string;
  summary: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  github?: string;
  liveUrl?: string;
  images?: string[];
  domain?: string;
  year: string;                 // e.g. "2025", "2025 → now"
}

export const projects: Project[] = [
  {
    slug: 'minirack',
    title: 'Homelab rack',
    role: 'Personal project',
    summary: 'A 3D-printed 10" rack for my home server: a Mac mini, a 4-drive NAS and a Raspberry Pi.',
    description:
      'A 10" rack based on bwees\' modular design. I changed the parts so each one fits the bed of my printer (Bambu Lab A1 mini, 180 × 180 mm).\n\nFrom the bottom up: a Mac mini 2012 used as a server, a NAS with 4 hot-swap 2.5" drives and a Raspberry Pi on top, and a name plate. Each drive slides in from the front and plugs into a SATA-USB adapter at the back.\n\n21 print plates, about 47 hours of printing and 0.7 kg of PETG. Modelled in FreeCAD. The files and the assembly guide are on GitHub.',
    stack: ['FreeCAD', 'PETG', 'Raspberry Pi', 'NAS', 'Homelab'],
    status: 'shipping',
    github: 'https://github.com/IllyaMoore/Modular-10-10-inch-Rack---A1-mini-version',
    images: ['minirack-photo.jpg', 'minirack-assembly.jpg', 'minirack-nas.jpg'],
    domain: 'Homelab',
    year: '2026',
  },
  {
    slug: 'acoustic-uav-detector',
    title: 'Acoustic drone detector',
    role: 'Personal project',
    summary: 'Three microphones and an ESP32 that estimate the direction of a drone by sound.',
    description:
      "Three INMP441 microphones sit on an equilateral triangle and listen for propeller noise. An ESP32 measures the time difference between each pair of microphones (GCC-PHAT) and calculates the direction, 0–360°. It only listens and sends no radio signal.\n\nI designed the wiring (all mics on one I2S clock), the PETG frame and a separate box for the electronics. The frame has to be accurate to about 1 mm, because 1 mm of error gives about 0.38° of error in direction. Still in progress.",
    stack: ['ESP32', 'I2S', 'GCC-PHAT', 'Python', 'CAD / PETG', 'DSP'],
    status: 'in-dev',
    github: 'https://github.com/IllyaMoore/Acoustic-UAV-detector',
    images: ['acoustic-uav-head.jpg', 'acoustic-uav-system.jpg', 'acoustic-uav-schema.jpg'],
    domain: 'DefTech',
    year: '2025 → now',
  },
];
