// src/components/sections/Offers.jsx
import { motion } from "framer-motion";
import { OFFERS } from "../../config/content";
import { staggerContainer, fadeInUp } from "../../config/animations";

const Offers = ({ onSelectOffer }) => {
  return (
    <section className="bg-neutral-900 py-16 md:py-32 relative z-50">
      <div className="mx-auto px-4 md:px-0" style={{ width: "min(calc(82vw + 3rem), 100%)" }}>
        {/* Titre */}
        <motion.div
          className="flex flex-col items-center mb-10 md:mb-16 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
        >
          <motion.h2
            className="font-montserrat font-light text-xl md:text-3xl text-center uppercase tracking-[0.15em] md:tracking-[0.2em] text-white"
            variants={fadeInUp}
          >
            Nos Offres
          </motion.h2>
          <motion.div
            className="w-16 md:w-24 h-[2px] bg-white mt-4 md:mt-6"
            variants={{
              hidden: { width: 0 },
              visible: { width: 96, transition: { duration: 1 } },
            }}
          />
        </motion.div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full items-center">
          {OFFERS.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.8,
                ease: "easeOut",
              }}
              className={`relative rounded-2xl md:rounded-[2rem] p-6 md:p-10 flex flex-col justify-between transition-all duration-300 ${
                offer.style === "black"
                  ? "bg-neutral-800 border border-neutral-700 shadow-2xl z-10 min-h-[550px] md:min-h-[650px] md:scale-105"
                  : "bg-white text-neutral-900 shadow-sm min-h-[480px] md:min-h-[550px]"
              }`}
            >
              {offer.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-neutral-900 px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[0.65rem] md:text-xs font-bold uppercase tracking-widest shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  {offer.badge}
                </div>
              )}

              <div>
                <h3
                  className={`text-2xl md:text-3xl font-light tracking-tight mb-2 ${offer.style === "black" ? "text-white" : "text-neutral-900"}`}
                >
                  {offer.title}
                </h3>
                <p
                  className={`text-sm mb-6 md:mb-8 ${offer.style === "black" ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  {offer.desc}
                </p>

                <div className="mb-6 md:mb-8">
                  <span
                    className={`text-3xl md:text-4xl font-bold tracking-tighter ${offer.style === "black" ? "text-white" : "text-neutral-900"}`}
                  >
                    {offer.price}
                  </span>
                  {offer.price !== "Devis" && (
                    <span
                      className={`text-sm ml-1 ${offer.style === "black" ? "text-neutral-400" : "text-neutral-500"}`}
                    >
                      / projet
                    </span>
                  )}
                </div>

                <ul className="flex flex-col gap-3 md:gap-4">
                  {offer.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-5 h-5 shrink-0 ${offer.style === "black" ? "text-white" : "text-neutral-900"}`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span
                        className={`leading-tight ${offer.style === "black" ? "text-neutral-300" : "text-neutral-600"}`}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectOffer && onSelectOffer(offer.title)}
                className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[0.65rem] md:text-xs mt-6 md:mt-8 transition-colors duration-300 ${
                  offer.style === "black"
                    ? "bg-white text-neutral-900 hover:bg-neutral-200"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                {offer.price === "Devis" ? "Nous contacter" : "Choisir ce plan"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
