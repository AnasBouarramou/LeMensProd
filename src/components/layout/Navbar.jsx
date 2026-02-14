// src/components/layout/Navbar.jsx
import { useState } from "react";
import { motion, useTransform, AnimatePresence } from "framer-motion";

const Navbar = ({ progress }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Apparition initiale du logo
  const logoOpacity = useTransform(progress, [0.15, 0.3], [0, 1]);
  const logoY = useTransform(progress, [0.15, 0.3], [20, 0]);
  const logoScale = useTransform(progress, [0.15, 0.3], [1.5, 1]);

  // CORRECTION 1 : Le texte et le logo passent en sombre TRÈS TÔT (dès 5% de scroll)
  const navTextColor = useTransform(
    progress,
    [0.05, 0.15],
    ["#ffffff", "#171717"],
  );
  const navIconBg = useTransform(
    progress,
    [0.05, 0.15],
    ["#ffffff", "#171717"],
  );

  // CORRECTION 2 : Le fond solide apparaît plus tôt (dès 70% de scroll)
  const backdropOpacity = useTransform(progress, [0.7, 0.8], [0, 1]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: "l'agence", id: "about" },
    { label: "savoir faire", id: "savoir-faire" },
    { label: "Projet", id: "projects" },
  ];

  // Variants pour le menu mobile
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // Variants pour les liens du menu
  const linkVariants = {
    closed: {
      opacity: 0,
      x: 50,
    },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-[100] px-4 md:px-8 py-4 md:py-6 flex justify-between items-center pointer-events-none"
        style={{ color: navTextColor }}
      >
        {/* Le fond de la navbar qui devient opaque au scroll */}
        <motion.div
          style={{ opacity: backdropOpacity }}
          className="absolute inset-0 bg-neutral-100/95 backdrop-blur-md border-b border-neutral-200 pointer-events-auto"
        />

        {/* Logo */}
        <motion.div
          style={{
            opacity: logoOpacity,
            y: logoY,
            scale: logoScale,
            transformOrigin: "left center",
          }}
          className="flex items-center gap-2 cursor-pointer relative z-10 pointer-events-auto"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsMenuOpen(false);
          }}
        >
          <motion.div
            style={{ backgroundColor: navIconBg }}
            className="w-6 h-6 md:w-8 md:h-8 rounded-full"
          />
          <span className="font-bold tracking-tighter text-lg md:text-xl">LEMEN'S PROD</span>
        </motion.div>

        {/* Liens Desktop - cachés sur mobile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hidden md:flex gap-8 items-center relative z-10 pointer-events-auto"
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="uppercase text-xs font-bold tracking-widest hover:opacity-50 transition-opacity bg-transparent border-none cursor-pointer"
              style={{ color: "inherit" }}
            >
              {item.label}
            </button>
          ))}
        </motion.div>

        {/* Bouton Hamburger - visible uniquement sur mobile */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-[110] w-10 h-10 flex flex-col justify-center items-center pointer-events-auto bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 0 : -4,
              backgroundColor: isMenuOpen ? "#171717" : undefined,
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ backgroundColor: navIconBg }}
            className="block w-6 h-0.5 absolute origin-center"
          />
          <motion.span
            animate={{
              opacity: isMenuOpen ? 0 : 1,
              scaleX: isMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
            style={{ backgroundColor: navIconBg }}
            className="block w-6 h-0.5 absolute origin-center"
          />
          <motion.span
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? 0 : 4,
              backgroundColor: isMenuOpen ? "#171717" : undefined,
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ backgroundColor: navIconBg }}
            className="block w-6 h-0.5 absolute origin-center"
          />
        </motion.button>
      </motion.nav>

      {/* Menu Mobile - Panneau latéral */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay sombre */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-[90] backdrop-blur-sm"
            />

            {/* Panneau du menu */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden fixed top-0 right-0 w-4/5 max-w-sm h-full bg-neutral-100 z-[95] shadow-2xl"
            >
              {/* Contenu du menu */}
              <div className="flex flex-col justify-center h-full px-8 py-20">
                <nav className="flex flex-col gap-6">
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.label}
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      onClick={() => scrollToSection(item.id)}
                      className="uppercase text-2xl font-bold tracking-widest text-neutral-900 hover:text-neutral-500 transition-colors text-left bg-transparent border-none cursor-pointer py-2"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                {/* Élément décoratif en bas du menu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="absolute bottom-8 left-8 right-8"
                >
                  <div className="h-px bg-neutral-300 mb-4" />
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">
                    LEMEN'S PROD
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
