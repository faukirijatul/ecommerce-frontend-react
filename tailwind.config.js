/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        check: "check 0.5s ease-in-out",
        xmark: "xmark 0.5s ease-in-out",
        pulseRing: "pulseRing 1.5s infinite ease-in-out",
      },
    },
  },
  plugins: [],
}

