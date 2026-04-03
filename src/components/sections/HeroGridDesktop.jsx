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
  onOpenShowreel,
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
  const containerPt = useTransform(progress, [0.18, 0.52], ["0px",  "180px"]);

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
          className="absolute top-[120px] left-0 right-0 flex flex-col items-center z-[60] pointer-events-none"
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
              <img src="/img/logo.svg" alt="Lemen's Prod" className="h-28 md:h-48 w-auto drop-shadow-lg" />
              <p className="mt-6 font-serif italic text-2xl md:text-4xl drop-shadow-md text-center leading-snug">
                Vos concurrents font des vidéos.
              </p>
              <p className="mt-2 font-montserrat font-light uppercase tracking-[0.25em] text-[0.65rem] md:text-xs opacity-60 drop-shadow-md text-center">
                Nous créons de l'attention.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: textOpacity }}
              className="absolute bottom-0 left-0 w-full px-8 pb-12 flex items-end justify-center text-white z-20"
            >
              {/* Centre : Créer votre projet + Showreel */}
              <div className="flex flex-row items-center gap-6">
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

                <motion.button
                  onClick={onOpenShowreel}
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
