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
        "loading-gradient": "linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(0,0,0,0.65) 100%);",
        "loader-gradient" : "linear-gradient(to top, rgba(255,255,255,0) 0%,rgba(0,0,0,0.65) 100%);",
        'overlay': 'rgba(0, 0, 0, 0.5)',
      },
      colors: {
        MAIN_COLOR: "#28CC9E",
        DEEP_MAIN: "#27B58D",
        LINE_BORDER: "#D1D1D1",
        DARK_GRAY: "#4B4B4B",
        POINT_BLUE: "#7991FF",
        POINT_RED: "#FF7171",
        TEXT_BLACK: "#2B2B2B",
      },
      boxShadow: {
        "custom-top" : " -5px -5px 20px 2px rgba(0,0,0,0.1)",
      },
      keyframes: {
        slideInAndOut: {
          '0%, 100%': { opacity: "0", transform: 'translateX(100%)' },
          '10%, 90%': { opacity: "1", transform: 'translateX(0)' },
        }
      },
      animation: {
        'slide-in-and-out': 'slideInAndOut 4s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
