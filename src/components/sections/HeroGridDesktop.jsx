// src/components/sections/HeroGridDesktop.jsx
// Desktop-only portion of HeroGrid — isolates all scroll-based useTransform hooks.
import { motion, useTransform } from "framer-motion";
import SidebarCard from "../services/SidebarCard";
import VideoBackground from "../common/VideoBackground";
import { VIDEOS } from "../../config/content";

const ANIM_END = 0.5;

const HeroGridDesktop = ({
  progress,
  setActivePage,
  containerRef,
  heroVideoRef,
}) => {
  // Acte 2 — Centre se contracte (après dissolution du texte)
  const centerWidth  = useTransform(progress, [0.12, 0.52], ["96vw", "32vw"]);
  const centerHeight = useTransform(progress, [0.12, 0.52], ["94vh", "65vh"]);
  const borderRadius = useTransform(progress, [0.12, 0.52], ["24px", "32px"]);

  // Acte 2 — Colonnes latérales émergent de l'espace libéré
  const sideContainerWidth = useTransform(progress, [0.25, 0.52], ["0vw",  "26vw"]);
  const sideOpacity        = useTransform(progress, [0.28, 0.52], [0,      1]);
  const sideY              = useTransform(progress, [0.25, 0.52], ["5%",   "0%"]);

  // Acte 2 — Layout conteneur (aligné sur la même phase)
  const gap         = useTransform(progress, [0.25, 0.52], ["0rem", "1.5rem"]);
  const containerPt = useTransform(progress, [0.18, 0.52], ["0px",  "140px"]);

  // Acte 1 — Texte hero se dissout doucement
  const textOpacity = useTransform(progress, [0,    0.12], [1,     0]);
  const textScale   = useTransform(progress, [0,    0.12], [1,     0.94]);
  const textY       = useTransform(progress, [0,    0.12], ["0%",  "-6%"]);
  const textBlur    = useTransform(progress, [0,    0.12], ["0px", "12px"]);

  // Acte 2 — Titre "Savoir Faire" cadre l'entrée des cartes
  const sfTitleOpacity   = useTransform(progress, [0.18, 0.36], [0,      1]);
  const sfTitleY         = useTransform(progress, [0.18, 0.36], ["48px", "0px"]);
  const sfUnderlineWidth = useTransform(progress, [0.22, 0.40], ["0px",  "96px"]);

  // Acte 3 — Cartes : stagger organique avec Y-drift croisé
  const leftTopX    = useTransform(progress, [0.38, 0.66], ["-58%", "0%"]);
  const leftTopY    = useTransform(progress, [0.38, 0.66], ["-4%",  "0%"]);
  const leftBottomX = useTransform(progress, [0.43, 0.70], ["-68%", "0%"]);
  const leftBottomY = useTransform(progress, [0.43, 0.70], ["4%",   "0%"]);
  const rightTopX    = useTransform(progress, [0.38, 0.66], ["58%",  "0%"]);
  const rightTopY    = useTransform(progress, [0.38, 0.66], ["-4%",  "0%"]);
  const rightBottomX = useTransform(progress, [0.43, 0.70], ["68%",  "0%"]);
  const rightBottomY = useTransform(progress, [0.43, 0.70], ["4%",   "0%"]);

  return (
    <div ref={containerRef} className="h-[300vh] relative" id="hero">
      <div id="savoir-faire-desktop" className="absolute top-[200vh] left-0 w-full h-1 pointer-events-none" />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-neutral-100">
        {/* Titre Savoir Faire */}
        <motion.div
          className="absolute top-[140px] left-0 right-0 flex flex-col items-center z-[60] pointer-events-none"
          style={{ opacity: sfTitleOpacity, y: sfTitleY }}
        >
          <h2 className="font-montserrat font-light text-2xl md:text-3xl text-center uppercase tracking-[0.2em] text-neutral-800">
            Savoir Faire
          </h2>
          <motion.div className="h-[2px] bg-neutral-900 mt-6" style={{ width: sfUnderlineWidth }} />
        </motion.div>

        <motion.div
          className="flex items-center justify-center h-full w-full"
          style={{ gap, paddingTop: containerPt, willChange: "width, height, border-radius" }}
        >
          {/* COLONNE GAUCHE */}
          <motion.div
            style={{ width: sideContainerWidth, opacity: sideOpacity, y: sideY, willChange: "width, height, border-radius" }}
            className="flex flex-col gap-6 justify-center overflow-hidden h-[65vh] shrink-0 origin-right"
          >
            <div className="w-full h-full flex flex-col gap-4 lg:gap-6">
              <motion.div style={{ x: leftTopX, y: leftTopY }} className="h-[60%] w-full">
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
              <motion.div style={{ x: leftBottomX, y: leftBottomY }} className="h-[40%] w-full">
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
            style={{ width: centerWidth, height: centerHeight, borderRadius }}
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ borderRadius, overflow: "hidden" }}
            >
              <VideoBackground
                ref={heroVideoRef}
                videoSrc={VIDEOS.hero}
                poster={VIDEOS.heroPoster}
                className="scale-[1.1]"
                eager
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center pointer-events-none"
              style={{ opacity: textOpacity, scale: textScale, y: textY, filter: textBlur }}
            >
              <img src="/img/logo_white.webp" alt="Lemen's Prod" className="h-36 md:h-64 w-auto drop-shadow-lg" />
              <p className="mt-6 font-serif italic text-2xl md:text-4xl drop-shadow-md text-center leading-snug">
                Vos concurrents font des vidéos.
              </p>
              <p className="mt-2 font-montserrat font-light uppercase tracking-[0.25em] text-[0.65rem] md:text-xs opacity-60 drop-shadow-md text-center">
                Nous créons de l'attention.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: textOpacity }}
              className="absolute bottom-0 left-0 w-full px-8 pb-12 flex items-end justify-between text-white z-20"
            >
              {/* Centre : Créer votre projet */}
              <div className="flex-1 flex justify-center">
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="group pointer-events-auto flex items-center gap-4 text-white cursor-pointer"
                >
                  <div className="h-px w-10 bg-white/30 group-hover:bg-white/60 transition-colors duration-300" />
                  <span className="uppercase text-[0.65rem] tracking-[0.2em] font-bold opacity-70 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Créer votre projet
                  </span>
                  <div className="h-px w-10 bg-white/30 group-hover:bg-white/60 transition-colors duration-300" />
                </button>
              </div>

              {/* Droite : Scroll indicator */}
              <div className="flex flex-col items-center gap-2">
                <span className="uppercase text-[0.6rem] tracking-widest font-bold text-white/60">Scroll</span>
                <div className="w-5 h-8 rounded-full border-2 border-white/40 flex justify-center p-1 relative overflow-hidden">
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
            style={{ width: sideContainerWidth, opacity: sideOpacity, y: sideY }}
            className="flex flex-col gap-6 justify-center overflow-hidden h-[65vh] shrink-0 origin-left"
          >
            <div className="w-full h-full flex flex-col gap-4 lg:gap-6">
              <motion.div style={{ x: rightTopX, y: rightTopY }} className="h-[35%] w-full">
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
              <motion.div style={{ x: rightBottomX, y: rightBottomY }} className="h-[65%] w-full">
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
  );
};

export default HeroGridDesktop;
