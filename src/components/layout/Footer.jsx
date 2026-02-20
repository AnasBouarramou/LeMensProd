// src/components/layout/Footer.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  serviceStagger,
  serviceFadeInUp,
  lineReveal,
} from "../../config/animations";
import LegalModal from "../common/LegalModal";

const Footer = ({ onBack, setActivePage }) => {
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const scrollToSection = (id) => {
    let targetId = id;
    if (id === "savoir-faire" && window.innerWidth >= 768) {
      targetId = "savoir-faire-desktop";
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const NAV_LINKS = [
    { label: "L'agence", action: () => scrollToSection("about") },
    { label: "Savoir Faire", action: () => scrollToSection("savoir-faire") },
    { label: "Projets", action: () => scrollToSection("projects") },
    { label: "Contact", action: () => scrollToSection("contact") },
  ];

  const SERVICE_LINKS = [
    { label: "Snack Content", action: () => setActivePage("snack") },
    { label: "Production", action: () => setActivePage("production") },
    { label: "Immobilier", action: () => setActivePage("immo") },
    { label: "Live", action: () => setActivePage("live") },
  ];
  return (
    <footer className="bg-neutral-900 text-white relative z-50 border-t border-neutral-800">
      <motion.div
        className="container mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-8 md:pb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={serviceStagger}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          {/* COLONNE 1 : Informations de la marque */}
          <motion.div
            className="col-span-2 md:col-span-1 flex flex-col gap-4 md:gap-5"
            variants={serviceFadeInUp}
          >
            <button
              className="flex items-center gap-2 md:gap-3 cursor-pointer"
              onClick={onBack}
              aria-label="Retour en haut de page — Lemen's Prod"
            >
              <span className="tracking-tighter text-xl md:text-2xl">
                <span className="font-yellowtail">lemen's</span>
                {" "}
                <span className="font-poppins font-semibold">Prod.</span>
              </span>
            </button>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              Agence de production audiovisuelle à Paris. Snack content, vidéo
              immobilière drone FPV, films de marque et captation live.
            </p>
            <div className="flex gap-3 md:gap-4 mt-1 md:mt-2">
              {/* Icône Instagram */}
              <motion.a
                href="https://www.instagram.com/lemensprod?igsh=MWoxdnNhNnRrMG82OQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez Lemen's Prod sur Instagram"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="md:w-[18px] md:h-[18px]"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </motion.a>
              {/* Icône TikTok */}
              <motion.a
                href="https://www.tiktok.com/@lemensprod?_r=1&_t=ZN-93v8fZd8btW"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez Lemen's Prod sur TikTok"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="md:w-4 md:h-4"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.19 8.19 0 0 0 4.76 1.52V6.79a4.83 4.83 0 0 1-1-.1z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* COLONNE 2 : Navigation */}
          <motion.div className="flex flex-col gap-3 md:gap-4" variants={serviceFadeInUp}>
            <h4 className="font-bold text-[0.65rem] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-white mb-1 md:mb-2">
              Navigation
            </h4>
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="text-neutral-400 text-sm hover:text-white transition-colors duration-300 font-light text-left bg-transparent border-none cursor-pointer p-0"
              >
                {link.label}
              </button>
            ))}
          </motion.div>

          {/* COLONNE 3 : Services */}
          <motion.div className="flex flex-col gap-3 md:gap-4" variants={serviceFadeInUp}>
            <h4 className="font-bold text-[0.65rem] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-white mb-1 md:mb-2">
              Services
            </h4>
            {SERVICE_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="text-neutral-400 text-sm hover:text-white transition-colors duration-300 font-light text-left bg-transparent border-none cursor-pointer p-0"
              >
                {link.label}
              </button>
            ))}
          </motion.div>

          {/* COLONNE 4 : Contact */}
          <motion.div className="flex flex-col gap-3 md:gap-4" variants={serviceFadeInUp}>
            <h4 className="font-bold text-[0.65rem] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-white mb-1 md:mb-2">
              Contact
            </h4>
            <span className="text-neutral-400 text-sm font-light break-all md:break-normal">
              contact@lemensprod.com
            </span>
            <span className="text-neutral-400 text-sm font-light">
              Paris, France
            </span>
          </motion.div>
        </div>

        {/* Ligne de séparation */}
        <motion.div
          className="w-full h-px bg-neutral-800 mb-6 md:mb-8"
          variants={lineReveal}
          style={{ originX: 0 }}
        />

        {/* Mentions Légales et Copyright */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          variants={serviceFadeInUp}
        >
          <p className="text-neutral-500 text-[0.65rem] md:text-xs font-light tracking-wide text-center md:text-left">
            ©2026 – Lemen's Prod – Tous droits réservés
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {["Mentions légales", "Confidentialité", "CGV"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveLegalModal(item)}
                className="text-neutral-500 text-[0.65rem] md:text-xs font-light tracking-wide hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer p-0"
              >
                {item}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <LegalModal
        activeModal={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />
    </footer>
  );
};

export default Footer;
