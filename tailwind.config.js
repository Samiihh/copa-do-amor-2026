/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta oficial da Copa do Amor 2026
        'campo-grass': '#15803D',
        'campo-green-dark': '#166534',
        'campo-black': '#0F172A',
        'campo-purple': '#7C3AED',
        'campo-red': '#DC2626',
        'campo-gold': '#FBBF24', // acento para troféu / estrelas
        'campo-white': '#FFFFFF',
        // Aliases para manter componentes antigos funcionando durante a transição
        'campo-green': '#15803D',
        'campo-purple-dark': '#166534',
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'], // títulos estilo placar de estádio
        score: ['"Rajdhani"', 'sans-serif'], // números / placar digital
        body: ['"Poppins"', 'sans-serif'], // texto corrido
      },
      boxShadow: {
        'glow-purple': '0 0 25px rgba(124, 58, 237, 0.55)',
        'glow-grass': '0 0 25px rgba(21, 128, 61, 0.55)',
        'glow-red': '0 0 25px rgba(220, 38, 38, 0.55)',
        'glow-gold': '0 0 30px rgba(251, 191, 36, 0.45)',
      },
      backgroundImage: {
        'stadium-gradient':
          'radial-gradient(circle at 50% 0%, rgba(21,128,61,0.35) 0%, rgba(15,23,42,0) 60%), radial-gradient(circle at 80% 100%, rgba(124,58,237,0.24) 0%, rgba(15,23,42,0) 55%)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
