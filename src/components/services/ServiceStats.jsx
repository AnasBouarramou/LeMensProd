// src/components/services/ServiceStats.jsx
import { motion } from "framer-motion";
import AnimatedNumber from "../common/AnimatedNumber";
import { serviceStagger, serviceFadeInUp, lineReveal } from "../../config/animations";

const ServiceStats = ({ config, containerRef }) => (
  <motion.section
    className="bg-neutral-100 py-16 md:py-24 relative z-50"
    initial="hidden"
    whileInView="visible"
    viewport={{ root: containerRef, once: true, amount: 0.25 }}
    variants={serviceStagger}
  >
    <div
      className="mx-auto px-4 md:px-0"
      style={{ width: "min(calc(82vw + 3rem), 100%)" }}
    >
      <motion.div
        className="w-full h-px bg-neutral-300 mb-12 md:mb-20"
        variants={lineReveal}
        style={{ originX: 0 }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4">
          <motion.h2
            className="text-3xl md:text-5xl font-serif italic text-neutral-900 leading-[1.1]"
            variants={serviceFadeInUp}
            dangerouslySetInnerHTML={{ __html: config.statsTitle }}
          />
        </div>
        <div className="lg:col-span-8 flex flex-col justify-between h-full">
          <motion.p
            className="text-neutral-600 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-10 md:mb-16"
            variants={serviceFadeInUp}
          >
            {config.statsDesc}
          </motion.p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-0 md:gap-y-12 mb-4">
            {config.stats.map((stat, i) => (
              <motion.div
                key={i}
                className={`flex flex-col items-start text-left ${
                  i > 0 ? "md:border-l md:border-neutral-300 md:pl-6" : ""
                } ${i % 2 !== 0 ? "border-l border-neutral-300 pl-4 md:pl-6" : "pl-0"}`}
                variants={serviceFadeInUp}
              >
                <span className="text-3xl md:text-5xl font-bold text-neutral-900 mb-1 md:mb-2 tracking-tighter">
                  <AnimatedNumber
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    rootRef={containerRef}
                  />
                </span>
                <span className="text-[0.65rem] md:text-xs text-neutral-500 font-medium uppercase tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

export default ServiceStats;
