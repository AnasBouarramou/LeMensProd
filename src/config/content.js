// src/config/content.js

// --- CONFIGURATION DES VIDÉOS (fichiers locaux dans public/video/) ---
export const VIDEOS = {
  hero: "/video/hdn.mp4",
  leftTop: "/video/cuisine.mp4",       // Snack Content
  leftBottom: "/video/edf.mp4",        // Production
  rightTop: "/video/ImmoStory.mp4",    // Immobilier
  rightBottom: "/video/fp.mp4",        // Live
};

// --- LOGOS ---
export const LOGOS = [
  {
    name: "Alina",
    url: "src/assets/img/Alina.png",
  },
  {
    name: "Aurasun",
    url: "src/assets/img/AURASUN.png",
  },
  {
    name: "Dalkia",
    url: "src/assets/img/Dalkia.png",
  },
  {
    name: "Hotel du port",
    url: "src/assets/img/HDP.png.webp",
  },
  {
    name: "Lekk Africa",
    url: "src/assets/img/LekkAfrica.png",
  },
  {
    name: "MrWorkout",
    url: "src/assets/img/MrWorkout.png",
  },
  {
    name: "Fitness Park",
    url: "src/assets/img/FitnessPark.png",
  },
];

export const SNACK_PROJECTS = [
  { id: 1, title: "TikTok Fashion", client: "Modeiva", color: "bg-orange-500" },
  { id: 2, title: "Reel Food", client: "TastyBites", color: "bg-neutral-800" },
  { id: 3, title: "Story Event", client: "RedBull", color: "bg-neutral-800" },
  { id: 4, title: "Shorts Tech", client: "Samsung", color: "bg-orange-500" },
];

// --- TEMOIGNAGES ---
export const TESTIMONIALS = [
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
export const OFFERS = [
  {
    title: "Essentiel",
    price: "1 500€",
    desc: "Idéal pour les marques qui débutent en vidéo marketing.",
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
    desc: "Production audiovisuelle complète avec direction artistique.",
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
    desc: "Productions vidéo d'envergure avec équipe cinéma.",
    features: [
      "Équipe cinéma complète",
      "Casting & Repérages",
      "Post-prod VFX avancée",
      "Gestion droits TV/Ciné",
    ],
    style: "white",
  },
];

// ============================================================
// 4 CONFIGURATIONS DE PAGES DE SERVICES
// ============================================================

export const SNACK_CONFIG = {
  accentBg: "bg-orange-500",
  hoverAccent: "hover:bg-orange-500",
  heroVideo: VIDEOS.leftTop,
  heroTitle:
    'QUAND CHAQUE<br /><span class="text-orange-500 font-serif italic font-normal">Seconde</span> COMPTE',
  heroLabel: 'SNACK<br /><span class="text-orange-500">CONTENT</span>',
  heroDesc:
    "Agence spécialisée en création de snack content à Paris. Nous produisons des formats courts ultra-dynamiques pour TikTok, Instagram Reels et YouTube Shorts qui capturent l'attention dès la première frame.",
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
    "Nos contenus snack content pour TikTok, Instagram Reels et YouTube Shorts sont pensés pour la viralité. Ils captent l'attention, génèrent de l'engagement et transforment vos vues en résultats concrets.",
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

export const PRODUCTION_CONFIG = {
  accentBg: "bg-rose-500",
  hoverAccent: "hover:bg-rose-500",
  heroVideo: VIDEOS.leftBottom,
  heroTitle:
    'CHAQUE IMAGE<br /><span class="text-rose-400 font-serif italic font-normal">Raconte</span> UNE HISTOIRE',
  heroLabel: 'PRODUCTION<br /><span class="text-rose-400">AUDIOVISUELLE</span>',
  heroDesc:
    "Production audiovisuelle haut de gamme à Paris : films de marque, spots publicitaires, vidéos corporate et documentaires d'entreprise. Nous donnons vie à votre vision avec une exigence cinéma.",
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
    "Notre société de production audiovisuelle à Paris met son approche cinématographique au service de votre marque. Chaque film corporate est une création unique, de la pré-production à la livraison finale.",
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

export const IMMO_CONFIG = {
  accentBg: "bg-emerald-500",
  hoverAccent: "hover:bg-emerald-500",
  heroVideo: VIDEOS.rightTop,
  heroTitle:
    'RÉVÉLER<br /><span class="text-emerald-400 font-serif italic font-normal">l\'Essence</span> DES LIEUX',
  heroLabel: 'IMMOBILIER<br /><span class="text-emerald-400">PREMIUM</span>',
  heroDesc:
    "Vidéo immobilière premium à Paris : visite virtuelle 360°, drone FPV intérieur-extérieur, photo HDR. Nous sublimeons chaque bien immobilier de prestige pour accélérer vos ventes.",
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
    "Nos vidéos immobilières et visites virtuelles 360° accélèrent les ventes et augmentent la valeur perçue de chaque bien de prestige. La vidéo drone FPV au service de vos mandats.",
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

export const LIVE_CONFIG = {
  accentBg: "bg-violet-500",
  hoverAccent: "hover:bg-violet-500",
  heroVideo: VIDEOS.rightBottom,
  heroTitle:
    'CAPTURER<br /><span class="text-violet-400 font-serif italic font-normal">l\'Instant</span> EN DIRECT',
  heroLabel: 'LIVE<br /><span class="text-violet-400">EVENT</span>',
  heroDesc:
    "Captation live et événementielle à Paris : concerts, conférences, lancements produit. Nous filmons vos événements en multi-caméras avec une précision broadcast et streaming en direct.",
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
    "Captation événementielle professionnelle avec la qualité cinéma. Nous filmons chaque moment clé en multi-caméras avec streaming live, adapté à l'envergure de votre événement corporate ou concert.",
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

// À AJOUTER À LA FIN DE src/config/content.js

// --- FAQ ---
export const FAQ_DATA = [
  {
    question: "Combien de temps faut-il pour réaliser une vidéo ?",
    answer:
      "Tout dépend du format de production vidéo. Un projet Snack Content (TikTok, Reels) peut être livré en 48h, tandis qu'un film de marque ou une vidéo corporate sur-mesure nécessitera 2 à 3 semaines entre la pré-production, le tournage et la post-production audiovisuelle.",
  },
  {
    question: "Faites-vous des déplacements hors de Paris ?",
    answer:
      "Absolument. Notre agence de production audiovisuelle est basée à Paris, mais nous nous déplaçons partout en France et à l'international pour vos tournages, captations live et projets vidéo immobilier.",
  },
  {
    question: "Les droits d'utilisation sont-ils inclus ?",
    answer:
      "Oui, tous nos devis et offres packagées incluent les droits de diffusion pour une utilisation sur le web et les réseaux sociaux. Pour une diffusion TV ou Cinéma, nous établissons un contrat de cession de droits spécifique.",
  },
  {
    question: "Comment se déroule le paiement ?",
    answer:
      "Nous demandons un acompte de 50% à la signature du devis pour bloquer les dates de tournage et lancer la pré-production. Le solde est réglé à la livraison finale du projet.",
  },
];
