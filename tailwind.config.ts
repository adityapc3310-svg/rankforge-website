import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050507",
          900: "#08080c",
          850: "#0b0b12",
          800: "#101018",
          700: "#16161f",
          600: "#1d1d29",
          500: "#262635",
        },
        iris: {
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        cyan: {
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
        },
        amber: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
        },
        text: {
          DEFAULT: "#ECECF1",
          muted: "#A0A0B2",
          dim: "#6B6B80",
          faint: "#45455A",
        },
        line: "rgba(255,255,255,0.08)",
        "line-strong": "rgba(255,255,255,0.14)",
        // ── Stitch design tokens (RankForge landing) ──
        surface: "#131318",
        "surface-container": "#1f1f25",
        "surface-container-lowest": "#0e0e13",
        "on-surface": "#e4e1e9",
        "on-surface-variant": "#c9c4d8",
        primary: "#cabeff",
        "primary-container": "#947dff",
        "on-primary-container": "#2a0088",
        tertiary: "#f1bf5b",
        background: "#050508",
        "on-background": "#e4e1e9",
        outline: "#938ea1",
        "outline-variant": "#48454e",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        // Stitch type roles
        "display-xl": ["var(--font-display)", "system-ui", "sans-serif"],
        "display-xl-mobile": ["var(--font-display)", "system-ui", "sans-serif"],
        "headline-lg": ["var(--font-display)", "system-ui", "sans-serif"],
        "headline-md": ["var(--font-display)", "system-ui", "sans-serif"],
        "label-sm": ["var(--font-display)", "system-ui", "sans-serif"],
        "body-lg": ["var(--font-sans)", "system-ui", "sans-serif"],
        "body-md": ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["2.75rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-md": ["4rem", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-lg": ["5.5rem", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        // Stitch sizes (display-xl overridden to the Stitch hero size)
        "display-xl": ["72px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "800" }],
        "display-xl-mobile": ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-lg": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["32px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-sm": ["14px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }],
      },
      maxWidth: {
        container: "1200px",
        prose: "680px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, #050507 78%), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 64px), repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 64px)",
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(139,92,246,0.5)",
        "glow-cyan": "0 0 80px -20px rgba(56,189,248,0.45)",
        card: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 20px 50px -20px rgba(0,0,0,0.8)",
        "card-hover": "0 1px 0 0 rgba(255,255,255,0.12) inset, 0 30px 70px -25px rgba(124,58,237,0.4)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(40px,-30px) scale(1.08)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-50px,40px) scale(1.12)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "float-slow": "float-slow 18s ease-in-out infinite",
        "float-slower": "float-slower 24s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "pulse-ring": "pulse-ring 3s ease-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
}

export default config
