/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        yellowtail: ["Yellowtail", "cursive"],
      },
      // 1. On définit les étapes de l'animation (Keyframes)
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // On déplace de 50% car on a doublé le contenu
        },
      },
      // 2. On crée le nom de classe utilisable (animate-scroll)
      animation: {
        scroll: "scroll 20s linear infinite", // 20s pour faire un tour, vitesse constante, à l'infini
      },
    },
  },
  plugins: [],
};
