/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        editor: {
          primary: '#3498db',
          secondary: '#2c3e50',
          border: '#e9ecef',
          hover: '#f8f9fa',
        },
      },
      spacing: {
        'editor': '400px',
      },
      boxShadow: {
        'editor': '0 10px 30px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
} 