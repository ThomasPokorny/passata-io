/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        pomodoro: {
          primary: '#b63a2b',
          secondary: '#ed887c',
        },
        short_break: {
          primary: '#605afa',
          secondary: '#797fff',
        },
        long_break: {
          primary: '#2bb6b3',
          secondary: '#40c1bc',
        },
      },
    },
  },
  plugins: [],
};
