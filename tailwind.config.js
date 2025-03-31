/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // IMPORTANT:  Specify the files to scan for Tailwind classes
  theme: {
    extend: {
      colors: {
        "custom-green": "#025048", // Example custom color
      },
    },
  },
  plugins: [], // Add any Tailwind CSS plugins here
};
