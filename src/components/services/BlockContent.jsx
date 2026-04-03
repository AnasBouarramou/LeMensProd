// src/components/services/BlockContent.jsx
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoBackground from "../common/VideoBackground";
import VimeoModal from "../common/VimeoModal";

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
      >
        {!isHidden && (
          <>
            <VideoBackground
              ref={blockVideoRef}
              videoSrc={videoSrc}
              poster={blockConfig.poster}
              className="brightness-[0.7]"
            />
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
                    onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                    className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-200 transition-colors shrink-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-neutral-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
                  onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
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
          <div className={`flex items-center gap-3 ${isRight ? "justify-end" : ""}`}>
            {isRight ? (
              <>
                <span className="text-white/50 text-xs uppercase tracking-widest font-medium">{blockConfig.tag}</span>
                <span className="text-white text-xs border border-white/30 rounded-full px-4 py-1.5 font-bold uppercase tracking-widest backdrop-blur-sm">{index}</span>
              </>
            ) : (
              <>
                <span className="text-white text-xs border border-white/30 rounded-full px-4 py-1.5 font-bold uppercase tracking-widest backdrop-blur-sm">{index}</span>
                <span className="text-white/50 text-xs uppercase tracking-widest font-medium">{blockConfig.tag}</span>
              </>
            )}
          </div>

          <div className={isRight ? "text-right" : ""}>
            <h3
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.95] mb-3"
              dangerouslySetInnerHTML={{ __html: blockConfig.title }}
            />
            <p className={`text-white/50 text-sm font-medium mb-3 max-w-xs ${isRight ? "ml-auto" : ""}`}>
              {blockConfig.subtitle}
            </p>
            {blockConfig.equipment && (
              <div className={`flex items-center gap-2 mb-6 ${isRight ? "justify-end" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-neutral-400 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
                <span className="text-neutral-400 text-xs font-light">{blockConfig.equipment}</span>
              </div>
            )}
            <div className={`flex items-center gap-4 ${isRight ? "justify-end" : ""}`}>
              {!isRight && (
                <button
                  onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
                  className="group/cta flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 hover:bg-white hover:text-neutral-900 transition-all duration-300"
                >
                  <span className="text-[0.65rem] uppercase tracking-widest font-bold text-white group-hover/cta:text-neutral-900">En savoir plus</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-white group-hover/cta:text-neutral-900 group-hover/cta:-translate-y-0.5 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </button>
              )}
              <span className="text-[0.65rem] uppercase tracking-widest font-bold text-white/40 hidden md:block">
                {blockConfig.client}
              </span>
              {isRight && (
                <button
                  onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
                  className="group/cta flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 hover:bg-white hover:text-neutral-900 transition-all duration-300"
                >
                  <span className="text-[0.65rem] uppercase tracking-widest font-bold text-white group-hover/cta:text-neutral-900">En savoir plus</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-white group-hover/cta:text-neutral-900 group-hover/cta:-translate-y-0.5 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
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

export default BlockContent;
