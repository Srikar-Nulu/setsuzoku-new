import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: "#0066FF",
            hover: "#0052CC",
            light: "#3B82F6",
            subtle: "#EFF6FF",
            dark: "#0040A8",
          },
          green: {
            DEFAULT: "#00C853",
            hover: "#00A844",
            light: "#10B981",
            subtle: "#E8F5E9",
            dark: "#008C38",
          },
          yellow: {
            DEFAULT: "#FFB300",
            hover: "#E6A100",
            subtle: "#FFF8E1",
          },
          navy: {
            DEFAULT: "#0B192C",
            surface: "#1E293B",
            subtle: "#334155",
          },
        },
        canvas: {
          light: "#FFFFFF",
          dark: "#080C14",
        },
        surface: {
          light: "#F8FAFC",
          dark: "#0E1422",
          elevated: "#131B2E",
        },
      },
      fontFamily: {
        display: [
          "'Plus Jakarta Sans'",
          "var(--font-geist-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "sans-serif",
        ],
        sans: [
          "'DM Sans'",
          "var(--font-geist-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "sans-serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-gentle": "floatGentle 6s ease-in-out infinite",
      },
      keyframes: {
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
