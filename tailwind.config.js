/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        gold: {
          50: "#fffdf0",
          100: "#fefab8",
          200: "#fdf380",
          300: "#fbe848",
          400: "#f8d71d",
          500: "#d4af37", // Metallic Champagne Gold
          600: "#aa861d",
          700: "#806012",
          800: "#5d440d",
          900: "#3d2b07",
        },
        champagne: {
          50: "#faf8f5",
          100: "#f4ede3",
          200: "#e7d9c6",
          300: "#d8be9f",
          400: "#c7a079",
          500: "#b88758",
          600: "#a26e45",
          700: "#835338",
          800: "#6d4432",
          900: "#5a3a2c",
        },
        rose: {
          50: "#fff5f6",
          100: "#ffe6e9",
          200: "#fccad1",
          300: "#f89eab",
          400: "#f3667c",
          500: "#e63853",
          600: "#d11f3d",
          700: "#b0132f",
          800: "#93132b",
          900: "#7c1528",
        },
        noir: {
          800: "#18181b",
          900: "#0f0f11",
          950: "#09090b",
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shimmer": "shimmer 2s infinite",
        "pulse-glow": "pulseGlow 3s infinite ease-in-out",
      },
    },
  },
  plugins: [],
}
