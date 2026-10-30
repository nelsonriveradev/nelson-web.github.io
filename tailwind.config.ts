import type { Config } from "tailwindcss";
// Tailwind CSS v4 reads the theme from CSS (`app/globals.css`). This file is
// kept only for the legacy JS plugin declaration used by the typography plugin.
// @ts-expect-error -- @tailwindcss/typography ships no type declarations
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "--animate-bounce": "bounce 10s ease-in-out infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(-15px)" },
          "50%": { transform: "translateY(5px)" },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
