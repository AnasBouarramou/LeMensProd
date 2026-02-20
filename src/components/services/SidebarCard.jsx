// src/components/services/SidebarCard.jsx
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import VideoBackground from "../common/VideoBackground";
import VimeoModal from "../common/VimeoModal";

const SidebarCard = ({
  videoSrc,
  poster,
  bgColor,
  title,
  subtitle,
  heightClass,
  onClick,
  vimeoId = "",
}) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isVimeoOpen, setIsVimeoOpen] = useState(false);

  // Autoplay au scroll sur mobile (simule le hover)
  const isInView = useInView(cardRef, { margin: "-20% 0px" });

  useEffect(() => {
    if (isVimeoOpen) return; // Ne pas relancer si la modale est ouverte
    if (isInView) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isInView, isVimeoOpen]);

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
    if (e.target.closest("[data-fullscreen]")) return;
    onClick?.();
  };

  const handleOpenVimeo = (e) => {
    e.stopPropagation();
    e.preventDefault();
    videoRef.current?.pause();
    setIsVimeoOpen(true);
  };

  const handleCloseVimeo = () => {
    setIsVimeoOpen(false);
    videoRef.current?.play();
  };

  const handleMouseEnter = () => {
    if (!isVimeoOpen) videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (!isVimeoOpen) videoRef.current?.pause();
  };

  return (
    <>
      <motion.div
        ref={cardRef}
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
          <VideoBackground ref={videoRef} videoSrc={videoSrc} poster={poster} playOnHover />
        </div>

        {/* Bouton Vimeo HD — visible au hover */}
        <button
          data-fullscreen
          onClick={handleOpenVimeo}
          aria-label={`Voir la vidéo ${title} en HD`}
          className="absolute bottom-3 right-3 lg:bottom-4 lg:right-4 z-20 w-9 h-9 lg:w-10 lg:h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-70 hover:!opacity-100 transition-all cursor-pointer"
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
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        </button>

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

      <VimeoModal
        isOpen={isVimeoOpen}
        onClose={handleCloseVimeo}
        videoId={vimeoId}
      />
    </>
  );
};

export default SidebarCard;
