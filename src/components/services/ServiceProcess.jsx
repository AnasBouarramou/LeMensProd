// src/components/services/ServiceProcess.jsx
import { motion } from "framer-motion";
import ProcessIcon from "../common/ProcessIcon";
import { serviceStagger, serviceFadeInUp, widthReveal, CUSTOM_EASE } from "../../config/animations";

const ServiceProcess = ({ config, containerRef }) => (
  <section className="bg-neutral-100 py-12 md:pb-32 relative z-50">
    <div
      className="mx-auto px-4 md:px-0"
      style={{ width: "min(calc(82vw + 3rem), 100%)" }}
    >
      <motion.div
        className="flex flex-col items-center mb-12 md:mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ root: containerRef, once: true, amount: 0.5 }}
        variants={serviceStagger}
      >
        <motion.h2
          className="font-montserrat font-light text-2xl md:text-4xl text-center uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-800"
          variants={serviceFadeInUp}
        >
          Notre Process
        </motion.h2>
        <motion.div
          className="h-[2px] bg-neutral-900 mt-4 md:mt-6"
          variants={widthReveal}
        />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 relative">
        <motion.div
          className="absolute top-[3.25rem] left-[12.5%] right-[12.5%] h-px bg-neutral-300 hidden md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ root: containerRef, once: true }}
          transition={{ duration: 1.4, ease: "circOut", delay: 0.3 }}
          style={{ originX: 0 }}
        />
        {config.process.map((step, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center text-center px-2 md:px-6 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ root: containerRef, once: true }}
            transition={{ delay: 0.15 + i * 0.2, duration: 0.9, ease: CUSTOM_EASE }}
          >
            <motion.div
              className={`w-16 h-16 md:w-[6.5rem] md:h-[6.5rem] rounded-full border-2 border-neutral-300 flex items-center justify-center mb-4 md:mb-6 bg-neutral-100 relative z-10 group ${config.hoverAccent} transition-all duration-500 cursor-pointer`}
              whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 15 } }}
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
            <motion.h3
              className="text-sm md:text-lg font-bold text-neutral-900 uppercase tracking-wide mb-1 md:mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ root: containerRef, once: true }}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.6 }}
            >
              {step.title}
            </motion.h3>
            <motion.p
              className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed max-w-[140px] md:max-w-[220px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ root: containerRef, once: true }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
            >
              {step.desc}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceProcess;
