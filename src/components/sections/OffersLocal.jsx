// src/components/sections/OffersLocal.jsx
import { motion } from "framer-motion";
import { LOCAL_OFFERS, LOCAL_OFFERS_EXTRAS } from "../../config/content";
import { staggerContainer, fadeInUp } from "../../config/animations";

const OffersLocal = ({ onSelectOffer }) => {
  return (
    <section className="bg-neutral-100 py-16 md:py-32 relative z-50">
      <div
        className="mx-auto px-4 md:px-0"
        style={{ width: "min(calc(82vw + 3rem), 100%)" }}
      >
        {/* Titre */}
        <motion.div
          className="flex flex-col items-center mb-10 md:mb-16 w-full text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
        >
          <motion.h2
            className="font-montserrat font-light text-2xl md:text-4xl uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-900"
            variants={fadeInUp}
          >
            Commerces &amp; indépendants
          </motion.h2>
          <motion.div
            className="w-24 h-[2px] bg-neutral-900 mt-4 md:mt-6"
            variants={{
              hidden: { width: 0 },
              visible: { width: 96, transition: { duration: 1 } },
            }}
          />
          <motion.p
            className="mt-6 md:mt-8 max-w-2xl text-sm md:text-base text-neutral-600 leading-relaxed"
            variants={fadeInUp}
          >
            Un tournage professionnel chez vous, pas une vidéo au téléphone :
            une image qualité cinéma, des plans fluides, et tout est géré de
            l'idée à la publication.
          </motion.p>
        </motion.div>

        {/* Grille */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full items-stretch">
          {LOCAL_OFFERS.map((offer, index) => {
            const dark = offer.style === "black";
            return (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className={`relative rounded-2xl md:rounded-[2rem] p-6 md:p-10 flex flex-col justify-between ${
                  dark
                    ? "bg-neutral-900 border border-neutral-700 shadow-2xl z-10 lg:scale-105"
                    : "bg-white text-neutral-900 shadow-sm"
                }`}
              >
                {offer.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-neutral-900 whitespace-nowrap px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[0.65rem] md:text-xs font-bold uppercase tracking-widest shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                    {offer.badge}
                  </div>
                )}

                <div>
                  <h3
                    className={`text-2xl md:text-3xl font-light tracking-tight mb-2 ${dark ? "text-white" : "text-neutral-900"}`}
                  >
                    {offer.title}
                  </h3>
                  <p
                    className={`text-sm mb-5 md:mb-6 ${dark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {offer.desc}
                  </p>

                  <p
                    className={`flex items-baseline gap-1 mb-6 md:mb-8 ${dark ? "text-white" : "text-neutral-900"}`}
                  >
                    <span className="text-4xl md:text-5xl font-light tracking-tight">
                      {offer.price}
                    </span>
                    <span className="text-xl md:text-2xl font-light">€</span>
                  </p>

                  <ul className="flex flex-col gap-3 md:gap-4">
                    {offer.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className={`w-5 h-5 shrink-0 ${dark ? "text-white" : "text-neutral-900"}`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <span
                          className={`leading-tight ${dark ? "text-neutral-300" : "text-neutral-600"}`}
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() =>
                    onSelectOffer && onSelectOffer(`Pack ${offer.title}`)
                  }
                  className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[0.65rem] md:text-xs mt-6 md:mt-8 transition-colors duration-300 ${
                    dark
                      ? "bg-white text-neutral-900 hover:bg-neutral-200"
                      : "bg-neutral-900 text-white hover:bg-neutral-800"
                  }`}
                >
                  Réserver mon appel gratuit
                </button>

                {offer.paymentUrl && (
                  <a
                    href={offer.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-center gap-2 text-center text-xs md:text-[0.8rem] mt-4 transition-colors duration-300 ${
                      dark
                        ? "text-neutral-400 hover:text-white"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      className="w-3.5 h-3.5 shrink-0"
                      aria-hidden="true"
                    >
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                    </svg>
                    <span>
                      Déjà décidé ?{" "}
                      <span className="underline underline-offset-4 decoration-1">
                        Bloquer ma date · acompte {offer.deposit} €
                      </span>
                    </span>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Suite, options, mentions */}
        <div className="mt-12 md:mt-16 flex flex-col items-center gap-3 text-center">
          <p className="text-sm md:text-base text-neutral-800 max-w-2xl">
            {LOCAL_OFFERS_EXTRAS.monthly}
          </p>
          <p className="text-xs md:text-sm text-neutral-500">
            {LOCAL_OFFERS_EXTRAS.options}
          </p>
          <p className="text-[0.7rem] md:text-xs text-neutral-400 max-w-3xl mt-2">
            {LOCAL_OFFERS_EXTRAS.fineprint}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OffersLocal;
