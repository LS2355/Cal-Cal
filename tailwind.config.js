/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        "color-background" : "#212121",
        "color-background-darker" : "#121212",
        "color-secondary" : "#535353",
        "color-trim" : "#1db954",
        "color-text" : "white",
        "color-subtext" : "#b3b3b3",
        "nav-grey" : "#2c2c2c",
        "nav" : "#1c1c1c",
        "nav-cardbg" : '#191919',
      }



    },
  },
  plugins: [],
}

