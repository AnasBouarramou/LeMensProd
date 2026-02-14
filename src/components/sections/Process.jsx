// src/components/sections/Process.jsx
import { motion } from "framer-motion";
import ProcessIcon from "../common/ProcessIcon";
import {
  staggerContainer,
  fadeInUp,
  widthReveal,
} from "../../config/animations";

const Process = () => {
  const steps = [
    {
      icon: "bolt",
      title: "Stratégie",
      desc: "Audit, moodboard et définition des objectifs.",
    },
    {
      icon: "camera",
      title: "Production",
      desc: "Tournage cinéma avec équipe technique complète.",
    },
    {
      icon: "scissors",
      title: "Post-Prod",
      desc: "Montage, étalonnage et sound design avancé.",
    },
    {
      icon: "rocket",
      title: "Diffusion",
      desc: "Livraison des formats optimisés pour chaque canal.",
    },
  ];

  return (
    <section className="bg-neutral-100 py-16 md:pb-32 md:pt-0 relative z-50">
      <div className="mx-auto px-4 md:px-0" style={{ width: "min(calc(82vw + 3rem), 100%)" }}>
        <motion.div
          className="flex flex-col items-center mb-12 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
        >
          <motion.h2
            className="font-montserrat font-light text-xl md:text-3xl text-center uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-800"
            variants={fadeInUp}
          >
            Notre Méthode
          </motion.h2>
          <motion.div
            className="h-[2px] bg-neutral-900 mt-4 md:mt-6"
            variants={widthReveal}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 relative">
          {/* Ligne horizontale desktop */}
          <motion.div
            className="absolute top-[3.25rem] left-[12.5%] right-[12.5%] h-px bg-neutral-300 hidden md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "circOut", delay: 0.3 }}
            style={{ originX: 0 }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center px-2 md:px-6 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15 + i * 0.2,
                duration: 0.9,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <motion.div
                className="w-16 h-16 md:w-[6.5rem] md:h-[6.5rem] rounded-full border-2 border-neutral-300 flex items-center justify-center mb-4 md:mb-6 bg-neutral-100 relative z-10 group hover:bg-neutral-900 transition-all duration-500 cursor-pointer"
                whileHover={{
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
              >
                <div className="flex flex-col items-center gap-0.5 md:gap-1 text-neutral-900 group-hover:text-white transition-colors duration-500">
                  <div className="scale-75 md:scale-100">
                    <ProcessIcon type={step.icon} />
                  </div>
                  <span className="text-[0.5rem] md:text-[0.55rem] font-bold uppercase tracking-widest">
                    0{i + 1}
                  </span>
                </div>
              </motion.div>
              <h3 className="text-sm md:text-lg font-bold text-neutral-900 uppercase tracking-wide mb-1 md:mb-2">
                {step.title}
              </h3>
              <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed max-w-[150px] md:max-w-[220px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
