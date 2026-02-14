// src/components/sections/About.jsx
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "../../config/animations";

const About = () => {
  return (
    <section className="bg-neutral-100 py-12 md:py-20 relative z-50" id="about">
      <div
        className="mx-auto px-4 md:px-0"
        style={{ width: "min(calc(82vw + 3rem), 100%)" }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div
            className="relative w-full h-[350px] md:h-[600px] rounded-2xl md:rounded-[2rem] overflow-hidden order-2 md:order-1"
            variants={fadeInUp}
          >
            <motion.img
              src="/img/Tito.png"
              alt="Tournage"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2 }}
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center order-1 md:order-2"
            variants={staggerContainer}
          >
            <motion.h2
              className="font-montserrat font-light text-xl md:text-3xl uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-800"
              variants={fadeInUp}
            >
              Qui sommes-nous ?
            </motion.h2>
            <motion.div
              className="w-16 md:w-24 h-[2px] bg-neutral-900 mt-4 md:mt-6 mb-6 md:mb-8"
              variants={{
                hidden: { width: 0 },
                visible: { width: 96, transition: { duration: 1 } },
              }}
            />
            <motion.p
              className="text-neutral-500 leading-relaxed mb-8 md:mb-12 text-base md:text-lg font-light"
              variants={fadeInUp}
            >
              Plus qu'une simple agence de production, nous sommes des
              architectes visuels. Chez Lemen's Prod, nous fusionnons la
              créativité brute et la maîtrise technique pour concevoir des
              contenus qui ne se contentent pas d'être vus, mais qui marquent
              les esprits durablement.
            </motion.p>

            <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-12">
              {[
                {
                  title: "Storytelling Percutant",
                  desc: "Nous ne nous contentons pas d'appuyer sur REC, nous racontons votre histoire. Chaque plan, chaque mouvement de caméra est pensé pour capter l'attention, susciter l'émotion et engager votre audience dès les premières secondes.",
                },
                {
                  title: "Qualité Cinéma",
                  desc: "De la direction de la photographie au sound design, nous appliquons les standards du cinéma à vos projets. Nous déployons un matériel de pointe pour vous garantir une esthétique premium, peu importe le format.",
                },
                {
                  title: "Vision 360°",
                  desc: "De la page blanche jusqu'à l'export final. Nous gérons l'audit créatif, la production sur le terrain et la post-production millimétrée pour vous livrer des contenus clés en main, optimisés pour chaque plateforme.",
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

            <motion.button
              className="group relative px-6 md:px-8 py-3 md:py-4 bg-transparent overflow-hidden rounded-full border border-neutral-800 text-neutral-800 w-fit"
              variants={fadeInUp}
              whileHover="hover"
            >
              <motion.div
                className="absolute inset-0 bg-neutral-900 w-full h-full"
                initial={{ x: "-100%" }}
                variants={{ hover: { x: "0%" } }}
                transition={{ type: "tween", ease: "circOut", duration: 0.4 }}
              />
              <span className="relative z-10 flex items-center gap-2 md:gap-3 font-bold uppercase tracking-widest text-[0.65rem] md:text-xs group-hover:text-white transition-colors duration-300">
                Créer votre projet
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
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
