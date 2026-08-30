/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Steam client graphite base
        bg: {
          0: '#0b0e12',  // page background
          1: '#12161c',  // panel background
          2: '#181d24',  // elevated panel
          3: '#232a34',  // border / divider
        },
        ink: {
          0: '#e6ecf2',  // primary text
          1: '#a8b3bf',  // secondary text
          2: '#6d7986',  // muted / labels
          3: '#4a545e',  // deep muted
        },
        accent: {
          DEFAULT: '#66c0f4', // Steam blue (subtle deftech feel)
          soft: '#8cd0ff',
          deep: '#1b6fa8',
        },
        // Warm amber second colour — contrasts the cool blue, echoes the flag yellow.
        // Used for emphasis, "now" markers, featured accents.
        warm: {
          DEFAULT: '#f5b942',
          soft:    '#f9d182',
          deep:    '#b8862b',
        },
        signal: {
          go: '#5ba85f',      // status ok
          warn: '#d0a34a',    // in-development
          hold: '#9a6db8',    // on-hold
          err:  '#c85450',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'hud': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.12em' }],
      },
      boxShadow: {
        'panel': '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 0 0 1px rgba(35,42,52,0.9)',
        'panel-hover': '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 0 0 1px rgba(102,192,244,0.35)',
      },
      backgroundImage: {
        'grid-faint': 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-32': '32px 32px',
      },
    },
  },
  plugins: [],
};
