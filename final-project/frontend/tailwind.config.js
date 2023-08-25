/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: '#fdfbfe',
        background: '#0d060e',
        primary: '#458637',
        secondary: '#0a190f',
        accent: '#8aaa46',
      },
      fontFamily: {
        sans: ['var(--font-nunito-sans)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
