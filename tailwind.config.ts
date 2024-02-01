import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        MAIN_COLOR: "#28CC9E",
        DEEP_MAIN: "#27B58D",
        LINE_BORDER: "#D1D1D1",
        DARK_GRAY: "#4B4B4B",
        POINT_BLUE: "#7991FF",
        POINT_RED: "#FF7171",
        TEXT_BLACK: "#2B2B2B",
      }
    },
  },
  plugins: [],
}
export default config
