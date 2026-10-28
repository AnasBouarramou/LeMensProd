import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "../../hooks/useIsMobile";

const VimeoModal = ({ isOpen, onClose, videoId, videoHash }) => {
  const isMobile = useIsMobile();

  // Bloque le scroll du body quand la modale est ouverte
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

  // Fermeture via Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Sur mobile : pas d'autoplay (iOS bloque le son sur les iframes autoplaying)
  // L'utilisateur tape le bouton play natif Vimeo → son garanti
  const src = `https://player.vimeo.com/video/${videoId}?${
    videoHash ? `h=${videoHash}&` : ""
  }${isMobile ? "" : "autoplay=1&"}title=0&byline=0&portrait=0`;

  const CloseButton = ({ className }) => (
    <button
      onClick={(e) => { e.stopPropagation(); onClose(); }}
      aria-label="Fermer la vidéo"
      className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && videoId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Bouton fermeture desktop — absolu en haut à droite */}
          <CloseButton className="hidden md:flex absolute top-28 right-8 z-[1000]" />

          {/* Conteneur vidéo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mx-4 md:mx-auto md:w-full md:max-w-6xl aspect-[9/16] w-[85vw] max-h-[72dvh] md:max-h-none md:aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={src}
              className="absolute inset-0 w-full h-full rounded-xl"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Vimeo video"
            />
          </motion.div>

          {/* Bouton fermeture mobile — sous la vidéo, toujours visible */}
          <CloseButton className="md:hidden mt-6 z-[1000]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VimeoModal;
