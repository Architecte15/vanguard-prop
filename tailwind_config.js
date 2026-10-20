/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vanguard: {
          dark: '#0a0d14',
          card: '#121824',
          border: '#1e293b',
          accent: '#10b981', // Émeraude trading
          accentHover: '#059669',
          gold: '#f59e0b',   // Accent premium
          textMuted: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [],
}