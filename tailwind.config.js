/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E0F12',
        surface: '#F4F5F7',
        'lime-pop': '#E2FF3B',
        'lime-deep': '#CBEB1E',
        'coral-pop': '#FF6B6B',
        mint: '#2EE6A6',
        sunny: '#E2FF3B',
        coral: '#FF6B6B',
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
        'pf-card': '0 18px 50px -20px rgba(14, 15, 18, 0.14), 0 0 0 1px rgba(14, 15, 18, 0.06)',
        'pf-float': '0 22px 48px -18px rgba(14, 15, 18, 0.22)',
        'pf-lime': '0 20px 44px -18px rgba(190, 224, 18, 0.55)',
      },
    },
  },
  plugins: [],
};
