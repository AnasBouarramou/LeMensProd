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
    <section className="bg-neutral-100 py-12 md:py-24 relative z-50">
      <div className="mx-auto px-4 md:px-0" style={{ width: "min(calc(82vw + 3rem), 100%)" }}>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* GAUCHE - Titre et navigation */}
          <motion.div
            className="col-span-1 lg:col-span-3 flex flex-col justify-start h-full gap-4 md:gap-8 order-1"
            variants={fadeInUp}
          >
            <div>
              <h2 className="font-montserrat font-light text-lg md:text-2xl uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-800 leading-tight">
                Lemen's Prod a changé la donne
              </h2>
              <div className="flex items-center gap-3 mt-4 md:mt-6">
                {/* Flèche précédent */}
                <button
                  onClick={goPrev}
                  aria-label="Témoignage précédent"
                  className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 text-neutral-600 bg-transparent cursor-pointer shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((t, index) => (
                    <button
                      key={t.id}
                      onClick={() => setActive(index)}
                      aria-label={`Voir le témoignage de ${t.name}, ${t.company}`}
                      aria-current={active === index ? "true" : undefined}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        active === index
                          ? "w-8 bg-neutral-900"
                          : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                      }`}
                    />
                  ))}
                </div>

                {/* Flèche suivant */}
                <button
                  onClick={goNext}
                  aria-label="Témoignage suivant"
                  className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 text-neutral-600 bg-transparent cursor-pointer shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* CENTRE - Image */}
          <motion.div
            className="col-span-1 lg:col-span-4 flex flex-col gap-3 md:gap-4 items-center lg:items-end relative order-2"
            variants={fadeInUp}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full lg:w-[85%] flex flex-col gap-3 md:gap-4 items-center lg:items-end"
              >
                <div className="relative h-[280px] md:h-[450px] w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-lg group">
                  <img
                    src={TESTIMONIALS[active].image}
                    alt={TESTIMONIALS[active].name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-900/10 mix-blend-overlay"></div>
                </div>
                <div className="bg-white w-full rounded-xl md:rounded-[1.5rem] p-3 md:p-4 flex items-center justify-center h-14 md:h-20 shadow-sm">
                  {TESTIMONIALS[active].logo ? (
                    <img
                      src={TESTIMONIALS[active].logo}
                      alt={TESTIMONIALS[active].company}
                      className="h-8 md:h-12 w-auto object-contain"
                    />
                  ) : (
                    <span className="font-bold text-base md:text-xl tracking-tighter flex items-center gap-2 text-neutral-900">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-current"></div>
                      {TESTIMONIALS[active].company}
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* DROITE - Citation */}
          <motion.div
            className="col-span-1 lg:col-span-5 h-full order-3"
            variants={fadeInUp}
          >
            <div className="bg-neutral-200 rounded-2xl md:rounded-[2rem] p-6 md:p-10 h-[280px] md:h-[550px] flex flex-col justify-between shadow-sm relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col justify-between h-full relative z-10"
                >
                  <p className="text-base md:text-xl font-medium text-neutral-900 leading-relaxed line-clamp-6 md:line-clamp-none">
                    "{TESTIMONIALS[active].quote}"
                  </p>
                  <div>
                    <h4 className="font-serif italic text-base md:text-lg text-neutral-900">
                      {TESTIMONIALS[active].name},
                    </h4>
                    <p className="text-[0.65rem] md:text-xs text-neutral-400 font-bold uppercase tracking-widest mt-1">
                      {TESTIMONIALS[active].role}
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
