import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'spartan': ["var(--font-spartan)", 'sans-serif'],
        'nunito': ["var(--font-nunito)", 'sans-serif'],
        'poppins': ["var(--font-poppins)", 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor:{
        'primary':'#071952',
        'secondary':'#E6B345',
        'tertiary':'#3059EE',
      },
    },
  },
  plugins: [],
} satisfies Config;
