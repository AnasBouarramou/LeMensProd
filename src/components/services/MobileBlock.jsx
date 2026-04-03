// src/components/services/MobileBlock.jsx
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import VideoBackground from "../common/VideoBackground";

const mobileBlockVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const MobileBlock = ({ block, index, configAccent }) => {
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
          <p className="text-white/50 text-sm font-medium mb-2 max-w-[280px]">
            {block.subtitle}
          </p>
          {block.equipment && (
            <div className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-neutral-400 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
              <span className="text-neutral-400 text-[0.65rem] font-light">{block.equipment}</span>
            </div>
          )}
          <MobileBlockExpand blockConfig={block} configAccent={configAccent} />
        </div>
      </div>
    </motion.div>
  );
};

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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 text-white group-hover/cta:text-neutral-900">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-neutral-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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

export default MobileBlock;
