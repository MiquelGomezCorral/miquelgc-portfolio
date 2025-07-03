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
        "miquel-background": "oklch(16.15% 0.015 281.0)",
        "miquel-black": {
          50:  "oklch(45.9% 0.02 281.0)",
          100: "oklch(41.7% 0.02 281.0)",
          "100-a": "oklch(41.7% 0.02 281.0 / <alpha-value>)",
          150: "oklch(35.7% 0.02 281.0)",
          200: "oklch(33.1% 0.02 281.0)",
          300: "oklch(27.6% 0.02 281.0)",
          400: "oklch(23.5% 0.02 281.0)",
          500: "oklch(20.0% 0.02 281.0)",
          "500-a": "oklch(20.0% 0.02 281.0 / <alpha-value>)",
        },
        "miquel-white": {
          100: "oklch(100.0% 0.00 0.00)",
          200: "oklch(96.3% 0.00 99.3)",
          500: "oklch(79.9% 0.00 275.3)",
          "500-a": "oklch(79.9% 0.00 275.3 / <alpha-value>)",
        },
        "miquel-blue": {
          100: "oklch(91.6% 0.07 250.0)",
          200: "oklch(84.0% 0.10 250.0)",
          400: "oklch(65.5% 0.17 250.0)",
          "400-a": "oklch(65.5% 0.17 250.0 / <alpha-value>)",
          500: "oklch(50.9% 0.17 250.0)",
          "500-a": "oklch(50.9% 0.17 250.0 / <alpha-value>)",
          900: "oklch(33.1% 0.17 250.0)"
        },
        "miquel-purple": {
          500: "oklch(43.6% 0.23 296.2)",
        },
        //   "miquel-background": "#16171f",
        //   "miquel-black": {
        //     50:  "#505160",
        //     100: "#464752",
        //     150: "#3a3b44",
        //     200: "#21222e",
        //     300: "#363e5c",
        //     400: "#202436",
        //     500: "#161925",
        //   },
        //   "miquel-white": {
        //     100: "#FFFFFF",
        //     200: "#F5F5F5",
        //     500: "#BBBBBB",
        //   },
        //   "miquel-blue":{
        //     100: "#d2eafc",
        //     200: "#9ed5ff",
        //     400: "#3EA7F8",
        //     500: "#2f63c4",
        //   },
        //   "miquel-purple":{
        //     500: "#583EDC",
        //   }
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
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      },
      animation: {
        'fade-in-out': 'fadeOut 0.5s linear infinite alternate',
        'marquee': "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        'spin-slow': 'spin 5s linear infinite',
        'shimmer': 'shimmer 15s infinite linear'
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus'],
    },
  },
  plugins: [],
};
export default config;
