// src/config/animations.js

// Courbe d'accélération personnalisée (easeOutQuint-like)
export const CUSTOM_EASE = [0.25, 0.1, 0.25, 1];

// Animation de base : apparition avec slide vers le haut
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 40,
    willChange: "opacity, transform"
  },
  visible: {
    opacity: 1,
    y: 0,
    willChange: "auto",
    transition: {
      duration: 0.8,
      ease: CUSTOM_EASE,
    },
  },
};

// Container avec effet de stagger sur les enfants
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Animation de zoom
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    willChange: "opacity, transform"
  },
  visible: {
    opacity: 1,
    scale: 1,
    willChange: "auto",
    transition: {
      duration: 0.6,
      ease: CUSTOM_EASE
    },
  },
};

// Animation pour les pages de services
export const serviceFadeInUp = {
  hidden: {
    opacity: 0,
    y: 40,
    willChange: "opacity, transform"
  },
  visible: {
    opacity: 1,
    y: 0,
    willChange: "auto",
    transition: {
      duration: 0.8,
      ease: CUSTOM_EASE
    },
  },
};

// Stagger pour les services
export const serviceStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    },
  },
};

// Animation de révélation de ligne horizontale
export const lineReveal = {
  hidden: {
    scaleX: 0,
    willChange: "transform"
  },
  visible: {
    scaleX: 1,
    willChange: "auto",
    transition: {
      duration: 1,
      ease: "circOut"
    }
  },
};

// Animation de révélation de largeur
export const widthReveal = {
  hidden: { width: 0 },
  visible: {
    width: 96,
    transition: {
      duration: 0.8,
      ease: "circOut"
    }
  },
};

// Animation rapide pour éléments interactifs
export const quickFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};
