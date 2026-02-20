// src/components/services/ServiceDetailPage.jsx
import { useRef, useState, useEffect } from "react";
import { motion, useTransform, AnimatePresence, useInView } from "framer-motion";
import VideoBackground from "../common/VideoBackground";
import VimeoModal from "../common/VimeoModal";
import { useIsMobile } from "../../hooks/useIsMobile";

// Composants et Config
import AnimatedNumber from "../common/AnimatedNumber";
import ProcessIcon from "../common/ProcessIcon";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import {
  serviceFadeInUp,
  serviceStagger,
  lineReveal,
  widthReveal,
  CUSTOM_EASE,
} from "../../config/animations";

const ServiceDetailPage = ({ config, onBack }) => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  // Hook personnalisé avec lissage du scroll
  const smoothProgress = useScrollProgress(
    { container: containerRef },
    { mass: 0.08, stiffness: 200, damping: 30, restDelta: 0.0001 },
  );

  const [expandedLeft, setExpandedLeft] = useState(false);
  const [expandedRight, setExpandedRight] = useState(false);

  // --- Animations Hero (Desktop only) ---
  const heroContentOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const heroContentY = useTransform(smoothProgress, [0, 0.08], [0, -30]);
  const heroHeight = useTransform(smoothProgress, [0, 0.25], ["100%", "0%"]);
  const heroOpacity = useTransform(smoothProgress, [0.1, 0.3], [1, 0]);

  // --- Animations Split (Desktop only) ---
  const splitGap = useTransform(smoothProgress, [0.05, 0.2], ["0rem", "1rem"]);
  const splitOpacity = useTransform(smoothProgress, [0.1, 0.25], [0, 1]);
  const splitScale = useTransform(smoothProgress, [0.1, 0.25], [0.95, 1]);
  const leftBlockX = useTransform(smoothProgress, [0.1, 0.25], ["-8%", "0%"]);
  const rightBlockX = useTransform(smoothProgress, [0.1, 0.25], ["8%", "0%"]);

  // --- Contenu des blocs (Desktop only) ---
  const blockContentOpacity = useTransform(
    smoothProgress,
    [0.18, 0.28],
    [0, 1],
  );
  const blockContentY = useTransform(smoothProgress, [0.18, 0.28], [20, 0]);

  // Variants pour animations mobile
  const mobileBlockVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-neutral-100 overflow-y-auto overflow-x-hidden font-sans"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.6, ease: CUSTOM_EASE },
      }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      {/* ===== NAVBAR ===== */}
      <motion.div
        className="fixed top-0 left-0 right-0 w-full px-4 md:px-8 py-4 md:py-5 flex justify-between items-center bg-neutral-100/80 backdrop-blur-md z-[310]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: CUSTOM_EASE }}
      >
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onBack}
        >
          <div className="w-7 h-7 md:w-8 md:h-8 bg-neutral-900 rounded-full flex items-center justify-center transition-transform group-hover:-translate-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3.5 h-3.5 md:w-4 md:h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <span className="tracking-tighter text-lg md:text-xl text-neutral-900">
            <span className="font-yellowtail">lemen's</span>
            {" "}
            <span className="font-poppins font-semibold">Prod.</span>
          </span>
        </div>
      </motion.div>

      <div className="flex flex-col w-full">
        {/* ========== VERSION DESKTOP - ZONE STICKY ========== */}
        <div className="hidden md:block h-[250vh] relative">
          <div className="sticky top-0 z-20 w-full flex flex-col h-screen pt-[76px]">
            <div className="flex flex-col flex-1 min-h-0 px-4 pb-4 gap-0">
              {/* HERO DESKTOP */}
              <motion.div
                style={{ height: heroHeight, opacity: heroOpacity }}
                className="w-full relative overflow-hidden rounded-[2rem] bg-neutral-900 shrink-0"
              >
                {!isMobile && (
                  <VideoBackground
                    videoSrc={config.heroVideo}
                    poster={config.heroPoster}
                    className="brightness-[0.8]"
                  />
                )}
                <motion.div
                  style={{ opacity: heroContentOpacity, y: heroContentY }}
                  className="absolute inset-0 flex flex-col justify-center items-center text-center p-4"
                >
                  <motion.h1
                    className="text-6xl md:text-[8vw] leading-[0.9] font-black text-white uppercase tracking-tighter drop-shadow-lg"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.2,
                      duration: 1.2,
                      ease: CUSTOM_EASE,
                    }}
                    dangerouslySetInnerHTML={{ __html: config.heroTitle }}
                  />
                </motion.div>

                <motion.div
                  style={{ opacity: heroContentOpacity }}
                  className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end bg-gradient-to-t from-black/60 to-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <h2
                    className="text-4xl font-black uppercase tracking-tighter text-white leading-none"
                    dangerouslySetInnerHTML={{ __html: config.heroLabel }}
                  />
                  <p className="hidden md:block text-xs font-medium text-white/60 max-w-sm leading-relaxed text-right">
                    {config.heroDesc}
                  </p>
                </motion.div>

                <motion.div
                  style={{ opacity: heroContentOpacity }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
                >
                  <span className="uppercase text-[0.6rem] tracking-widest font-bold text-white/60">
                    Scroller vers le bas
                  </span>
                  <div className="w-5 h-8 rounded-full border-2 border-white/40 flex justify-center p-1 relative overflow-hidden">
                    <motion.div
                      animate={{ y: [0, 12], opacity: [1, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeOut",
                      }}
                      className="w-1 h-1.5 bg-white rounded-full"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* 2 BLOCS SPLIT DESKTOP */}
              <motion.div
                style={{
                  gap: splitGap,
                  opacity: splitOpacity,
                  scale: splitScale,
                }}
                className="flex w-full flex-1 min-h-0"
              >
                <BlockContent
                  blockConfig={config.blocks[0]}
                  videoSrc={config.blocks[0].video}
                  expanded={expandedLeft}
                  setExpanded={setExpandedLeft}
                  blockX={leftBlockX}
                  contentOpacity={blockContentOpacity}
                  contentY={blockContentY}
                  configAccent={config.accentBg}
                  index="01"
                  isHidden={isMobile}
                  vimeoId={config.blocks[0].vimeoId || ""}
                />

                <BlockContent
                  blockConfig={config.blocks[1]}
                  videoSrc={config.blocks[1].video}
                  expanded={expandedRight}
                  setExpanded={setExpandedRight}
                  blockX={rightBlockX}
                  contentOpacity={blockContentOpacity}
                  contentY={blockContentY}
                  configAccent={config.accentBg}
                  index="02"
                  isRight={true}
                  isHidden={isMobile}
                  vimeoId={config.blocks[1].vimeoId || ""}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ========== VERSION MOBILE ========== */}
        <div className="block md:hidden pt-[60px]">
          {/* HERO MOBILE */}
          <motion.section
            className="relative h-[55vh] mx-3 mt-3 rounded-2xl overflow-hidden bg-neutral-900 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isMobile && (
              <VideoBackground
                videoSrc={config.heroVideo}
                poster={config.heroPoster}
                className="brightness-[0.7]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
              <motion.h1
                className="text-4xl sm:text-5xl leading-[0.9] font-black text-white uppercase tracking-tighter drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                dangerouslySetInnerHTML={{ __html: config.heroTitle }}
              />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-3">
              <h2
                className="text-2xl font-black uppercase tracking-tighter text-white leading-none"
                dangerouslySetInnerHTML={{ __html: config.heroLabel }}
              />
              <p className="text-xs font-medium text-white/60 leading-relaxed drop-shadow-md">
                {config.heroDesc}
              </p>
            </div>
          </motion.section>

          {/* BLOCS MOBILE - Empilés verticalement */}
          <section className="px-3 py-4 flex flex-col gap-4">
            {config.blocks.map((block, i) => (
              <MobileBlock
                key={i}
                block={block}
                index={i}
                configAccent={config.accentBg}
                mobileBlockVariants={mobileBlockVariants}
              />
            ))}
          </section>
        </div>

        {/* ========== CHIFFRES CLÉS ========== */}
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

        {/* ========== PROCESS ========== */}
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
                className="font-montserrat font-light text-xl md:text-3xl text-center uppercase tracking-[0.15em] md:tracking-[0.2em] text-neutral-800"
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
                  transition={{
                    delay: 0.15 + i * 0.2,
                    duration: 0.9,
                    ease: CUSTOM_EASE,
                  }}
                >
                  <motion.div
                    className={`w-16 h-16 md:w-[6.5rem] md:h-[6.5rem] rounded-full border-2 border-neutral-300 flex items-center justify-center mb-4 md:mb-6 bg-neutral-100 relative z-10 group ${config.hoverAccent} transition-all duration-500 cursor-pointer`}
                    whileHover={{
                      scale: 1.1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      },
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

        {/* ========== CTA OFFRES ========== */}
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
      </div>
    </motion.div>
  );
};

// Sous-composant Mobile Block avec autoplay au scroll via useInView
const MobileBlock = ({ block, index, configAccent, mobileBlockVariants }) => {
  const blockRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(blockRef, { margin: "-20% 0px" });

  useEffect(() => {
    if (isInView) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isInView]);

  return (
    <motion.div
      ref={blockRef}
      variants={mobileBlockVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative h-[55vh] rounded-2xl overflow-hidden bg-neutral-900 shadow-lg"
    >
      <VideoBackground
        ref={videoRef}
        videoSrc={block.video}
        poster={block.poster}
        className="brightness-[0.7]"
        playOnHover
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-center gap-2">
          <span className="text-white text-[0.65rem] border border-white/30 rounded-full px-3 py-1 font-bold uppercase tracking-widest">
            0{index + 1}
          </span>
          <span className="text-white/50 text-[0.65rem] uppercase tracking-widest font-medium">
            {block.tag}
          </span>
        </div>

        <div>
          <h3
            className="text-3xl font-black uppercase tracking-tighter text-white leading-[0.95] mb-2"
            dangerouslySetInnerHTML={{ __html: block.title }}
          />
          <p className="text-white/50 text-sm font-medium mb-4 max-w-[280px]">
            {block.subtitle}
          </p>
          <MobileBlockExpand
            blockConfig={block}
            configAccent={configAccent}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Sous-composant pour l'expansion mobile
const MobileBlockExpand = ({ blockConfig, configAccent }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <button
        onClick={() => setExpanded(true)}
        className="group/cta flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-neutral-900 transition-all duration-300"
      >
        <span className="text-[0.6rem] uppercase tracking-widest font-bold text-white group-hover/cta:text-neutral-900">
          En savoir plus
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-3 h-3 text-white group-hover/cta:text-neutral-900"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] flex items-end"
            onClick={() => setExpanded(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full bg-stone-100 rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-xl font-black uppercase tracking-tighter text-neutral-900 leading-[0.95]"
                  dangerouslySetInnerHTML={{ __html: blockConfig.expandTitle }}
                />
                <button
                  onClick={() => setExpanded(false)}
                  className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-neutral-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className={`w-10 h-[2px] ${configAccent} mb-3`} />
              <p className="text-neutral-600 text-sm font-light leading-relaxed mb-4">
                {blockConfig.expandDesc}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {blockConfig.tags.map((item, i) => (
                  <span
                    key={i}
                    className="text-[0.55rem] uppercase tracking-widest font-bold text-neutral-500 border border-neutral-300 rounded-full px-2.5 py-1 bg-white/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                <span className="text-[0.55rem] uppercase tracking-widest font-bold text-neutral-400">
                  {blockConfig.client}
                </span>
                <button
                  onClick={() => setExpanded(false)}
                  className="px-4 py-2 bg-neutral-900 rounded-xl text-white font-bold uppercase tracking-widest text-[0.55rem]"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Sous-composant BlockContent (Desktop)
const BlockContent = ({
  blockConfig,
  videoSrc,
  expanded,
  setExpanded,
  blockX,
  contentOpacity,
  contentY,
  configAccent,
  index,
  isRight = false,
  isHidden = false,
  vimeoId = "",
}) => {
  const blockVideoRef = useRef(null);
  const [isVimeoOpen, setIsVimeoOpen] = useState(false);

  const handleMouseEnter = () => {
    if (!isVimeoOpen) blockVideoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (!isVimeoOpen) blockVideoRef.current?.pause();
  };

  const handleOpenVimeo = (e) => {
    e.stopPropagation();
    e.preventDefault();
    blockVideoRef.current?.pause();
    setIsVimeoOpen(true);
  };

  const handleCloseVimeo = () => {
    setIsVimeoOpen(false);
    blockVideoRef.current?.play();
  };

  return (
    <>
    <motion.div
      style={{ x: blockX }}
      className="flex-1 relative overflow-hidden rounded-[2rem] bg-neutral-900 shadow-xl group/block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isHidden && (
        <>
          <VideoBackground ref={blockVideoRef} videoSrc={videoSrc} poster={blockConfig.poster} className="brightness-[0.7]" playOnHover />
          {/* Bouton Vimeo HD */}
          <button
            onClick={handleOpenVimeo}
            aria-label="Voir la vidéo en HD"
            className="absolute top-3 right-3 lg:top-4 lg:right-4 z-30 w-9 h-9 lg:w-10 lg:h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover/block:opacity-60 hover:!opacity-100 transition-all cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          </button>
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="absolute bottom-0 left-0 right-0 h-[50%] z-30 bg-stone-100/95 backdrop-blur-xl border-t border-stone-200 rounded-t-[1.5rem] rounded-b-[2rem] flex flex-col justify-between p-6 md:p-8 overflow-y-auto shadow-[0_-8px_30px_rgba(0,0,0,0.15)]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3
                  className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-neutral-900 leading-[0.95]"
                  dangerouslySetInnerHTML={{ __html: blockConfig.expandTitle }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(false);
                  }}
                  className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-200 transition-colors shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-neutral-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className={`w-12 h-[2px] ${configAccent} mb-4`} />
              <p className="text-neutral-600 text-sm font-light leading-relaxed mb-4">
                {blockConfig.expandDesc}
              </p>
              <div className="flex flex-wrap gap-2">
                {blockConfig.tags.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="text-[0.6rem] uppercase tracking-widest font-bold text-neutral-500 border border-neutral-300 rounded-full px-3 py-1.5 bg-white/60"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
              <span className="text-[0.6rem] uppercase tracking-widest font-bold text-neutral-400">
                {blockConfig.client}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
                className="group/btn relative px-5 py-2.5 bg-neutral-900 overflow-hidden rounded-xl text-white"
              >
                <div className="absolute inset-0 bg-neutral-700 w-full h-full translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 font-bold uppercase tracking-widest text-[0.6rem]">
                  Fermer
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 z-20"
      >
        <div
          className={`flex items-center gap-3 ${isRight ? "justify-end" : ""}`}
        >
          {isRight ? (
            <>
              <span className="text-white/50 text-xs uppercase tracking-widest font-medium">
                {blockConfig.tag}
              </span>
              <span className="text-white text-xs border border-white/30 rounded-full px-4 py-1.5 font-bold uppercase tracking-widest backdrop-blur-sm">
                {index}
              </span>
            </>
          ) : (
            <>
              <span className="text-white text-xs border border-white/30 rounded-full px-4 py-1.5 font-bold uppercase tracking-widest backdrop-blur-sm">
                {index}
              </span>
              <span className="text-white/50 text-xs uppercase tracking-widest font-medium">
                {blockConfig.tag}
              </span>
            </>
          )}
        </div>

        <div className={isRight ? "text-right" : ""}>
          <h3
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.95] mb-3"
            dangerouslySetInnerHTML={{ __html: blockConfig.title }}
          />
          <p
            className={`text-white/50 text-sm font-medium mb-6 max-w-xs ${isRight ? "ml-auto" : ""}`}
          >
            {blockConfig.subtitle}
          </p>
          <div
            className={`flex items-center gap-4 ${isRight ? "justify-end" : ""}`}
          >
            {!isRight && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(true);
                }}
                className="group/cta flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 hover:bg-white hover:text-neutral-900 transition-all duration-300"
              >
                <span className="text-[0.65rem] uppercase tracking-widest font-bold text-white group-hover/cta:text-neutral-900">
                  En savoir plus
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 text-white group-hover/cta:text-neutral-900 group-hover/cta:-translate-y-0.5 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </button>
            )}
            <span className="text-[0.65rem] uppercase tracking-widest font-bold text-white/40 hidden md:block">
              {blockConfig.client}
            </span>
            {isRight && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(true);
                }}
                className="group/cta flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 hover:bg-white hover:text-neutral-900 transition-all duration-300"
              >
                <span className="text-[0.65rem] uppercase tracking-widest font-bold text-white group-hover/cta:text-neutral-900">
                  En savoir plus
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 text-white group-hover/cta:text-neutral-900 group-hover/cta:-translate-y-0.5 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
    <VimeoModal
      isOpen={isVimeoOpen}
      onClose={handleCloseVimeo}
      videoId={vimeoId}
    />
    </>
  );
};

export default ServiceDetailPage;
