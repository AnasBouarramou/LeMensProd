// src/components/sections/HeroGrid.jsx
import { useState, useRef } from "react";
import { motion, useTransform } from "framer-motion";
import SidebarCard from "../services/SidebarCard";
import VideoBackground from "../common/VideoBackground";
import VimeoModal from "../common/VimeoModal";
import { VIDEOS } from "../../config/content";
import { useIsMobile } from "../../hooks/useIsMobile";

const HeroGrid = ({ progress, setActivePage, containerRef }) => {
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const heroVideoRef = useRef(null);
  const ANIM_END = 0.5;
  const isMobile = useIsMobile();

  // ========== ANIMATIONS DESKTOP (useTransform - appelés inconditionnellement) ==========
  const centerWidth = useTransform(progress, [0, 0.7], ["96vw", "32vw"]);
  const centerHeight = useTransform(progress, [0, 0.7], ["94vh", "65vh"]);
  const borderRadius = useTransform(progress, [0, 0.7], ["24px", "32px"]);
  const centerScale = useTransform(progress, [0, 0.7], [1.02, 1]);

  const sideContainerWidth = useTransform(
    progress,
    [0, ANIM_END],
    ["0vw", "26vw"],
  );
  const sideOpacity = useTransform(progress, [0.2, 0.6], [0, 1]);
  const sideY = useTransform(progress, [0, ANIM_END], ["10%", "0%"]);

  const gap = useTransform(progress, [0, ANIM_END], ["0rem", "1.5rem"]);
  const containerPt = useTransform(progress, [0, 0.7], ["0px", "180px"]);

  const textOpacity = useTransform(progress, [0, 0.2], [1, 0]);
  const textScale = useTransform(progress, [0, 0.2], [1, 0.6]);
  const textY = useTransform(progress, [0, 0.2], ["0%", "-50%"]);
  const textBlur = useTransform(progress, [0, 0.2], ["0px", "10px"]);

  const sfTitleOpacity = useTransform(progress, [0.2, 0.45], [0, 1]);
  const sfTitleY = useTransform(progress, [0.2, 0.45], ["30px", "0px"]);
  const sfUnderlineWidth = useTransform(progress, [0.25, 0.5], ["0px", "96px"]);

  const leftTopX = useTransform(progress, [0.05, 0.85], ["-120%", "0%"]);
  const leftBottomX = useTransform(progress, [0.1, 0.9], ["-120%", "0%"]);
  const rightTopX = useTransform(progress, [0.05, 0.85], ["120%", "0%"]);
  const rightBottomX = useTransform(progress, [0.1, 0.9], ["120%", "0%"]);

  // ========== DONNÉES DES CARTES ==========
  const cards = [
    {
      bgColor: "bg-orange-500",
      videoSrc: VIDEOS.leftTop,
      poster: VIDEOS.leftTopPoster,
      title: "Snack Content",
      subtitle: "Capter l'attention",
      page: "snack",
    },
    {
      bgColor: "bg-rose-500",
      videoSrc: VIDEOS.leftBottom,
      poster: VIDEOS.leftBottomPoster,
      title: "Production",
      subtitle: "Raconter votre histoire",
      page: "production",
    },
    {
      bgColor: "bg-violet-500",
      videoSrc: VIDEOS.rightBottom,
      poster: VIDEOS.rightBottomPoster,
      title: "Live / Multicam",
      subtitle: "Connecter le réel",
      page: "live",
    },
    {
      bgColor: "bg-emerald-500",
      videoSrc: VIDEOS.rightTop,
      poster: VIDEOS.rightTopPoster,
      title: "Immobilier",
      subtitle: "Révéler les espaces",
      page: "immo",
    },
  ];

  // ========== VARIANTS POUR ANIMATIONS MOBILE ==========
  const mobileCardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const mobileTitleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* ========== VERSION DESKTOP (md et +) ========== */}
      <div
        ref={containerRef}
        className="hidden md:block h-[300vh] relative"
        id="hero"
      >
        {/* Ancre invisible placée à la fin de l'animation (desktop uniquement) */}
        <div
          id="savoir-faire-desktop"
          className="absolute top-[200vh] left-0 w-full h-1 pointer-events-none"
        />

        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-neutral-100">
          {/* Titre Savoir Faire */}
          <motion.div
            className="absolute top-[100px] left-0 right-0 flex flex-col items-center z-[60] pointer-events-none"
            style={{ opacity: sfTitleOpacity, y: sfTitleY }}
          >
            <h2 className="font-montserrat font-light text-2xl md:text-3xl text-center uppercase tracking-[0.2em] text-neutral-800">
              Savoir Faire
            </h2>
            <motion.div
              className="h-[2px] bg-neutral-900 mt-6"
              style={{ width: sfUnderlineWidth }}
            />
          </motion.div>

          <motion.div
            className="flex items-center justify-center h-full w-full"
            style={{
              gap,
              paddingTop: containerPt,
              willChange: "width, height, border-radius",
            }}
          >
            {/* COLONNE GAUCHE */}
            <motion.div
              style={{
                width: sideContainerWidth,
                opacity: sideOpacity,
                y: sideY,
                willChange: "width, height, border-radius",
              }}
              className="flex flex-col gap-6 justify-center overflow-hidden h-[65vh] shrink-0 origin-right"
            >
              <div className="w-full h-full flex flex-col gap-4 lg:gap-6">
                <motion.div
                  style={{ x: leftTopX }}
                  className="h-[60%] w-full"
                >
                  <SidebarCard
                    heightClass="h-full"
                    bgColor="bg-orange-500"
                    videoSrc={VIDEOS.leftTop}
                    poster={VIDEOS.leftTopPoster}
                    title="Snack Content"
                    subtitle="Capter l'attention"
                    onClick={() => setActivePage("snack")}
                  />
                </motion.div>
                <motion.div
                  style={{ x: leftBottomX }}
                  className="h-[40%] w-full"
                >
                  <SidebarCard
                    heightClass="h-full"
                    bgColor="bg-rose-500"
                    videoSrc={VIDEOS.leftBottom}
                    poster={VIDEOS.leftBottomPoster}
                    title="Production"
                    subtitle="Raconter votre histoire"
                    onClick={() => setActivePage("production")}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* CENTRE (HERO) */}
            <motion.div
              className="relative z-50 overflow-hidden flex-shrink-0 origin-center bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{
                width: centerWidth,
                height: centerHeight,
                borderRadius: borderRadius,
                scale: centerScale,
              }}
            >
              <motion.div
                className="absolute inset-0 w-full h-full"
                style={{ borderRadius: borderRadius, overflow: "hidden" }}
              >
                {/* Hero desktop : ne rend la vidéo que si on est pas en mobile */}
                {!isMobile && (
                  <VideoBackground
                    ref={heroVideoRef}
                    videoSrc={VIDEOS.hero}
                    poster={VIDEOS.heroPoster}
                    className="scale-[1.1]"
                  />
                )}
              </motion.div>

              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center pointer-events-none"
                style={{
                  opacity: textOpacity,
                  scale: textScale,
                  y: textY,
                  filter: textBlur,
                }}
              >
                <img src="/img/logo.svg" alt="Lemen's Prod" className="h-28 md:h-48 w-auto drop-shadow-lg" />
                <p className="mt-4 text-xl md:text-2xl font-light tracking-widest uppercase drop-shadow-md">
                  Positionnement. Image. Impact.
                </p>
              </motion.div>

              {/* Barre de bas : scroll indicators + bouton Showreel centré */}
              <motion.div
                style={{ opacity: textOpacity }}
                className="absolute bottom-0 left-0 w-full px-8 pb-8 grid grid-cols-3 items-end text-white z-20"
              >
                {/* Gauche : Explorer */}
                <div className="flex flex-col gap-2 items-center opacity-80 pointer-events-none mix-blend-difference w-fit">
                  <span className="uppercase text-[0.65rem] tracking-widest font-bold">Explorer</span>
                  <motion.svg
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </motion.svg>
                </div>

                {/* Centre : Bouton Showreel */}
                <div className="flex items-center justify-center">
                  <motion.button
                    onClick={() => {
                      heroVideoRef.current?.pause();
                      setIsShowreelOpen(true);
                    }}
                    className="group flex items-center gap-4 cursor-pointer"
                    whileHover="hover"
                    initial="rest"
                  >
                    <motion.div
                      variants={{ rest: { scaleX: 1 }, hover: { scaleX: 1.15 } }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="h-px w-10 bg-white/40 origin-right"
                    />
                    <div className="flex items-center gap-2.5 text-white">
                      <motion.span
                        variants={{ rest: { scale: 1 }, hover: { scale: 1.2 } }}
                        transition={{ duration: 0.3 }}
                        className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-colors duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                          className="w-2.5 h-2.5 translate-x-px text-white group-hover:text-neutral-900 transition-colors duration-300">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.span>
                      <span className="uppercase text-[0.6rem] tracking-[0.2em] font-bold opacity-70 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Voir le Showreel
                      </span>
                    </div>
                    <motion.div
                      variants={{ rest: { scaleX: 1 }, hover: { scaleX: 1.15 } }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="h-px w-10 bg-white/40 origin-left"
                    />
                  </motion.button>
                </div>

                {/* Droite : Scroll indicator */}
                <div className="flex gap-4 items-center justify-end opacity-80 pointer-events-none mix-blend-difference">
                  <span className="uppercase text-[0.65rem] tracking-widest font-bold text-right hidden md:block">
                    Scroller<br />Vers le bas
                  </span>
                  <div className="w-5 h-8 rounded-full border-2 border-white flex justify-center p-1 relative overflow-hidden">
                    <motion.div
                      animate={{ y: [0, 12], opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                      className="w-1 h-1.5 bg-white rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* COLONNE DROITE */}
            <motion.div
              style={{
                width: sideContainerWidth,
                opacity: sideOpacity,
                y: sideY,
              }}
              className="flex flex-col gap-6 justify-center overflow-hidden h-[65vh] shrink-0 origin-left"
            >
              <div className="w-full h-full flex flex-col gap-4 lg:gap-6">
                <motion.div
                  style={{ x: rightTopX }}
                  className="h-[35%] w-full"
                >
                  <SidebarCard
                    heightClass="h-full"
                    bgColor="bg-violet-500"
                    videoSrc={VIDEOS.rightBottom}
                    poster={VIDEOS.rightBottomPoster}
                    title="Live / Multicam"
                    subtitle="Connecter le réel"
                    onClick={() => setActivePage("live")}
                  />
                </motion.div>
                <motion.div
                  style={{ x: rightBottomX }}
                  className="h-[65%] w-full"
                >
                  <SidebarCard
                    heightClass="h-full"
                    bgColor="bg-emerald-500"
                    videoSrc={VIDEOS.rightTop}
                    poster={VIDEOS.rightTopPoster}
                    title="Immobilier"
                    subtitle="Révéler les espaces"
                    onClick={() => setActivePage("immo")}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ========== VERSION MOBILE (< md) ========== */}
      <div className="block md:hidden bg-neutral-100" id="hero-mobile">
        {/* HERO SECTION MOBILE */}
        <section className="relative h-[100dvh] mx-0 mt-0 overflow-hidden bg-neutral-900">
          {/* Hero mobile : ne rend la vidéo que si on est en mobile */}
          {isMobile && (
            <VideoBackground ref={heroVideoRef} videoSrc={VIDEOS.hero} poster={VIDEOS.heroPoster} className="scale-[1.1]" />
          )}

          {/* Overlay dégradé */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Contenu Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center pointer-events-none"
          >
            <img src="/img/logo.svg" alt="Lemen's Prod" className="h-24 sm:h-28 w-auto drop-shadow-lg" />
            <p className="mt-3 text-base sm:text-lg font-light tracking-wider uppercase drop-shadow-md max-w-xs">
              Positionnement. Image. Impact.
            </p>
          </motion.div>

          {/* Bas du hero mobile : bouton Showreel + indicateur scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-0 left-0 w-full px-6 pb-8 flex flex-col items-center gap-5"
          >
            {/* Bouton Showreel */}
            <button
              onClick={() => {
                heroVideoRef.current?.pause();
                setIsShowreelOpen(true);
              }}
              className="group flex items-center gap-3 text-white active:scale-95 transition-transform"
            >
              <div className="h-px w-8 bg-white/30" />
              <span className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center group-active:bg-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  className="w-2.5 h-2.5 translate-x-px text-white group-active:text-neutral-900 transition-colors">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="uppercase text-[0.6rem] tracking-[0.2em] font-bold opacity-70">
                Voir le Showreel
              </span>
              <div className="h-px w-8 bg-white/30" />
            </button>

            {/* Indicateur scroll */}
            <div className="flex flex-col items-center gap-2 text-white">
              <span className="uppercase text-[0.55rem] tracking-widest font-medium opacity-50">
                Explorer
              </span>
              <motion.svg
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-50"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </motion.svg>
            </div>
          </motion.div>
        </section>

        {/* TITRE SAVOIR FAIRE MOBILE */}
        <motion.section
          id="savoir-faire"
          variants={mobileTitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="py-12 px-4 flex flex-col items-center"
        >
          <h2 className="font-montserrat font-light text-xl sm:text-2xl text-center uppercase tracking-[0.2em] text-neutral-800">
            Savoir Faire
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-[2px] bg-neutral-900 mt-4"
          />
        </motion.section>

        {/* GRILLE DE CARTES MOBILE */}
        <section className="px-4 pb-8 flex flex-col gap-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.page}
              variants={mobileCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={index}
              className="h-[50vh]"
            >
              <SidebarCard
                heightClass="h-full"
                bgColor={card.bgColor}
                videoSrc={card.videoSrc}
                poster={card.poster}
                title={card.title}
                subtitle={card.subtitle}
                onClick={() => setActivePage(card.page)}
              />
            </motion.div>
          ))}
        </section>
      </div>

      {/* Modale Showreel */}
      <VimeoModal
        isOpen={isShowreelOpen}
        onClose={() => {
          setIsShowreelOpen(false);
          heroVideoRef.current?.play();
        }}
        videoId=""
      />
    </>
  );
};

export default HeroGrid;
