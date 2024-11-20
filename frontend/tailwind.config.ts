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
        50: '#f9f3f3',  // En açık ton
        100: '#f3e7e7',
        200: '#e6cfcf',
        300: '#d9b7b7',
        400: '#cc9f9f',
        500: '#450E0A', // Ana renk
        600: '#3e0c09', // Hover için biraz daha koyu
        700: '#370b08',
        800: '#300907',
        900: '#290806', // En koyu ton
      }
      },
    },
  },
  plugins: [],
};
export default config;
