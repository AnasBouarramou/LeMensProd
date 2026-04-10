// src/components/services/ServiceDetailPage.jsx
import { useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import VideoBackground from "../common/VideoBackground";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { CUSTOM_EASE } from "../../config/animations";

import BlockContent from "./BlockContent";
import { MobileBlock } from "./MobileBlock";
import ServiceStats from "./ServiceStats";
import ServiceProcess from "./ServiceProcess";
import ServiceCTA from "./ServiceCTA";
import Footer from "../layout/Footer";

const ServiceDetailPage = ({ config, onBack, setActivePage }) => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

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
  const blockContentOpacity = useTransform(smoothProgress, [0.18, 0.28], [0, 1]);
  const blockContentY = useTransform(smoothProgress, [0.18, 0.28], [20, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-neutral-100 overflow-y-auto overflow-x-hidden font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6, ease: CUSTOM_EASE } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      {/* ===== NAVBAR ===== */}
      <motion.div
        className="fixed top-0 left-0 right-0 w-full px-4 md:px-8 py-4 md:py-5 flex justify-between items-center bg-neutral-100/80 backdrop-blur-md z-[310]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: CUSTOM_EASE }}
      >
        <div className="flex items-center gap-2 cursor-pointer group" onClick={onBack}>
          <div className="w-6 h-6 md:w-7 md:h-7 bg-[#40556C] rounded-full flex items-center justify-center transition-transform group-hover:-translate-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 md:w-3.5 md:h-3.5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          <div className="relative h-6 md:h-7 w-auto scale-[2] origin-left">
            <img src="/img/Logo.webp" alt="Lemen's Prod" className="h-full w-auto" />
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col w-full">
        {/* ========== VERSION DESKTOP ========== */}
        {!isMobile && (<div className="h-[250vh] relative">
          <div className="sticky top-0 z-20 w-full flex flex-col h-screen pt-[76px]">
            <div className="flex flex-col flex-1 min-h-0 px-4 pb-4 gap-0 bg-neutral-100">
              {/* HERO DESKTOP */}
              <motion.div
                style={{ height: heroHeight, opacity: heroOpacity }}
                className="w-full relative overflow-hidden rounded-[2rem] bg-neutral-900 shrink-0"
              >
                <VideoBackground
                    videoSrc={config.heroVideo}
                    poster={config.heroPoster}
                    posterMobile={config.heroPosterMobile}
                    className="brightness-[0.8]"
                    eager
                  />
                <motion.div
                  style={{ opacity: heroContentOpacity, y: heroContentY }}
                  className="absolute inset-0 flex flex-col justify-center items-center text-center p-4"
                >
                  <motion.h1
                    className="text-6xl md:text-[8vw] leading-[0.9] font-black text-white uppercase tracking-tighter drop-shadow-lg"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2, duration: 1.2, ease: CUSTOM_EASE }}
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
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                      className="w-1 h-1.5 bg-white rounded-full"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* 2 BLOCS SPLIT DESKTOP */}
              <motion.div
                style={{ gap: splitGap, opacity: splitOpacity, scale: splitScale }}
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
                  vimeoId={config.blocks[1].vimeoId || ""}
                />
              </motion.div>
            </div>
          </div>
        </div>
        )}

        {/* ========== VERSION MOBILE ========== */}
        {isMobile && (<div className="pt-[60px]">
          <motion.section
            className="relative h-[55vh] mx-3 mt-3 rounded-2xl overflow-hidden bg-neutral-900 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <VideoBackground
              videoSrc={config.heroVideo}
              poster={config.heroPoster}
              posterMobile={config.heroPosterMobile}
              className="brightness-[0.7]"
              eager
            />
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

          <section className="px-3 py-4 flex flex-col gap-4">
            {config.blocks.map((block, i) => (
              <MobileBlock
                key={i}
                block={block}
                index={i}
                configAccent={config.accentBg}
              />
            ))}
          </section>
        </div>
        )}

        {/* ========== SECTIONS PARTAGÉES ========== */}
        <ServiceStats config={config} containerRef={containerRef} />
        <ServiceProcess config={config} containerRef={containerRef} />
        <ServiceCTA config={config} containerRef={containerRef} onBack={onBack} />
        <Footer
          onBack={onBack}
          setActivePage={setActivePage}
          onNavClick={(id) => {
            onBack();
            setTimeout(() => {
              let targetId = id;
              if (id === "savoir-faire" && window.innerWidth >= 768) {
                targetId = "savoir-faire-desktop";
              }
              const element = document.getElementById(targetId);
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }, 500);
          }}
        />
      </div>
    </motion.div>
  );
};

export default ServiceDetailPage;
