// src/components/sections/ContactForm.jsx
import { motion } from "framer-motion";
import {
  staggerContainer,
  fadeInUp,
  CUSTOM_EASE,
} from "../../config/animations";

const ContactForm = () => {
  return (
    <motion.section
      className="bg-neutral-100 py-16 md:pb-32 md:pt-0 relative z-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="mx-auto px-4 md:px-0" style={{ width: "min(calc(82vw + 3rem), 100%)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-32 pt-10 md:pt-20">
          {/* Colonne Gauche : Intro */}
          <div className="flex flex-col justify-start">
            <motion.h2
              className="font-montserrat font-light text-xl md:text-3xl uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-900"
              variants={fadeInUp}
            >
              Parlons de <br /> votre projet
            </motion.h2>

            <motion.div
              className="h-[2px] bg-neutral-900 mt-4 md:mt-6 mb-6 md:mb-8"
              variants={{
                hidden: { width: 0 },
                visible: {
                  width: 96,
                  transition: { duration: 1, ease: CUSTOM_EASE },
                },
              }}
            />

            <motion.p
              className="text-neutral-500 text-base md:text-lg font-light leading-relaxed mb-8 md:mb-12 max-w-md"
              variants={fadeInUp}
            >
              Vous avez une question avant de vous lancer ? Besoin d'un conseil
              technique ou d'affiner votre idée ? Discutons-en en détail pour
              construire la solution vidéo parfaitement adaptée à vos objectifs.
            </motion.p>

            <motion.div className="flex flex-col gap-4 md:gap-6" variants={fadeInUp}>
              <div className="flex items-center gap-3 md:gap-4 text-neutral-900 group cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-300 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 md:w-5 md:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.65rem] md:text-xs text-neutral-400 uppercase tracking-widest font-bold mb-0.5 md:mb-1">
                    Email
                  </p>
                  <p className="text-base md:text-lg font-medium">contact@lemensprod.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 text-neutral-900 group cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-300 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 md:w-5 md:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.65rem] md:text-xs text-neutral-400 uppercase tracking-widest font-bold mb-0.5 md:mb-1">
                    Téléphone
                  </p>
                  <p className="text-base md:text-lg font-medium">01 23 45 67 89</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Colonne Droite : Formulaire */}
          <motion.form className="flex flex-col gap-6 md:gap-8" variants={fadeInUp}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] md:text-xs text-neutral-500 uppercase tracking-widest font-bold">
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="bg-transparent border-b border-neutral-300 py-3 md:py-4 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-colors duration-300 text-base"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] md:text-xs text-neutral-500 uppercase tracking-widest font-bold">
                  Entreprise
                </label>
                <input
                  type="text"
                  placeholder="Nom de l'entreprise"
                  className="bg-transparent border-b border-neutral-300 py-3 md:py-4 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-colors duration-300 text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] md:text-xs text-neutral-500 uppercase tracking-widest font-bold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="bg-transparent border-b border-neutral-300 py-3 md:py-4 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-colors duration-300 text-base"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] md:text-xs text-neutral-500 uppercase tracking-widest font-bold">
                  Sujet
                </label>
                <select className="bg-transparent border-b border-neutral-300 py-3 md:py-4 text-neutral-900 focus:border-black focus:outline-none transition-colors duration-300 appearance-none cursor-pointer text-base">
                  <option className="bg-white text-neutral-500">
                    Sélectionnez un sujet
                  </option>
                  <option className="bg-white text-neutral-900">
                    Demande Sur-Mesure
                  </option>
                  <option className="bg-white text-neutral-900">
                    Snack Content
                  </option>
                  <option className="bg-white text-neutral-900">
                    Production Visuelle
                  </option>
                  <option className="bg-white text-neutral-900">
                    Autre question
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] md:text-xs text-neutral-500 uppercase tracking-widest font-bold">
                  Budget estimé
                </label>
                <select className="bg-transparent border-b border-neutral-300 py-3 md:py-4 text-neutral-900 focus:border-black focus:outline-none transition-colors duration-300 appearance-none cursor-pointer text-base">
                  <option className="bg-white text-neutral-500">À définir</option>
                  <option className="bg-white text-neutral-900">Moins de 2 000€</option>
                  <option className="bg-white text-neutral-900">2 000€ - 5 000€</option>
                  <option className="bg-white text-neutral-900">Plus de 5 000€</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] md:text-xs text-neutral-500 uppercase tracking-widest font-bold">
                  Délai souhaité
                </label>
                <select className="bg-transparent border-b border-neutral-300 py-3 md:py-4 text-neutral-900 focus:border-black focus:outline-none transition-colors duration-300 appearance-none cursor-pointer text-base">
                  <option className="bg-white text-neutral-900">Urgent (&lt; 2 semaines)</option>
                  <option className="bg-white text-neutral-900">Dans le mois</option>
                  <option className="bg-white text-neutral-900">Projet à moyen terme</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] md:text-xs text-neutral-500 uppercase tracking-widest font-bold">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Détaillez votre besoin..."
                className="bg-transparent border-b border-neutral-300 py-3 md:py-4 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-colors duration-300 resize-none text-base"
              ></textarea>
            </div>

            <div className="flex flex-col items-stretch md:items-end gap-3 mt-2 md:mt-4">
              <button
                type="submit"
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-neutral-900 overflow-hidden rounded-xl md:rounded-2xl text-white w-full md:w-fit shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="absolute inset-0 bg-neutral-800 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3 font-bold uppercase tracking-widest text-[0.65rem] md:text-xs">
                  Envoyer la demande
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </button>
              <p className="text-[0.65rem] md:text-xs text-neutral-400 font-light tracking-wide text-center md:text-right">
                Réponse sous 24h&nbsp;•&nbsp;Accompagnement sur-mesure
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactForm;
