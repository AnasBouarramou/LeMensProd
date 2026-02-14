// src/components/services/SidebarCard.jsx
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoBackground from "../common/VideoBackground";

const SidebarCard = ({
  videoSrc,
  bgColor,
  title,
  subtitle,
  heightClass,
  onClick,
  isUnmuted = false,
  onToggleAudio,
}) => {
  const videoRef = useRef(null);

  // Variantes d'animation optimisées avec GPU
  const ctaContainerVariants = {
    initial: { opacity: 0.6 },
    hover: { opacity: 1, transition: { duration: 0.25 } },
  };

  const ctaLabelVariants = {
    initial: { opacity: 0, x: -8 },
    hover: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, delay: 0.05 },
    },
  };

  const ctaArrowVariants = {
    initial: { x: 0, y: 0 },
    hover: {
      x: 2,
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 15 },
    },
  };

  const handleClick = (e) => {
    // Si on clique sur l'icone audio, on ne navigue pas
    if (e.target.closest("[data-audio-toggle]")) return;
    onClick?.();
  };

  const handleAudioToggle = (e) => {
    e.stopPropagation();
    onToggleAudio?.();
  };

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Voir le service ${title} — ${subtitle}`}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(); } }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`w-full ${heightClass} ${bgColor} rounded-2xl lg:rounded-[2rem] overflow-hidden relative group cursor-pointer`}
      initial="initial"
      whileHover="hover"
      style={{ willChange: "transform" }}
    >
      {/* Container vidéo avec effet de zoom et niveaux de gris optimisé */}
      <div
        className="absolute inset-0 w-full h-full grayscale opacity-90 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
        style={{ willChange: "transform, filter" }}
      >
        <VideoBackground ref={videoRef} videoSrc={videoSrc} isMuted={!isUnmuted} playOnHover />
      </div>

      {/* Indicateur audio animé */}
      <AnimatePresence>
        {isUnmuted && (
          <motion.button
            data-audio-toggle
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={handleAudioToggle}
            aria-label={`Couper le son de la vidéo ${title}`}
            className="absolute top-3 right-3 lg:top-4 lg:right-4 z-20 w-10 h-10 lg:w-11 lg:h-11 min-w-[2.75rem] min-h-[2.75rem] bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors cursor-pointer"
          >
            {/* Barres audio animées */}
            <div className="flex items-end gap-[2px] h-3.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-[2.5px] bg-white rounded-full"
                  animate={{
                    height: ["40%", "100%", "60%", "90%", "40%"],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bouton mute quand le son est coupé (visible au hover) */}
      {!isUnmuted && onToggleAudio && (
        <button
          data-audio-toggle
          onClick={handleAudioToggle}
          aria-label={`Activer le son de la vidéo ${title}`}
          className="absolute top-3 right-3 lg:top-4 lg:right-4 z-20 w-10 h-10 lg:w-11 lg:h-11 min-w-[2.75rem] min-h-[2.75rem] bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-70 hover:!opacity-100 transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-3.72a.75.75 0 011.28.53v14.88a.75.75 0 01-1.28.53l-4.72-3.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        </button>
      )}

      {/* Overlay dégradé pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Contenu de la carte */}
      <div className="absolute bottom-0 left-0 w-full p-4 lg:p-6 text-white z-10 flex items-end justify-between pointer-events-none">
        <div className="flex flex-col min-w-0 flex-1 mr-3">
          <h3 className="text-xl lg:text-2xl font-bold uppercase tracking-tight truncate">
            {title}
          </h3>
          <p className="text-xs lg:text-sm font-medium opacity-80 mt-0.5 lg:mt-1 truncate">
            {subtitle}
          </p>
        </div>

        {/* Bouton d'action animé */}
        <motion.div
          variants={ctaContainerVariants}
          className="flex items-center gap-1.5 lg:gap-2 shrink-0"
        >
          <motion.span
            variants={ctaLabelVariants}
            className="text-[0.6rem] lg:text-[0.65rem] uppercase tracking-widest font-bold hidden group-hover:block"
          >
            Ouvrir
          </motion.span>
          <motion.svg
            variants={ctaArrowVariants}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 lg:w-5 lg:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </motion.svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SidebarCard;
