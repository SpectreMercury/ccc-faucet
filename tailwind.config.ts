import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      extend: {
        colors: {
          primary: '#2C3E50',
          secondary: '#ECF0F1',
          accent: '#3498DB',
          neutral: '#95A5A6',
          background: '#F5F5F5',
          text: '#2C3E50',
        },
      },
    },
  },
  plugins: [],
};
export default config;
