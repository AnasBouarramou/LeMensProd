// src/components/sections/Portfolio.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_PROJECTS } from "../../config/content";
import VimeoModal from "../common/VimeoModal";
import { staggerContainer, fadeInUp, widthReveal } from "../../config/animations";

const PortfolioCard = ({ project, index, onOpen }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{
      delay: (index % 2) * 0.12,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    }}
    role="button"
    tabIndex={0}
    aria-label={`Voir ${project.title}`}
    onClick={onOpen}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen();
      }
    }}
    className="relative h-[50vh] md:h-[45vh] bg-neutral-900 rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer group"
    style={{ willChange: "transform" }}
  >
    {/* Miniature statique */}
    {project.thumbnail && (
      <div
        className="absolute inset-0 grayscale opacity-80 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
        style={{
          backgroundImage: `url(${project.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform, filter",
        }}
      />
    )}

    {/* Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/30 transition-all duration-500 pointer-events-none" />

    {/* Contenu bas */}
    <div className="absolute bottom-0 left-0 w-full p-4 lg:p-6 text-white z-10 flex items-end justify-between pointer-events-none">
      <div className="flex flex-col min-w-0 flex-1 mr-3">
        <p className="text-[0.6rem] lg:text-[0.65rem] uppercase tracking-widest font-medium opacity-60 mb-0.5">
          {project.category}
        </p>
        <h3 className="text-xl lg:text-2xl font-bold uppercase tracking-tight truncate">
          {project.title}
        </h3>
        <p className="text-xs lg:text-sm font-medium opacity-70 mt-0.5 lg:mt-1 italic truncate">
          {project.accroche}
        </p>

        {/* Livré + Résultat — révélés au survol */}
        <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
          <div className="border-t border-white/15 mt-3 pt-2.5 space-y-1.5">
            <div className="flex gap-2.5 items-baseline">
              <span className="text-[0.5rem] uppercase tracking-widest opacity-40 shrink-0">Livré</span>
              <span className="text-[0.6rem] lg:text-[0.65rem] opacity-75 leading-tight line-clamp-2">{project.livre}</span>
            </div>
            {project.resultat && (
              <div className="flex gap-2.5 items-baseline">
                <span className="text-[0.5rem] uppercase tracking-widest opacity-40 shrink-0">Résultat</span>
                <span className="text-[0.6rem] lg:text-[0.65rem] opacity-75 leading-tight">{project.resultat}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-4 h-4 lg:w-5 lg:h-5 shrink-0 self-end opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </div>
  </motion.div>
);

const Portfolio = () => {
  const [activeVideo, setActiveVideo] = useState(null); // { id, hash? }

  return (
    <section className="bg-neutral-100 py-16 md:py-32 relative z-50">
      <div
        className="mx-auto px-4 md:px-0"
        style={{ width: "min(calc(82vw + 3rem), 100%)" }}
      >
        {/* Titre */}
        <motion.div
          className="flex flex-col items-center mb-12 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
        >
          <motion.h2
            className="font-montserrat font-light text-2xl md:text-4xl text-center uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-800"
            variants={fadeInUp}
          >
            Nos Réalisations
          </motion.h2>
          <motion.div
            className="h-[2px] bg-neutral-900 mt-4 md:mt-6"
            variants={widthReveal}
          />
        </motion.div>

        {/* Grille 2×2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setActiveVideo({ id: project.vimeoId, hash: project.vimeoHash })}
            />
          ))}
        </div>
      </div>

      <VimeoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoId={activeVideo?.id}
        videoHash={activeVideo?.hash}
      />
    </section>
  );
};

export default Portfolio;
