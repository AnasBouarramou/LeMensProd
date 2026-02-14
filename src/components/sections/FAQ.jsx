// src/components/sections/FAQ.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA } from "../../config/content";
import {
  staggerContainer,
  fadeInUp,
  lineReveal,
} from "../../config/animations";

// Sous-composant pour un élément de l'accordéon
const FAQItem = ({ faq, index, isOpen, toggleOpen }) => {
  return (
    <motion.div
      className="border-b border-neutral-300 overflow-hidden"
      variants={fadeInUp}
    >
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-label={`Question : ${faq.question}`}
      >
        <span
          className={`text-lg md:text-xl font-medium transition-colors duration-300 ${
            isOpen
              ? "text-neutral-900"
              : "text-neutral-500 group-hover:text-neutral-900"
          }`}
        >
          <span className="text-xs font-bold tracking-widest mr-4 opacity-50">
            0{index + 1}
          </span>
          {faq.question}
        </span>
        <span className="ml-4 flex-shrink-0">
          <motion.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${isOpen ? "text-neutral-900" : "text-neutral-400 group-hover:text-neutral-900"}`}
          >
            {/* Une icône "Plus" qui tourne en "Croix" quand on l'ouvre */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </motion.svg>
        </span>
      </button>

      {/* Animation d'ouverture/fermeture du texte */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="pb-8 text-neutral-500 font-light leading-relaxed pr-8 md:pr-16 pl-9">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Composant Principal FAQ
const FAQ = () => {
  // Gère quel accordéon est ouvert (le premier l'est par défaut)
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-neutral-100 py-16 md:py-32 relative z-50" id="faq">
      <div
        className="mx-auto px-4 md:px-0"
        style={{ width: "min(calc(82vw + 3rem), 100%)" }}
      >
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* COLONNE GAUCHE : Titre */}
          <div className="lg:col-span-4 flex flex-col">
            <motion.h2
              className="font-montserrat font-light text-xl md:text-3xl uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-900"
              variants={fadeInUp}
            >
              Questions <br className="hidden md:block" /> Fréquentes
            </motion.h2>
            <motion.div
              className="w-24 h-[2px] bg-neutral-900 mt-6 mb-8"
              variants={lineReveal}
              style={{ originX: 0 }}
            />
            <motion.p
              className="text-neutral-500 text-sm font-light leading-relaxed hidden lg:block max-w-xs"
              variants={fadeInUp}
            >
              Une question spécifique qui n'est pas listée ici ? N'hésitez pas à
              nous contacter directement via notre formulaire ci-dessous.
            </motion.p>
          </div>

          {/* COLONNE DROITE : La liste des questions */}
          <div className="lg:col-span-8 flex flex-col">
            {FAQ_DATA.map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                faq={faq}
                isOpen={openIndex === index}
                toggleOpen={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
