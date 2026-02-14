// src/hooks/useScrollProgress.js
import { useScroll, useSpring } from "framer-motion";

export const useScrollProgress = (scrollOptions = {}, springOptions = {}) => {
  // 1. Récupération de la progression du scroll
  const { scrollYProgress } = useScroll(scrollOptions);

  // 2. Configuration par défaut du lissage (type "Spring")
  const defaultSpringConfig = {
    mass: 0.5,
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
    ...springOptions, // Permet d'écraser la config par défaut si besoin
  };

  // 3. Application du lissage
  const smoothProgress = useSpring(scrollYProgress, defaultSpringConfig);

  // On retourne la version lissée (celle qui sert aux animations)
  return smoothProgress;
};
