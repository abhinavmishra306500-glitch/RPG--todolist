/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace', 'system-ui'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        rpg: {
          dark: '#0e0d17',
          card: '#1a172a',
          cardBorder: '#363058',
          cardHighlight: '#272242',
          muted: '#8e8aa8',
          player: {
            DEFAULT: '#10b981',
            hover: '#059669',
            light: '#6ee7b7',
            dark: '#064e3b',
            accent: '#34d399',
          },
          dev: {
            DEFAULT: '#f59e0b',
            hover: '#d97706',
            light: '#fde68a',
            dark: '#78350f',
            accent: '#fbbf24',
          }
        }
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0 0 rgba(0,0,0,0.6)',
        'pixel': '4px 4px 0 0 rgba(0,0,0,0.7)',
        'pixel-lg': '6px 6px 0 0 rgba(0,0,0,0.8)',
        'pixel-player': '0 0 25px rgba(52, 211, 153, 0.25)',
        'pixel-dev': '0 0 25px rgba(245, 158, 11, 0.25)',
        'inner-pixel': 'inset 2px 2px 0 0 rgba(255,255,255,0.1), inset -2px -2px 0 0 rgba(0,0,0,0.4)',
      },
      animation: {
        'float-slow': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'sparkle': 'sparkle 1.8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.6' },
          '50%': { transform: 'scale(1.2) rotate(10deg)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
