import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VimeoModal = ({ isOpen, onClose, videoId }) => {
  const containerRef = useRef(null);
  // Bloque le scroll du body ET des conteneurs scrollables quand la modale est ouverte
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    const prevent = (e) => e.preventDefault();
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
    };
  }, [isOpen]);

  // Plein écran automatique à l'ouverture
  useEffect(() => {
    if (!isOpen) return;
    const el = containerRef.current;
    if (!el) return;
    (el.requestFullscreen?.() ?? el.webkitRequestFullscreen?.())?.catch?.(() => {});
    return () => {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        document.exitFullscreen?.().catch(() => {});
      }
    };
  }, [isOpen]);

  // Fermeture via Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && videoId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          ref={containerRef}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-sm md:pt-48"
          onClick={onClose}
        >
          {/* Bouton fermeture */}
          <button
            onClick={onClose}
            aria-label="Fermer la vidéo"
            className="absolute top-4 right-4 md:top-28 md:right-8 z-[1000] w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Conteneur vidéo : portrait sur mobile, 16:9 sur desktop */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mx-4 md:mx-auto md:w-full md:max-w-6xl aspect-[9/16] w-[85vw] max-h-[85dvh] md:aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`}
              className="absolute inset-0 w-full h-full rounded-xl"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Vimeo video"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VimeoModal;
