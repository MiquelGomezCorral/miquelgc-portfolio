import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "miquel-background": "#16171f",
        "miquel-black": {
          200: "#21222e",
          300: "#363e5c",
          400: "#202436",
          500: "#161925",
        },
        "miquel-white": {
          100: "#FFFFFF",
          200: "#F5F5F5",
          500: "#BBBBBB",
        },
        "miquel-blue":{
          400: "#3EA7F8",
          500: "#2f63c4",
        },
        "miquel-purple":{
          500: "#583EDC",
        }
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        'fade-in-out': 'fadeOut 0.5s linear infinite alternate',
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
