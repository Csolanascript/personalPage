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
        azure: {
          DEFAULT: "#0078d4",
          50:  "#e6f2fb",
          100: "#b3d8f5",
          200: "#80beed",
          300: "#4da4e6",
          400: "#1a8ade",
          500: "#0078d4",
          600: "#0062ad",
          700: "#004d88",
          800: "#003762",
          900: "#00213d",
        },
        "pure-black": "#000000",
        "surface":    "#0a0a0a",
        "surface-2":  "#111111",
        "surface-3":  "#1a1a1a",
        "border":     "#1f1f1f",
        "border-azure": "#0078d420",
        "muted":      "#6b7280",
        "dimmed":     "#9ca3af",
      },
      fontFamily: {
        heading: ["Lexend", "sans-serif"],
        body:    ["Source Sans 3", "sans-serif"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        azure:    "0 0 0 1px #0078d420, 0 4px 20px rgba(0,120,212,0.12)",
        "azure-lg": "0 0 0 1px #0078d440, 0 8px 40px rgba(0,120,212,0.20)",
        glow:     "0 0 40px rgba(0,120,212,0.15)",
      },
      animation: {
        "fade-up":   "fadeUp 0.6s ease both",
        "fade-in":   "fadeIn 0.4s ease both",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "bar-fill":  "barFill 1.4s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":       { opacity: "0.4", transform: "scale(0.8)" },
        },
        barFill: {
          "0%":   { width: "0%" },
          "100%": { width: "var(--bar-width)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
