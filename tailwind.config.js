/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdfbf7',
          100: '#f5f0ea',
          200: '#ebe5dc',
          300: '#e9e5dc',
          400: '#dfd5c8',
          500: '#d4cab3',
        },
        sage: {
          50: '#f7faf4',
          100: '#eef3e9',
          200: '#d9e4ca',
          300: '#c1d5ab',
          400: '#b6c1a0',
          500: '#a8b58f',
        },
        wood: {
          50: '#faf8f6',
          100: '#f0e8e2',
          200: '#d4c4b5',
          300: '#b8a399',
          400: '#a1887f',
          500: '#8b7366',
        },
        stone: {
          50: '#fafaf9',
          100: '#f3f3f1',
          200: '#e8e8e6',
          300: '#d6d5d0',
          400: '#a9a8a5',
          500: '#78766f',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        gutter: '1.5rem',
      },
    },
  },
  plugins: [],
};
