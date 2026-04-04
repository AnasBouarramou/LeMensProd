// src/components/sections/HeroGrid.jsx
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import HeroGridDesktop from "./HeroGridDesktop";
import SidebarCard from "../services/SidebarCard";
import VideoBackground from "../common/VideoBackground";
import VimeoModal from "../common/VimeoModal";
import { VIDEOS } from "../../config/content";
import { useIsMobile } from "../../hooks/useIsMobile";

const cards = [
  { bgColor: "bg-orange-500", videoSrc: VIDEOS.leftTop,     poster: VIDEOS.leftTopPoster,    title: "Snack Content",  subtitle: "Capter l'attention",     page: "snack" },
  { bgColor: "bg-rose-500",   videoSrc: VIDEOS.leftBottom,  poster: VIDEOS.leftBottomPoster,  title: "Production",     subtitle: "Raconter votre histoire", page: "production" },
  { bgColor: "bg-violet-500", videoSrc: VIDEOS.rightBottom, poster: VIDEOS.rightBottomPoster, title: "Live / Multicam",subtitle: "Connecter le réel",       page: "live" },
  { bgColor: "bg-emerald-500",videoSrc: VIDEOS.rightTop,    poster: VIDEOS.rightTopPoster,    title: "Immobilier",     subtitle: "Révéler les espaces",     page: "immo" },
];

const mobileCardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const mobileTitleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HeroGrid = ({ progress, setActivePage, containerRef }) => {
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const heroVideoRef = useRef(null);
  const isMobile = useIsMobile();

  const handleOpenShowreel = () => {
    heroVideoRef.current?.pause();
    setIsShowreelOpen(true);
  };

  const handleCloseShowreel = () => {
    setIsShowreelOpen(false);
    heroVideoRef.current?.play();
  };

  return (
    <>
      {/* ========== VERSION DESKTOP ========== */}
      {!isMobile && (
        <HeroGridDesktop
          progress={progress}
          setActivePage={setActivePage}
          containerRef={containerRef}
          heroVideoRef={heroVideoRef}
          onOpenShowreel={handleOpenShowreel}
        />
      )}

      {/* ========== VERSION MOBILE ========== */}
      {isMobile && (
      <div className="bg-neutral-100" id="hero-mobile">
        <section className="relative h-[100dvh] mx-0 mt-0 overflow-hidden bg-neutral-900">
          <VideoBackground
            ref={heroVideoRef}
            videoSrc={VIDEOS.hero}
            poster={VIDEOS.heroPoster}
            className="scale-[1.1]"
            eager
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center pointer-events-none"
          >
            <img src="/img/logo_white.webp" alt="Lemen's Prod" className="h-32 sm:h-36 w-auto drop-shadow-lg" />
            <p className="mt-5 font-serif italic text-xl sm:text-2xl drop-shadow-md text-center leading-snug">
              Vos concurrents font des vidéos.
            </p>
            <p className="mt-2 font-montserrat font-light uppercase tracking-[0.25em] text-[0.6rem] opacity-60 drop-shadow-md text-center">
              Nous créons de l'attention.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-0 left-0 w-full px-6 pb-10 flex flex-col items-center"
          >
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group pointer-events-auto flex items-center gap-4 text-white cursor-pointer"
            >
              <div className="h-px w-8 bg-white/30" />
              <span className="uppercase text-[0.6rem] tracking-[0.2em] font-bold opacity-70">Créer votre projet</span>
              <div className="h-px w-8 bg-white/30" />
            </button>
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
      )}

      <VimeoModal
        isOpen={isShowreelOpen}
        onClose={handleCloseShowreel}
        videoId=""
      />
    </>
  );
};

export default HeroGrid;
