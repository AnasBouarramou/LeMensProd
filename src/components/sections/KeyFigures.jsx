// src/components/sections/KeyFigures.jsx
import { motion } from "framer-motion";
import AnimatedNumber from "../common/AnimatedNumber";
import {
  staggerContainer,
  fadeInUp,
  lineReveal,
} from "../../config/animations";

const KeyFigures = () => {
  const LANDING_STATS = [
    { value: 98, suffix: "%", label: "Satisfaction Client" },
    { value: 50, suffix: "+", label: "Projets Livrés" },
    { value: 2, suffix: "M+", label: "Vues Cumulées" },
    { value: 24, suffix: "h", label: "Réactivité Moyenne" },
  ];

  return (
    <motion.section
      className="bg-neutral-100 py-16 md:pb-32 md:pt-0 relative z-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerContainer}
    >
      <div className="mx-auto px-4 md:px-0" style={{ width: "min(calc(82vw + 3rem), 100%)" }}>
        {/* Ligne de séparation */}
        <motion.div
          className="w-full h-px bg-neutral-200 mb-12 md:mb-20"
          variants={lineReveal}
          style={{ originX: 0 }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* COLONNE GAUCHE : Titre */}
          <div className="lg:col-span-4">
            <motion.h2
              className="text-3xl md:text-5xl font-serif italic text-neutral-900 leading-[1.1]"
              variants={fadeInUp}
            >
              Impact,
              <br />
              Volume,
              <br />
              <span className="not-italic font-sans font-bold text-neutral-400">
                & Performance
              </span>
            </motion.h2>
          </div>

          {/* COLONNE DROITE : Contenu */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full">
            <motion.p
              className="text-neutral-600 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-10 md:mb-16"
              variants={fadeInUp}
            >
              Conçus pour la viralité, nos contenus réduisent vos coûts
              d'acquisition et transforment vos vues en résultats concrets. Nous
              allions l'agilité technique à une vision stratégique pour les
              marques de toutes tailles.
            </motion.p>

            {/* Grille des Stats */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-0 md:gap-y-12 mb-8 md:mb-12">
              {LANDING_STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  className={`flex flex-col items-start text-left ${
                    i > 0 ? "md:border-l md:border-neutral-300 md:pl-6" : ""
                  } ${i % 2 !== 0 ? "border-l border-neutral-300 pl-4 md:pl-6" : "pl-0"}`}
                  variants={fadeInUp}
                >
                  <span className="text-3xl md:text-5xl font-bold text-neutral-900 mb-1 md:mb-2 tracking-tighter">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-[0.65rem] md:text-xs text-neutral-500 font-medium uppercase tracking-wide">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default KeyFigures;
