/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Design tokens from the Client Portal handoff
        cream: '#F5F1EA',
        'cream-2': '#EBE5D9',
        ink: '#1A2420',
        'ink-soft': '#3A4A42',
        'ink-mute': '#6B7972',
        green: '#2D5A4A',
        'green-deep': '#1F3F34',
        gold: '#B8924A',
        rule: '#D9D2C2',
        'rule-soft': '#E5DFD0',
        surface: '#FBFAF6',
        bar: '#F1ECE0',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        card: '0 24px 48px -24px rgba(20, 30, 25, 0.18), 0 2px 0 rgba(20,30,25,0.04)',
        phone: '0 30px 60px -20px rgba(20,30,25,0.35), 0 0 0 1px #0a0a0a',
      },
    },
  },
  plugins: [],
}
