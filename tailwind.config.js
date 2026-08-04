/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1a1a1a",
        foreground: "#f5f5f5",
      },
      animation: {
        glow: 'glow 1.5s infinite',
        'gradient-shimmer': 'gradient-shimmer 4s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '1 0 10px rgba(34, 197, 94, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(34, 197, 94, 0.8)' },
        },
        'gradient-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
