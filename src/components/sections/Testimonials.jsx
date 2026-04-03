// src/components/sections/Testimonials.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "../../config/content";
import { staggerContainer, fadeInUp } from "../../config/animations";

const Testimonials = () => {
  const [active, setActive] = useState(0);

  const goPrev = () => setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => setActive((prev) => (prev + 1) % TESTIMONIALS.length);

  return (
    <section className="bg-neutral-100 py-16 md:py-32 relative z-50">
      <div className="mx-auto px-4 md:px-0" style={{ width: "min(calc(82vw + 3rem), 100%)" }}>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >

          {/* GAUCHE — Titre + navigation */}
          <motion.div
            className="col-span-1 lg:col-span-4 flex flex-col justify-between order-1"
            variants={fadeInUp}
          >
            {/* Bloc titre */}
            <div>
              <h2 className="font-montserrat font-light text-xl md:text-3xl uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-800 leading-tight">
                Lemen's Prod a changé la donne
              </h2>
              <div className="w-24 h-[2px] bg-neutral-900 mt-4 md:mt-6 mb-6 md:mb-10" />
              <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed max-w-xs">
                Ils nous ont fait confiance et ont transformé la perception de leur marque.
              </p>
            </div>

            {/* Navigation — compteur + flèches */}
            <div className="flex items-center justify-between mt-8 lg:mt-0">
              <div className="flex items-baseline gap-2 leading-none">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="font-serif italic text-3xl md:text-4xl text-neutral-900 tabular-nums"
                  >
                    {String(active + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span className="font-sans text-lg md:text-xl text-neutral-300 tabular-nums">
                  / {String(TESTIMONIALS.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={goPrev}
                  aria-label="Témoignage précédent"
                  className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 text-neutral-600 cursor-pointer shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  aria-label="Témoignage suivant"
                  className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 transition-all duration-300 cursor-pointer shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* DROITE — Carte citation */}
          <motion.div
            className="col-span-1 lg:col-span-8 order-2"
            variants={fadeInUp}
          >
            <div className="bg-neutral-900 rounded-2xl md:rounded-[2rem] p-6 md:p-12 flex flex-col justify-between min-h-[320px] md:min-h-[400px] relative overflow-hidden">

              {/* Guillemet décoratif */}
              <span className="absolute top-4 right-6 md:top-8 md:right-10 text-[8rem] md:text-[12rem] font-serif leading-none text-white/5 select-none pointer-events-none">
                "
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col justify-between h-full gap-8 md:gap-12 relative z-10"
                >
                  {/* Citation */}
                  <p className="text-lg md:text-2xl font-light text-white leading-relaxed">
                    "{TESTIMONIALS[active].quote}"
                  </p>

                  {/* Footer : auteur */}
                  <div>
                    <h4 className="font-serif italic text-base md:text-lg text-white">
                      {TESTIMONIALS[active].name}
                    </h4>
                    <p className="text-[0.65rem] md:text-xs text-white/40 font-bold uppercase tracking-widest mt-1">
                      {TESTIMONIALS[active].role} — {TESTIMONIALS[active].company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
