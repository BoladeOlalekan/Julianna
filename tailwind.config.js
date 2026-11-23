/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1020',
        'navy-light': '#131B33',
        panel: '#F5F7FB',
        violet: {
          electric: '#6D4AFF',
        },
        mint: '#2EE6A6',
        sunny: '#FFC83D',
        coral: '#FF6B8A',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Sora"', 'system-ui', 'sans-serif'],
        display: ['"Sora"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'fintech': '0 24px 60px -15px rgba(11, 16, 32, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'fintech-light': '0 24px 60px -15px rgba(11, 16, 32, 0.25), 0 0 0 1px rgba(17, 17, 17, 0.06)',
        'glow-violet': '0 12px 35px -6px rgba(109, 74, 255, 0.55)',
        'glow-mint': '0 12px 35px -6px rgba(46, 230, 166, 0.45)',
      },
    },
  },
  plugins: [],
};
