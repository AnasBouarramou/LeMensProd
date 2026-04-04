// src/components/sections/About.jsx
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "../../config/animations";

const About = () => {
  return (
    <section className="bg-neutral-100 py-16 md:py-32 relative z-50" id="about">
      <div
        className="mx-auto px-4 md:px-0"
        style={{ width: "min(calc(82vw + 3rem), 100%)" }}
      >
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div
            className="relative w-full h-[350px] md:h-[500px] lg:h-[600px] rounded-2xl lg:rounded-[2rem] overflow-hidden order-2 lg:order-1"
            variants={fadeInUp}
          >
            <motion.img
              src="/img/Tito.webp"
              alt="Tournage"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2 }}
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-start order-1 lg:order-2"
            variants={staggerContainer}
          >
            <motion.h2
              className="font-montserrat font-light text-2xl md:text-4xl uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-800"
              variants={fadeInUp}
            >
              Le standard cinéma au service de votre croissance.
            </motion.h2>
            <motion.div
              className="w-24 h-[2px] bg-neutral-900 mt-4 md:mt-6 mb-6 md:mb-8"
              variants={{
                hidden: { width: 0 },
                visible: { width: 96, transition: { duration: 1 } },
              }}
            />
            <motion.p
              className="text-neutral-500 leading-relaxed mb-8 md:mb-12 text-base md:text-lg font-light"
              variants={fadeInUp}
            >
              Dans un marché saturé, l'attention est votre ressource la plus rare. Chez Lemen's Prod, nous ne nous contentons pas d'appuyer sur REC. Nous orchestrons l'image de votre marque pour la rendre incontournable. Notre méthode allie la psychologie de l'attention à une exécution cinématographique pour marquer les esprits et déclencher l'action.
            </motion.p>

            <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-12">
              {[
                {
                  title: "Storytelling persuasif",
                  desc: "Capter dès les 3 premières secondes.",
                },
                {
                  title: "Prestige visuel",
                  desc: "Renforcer la légitimité et justifier les prix.",
                },
                {
                  title: "Déploiement 360°",
                  desc: "Formats optimisés pour chaque plateforme.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 border-l-2 border-neutral-300 pl-4 md:pl-6 py-1 group hover:border-neutral-800 transition-colors duration-300"
                  variants={fadeInUp}
                >
                  <div className="flex flex-col">
                    <h3 className="text-base md:text-lg font-bold text-neutral-800 uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
