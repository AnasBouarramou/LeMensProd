// src/components/sections/TrustSlider.jsx
import { motion } from "framer-motion";
import { LOGOS } from "../../config/content";
import { staggerContainer, fadeInUp } from "../../config/animations";

const TrustSlider = () => {
  return (
    <motion.section
      className="bg-neutral-100 pt-8 md:pt-12 pb-16 md:pb-32 overflow-hidden relative z-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4 md:px-6 mb-10 md:mb-16 flex flex-col items-center">
        <motion.h2
          className="font-montserrat font-light text-xl md:text-3xl text-center uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-800"
          variants={fadeInUp}
        >
          Ils nous ont fait confiance
        </motion.h2>
        <motion.div
          className="w-24 h-[2px] bg-neutral-900 mt-6"
          variants={{
            hidden: { width: 0, opacity: 0 },
            visible: {
              width: 96,
              opacity: 1,
              transition: { duration: 1, ease: "circOut" },
            },
          }}
        />
      </div>

      <motion.div className="relative w-full" variants={fadeInUp}>
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-neutral-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-neutral-100 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex items-center flex-shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            style={{ willChange: "transform" }}
          >
            {[...LOGOS, ...LOGOS].map((logo, index) => (
              <div key={index} className="mx-8 md:mx-16 cursor-pointer group flex-shrink-0 flex items-center">
                <img
                  src={logo.url}
                  alt={logo.name}
                  className={`h-12 md:h-16 lg:h-20 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300${logo.invert ? " invert" : ""}`}
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default TrustSlider;
