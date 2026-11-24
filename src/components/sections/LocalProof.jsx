// src/components/sections/LocalProof.jsx
// Preuves pour la sous-page offres : rendu (short + cas clients), logos, avis.
import { useState } from "react";
import { motion } from "framer-motion";
import { LOGOS, LOCAL_PROOF } from "../../config/content";
import VimeoModal from "../common/VimeoModal";
import { staggerContainer, fadeInUp } from "../../config/animations";

const Heading = ({ children, sub }) => (
  <motion.div
    className="flex flex-col items-center text-center mb-8 md:mb-12"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
    variants={staggerContainer}
  >
    <motion.h2
      className="font-montserrat font-light text-xl md:text-3xl uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-900"
      variants={fadeInUp}
    >
      {children}
    </motion.h2>
    <motion.div
      className="w-16 h-[2px] bg-neutral-900 mt-4"
      variants={{
        hidden: { width: 0 },
        visible: { width: 64, transition: { duration: 1 } },
      }}
    />
    {sub && (
      <motion.p
        className="mt-5 max-w-xl text-sm md:text-base text-neutral-600 leading-relaxed"
        variants={fadeInUp}
      >
        {sub}
      </motion.p>
    )}
  </motion.div>
);

const PlayIcon = () => (
  <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-0.5" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  </span>
);

const VideoCard = ({ video, index, onOpen }) => {
  const vertical = video.format === "vertical";
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Voir la vidéo ${video.title}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * (index % 3), duration: 0.8, ease: "easeOut" }}
      className={`group relative text-left rounded-2xl md:rounded-[2rem] overflow-hidden bg-neutral-900 cursor-pointer ${
        vertical
          ? "aspect-[9/16] w-[16rem] max-w-full"
          : "aspect-video w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
      }`}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <PlayIcon />
      </span>
      <span className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col gap-1 text-white">
        <span className="text-base md:text-xl font-light tracking-tight">{video.title}</span>
        {video.subtitle && (
          <span className="text-xs md:text-sm text-neutral-300 leading-snug">{video.subtitle}</span>
        )}
      </span>
    </motion.button>
  );
};

const LocalProof = ({ onSelectOffer }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const videos = LOCAL_PROOF.videos;
  const reviews = LOCAL_PROOF.reviews;

  return (
    <section className="bg-white py-16 md:py-28 relative z-50">
      <div className="mx-auto px-4 md:px-0" style={{ width: "min(calc(82vw + 3rem), 100%)" }}>
        {/* Rendu : vidéos Vimeo par catégorie (masqué tant qu'il n'y en a pas) */}
        {videos.length > 0 && (
          <>
            <Heading sub="Du tournage sur place à la vidéo prête à publier : voici ce que nos clients reçoivent.">
              Ce que ça donne
            </Heading>
            <div className="flex flex-col gap-12 md:gap-16">
              {LOCAL_PROOF.categories.map((category) => {
                const items = videos.filter((v) => v.category === category);
                if (items.length === 0) return null;
                return (
                  <div key={category}>
                    <h3 className="text-center text-xs md:text-sm font-bold uppercase tracking-widest text-neutral-500 mb-5 md:mb-8">
                      {category}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-start">
                      {items.map((video, i) => (
                        <VideoCard
                          key={video.vimeoId}
                          video={video}
                          index={i}
                          onOpen={() => setActiveVideo(video)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Logos clients */}
        <div className={videos.length > 0 ? "mt-16 md:mt-24" : ""}>
          <Heading>Ils nous font confiance</Heading>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
            {LOGOS.map((logo) => (
              <li key={logo.name} className="flex items-center justify-center w-28 md:w-36 h-14 md:h-16">
                <img
                  src={logo.url}
                  alt={logo.name}
                  className={`max-w-full max-h-full object-contain grayscale opacity-70${logo.invert ? " invert" : ""}`}
                  style={{ transform: `scale(${logo.scale || 1})` }}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Avis (masqués tant qu'il n'y en a pas de vrais) */}
        {reviews.length > 0 && (
          <div className="mt-16 md:mt-24">
            <Heading>Ils en parlent</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {reviews.map((r) => (
                <figure key={r.name} className="bg-neutral-100 rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between gap-6 min-w-0">
                  <blockquote className="text-sm md:text-base text-neutral-700 leading-relaxed">
                    « {r.quote} »
                  </blockquote>
                  <figcaption className="text-sm">
                    <span className="block font-medium text-neutral-900">{r.name}</span>
                    <span className="block text-neutral-500">{r.role}</span>
                    {r.source && <span className="block text-xs text-neutral-400 mt-1">{r.source}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* Appel à l'action final */}
        <div className="mt-16 md:mt-24 flex flex-col items-center text-center gap-5">
          <p className="text-lg md:text-2xl font-light tracking-tight text-neutral-900 max-w-xl">
            On regarde ensemble quel pack vous convient ?
          </p>
          <button
            type="button"
            onClick={() => onSelectOffer && onSelectOffer("Page offre petit format")}
            className="bg-neutral-900 text-white hover:bg-neutral-800 transition-colors duration-300 rounded-xl md:rounded-2xl px-8 py-4 font-bold uppercase tracking-widest text-[0.65rem] md:text-xs"
          >
            Réserver mon appel gratuit
          </button>
        </div>
      </div>

      <VimeoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoId={activeVideo?.vimeoId}
        videoHash={activeVideo?.vimeoHash}
        vertical={activeVideo?.format === "vertical"}
      />
    </section>
  );
};

export default LocalProof;
