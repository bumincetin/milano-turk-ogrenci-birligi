import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary': {
          50: '#fef2f2',   // En açık ton
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#a50e0e',  // Yeni ana renk
          600: '#940d0d',  // Hover için
          700: '#830b0b',
          800: '#720a0a',
          900: '#610909',  // En koyu ton
        }
      },
    },
  },
  plugins: [],
};
export default config;
