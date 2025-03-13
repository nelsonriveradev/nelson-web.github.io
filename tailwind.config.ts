import type { Config } from "tailwindcss";

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
  plugins: [require("@tailwindcss/typography")],
};

export default config;
