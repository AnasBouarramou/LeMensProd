// src/components/services/ServiceCTA.jsx
import { motion } from "framer-motion";
import { serviceStagger, serviceFadeInUp } from "../../config/animations";

const ServiceCTA = ({ config, containerRef, onBack }) => (
  <section className="bg-neutral-900 py-16 md:py-28 relative z-50 overflow-hidden">
    <div
      className="mx-auto px-4 md:px-0 flex flex-col items-center text-center"
      style={{ width: "min(calc(82vw + 3rem), 100%)" }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ root: containerRef, once: true, amount: 0.4 }}
        variants={serviceStagger}
        className="flex flex-col items-center"
      >
        <motion.h2
          className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] mb-4 md:mb-6"
          variants={serviceFadeInUp}
          dangerouslySetInnerHTML={{ __html: config.ctaTitle }}
        />
        <motion.p
          className="text-neutral-400 text-base md:text-lg font-light leading-relaxed max-w-lg mb-8 md:mb-12"
          variants={serviceFadeInUp}
        >
          {config.ctaDesc}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto"
          variants={serviceFadeInUp}
        >
          <motion.button
            onClick={() => {
              onBack();
              setTimeout(() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }, 500);
            }}
            className="group relative px-6 md:px-8 py-3 md:py-4 bg-white overflow-hidden rounded-xl md:rounded-2xl text-neutral-900 w-full sm:w-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <div className="absolute inset-0 bg-neutral-200 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3 font-bold uppercase tracking-widest text-[0.65rem] md:text-xs">
              Voir nos offres
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </motion.button>
          <motion.button
            onClick={() => {
              onBack();
              setTimeout(() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }, 500);
            }}
            className="group relative px-6 md:px-8 py-3 md:py-4 bg-transparent overflow-hidden rounded-xl md:rounded-2xl text-white border border-white/20 hover:border-white/50 transition-colors w-full sm:w-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 font-bold uppercase tracking-widest text-[0.65rem] md:text-xs">
              Nous contacter
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
      <div className="absolute -bottom-10 -right-10 text-[10rem] md:text-[20rem] font-black text-white/[0.02] leading-none tracking-tighter select-none pointer-events-none hidden md:block">
        {config.ctaBgText}
      </div>
    </div>
  </section>
);

export default ServiceCTA;
