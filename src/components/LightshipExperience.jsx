import React, { useRef, useState, useEffect } from "react";
import { PopupModal } from "react-calendly";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useInView, // INDISPENSABLE pour le compteur
  useMotionValue, // INDISPENSABLE pour le compteur
} from "framer-motion";
// --- CONFIGURATION DES ANIMATIONS (NOUVEAU) ---
// Ces constantes assurent que toutes les sections ont la même "physique"
// --- CONFIGURATION DES ANIMATIONS (CORRIGÉE) ---
const CUSTOM_EASE = [0.25, 0.1, 0.25, 1]; // Une courbe très fluide (type easeOutQuint)

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0, // Un peu plus rapide pour être dynamique
      ease: CUSTOM_EASE,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Délai entre chaque enfant
      delayChildren: 0.1,
    },
  },
};

// --- CONFIGURATION DES VIDÉOS ---
const VIDEOS = {
  hero: "file.mp4",
  leftTop: "file.mp4",
  leftBottom: "file.mp4",
  rightTop: "file.mp4",
  rightBottom: "file.mp4",
};

// --- LOGOS ---
const LOGOS = [
  {
    name: "Netflix",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Spotify",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  },
  {
    name: "Amazon",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Google",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    name: "Tesla",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
  },
  {
    name: "BMW",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  },
  {
    name: "Netflix",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Spotify",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  },
  {
    name: "Amazon",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Google",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    name: "Tesla",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
  },
  {
    name: "BMW",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  },
];
const SNACK_PROJECTS = [
  { id: 1, title: "TikTok Fashion", client: "Modeiva", color: "bg-orange-500" },
  { id: 2, title: "Reel Food", client: "TastyBites", color: "bg-neutral-800" },
  { id: 3, title: "Story Event", client: "RedBull", color: "bg-neutral-800" },
  { id: 4, title: "Shorts Tech", client: "Samsung", color: "bg-orange-500" },
];

// --- TEMOIGNAGES ---
const TESTIMONIALS = [
  {
    id: 0,
    company: "Skodia",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
    quote:
      "Lemen's Prod a complètement transformé ma façon d'aborder la création de contenu. Au lieu de me sentir submergée par les choix, j'ai eu l'impression d'avoir un directeur artistique à mes côtés 24/7.",
    name: "Sophia Martinez",
    role: "CMO & Passionnée de Marque",
  },
  {
    id: 1,
    company: "Architek",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
    quote:
      "Une vision cinématographique qui a sublimé nos projets immobiliers. Le rendu est au-delà de nos espérances, avec une précision technique rare.",
    name: "Thomas Verdier",
    role: "Fondateur & Architecte",
  },
  {
    id: 2,
    company: "Modeiva",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2942&auto=format&fit=crop",
    quote:
      "Réactivité, créativité et une maîtrise de l'image impressionnante. Lemen's Prod est devenu notre partenaire incontournable pour chaque campagne.",
    name: "Elise Dubois",
    role: "Directrice Artistique",
  },
];

// --- OFFRES ---
const OFFERS = [
  {
    title: "Essentiel",
    price: "1 500€",
    desc: "Pour les marques qui se lancent.",
    features: [
      "Tournage 1/2 journée",
      "Montage dynamique",
      "1 format (Reel/TikTok)",
      "Livraison J+3",
    ],
    style: "white",
  },
  {
    title: "Signature",
    price: "3 500€",
    desc: "L'expérience complète Lemen's.",
    features: [
      "Tournage journée complète",
      "Direction Artistique",
      "3 formats déclinaisons",
      "Drone FPV inclus",
      "Retouches illimitées",
    ],
    style: "black",
    badge: "Best Seller",
  },
  {
    title: "Sur-Mesure",
    price: "Devis",
    desc: "Productions d'envergure.",
    features: [
      "Équipe cinéma complète",
      "Casting & Repérages",
      "Post-prod VFX avancée",
      "Gestion droits TV/Ciné",
    ],
    style: "white",
  },
];

// --- COMPOSANT ANIMATED NUMBER (Le compteur) ---
// À placer en dehors de ton composant principal
const AnimatedNumber = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

// --- NAVBAR ---
const Navbar = ({ progress }) => {
  const logoOpacity = useTransform(progress, [0.15, 0.3], [0, 1]);
  const logoY = useTransform(progress, [0.15, 0.3], [20, 0]);
  const logoScale = useTransform(progress, [0.15, 0.3], [1.5, 1]);

  return (
    <motion.nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center text-white mix-blend-difference">
      <motion.div
        style={{
          opacity: logoOpacity,
          y: logoY,
          scale: logoScale,
          transformOrigin: "left center",
        }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="w-8 h-8 bg-white rounded-full" />
        <span className="font-bold tracking-tighter text-xl">LEMEN'S PROD</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex gap-8 items-center"
      >
        {["l'agence", "savoir faire", "Projet"].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className="uppercase text-xs font-bold tracking-widest hover:opacity-70 transition-opacity"
          >
            {item}
          </a>
        ))}
      </motion.div>
    </motion.nav>
  );
};

// --- SIDEBAR CARD ---
const SidebarCard = ({
  videoSrc,
  bgColor,
  title,
  subtitle,
  heightClass,
  onClick,
}) => {
  const videoRef = useRef(null);
  const ctaContainerVariants = {
    initial: { opacity: 0.6 },
    hover: { opacity: 1, transition: { duration: 0.3 } },
  };
  const ctaLabelVariants = {
    initial: { opacity: 0, x: -10, display: "none" },
    hover: {
      opacity: 1,
      x: 0,
      display: "block",
      transition: { duration: 0.3, delay: 0.1 },
    },
  };
  const ctaArrowVariants = {
    initial: { x: 0, y: 0 },
    hover: {
      x: 3,
      y: -3,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  return (
    <motion.div
      onClick={onClick} // AJOUT IMPORTANT ICI
      className={`w-full ${heightClass} ${bgColor} rounded-[2rem] overflow-hidden relative group cursor-pointer`}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => videoRef.current?.play()}
      onHoverEnd={() => videoRef.current?.pause()}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        className="w-full h-full object-cover mix-blend-multiply opacity-80 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10 flex items-end justify-between">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold uppercase tracking-tight">
            {title}
          </h3>
          <p className="text-sm font-medium opacity-80 mt-1">{subtitle}</p>
        </div>
        <motion.div
          variants={ctaContainerVariants}
          className="flex items-center gap-2 mb-1"
        >
          <motion.span
            variants={ctaLabelVariants}
            className="text-[0.65rem] uppercase tracking-widest font-bold"
          >
            {onClick ? "Ouvrir" : "En savoir plus"}
          </motion.span>
          <motion.svg
            variants={ctaArrowVariants}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </motion.svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const ProcessIcon = ({ type }) => {
  const icons = {
    // Snack
    bolt: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    camera: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    scissors: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"
        />
      </svg>
    ),
    chart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
    // Production
    clipboard: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
        />
      </svg>
    ),
    film: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m2.625 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-2.625 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
        />
      </svg>
    ),
    palette: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
    rocket: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
        />
      </svg>
    ),
    // Immobilier
    mapPin: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
    photo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
        />
      </svg>
    ),
    sparkles: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
    ),
    home: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    // Live
    map: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
        />
      </svg>
    ),
    mic: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
        />
      </svg>
    ),
    boltSmall: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
    playCircle: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
        />
      </svg>
    ),
  };
  return icons[type] || null;
};

// --- VARIANTS D'ANIMATION ---
const serviceFadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] },
  },
};
const serviceStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};
const lineReveal = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: "circOut" } },
};
const widthReveal = {
  hidden: { width: 0 },
  visible: { width: 96, transition: { duration: 1, ease: "circOut" } },
};

// --- COMPOSANT RÉUTILISABLE ---
const ServiceDetailPage = ({ config, onBack }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // NOUVEAU
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.08,
    stiffness: 200,
    damping: 30,
    restDelta: 0.0001,
  });

  const [expandedLeft, setExpandedLeft] = useState(false);
  const [expandedRight, setExpandedRight] = useState(false);

  // --- Animations Hero ---
  const heroContentOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);
  const heroContentY = useTransform(smoothProgress, [0, 0.05], [0, -30]);
  const heroHeight = useTransform(smoothProgress, [0, 0.2], ["100%", "0%"]);
  const heroOpacity = useTransform(smoothProgress, [0.12, 0.22], [1, 0]);

  // --- Animations Split (plus rapide) ---
  const splitGap = useTransform(smoothProgress, [0.06, 0.18], ["0rem", "1rem"]);
  const splitOpacity = useTransform(smoothProgress, [0.08, 0.18], [0, 1]);
  const splitScale = useTransform(smoothProgress, [0.08, 0.18], [0.95, 1]);
  const leftBlockX = useTransform(smoothProgress, [0.08, 0.2], ["-8%", "0%"]);
  const rightBlockX = useTransform(smoothProgress, [0.08, 0.2], ["8%", "0%"]);

  // --- Contenu blocs (beaucoup plus rapide) ---
  const blockContentOpacity = useTransform(
    smoothProgress,
    [0.16, 0.22],
    [0, 1],
  );
  const blockContentY = useTransform(smoothProgress, [0.16, 0.22], [20, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-neutral-200 overflow-y-auto overflow-x-hidden font-sans"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
      }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      {/* ===== NAVBAR FIXE (toujours visible) ===== */}
      <motion.div
        className="fixed top-0 left-0 right-0 w-full px-8 py-5 flex justify-between items-center bg-neutral-200/80 backdrop-blur-md z-[310]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={onBack}
        >
          <div className="w-8 h-8 bg-neutral-900 rounded-full" />
          <span className="font-bold tracking-tighter text-xl text-neutral-900">
            LEMEN'S PROD
          </span>
        </div>
        <div className="flex gap-8 items-center">
          {["l'agence", "savoir faire", "Projet"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item}`}
              className="uppercase text-xs font-bold tracking-widest text-neutral-900 hover:opacity-50 transition-opacity"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col w-full">
        {/* ========== ZONE STICKY (Hero + Blocs) ========== */}
        <div className="h-[400vh] relative">
          <div className="sticky top-0 z-20 w-full flex flex-col h-screen pt-[72px]">
            <div className="flex flex-col flex-1 min-h-0 px-4 pb-4 gap-0">
              {/* HERO */}
              <motion.div
                style={{ height: heroHeight, opacity: heroOpacity }}
                className="w-full relative overflow-hidden rounded-[2rem] bg-neutral-900 shrink-0"
              >
                <video
                  src={config.heroVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover brightness-[0.8]"
                />
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
                      ease: [0.25, 0.1, 0.25, 1],
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

              {/* 2 BLOCS */}
              <motion.div
                style={{
                  gap: splitGap,
                  opacity: splitOpacity,
                  scale: splitScale,
                }}
                className="flex w-full flex-1 min-h-0"
              >
                {/* BLOC GAUCHE */}
                <motion.div
                  style={{ x: leftBlockX }}
                  className="flex-1 relative overflow-hidden rounded-[2rem] bg-neutral-900 shadow-xl"
                >
                  <video
                    src={config.blocks[0].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <AnimatePresence>
                    {expandedLeft && (
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{
                          type: "spring",
                          stiffness: 120,
                          damping: 20,
                        }}
                        className="absolute bottom-0 left-0 right-0 h-[50%] z-30 bg-stone-100/95 backdrop-blur-xl border-t border-stone-200 rounded-t-[1.5rem] rounded-b-[2rem] flex flex-col justify-between p-6 md:p-8 overflow-y-auto shadow-[0_-8px_30px_rgba(0,0,0,0.15)]"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-5">
                            <h3
                              className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-neutral-900 leading-[0.95]"
                              dangerouslySetInnerHTML={{
                                __html: config.blocks[0].expandTitle,
                              }}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedLeft(false);
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
                          <div
                            className={`w-12 h-[2px] ${config.accentBg} mb-4`}
                          />
                          <p className="text-neutral-600 text-sm font-light leading-relaxed mb-4">
                            {config.blocks[0].expandDesc}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {config.blocks[0].tags.map((item, i) => (
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
                            {config.blocks[0].client}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedLeft(false);
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
                    style={{ opacity: blockContentOpacity, y: blockContentY }}
                    className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 z-20"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-white text-xs border border-white/30 rounded-full px-4 py-1.5 font-bold uppercase tracking-widest backdrop-blur-sm">
                        01
                      </span>
                      <span className="text-white/50 text-xs uppercase tracking-widest font-medium">
                        {config.blocks[0].tag}
                      </span>
                    </div>
                    <div>
                      <h3
                        className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.95] mb-3"
                        dangerouslySetInnerHTML={{
                          __html: config.blocks[0].title,
                        }}
                      />
                      <p className="text-white/50 text-sm font-medium mb-6 max-w-xs">
                        {config.blocks[0].subtitle}
                      </p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedLeft(true);
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
                        <span className="text-[0.65rem] uppercase tracking-widest font-bold text-white/40 hidden md:block">
                          {config.blocks[0].client}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* BLOC DROIT */}
                <motion.div
                  style={{ x: rightBlockX }}
                  className="flex-1 relative overflow-hidden rounded-[2rem] bg-neutral-900 shadow-xl"
                >
                  <video
                    src={config.blocks[1].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <AnimatePresence>
                    {expandedRight && (
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{
                          type: "spring",
                          stiffness: 120,
                          damping: 20,
                        }}
                        className="absolute bottom-0 left-0 right-0 h-[50%] z-30 bg-stone-100/95 backdrop-blur-xl border-t border-stone-200 rounded-t-[1.5rem] rounded-b-[2rem] flex flex-col justify-between p-6 md:p-8 overflow-y-auto shadow-[0_-8px_30px_rgba(0,0,0,0.15)]"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-5">
                            <h3
                              className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-neutral-900 leading-[0.95]"
                              dangerouslySetInnerHTML={{
                                __html: config.blocks[1].expandTitle,
                              }}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedRight(false);
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
                          <div
                            className={`w-12 h-[2px] ${config.accentBg} mb-4`}
                          />
                          <p className="text-neutral-600 text-sm font-light leading-relaxed mb-4">
                            {config.blocks[1].expandDesc}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {config.blocks[1].tags.map((item, i) => (
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
                            {config.blocks[1].client}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedRight(false);
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
                    style={{ opacity: blockContentOpacity, y: blockContentY }}
                    className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 z-20"
                  >
                    <div className="flex items-center gap-3 justify-end">
                      <span className="text-white/50 text-xs uppercase tracking-widest font-medium">
                        {config.blocks[1].tag}
                      </span>
                      <span className="text-white text-xs border border-white/30 rounded-full px-4 py-1.5 font-bold uppercase tracking-widest backdrop-blur-sm">
                        02
                      </span>
                    </div>
                    <div className="text-right">
                      <h3
                        className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.95] mb-3"
                        dangerouslySetInnerHTML={{
                          __html: config.blocks[1].title,
                        }}
                      />
                      <p className="text-white/50 text-sm font-medium mb-6 max-w-xs ml-auto">
                        {config.blocks[1].subtitle}
                      </p>
                      <div className="flex items-center gap-4 justify-end">
                        <span className="text-[0.65rem] uppercase tracking-widest font-bold text-white/40 hidden md:block">
                          {config.blocks[1].client}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedRight(true);
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
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ========== CHIFFRES CLÉS ========== */}
        <motion.section
          className="bg-neutral-100 py-24 relative z-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={serviceStagger}
        >
          <div
            className="mx-auto"
            style={{ width: "calc(82vw + 3rem)", maxWidth: "100%" }}
          >
            <motion.div
              className="w-full h-px bg-neutral-300 mb-20"
              variants={lineReveal}
              style={{ originX: 0 }}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <motion.h2
                  className="text-4xl md:text-5xl font-serif italic text-neutral-900 leading-[1.1]"
                  variants={serviceFadeInUp}
                  dangerouslySetInnerHTML={{ __html: config.statsTitle }}
                />
              </div>
              <div className="lg:col-span-8 flex flex-col justify-between h-full">
                <motion.p
                  className="text-neutral-600 text-lg font-light leading-relaxed max-w-2xl mb-16"
                  variants={serviceFadeInUp}
                >
                  {config.statsDesc}
                </motion.p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 mb-4">
                  {config.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className={`flex flex-col pl-6 ${i > 0 ? "border-l border-neutral-300" : ""}`}
                      variants={serviceFadeInUp}
                    >
                      <span className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2 tracking-tighter">
                        <AnimatedNumber
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </span>
                      <span className="text-xs text-neutral-500 font-medium uppercase tracking-wide">
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
        <section className="bg-neutral-100 pb-32 relative z-50">
          <div
            className="mx-auto"
            style={{ width: "calc(82vw + 3rem)", maxWidth: "100%" }}
          >
            <motion.div
              className="flex flex-col items-center mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={serviceStagger}
            >
              <motion.h2
                className="font-montserrat font-light text-2xl md:text-3xl text-center uppercase tracking-[0.2em] text-neutral-800"
                variants={serviceFadeInUp}
              >
                Notre Process
              </motion.h2>
              <motion.div
                className="h-[2px] bg-neutral-900 mt-6"
                variants={widthReveal}
              />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
              <motion.div
                className="absolute top-[3.25rem] left-[12.5%] right-[12.5%] h-px bg-neutral-300 hidden md:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "circOut", delay: 0.3 }}
                style={{ originX: 0 }}
              />
              {config.process.map((step, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center px-6 relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.15 + i * 0.2,
                    duration: 0.9,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <motion.div
                    className={`w-[6.5rem] h-[6.5rem] rounded-full border-2 border-neutral-300 flex items-center justify-center mb-6 bg-neutral-100 relative z-10 group ${config.hoverAccent} transition-all duration-500 cursor-pointer`}
                    whileHover={{
                      scale: 1.1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      },
                    }}
                  >
                    <div className="flex flex-col items-center gap-1 text-neutral-900 group-hover:text-white transition-colors duration-500">
                      <ProcessIcon type={step.icon} />
                      <span className="text-[0.55rem] font-bold uppercase tracking-widest">
                        0{i + 1}
                      </span>
                    </div>
                  </motion.div>
                  <motion.h3
                    className="text-lg font-bold text-neutral-900 uppercase tracking-wide mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.2, duration: 0.6 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm text-neutral-500 font-light leading-relaxed max-w-[220px]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
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
        <section className="bg-neutral-900 py-28 relative z-50 overflow-hidden">
          <div
            className="mx-auto flex flex-col items-center text-center"
            style={{ width: "calc(82vw + 3rem)", maxWidth: "100%" }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={serviceStagger}
              className="flex flex-col items-center"
            >
              <motion.h2
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] mb-6"
                variants={serviceFadeInUp}
                dangerouslySetInnerHTML={{ __html: config.ctaTitle }}
              />
              <motion.p
                className="text-neutral-400 text-lg font-light leading-relaxed max-w-lg mb-12"
                variants={serviceFadeInUp}
              >
                {config.ctaDesc}
              </motion.p>
              <motion.div
                className="flex gap-4 flex-wrap justify-center"
                variants={serviceFadeInUp}
              >
                <motion.button
                  onClick={onBack}
                  className="group relative px-8 py-4 bg-white overflow-hidden rounded-2xl text-neutral-900"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <div className="absolute inset-0 bg-neutral-200 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-3 font-bold uppercase tracking-widest text-xs">
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
                  onClick={onBack}
                  className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-2xl text-white border border-white/20 hover:border-white/50 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 font-bold uppercase tracking-widest text-xs">
                    Nous contacter
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
            <div className="absolute -bottom-10 -right-10 text-[20rem] font-black text-white/[0.02] leading-none tracking-tighter select-none pointer-events-none">
              {config.ctaBgText}
            </div>
          </div>
        </section>

        {/* ========== FOOTER ========== */}
        <footer className="bg-neutral-900 text-white relative z-50 border-t border-neutral-800">
          <motion.div
            className="container mx-auto px-8 pt-20 pb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={serviceStagger}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <motion.div
                className="md:col-span-1 flex flex-col gap-5"
                variants={serviceFadeInUp}
              >
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={onBack}
                >
                  <div className="w-9 h-9 bg-white rounded-full" />
                  <span className="font-bold tracking-tighter text-2xl uppercase">
                    Lemen's Prod
                  </span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">
                  Sublimer le réel. Capturer l'essentiel. Production
                  audiovisuelle, snack content, immobilier et live.
                </p>
                <div className="flex gap-4 mt-2">
                  {[
                    <svg
                      key="ig"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>,
                    <svg
                      key="tk"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.19 8.19 0 0 0 4.76 1.52V6.79a4.83 4.83 0 0 1-1-.1z" />
                    </svg>,
                  ].map((icon, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
              {[
                {
                  title: "Navigation",
                  items: ["L'agence", "Savoir Faire", "Projets", "Contact"],
                  link: true,
                },
                {
                  title: "Services",
                  items: ["Snack Content", "Production", "Immobilier", "Live"],
                  link: false,
                },
                {
                  title: "Contact",
                  items: ["contact@lemensprod.com", "Paris, France"],
                  link: false,
                },
              ].map((col, ci) => (
                <motion.div
                  key={ci}
                  className="flex flex-col gap-4"
                  variants={serviceFadeInUp}
                >
                  <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white mb-2">
                    {col.title}
                  </h4>
                  {col.items.map((item) =>
                    col.link ? (
                      <a
                        key={item}
                        href="#"
                        onClick={onBack}
                        className="text-neutral-400 text-sm hover:text-white transition-colors duration-300 font-light"
                      >
                        {item}
                      </a>
                    ) : (
                      <span
                        key={item}
                        className="text-neutral-400 text-sm font-light"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </motion.div>
              ))}
            </div>
            <motion.div
              className="w-full h-px bg-neutral-800 mb-8"
              variants={lineReveal}
              style={{ originX: 0 }}
            />
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center gap-4"
              variants={serviceFadeInUp}
            >
              <p className="text-neutral-500 text-xs font-light tracking-wide">
                ©2025 – Lemen's Prod – Tous droits réservés
              </p>
              <div className="flex gap-6">
                {[
                  "Mentions légales",
                  "Politique de confidentialité",
                  "CGV",
                ].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-neutral-500 text-xs font-light tracking-wide hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </footer>
      </div>
    </motion.div>
  );
};

// ============================================================
// 4 CONFIGURATIONS
// ============================================================

const SNACK_CONFIG = {
  accentBg: "bg-orange-500",
  hoverAccent: "hover:bg-orange-500",
  heroVideo: VIDEOS.leftTop,
  heroTitle:
    'QUAND CHAQUE<br /><span class="text-orange-500 font-serif italic font-normal">Seconde</span> COMPTE',
  heroLabel: 'SNACK<br /><span class="text-orange-500">CONTENT</span>',
  heroDesc:
    "Dans un monde saturé, nous créons des formats courts ultra-dynamiques qui capturent l'attention dès la première frame.",
  blocks: [
    {
      video: VIDEOS.leftTop,
      tag: "Format Court",
      title: 'TikTok<br /><span class="text-orange-400">Fashion</span>',
      expandTitle: 'TikTok <span class="text-orange-500">Fashion</span>',
      subtitle:
        "Contenu vertical ultra-dynamique pour capturer l'attention en moins de 3 secondes.",
      expandDesc:
        "Nous concevons des contenus verticaux ultra-percutants, pensés pour les algorithmes de TikTok, Instagram Reels et YouTube Shorts. Chaque vidéo est calibrée pour maximiser la rétention dès les 3 premières secondes.",
      tags: [
        "Hook visuel -3s",
        "Sound design",
        "Algo natif",
        "Multi-plateformes",
      ],
      client: "Client Modeiva",
    },
    {
      video: VIDEOS.rightTop,
      tag: "Format Story",
      title: 'Reel<br /><span class="text-orange-400">Food</span>',
      expandTitle: 'Reel <span class="text-orange-500">Food</span>',
      subtitle:
        "Storytelling food vertical, du tournage à la post-production cinématographique.",
      expandDesc:
        "Le food content exige une approche cinématographique unique : lumière naturelle sublimée, slow-motions texturés et une narration visuelle qui donne envie au premier regard.",
      tags: [
        "Photo culinaire",
        "Slow-motion",
        "Storytelling sensoriel",
        "Stories & Reels",
      ],
      client: "Client TastyBites",
    },
  ],
  statsTitle:
    'Snack Content,<br /><span class="not-italic font-sans font-bold text-neutral-400">en chiffres</span>',
  statsDesc:
    "Des formats courts pensés pour la viralité. Nos contenus captent l'attention, génèrent de l'engagement et transforment vos vues en résultats concrets.",
  stats: [
    { value: 12, suffix: "M+", label: "Vues Générées" },
    { value: 150, suffix: "+", label: "Vidéos Livrées" },
    { value: 3, suffix: "x", label: "Engagement Moyen" },
    { value: 48, suffix: "h", label: "Délai de Livraison" },
  ],
  process: [
    {
      icon: "bolt",
      title: "Brief & Stratégie",
      desc: "Analyse de vos objectifs, définition du ton et des formats adaptés à chaque plateforme.",
    },
    {
      icon: "camera",
      title: "Tournage",
      desc: "Captation optimisée mobile-first avec éclairage pro et direction artistique sur-mesure.",
    },
    {
      icon: "scissors",
      title: "Montage & Sound",
      desc: "Cuts dynamiques, transitions tendances, sound design viral et sous-titrage percutant.",
    },
    {
      icon: "chart",
      title: "Livraison & Suivi",
      desc: "Déclinaisons multi-formats, calendrier de publication et analyse des performances.",
    },
  ],
  ctaTitle:
    'Prêt à capter<br /><span class="font-serif italic font-normal text-orange-400">l\'attention</span> ?',
  ctaDesc:
    "Choisissez la formule qui correspond à vos ambitions. Du format unique au plan de contenu mensuel, nous avons l'offre qu'il vous faut.",
  ctaBgText: "SC",
};

const PRODUCTION_CONFIG = {
  accentBg: "bg-rose-500",
  hoverAccent: "hover:bg-rose-500",
  heroVideo: VIDEOS.leftBottom,
  heroTitle:
    'CHAQUE IMAGE<br /><span class="text-rose-400 font-serif italic font-normal">Raconte</span> UNE HISTOIRE',
  heroLabel: 'PRODUCTION<br /><span class="text-rose-400">AUDIOVISUELLE</span>',
  heroDesc:
    "Films de marque, spots publicitaires, documentaires d'entreprise — nous donnons vie à votre vision avec une exigence cinéma.",
  blocks: [
    {
      video: VIDEOS.leftBottom,
      tag: "Film de Marque",
      title: 'Brand<br /><span class="text-rose-400">Film</span>',
      expandTitle: 'Brand <span class="text-rose-500">Film</span>',
      subtitle:
        "Récits cinématographiques pour ancrer votre identité de marque dans l'émotion.",
      expandDesc:
        "Nous créons des films de marque qui transcendent le simple message publicitaire. Direction photo soignée, narration immersive et post-production haut de gamme pour des vidéos qui marquent les esprits durablement.",
      tags: [
        "Direction photo",
        "Narration immersive",
        "Color grading",
        "4K / 6K",
      ],
      client: "Client Skodia",
    },
    {
      video: VIDEOS.hero,
      tag: "Spot Publicitaire",
      title: 'Spot<br /><span class="text-rose-400">Pub</span>',
      expandTitle: 'Spot <span class="text-rose-500">Pub</span>',
      subtitle:
        "Des publicités percutantes conçues pour convertir sur tous les écrans.",
      expandDesc:
        "Du concept créatif au mixage final, nos spots publicitaires sont pensés pour maximiser l'impact. Casting, repérages, tournage multi-caméras et post-production VFX pour un rendu broadcast-ready.",
      tags: [
        "Casting & Repérage",
        "Multi-caméras",
        "VFX & Motion",
        "Broadcast ready",
      ],
      client: "Client Architek",
    },
  ],
  statsTitle:
    'Production,<br /><span class="not-italic font-sans font-bold text-neutral-400">en chiffres</span>',
  statsDesc:
    "Une approche cinématographique au service de votre marque. Chaque projet est une création unique, de la pré-production à la livraison finale.",
  stats: [
    { value: 35, suffix: "+", label: "Films Produits" },
    { value: 4, suffix: "K", label: "Résolution Standard" },
    { value: 98, suffix: "%", label: "Satisfaction Client" },
    { value: 15, suffix: " j", label: "Délai Moyen" },
  ],
  process: [
    {
      icon: "clipboard",
      title: "Pré-production",
      desc: "Moodboard, script, storyboard, casting et repérages pour cadrer la vision créative.",
    },
    {
      icon: "film",
      title: "Tournage",
      desc: "Équipe cinéma complète, direction photo, son professionnel et régie technique.",
    },
    {
      icon: "palette",
      title: "Post-production",
      desc: "Montage, étalonnage, sound design, VFX et motion graphics de qualité broadcast.",
    },
    {
      icon: "rocket",
      title: "Livraison",
      desc: "Export multi-formats, versions pour chaque canal et accompagnement diffusion.",
    },
  ],
  ctaTitle:
    'Prêt à raconter<br /><span class="font-serif italic font-normal text-rose-400">votre histoire</span> ?',
  ctaDesc:
    "De l'idée au grand écran, nous transformons votre vision en récit cinématographique. Parlons de votre prochain projet.",
  ctaBgText: "AV",
};

const IMMO_CONFIG = {
  accentBg: "bg-emerald-500",
  hoverAccent: "hover:bg-emerald-500",
  heroVideo: VIDEOS.rightTop,
  heroTitle:
    'RÉVÉLER<br /><span class="text-emerald-400 font-serif italic font-normal">l\'Essence</span> DES LIEUX',
  heroLabel: 'IMMOBILIER<br /><span class="text-emerald-400">PREMIUM</span>',
  heroDesc:
    "Visite virtuelle, drone FPV, photo HDR — nous sublimeons chaque espace pour accélérer vos ventes.",
  blocks: [
    {
      video: VIDEOS.rightTop,
      tag: "Visite Virtuelle",
      title: 'Tour<br /><span class="text-emerald-400">360°</span>',
      expandTitle: 'Tour <span class="text-emerald-500">360°</span>',
      subtitle:
        "Immersion totale dans le bien, accessible à distance pour vos acquéreurs.",
      expandDesc:
        "Nos visites virtuelles offrent une immersion complète dans chaque propriété. Captation Matterport, intégration de plans interactifs et hébergement web inclus pour une expérience fluide et professionnelle.",
      tags: [
        "Matterport Pro",
        "Plans interactifs",
        "Hébergement web",
        "Compatible mobile",
      ],
      client: "Client Architek",
    },
    {
      video: VIDEOS.rightBottom,
      tag: "Drone FPV",
      title: 'Vol<br /><span class="text-emerald-400">Immersif</span>',
      expandTitle: 'Vol <span class="text-emerald-500">Immersif</span>',
      subtitle:
        "Survol cinématographique en drone FPV pour révéler l'envergure de chaque propriété.",
      expandDesc:
        "Le drone FPV traverse les espaces de manière fluide et spectaculaire, passant de l'extérieur à l'intérieur en un seul plan-séquence. Un format viral qui génère 5x plus d'engagement que les visites classiques.",
      tags: [
        "Drone FPV indoor",
        "Plan-séquence",
        "4K stabilisé",
        "Montage cinéma",
      ],
      client: "Client Prestige Immo",
    },
  ],
  statsTitle:
    'Immobilier,<br /><span class="not-italic font-sans font-bold text-neutral-400">en chiffres</span>',
  statsDesc:
    "Nos contenus immobiliers accélèrent les ventes et augmentent la valeur perçue de chaque bien. L'image premium au service de vos mandats.",
  stats: [
    { value: 200, suffix: "+", label: "Biens Filmés" },
    { value: 40, suffix: "%", label: "Vente Plus Rapide" },
    { value: 5, suffix: "x", label: "Plus de Visites" },
    { value: 24, suffix: "h", label: "Livraison Express" },
  ],
  process: [
    {
      icon: "mapPin",
      title: "Repérage",
      desc: "Visite du bien, analyse lumière, choix des angles et planification du vol drone.",
    },
    {
      icon: "photo",
      title: "Captation",
      desc: "Photo HDR, vidéo 4K, drone aérien & FPV, scan Matterport pour visite 360°.",
    },
    {
      icon: "sparkles",
      title: "Retouche",
      desc: "Étalonnage premium, retouche ciel, home staging virtuel et plans annotés.",
    },
    {
      icon: "home",
      title: "Diffusion",
      desc: "Pack complet optimisé portails, réseaux sociaux et support d'agence.",
    },
  ],
  ctaTitle:
    'Prêt à révéler<br /><span class="font-serif italic font-normal text-emerald-400">vos espaces</span> ?',
  ctaDesc:
    "Sublimez vos biens avec des visuels premium. Photos, vidéos, drone et visites virtuelles pour vendre plus vite.",
  ctaBgText: "IM",
};

const LIVE_CONFIG = {
  accentBg: "bg-violet-500",
  hoverAccent: "hover:bg-violet-500",
  heroVideo: VIDEOS.rightBottom,
  heroTitle:
    'CAPTURER<br /><span class="text-violet-400 font-serif italic font-normal">l\'Instant</span> EN DIRECT',
  heroLabel: 'LIVE<br /><span class="text-violet-400">EVENT</span>',
  heroDesc:
    "Concerts, conférences, lancements produit — nous captons l'énergie du moment avec une précision broadcast.",
  blocks: [
    {
      video: VIDEOS.rightBottom,
      tag: "Multi-caméras",
      title: 'Concert<br /><span class="text-violet-400">Live</span>',
      expandTitle: 'Concert <span class="text-violet-500">Live</span>',
      subtitle:
        "Captation multi-caméras avec régie live pour une expérience immersive totale.",
      expandDesc:
        "Nous déployons un dispositif broadcast complet : caméras fixes, steadicam, caméra mobile, régie de mixage en temps réel et diffusion streaming simultanée pour toucher votre audience partout.",
      tags: ["Multi-caméras", "Régie live", "Streaming HD", "Replay instant"],
      client: "Client RedBull",
    },
    {
      video: VIDEOS.leftBottom,
      tag: "Corporate",
      title: 'Event<br /><span class="text-violet-400">Corporate</span>',
      expandTitle: 'Event <span class="text-violet-500">Corporate</span>',
      subtitle:
        "Conférences, keynotes et lancements de produit captés avec une qualité cinéma.",
      expandDesc:
        "De la keynote intimiste au salon international, nous produisons des captations corporate élégantes et dynamiques. Interviews backstage, aftermovie et contenus dérivés inclus pour prolonger l'impact de votre événement.",
      tags: [
        "Keynote capture",
        "Interviews backstage",
        "Aftermovie",
        "Contenu dérivé",
      ],
      client: "Client Samsung",
    },
  ],
  statsTitle:
    'Live & Event,<br /><span class="not-italic font-sans font-bold text-neutral-400">en chiffres</span>',
  statsDesc:
    "L'énergie du direct, la qualité du cinéma. Nous captons chaque moment clé avec un dispositif technique adapté à l'envergure de votre événement.",
  stats: [
    { value: 80, suffix: "+", label: "Événements Captés" },
    { value: 6, suffix: "", label: "Caméras Simultanées" },
    { value: 50, suffix: "K+", label: "Viewers Live" },
    { value: 100, suffix: "%", label: "Uptime Streaming" },
  ],
  process: [
    {
      icon: "map",
      title: "Repérage & Régie",
      desc: "Visite technique, plan d'implantation caméras, test réseau et brief équipe.",
    },
    {
      icon: "mic",
      title: "Captation Live",
      desc: "Multi-caméras, son broadcast, régie de mixage en temps réel et streaming.",
    },
    {
      icon: "boltSmall",
      title: "Replay & Highlights",
      desc: "Montage des temps forts en temps quasi-réel pour diffusion immédiate.",
    },
    {
      icon: "playCircle",
      title: "Aftermovie",
      desc: "Film récapitulatif cinématographique, teasers et contenus réseaux sociaux.",
    },
  ],
  ctaTitle:
    'Prêt à connecter<br /><span class="font-serif italic font-normal text-violet-400">le réel</span> ?',
  ctaDesc:
    "Concerts, conférences, lancements — captez l'énergie de vos événements avec un rendu broadcast professionnel.",
  ctaBgText: "LV",
};

// --- COMPOSANT PRINCIPAL ---
export default function LightshipFullPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. On stocke le NOM de l'offre choisie (ex: "Signature") au lieu de l'URL
  const [selectedOffer, setSelectedOffer] = useState(null);

  // 2. Ton lien unique pour tous les rendez-vous
  const CALENDLY_URL = "https://calendly.com/anasbouarramou/sur-mesure";

  const [rootElement, setRootElement] = useState(null);

  useEffect(() => {
    // Nécessaire pour que la modale s'affiche correctement
    setRootElement(document.getElementById("root") || document.body);
  }, []);

  // --- AJOUT : Bloquer le scroll de l'arrière-plan ---
  useEffect(() => {
    if (selectedOffer) {
      // Quand la modale est ouverte, on fige le corps de la page
      document.body.style.overflow = "hidden";
    } else {
      // Quand elle est fermée, on réactive le scroll
      document.body.style.overflow = "unset";
    }

    // Nettoyage de sécurité (au cas où le composant est démonté)
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedOffer]); // Se déclenche à chaque fois que 'selectedOffer' change
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.5, // Plus de "poids" (0.1 était trop léger)
    stiffness: 80, // Un peu plus mou pour éviter l'effet ressort sec
    damping: 20, // Absorbe l'énergie pour un arrêt en douceur
    restDelta: 0.001,
  });
  const [active, setActive] = useState(0);
  const ANIM_END = 0.5;

  const centerWidth = useTransform(smoothProgress, [0, 0.7], ["96vw", "32vw"]);
  const centerHeight = useTransform(smoothProgress, [0, 0.7], ["94vh", "65vh"]);
  const borderRadius = useTransform(smoothProgress, [0, 0.7], ["24px", "32px"]);
  const centerScale = useTransform(smoothProgress, [0, 0.7], [1.02, 1]);
  const sideContainerWidth = useTransform(
    smoothProgress,
    [0, ANIM_END],
    ["0vw", "25vw"],
  );

  const leftTopX = useTransform(smoothProgress, [0.05, 0.85], ["-120%", "0%"]);
  const leftBottomX = useTransform(smoothProgress, [0.1, 0.9], ["-120%", "0%"]);
  const rightTopX = useTransform(smoothProgress, [0.05, 0.85], ["120%", "0%"]);
  const rightBottomX = useTransform(smoothProgress, [0.1, 0.9], ["120%", "0%"]);

  const sideOpacity = useTransform(smoothProgress, [0.2, 0.6], [0, 1]);
  const sideY = useTransform(smoothProgress, [0, ANIM_END], ["10%", "0%"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.2], [1, 0.6]);
  const textY = useTransform(smoothProgress, [0, 0.2], ["0%", "-50%"]);
  const textBlur = useTransform(smoothProgress, [0, 0.2], ["0px", "10px"]);
  const gap = useTransform(smoothProgress, [0, ANIM_END], ["0rem", "1.5rem"]);
  const containerPt = useTransform(smoothProgress, [0, 0.7], ["0px", "140px"]);

  // Savoir Faire title animation
  // NOUVEAU
  const sfTitleOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
  const sfTitleY = useTransform(scrollYProgress, [0.2, 0.45], ["30px", "0px"]);
  const sfUnderlineWidth = useTransform(
    scrollYProgress,
    [0.25, 0.5],
    ["0px", "96px"],
  );

  const [activePage, setActivePage] = useState(null);

  const PAGE_CONFIGS = {
    snack: SNACK_CONFIG,
    production: PRODUCTION_CONFIG,
    immo: IMMO_CONFIG,
    live: LIVE_CONFIG,
  };

  if (activePage && PAGE_CONFIGS[activePage]) {
    return (
      <AnimatePresence>
        <ServiceDetailPage
          config={PAGE_CONFIGS[activePage]}
          onBack={() => setActivePage(null)}
        />
      </AnimatePresence>
    );
  }

  return (
    <div className="bg-neutral-100 relative">
      <Navbar progress={smoothProgress} />

      {/* --- SECTION 1 : GRID HERO --- */}
      <div ref={containerRef} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-neutral-100">
          {/* Titre Savoir Faire */}
          <motion.div
            className="absolute top-[100px] left-0 right-0 flex flex-col items-center z-[60] pointer-events-none"
            style={{
              opacity: sfTitleOpacity,
              y: sfTitleY,
            }}
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
            {/* GAUCHE */}
            <motion.div
              style={{
                width: sideContainerWidth,
                opacity: sideOpacity,
                y: sideY,
                willChange: "width, height, border-radius",
              }}
              className="flex flex-col gap-6 justify-center overflow-hidden h-[65vh] shrink-0 origin-right"
            >
              <div className="w-[25vw] min-w-[300px] h-full flex flex-col gap-6">
                <motion.div style={{ x: leftTopX }} className="h-[60%] w-full">
                  <SidebarCard
                    heightClass="h-full"
                    bgColor="bg-teal-300"
                    videoSrc={VIDEOS.leftTop}
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
                    bgColor="bg-rose-300"
                    videoSrc={VIDEOS.leftBottom}
                    title="Production"
                    subtitle="Raconter votre histoire"
                    onClick={() => setActivePage("production")}
                  />
                </motion.div>
              </div>
            </motion.div>
            {/* CENTRE */}
            <motion.div
              className="relative z-50 overflow-hidden flex-shrink-0 origin-center bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{
                width: centerWidth,
                height: centerHeight,
                borderRadius: borderRadius,
                scale: centerScale,
              }}
            >
              <motion.video
                src={VIDEOS.hero}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-100"
                style={{ borderRadius: borderRadius }}
              />
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center pointer-events-none"
                style={{
                  opacity: textOpacity,
                  scale: textScale,
                  y: textY,
                  filter: textBlur,
                }}
              >
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase drop-shadow-lg">
                  LEMEN'S PROD
                </h1>
                <p className="mt-4 text-xl md:text-2xl font-light tracking-widest uppercase drop-shadow-md">
                  Sublimer le réel. Capturer l'essentiel.
                </p>
              </motion.div>
              <motion.div
                style={{ opacity: textOpacity }}
                className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end text-white z-20 pointer-events-none mix-blend-difference"
              >
                <div className="flex flex-col gap-2 items-center opacity-80">
                  <span className="uppercase text-[0.65rem] tracking-widest font-bold">
                    Explorer
                  </span>
                  <motion.svg
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                    />
                  </motion.svg>
                </div>
                <div className="flex gap-4 items-center opacity-80">
                  <span className="uppercase text-[0.65rem] tracking-widest font-bold text-right hidden md:block">
                    Scroller
                    <br />
                    Vers le bas
                  </span>
                  <div className="w-5 h-8 rounded-full border-2 border-white flex justify-center p-1 relative overflow-hidden">
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
                </div>
              </motion.div>
            </motion.div>
            {/* DROITE */}
            <motion.div
              style={{
                width: sideContainerWidth,
                opacity: sideOpacity,
                y: sideY,
              }}
              className="flex flex-col gap-6 justify-center overflow-hidden h-[65vh] shrink-0 origin-left"
            >
              <div className="w-[25vw] min-w-[300px] h-full flex flex-col gap-6">
                <motion.div style={{ x: rightTopX }} className="h-[35%] w-full">
                  <SidebarCard
                    heightClass="h-full"
                    bgColor="bg-emerald-300"
                    videoSrc={VIDEOS.rightTop}
                    title="Immobilier"
                    subtitle="Révéler les espaces"
                    onClick={() => setActivePage("immo")}
                  />
                </motion.div>
                <motion.div
                  style={{ x: rightBottomX }}
                  className="h-[65%] w-full"
                >
                  <SidebarCard
                    heightClass="h-full"
                    bgColor="bg-violet-300"
                    videoSrc={VIDEOS.rightBottom}
                    title="Live"
                    subtitle="Connecter le réel"
                    onClick={() => setActivePage("live")}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* --- SECTION 2 : SLIDER CONFIANCE --- */}
      <motion.section
        className="bg-neutral-100 pt-12 pb-32 overflow-hidden relative z-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={staggerContainer} // Utilisation du stagger global
      >
        <div className="container mx-auto px-6 mb-16 flex flex-col items-center">
          <motion.h2
            className="font-montserrat font-light text-2xl md:text-3xl text-center uppercase tracking-[0.2em] text-neutral-800"
            variants={fadeInUp}
          >
            Ils nous ont fait confiance
          </motion.h2>
          <motion.div
            className="w-24 h-[2px] bg-neutral-900 mt-6"
            variants={{
              hidden: { width: 0, opacity: 0 },
              visible: {
                width: 96,
                opacity: 1,
                transition: { duration: 1, ease: "circOut" },
              },
            }}
          />
        </div>
        <motion.div className="relative w-full" variants={fadeInUp}>
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-neutral-100 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-neutral-100 to-transparent z-10 pointer-events-none" />
          <div className="flex">
            <motion.div
              className="flex items-center flex-shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            >
              {LOGOS.map((logo, index) => (
                <div key={index} className="mx-16 cursor-pointer group">
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="h-12 w-auto object-contain brightness-0 opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* --- SECTION 3 : QUI SOMMES NOUS --- */}
      <section className="bg-neutral-100 py-20 relative z-50">
        <div
          className="mx-auto flex justify-center"
          style={{ width: "calc(82vw + 3rem)", maxWidth: "100%" }}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer} // On anime le conteneur principal
          >
            <motion.div
              className="relative w-full h-[600px] rounded-[2rem] overflow-hidden"
              variants={fadeInUp}
            >
              <motion.img
                src="Capture d’écran 2026-01-28 à 10.15.44.png"
                alt="Tournage"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2 }}
              />
            </motion.div>

            <motion.div
              className="flex flex-col justify-center"
              variants={staggerContainer}
            >
              <motion.h2
                className="font-montserrat font-light text-2xl md:text-3xl uppercase tracking-[0.2em] text-neutral-800"
                variants={fadeInUp}
              >
                Qui sommes-nous ?
              </motion.h2>
              <motion.div
                className="w-24 h-[2px] bg-neutral-900 mt-6 mb-8 items-center"
                variants={{
                  hidden: { width: 0 },
                  visible: { width: 96, transition: { duration: 1 } },
                }}
              />
              <motion.p
                className="text-neutral-500 leading-relaxed mb-12 text-lg font-light"
                variants={fadeInUp}
              >
                Plus qu'une agence de production, nous sommes des architectes
                visuels. Nous transformons vos idées brutes en récits
                cinématographiques qui marquent les esprits durablement.
              </motion.p>
              <div className="flex flex-col gap-6 mb-12">
                {[
                  {
                    title: "Storytelling Percutant",
                    desc: "Chaque image raconte une histoire.",
                  },
                  {
                    title: "Qualité Cinéma",
                    desc: "Du matériel de qualitéééééeéeéeée.",
                  },
                  {
                    title: "Vision 360°",
                    desc: "De la pré-prod à la post-prod.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 border-l-2 border-neutral-300 pl-6 py-1 group hover:border-neutral-800 transition-colors duration-300"
                    variants={fadeInUp}
                  >
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold text-neutral-800 uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-400 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.button
                className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-neutral-800 text-neutral-800 w-fit"
                variants={fadeInUp}
                whileHover="hover"
              >
                <motion.div
                  className="absolute inset-0 bg-neutral-900 w-full h-full"
                  initial={{ x: "-100%" }}
                  variants={{ hover: { x: "0%" } }}
                  transition={{ type: "tween", ease: "circOut", duration: 0.4 }}
                />
                <span className="relative z-10 flex items-center gap-3 font-bold uppercase tracking-widest text-xs group-hover:text-white transition-colors duration-300">
                  Créer votre projet
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 4 : TÉMOIGNAGE (ANIMÉE) --- */}
      <section className="bg-neutral-100 py-24 relative z-50">
        <div
          className="mx-auto flex justify-center"
          style={{ width: "calc(82vw + 3rem)", maxWidth: "100%" }}
        >
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer} // Déclenche l'arrivée en cascade des 3 colonnes
          >
            {/* GAUCHE */}
            <motion.div
              className="col-span-1 lg:col-span-3 flex flex-col justify-start h-full gap-8"
              variants={fadeInUp}
            >
              <div>
                <h2 className="font-montserrat font-light text-2xl md:text-2xl uppercase tracking-[0.2em] text-neutral-800 leading-tight">
                  Lemen's Prod a changé la donne
                </h2>
                <div className="flex items-center gap-2 mt-6">
                  {TESTIMONIALS.map((t, index) => (
                    <button
                      key={t.id}
                      onClick={() => setActive(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        active === index
                          ? "w-8 bg-neutral-900"
                          : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button className="group relative px-8 py-3 bg-neutral-900 overflow-hidden rounded-2xl text-white w-fit mt-auto">
                <div className="absolute inset-0 bg-neutral-800 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 font-bold uppercase tracking-widest text-xs">
                  Lire la suite
                </span>
              </button>
            </motion.div>

            {/* CENTRE */}
            <motion.div
              className="col-span-1 lg:col-span-4 flex flex-col gap-4 items-end relative"
              variants={fadeInUp}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex flex-col gap-4 items-end"
                >
                  <div className="relative h-[450px] w-[85%] rounded-[2rem] overflow-hidden shadow-lg group">
                    <img
                      src={TESTIMONIALS[active].image}
                      alt={TESTIMONIALS[active].name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-neutral-900/10 mix-blend-overlay"></div>
                  </div>
                  <div className="bg-white w-[85%] rounded-[1.5rem] p-4 flex items-center justify-center h-20 shadow-sm">
                    <span className="font-bold text-xl tracking-tighter flex items-center gap-2 text-neutral-900">
                      <div className="w-6 h-6 rounded-full border-2 border-current"></div>
                      {TESTIMONIALS[active].company}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* DROITE */}
            <motion.div
              className="col-span-1 lg:col-span-5 h-full"
              variants={fadeInUp}
            >
              <div className="bg-neutral-200 rounded-[2rem] p-10 h-[550px] flex flex-col justify-between shadow-sm relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col justify-between h-full relative z-10"
                  >
                    <p className="text-xl font-medium text-neutral-900 leading-relaxed">
                      "{TESTIMONIALS[active].quote}"
                    </p>
                    <div>
                      <h4 className="font-serif italic text-lg text-neutral-900">
                        {TESTIMONIALS[active].name},
                      </h4>
                      <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mt-1">
                        {TESTIMONIALS[active].role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION CHIFFRES CLÉS (JSX COMPATIBLE) --- */}
      <motion.section
        className="bg-neutral-100 pb-32 relative z-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <div
          className="mx-auto"
          style={{ width: "calc(82vw + 3rem)", maxWidth: "100%" }}
        >
          {/* Ligne de séparation */}
          <motion.div
            className="w-full h-px bg-neutral-200 mb-20"
            variants={{
              hidden: { scaleX: 0 },
              visible: {
                scaleX: 1,
                transition: { duration: 1, ease: "circOut" },
              },
            }}
            style={{ originX: 0 }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* COLONNE GAUCHE : Titre */}
            <div className="lg:col-span-4">
              <motion.h2
                className="text-4xl md:text-5xl font-serif italic text-neutral-900 leading-[1.1]"
                variants={fadeInUp}
              >
                Impact,
                <br />
                Volume,
                <br />
                <span className="not-italic font-sans font-bold text-neutral-400">
                  & Performance
                </span>
              </motion.h2>
            </div>

            {/* COLONNE DROITE : Contenu */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full">
              <motion.p
                className="text-neutral-600 text-lg font-light leading-relaxed max-w-2xl mb-16"
                variants={fadeInUp}
              >
                Conçus pour la viralité, nos contenus réduisent vos coûts
                d'acquisition et transforment vos vues en résultats concrets.
                Nous allions l'agilité technique à une vision stratégique pour
                les marques de toutes tailles.
              </motion.p>

              {/* Grille des Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 mb-12">
                {[
                  { value: 98, suffix: "%", label: "Satisfaction Client" },
                  { value: 50, suffix: "+", label: "Projets Livrés" },
                  { value: 2, suffix: "M+", label: "Vues Cumulées" },
                  { value: 24, suffix: " j", label: "Test" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className={`flex flex-col pl-6 ${
                      i % 2 !== 0
                        ? "border-l border-neutral-300"
                        : "md:border-l md:border-neutral-300"
                    } ${i === 0 ? "!border-l-0 !pl-0" : ""} ${
                      i === 2 ? "md:!border-l border-l-0 pl-0 md:pl-6" : ""
                    }`}
                    variants={fadeInUp}
                  >
                    <span className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2 tracking-tighter">
                      {/* Appel du composant défini en haut */}
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="text-xs text-neutral-500 font-medium uppercase tracking-wide">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="group relative px-8 py-4 bg-neutral-900 overflow-hidden rounded-2xl text-white w-fit mt-4 self-end shadow-lg hover:shadow-xl transition-shadow"
                variants={fadeInUp}
              >
                <div className="absolute inset-0 bg-neutral-700 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 font-bold uppercase tracking-widest text-xs">
                  En savoir plus
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- SECTION 5 : OFFRES (ANIMÉE) --- */}
      <section className="bg-neutral-900 py-32 relative z-50">
        <div
          className="mx-auto flex flex-col items-center"
          style={{ width: "calc(82vw + 3rem)", maxWidth: "100%" }}
        >
          {/* Titre de Section (Animé) */}
          <motion.div
            className="flex flex-col items-center mb-16 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={staggerContainer}
          >
            <motion.h2
              className="font-montserrat font-light text-2xl md:text-3xl text-center uppercase tracking-[0.2em] text-white"
              variants={fadeInUp}
            >
              Nos Offres
            </motion.h2>
            <motion.div
              className="w-24 h-[2px] bg-white mt-6"
              variants={{
                hidden: { width: 0 },
                visible: { width: 96, transition: { duration: 1 } },
              }}
            ></motion.div>
          </motion.div>

          {/* Grid des Offres (Animée) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-center">
            {OFFERS.map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  ease: "easeOut",
                }} // Délai progressif pour effet "vague"
                className={`relative rounded-[2rem] p-8 md:p-10 flex flex-col justify-between transition-all duration-300
${
  offer.style === "black"
    ? "bg-neutral-800 border border-neutral-700 shadow-2xl z-10 h-[650px] md:scale-105"
    : "bg-white text-neutral-900 shadow-sm h-[550px]"
}
`}
              >
                {offer.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-neutral-900 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                    {offer.badge}
                  </div>
                )}

                <div>
                  <h3
                    className={`text-3xl font-light tracking-tight mb-2 ${
                      offer.style === "black"
                        ? "text-white"
                        : "text-neutral-900"
                    }`}
                  >
                    {offer.title}
                  </h3>
                  <p
                    className={`text-sm mb-8 ${
                      offer.style === "black"
                        ? "text-neutral-400"
                        : "text-neutral-500"
                    }`}
                  >
                    {offer.desc}
                  </p>

                  <div className="mb-8">
                    <span
                      className={`text-4xl font-bold tracking-tighter ${
                        offer.style === "black"
                          ? "text-white"
                          : "text-neutral-900"
                      }`}
                    >
                      {offer.price}
                    </span>
                    {offer.price !== "Devis" && (
                      <span
                        className={`text-sm ml-1 ${
                          offer.style === "black"
                            ? "text-neutral-400"
                            : "text-neutral-500"
                        }`}
                      >
                        / projet
                      </span>
                    )}
                  </div>

                  <ul className="flex flex-col gap-4">
                    {offer.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className={`w-5 h-5 shrink-0 ${
                            offer.style === "black"
                              ? "text-white"
                              : "text-neutral-900"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <span
                          className={`leading-tight ${
                            offer.style === "black"
                              ? "text-neutral-300"
                              : "text-neutral-600"
                          }`}
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  // MODIFICATION ICI : On sauvegarde le TITRE de l'offre (ex: "Signature")
                  onClick={() => setSelectedOffer(offer.title)}
                  className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs mt-8 transition-colors duration-300
  ${
    offer.style === "black"
      ? "bg-white text-neutral-900 hover:bg-neutral-200"
      : "bg-neutral-900 text-white hover:bg-neutral-800"
  }
  `}
                >
                  {offer.price === "Devis"
                    ? "Nous contacter"
                    : "Choisir ce plan"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 6 : CONTACT / FORMULAIRE (VERSION LIGHT & ANIMÉE) --- */}
      <motion.section
        className="bg-neutral-100 pb-32 relative z-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Se déclenche quand 30% est visible
        variants={staggerContainer} // Orchestre les enfants
      >
        <div
          className="mx-auto"
          style={{ width: "calc(82vw + 3rem)", maxWidth: "100%" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 pt-20">
            {/* Colonne Gauche : Intro */}
            <div className="flex flex-col justify-start">
              <motion.h2
                className="font-montserrat font-light text-2xl md:text-3xl uppercase tracking-[0.2em] text-neutral-900"
                variants={fadeInUp}
              >
                Parlons de
                <br />
                votre projet
              </motion.h2>

              {/* Animation de la barre (s'élargit) */}
              <motion.div
                className="h-[2px] bg-neutral-900 mt-6 mb-8"
                variants={{
                  hidden: { width: 0 },
                  visible: {
                    width: 96,
                    transition: { duration: 1, ease: CUSTOM_EASE },
                  },
                }}
              />

              <motion.p
                className="text-neutral-500 text-lg font-light leading-relaxed mb-12 max-w-md"
                variants={fadeInUp}
              >
                Les offres{" "}
                <span className="font-medium text-neutral-900">Essentiel</span>{" "}
                et{" "}
                <span className="font-medium text-neutral-900">Signature</span>{" "}
                ne correspondent pas exactement à votre besoin ?
                <br />
                <br />
                Vous avez des questions spécifiques ou un projet d'envergure ?
                Remplissez ce formulaire pour une approche{" "}
                <strong>100% Sur-Mesure</strong>. Nous vous recontactons sous
                24h.
              </motion.p>

              {/* Bloc coordonées animé en un seul groupe */}
              <motion.div className="flex flex-col gap-6" variants={fadeInUp}>
                <div className="flex items-center gap-4 text-neutral-900 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold mb-1">
                      Email
                    </p>
                    <p className="text-lg font-medium">
                      contact@lemensprod.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-neutral-900 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold mb-1">
                      Téléphone
                    </p>
                    <p className="text-lg font-medium">01 23 45 67 89</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Colonne Droite : Formulaire (Animé en bloc) */}
            <motion.form className="flex flex-col gap-8" variants={fadeInUp}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
                    Nom
                  </label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="bg-transparent border-b border-neutral-300 py-4 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    placeholder="Nom de l'entreprise"
                    className="bg-transparent border-b border-neutral-300 py-4 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="bg-transparent border-b border-neutral-300 py-4 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
                    Sujet
                  </label>
                  <select className="bg-transparent border-b border-neutral-300 py-4 text-neutral-900 focus:border-black focus:outline-none transition-colors duration-300 appearance-none cursor-pointer">
                    <option className="bg-white text-neutral-500">
                      Sélectionnez un sujet
                    </option>
                    <option className="bg-white text-neutral-900">
                      Demande Sur-Mesure
                    </option>
                    <option className="bg-white text-neutral-900">
                      Snack Content
                    </option>
                    <option className="bg-white text-neutral-900">
                      Production Visuelle
                    </option>
                    <option className="bg-white text-neutral-900">
                      Autre question
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Détaillez votre besoin..."
                  className="bg-transparent border-b border-neutral-300 py-4 text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-colors duration-300 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="group relative px-8 py-4 bg-neutral-900 overflow-hidden rounded-2xl text-white w-fit mt-4 self-end shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="absolute inset-0 bg-neutral-800 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-3 font-bold uppercase tracking-widest text-xs">
                  Envoyer la demande
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
              </button>
            </motion.form>
          </div>
        </div>
      </motion.section>

      {/* --- FOOTER --- */}
      <footer className="bg-neutral-900 text-white relative z-50">
        <div className="container mx-auto px-8 pt-20 pb-10">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-1 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white rounded-full" />
                <span className="font-bold tracking-tighter text-2xl uppercase">
                  Lemen's Prod
                </span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">
                Sublimer le réel. Capturer l'essentiel. Production
                audiovisuelle, snack content, immobilier et live.
              </p>
              {/* Social icons */}
              <div className="flex gap-4 mt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.19 8.19 0 0 0 4.76 1.52V6.79a4.83 4.83 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white mb-2">
                Navigation
              </h4>
              {["L'agence", "Savoir Faire", "Projets", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-neutral-400 text-sm hover:text-white transition-colors duration-300 font-light"
                  >
                    {item}
                  </a>
                ),
              )}
            </div>

            {/* Services */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white mb-2">
                Services
              </h4>
              {["Snack Content", "Production", "Immobilier", "Live"].map(
                (item) => (
                  <span
                    key={item}
                    className="text-neutral-400 text-sm font-light"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white mb-2">
                Contact
              </h4>
              <a
                href="mailto:contact@lemensprod.com"
                className="text-neutral-400 text-sm hover:text-white transition-colors duration-300 font-light"
              >
                contact@lemensprod.com
              </a>
              <span className="text-neutral-400 text-sm font-light">
                Paris, France
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-neutral-800 mb-8" />

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-xs font-light tracking-wide">
              ©2025 – Lemen's Prod – Tous droits réservés
            </p>
            <div className="flex gap-6">
              <a
                href="#mentions-legales"
                className="text-neutral-500 text-xs font-light tracking-wide hover:text-white transition-colors duration-300"
              >
                Mentions légales
              </a>
              <a
                href="#politique-de-confidentialite"
                className="text-neutral-500 text-xs font-light tracking-wide hover:text-white transition-colors duration-300"
              >
                Politique de confidentialité
              </a>
              <a
                href="#cgv"
                className="text-neutral-500 text-xs font-light tracking-wide hover:text-white transition-colors duration-300"
              >
                CGV
              </a>
            </div>
          </div>
        </div>
      </footer>
      {rootElement && selectedOffer && (
        <PopupModal
          url={CALENDLY_URL}
          // Pré-remplissage du message
          prefill={{
            text: `Bonjour Anas, je suis intéressé par l'offre ${selectedOffer}. Discutons-en !`,
            // Si tu as déjà le mail du client via un formulaire précédent, tu peux l'ajouter ici :
            // email: "client@exemple.com",
          }}
          // --- PERSONNALISATION ICI ---
          pageSettings={{
            backgroundColor: "ffffff", // Fond de la fenêtre (blanc)
            hideEventTypeDetails: false, // Mettre 'true' pour cacher la barre latérale gauche (photo/durée)
            hideLandingPageDetails: false, // Mettre 'true' pour cacher le titre
            primaryColor: "000000", // Couleur des boutons et liens (ex: Noir pour matcher ton site) - *Requiert offre payante Calendly*
            textColor: "4d5055", // Couleur du texte
          }}
          // ----------------------------

          utm={{
            utmSource: "Site Web",
            utmMedium: "Page Offres",
            utmCampaign: selectedOffer,
          }}
          rootElement={rootElement}
          open={!!selectedOffer}
          onModalClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
}
