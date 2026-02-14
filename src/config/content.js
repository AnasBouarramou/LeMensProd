// src/config/content.js

// --- CONFIGURATION DES VIDÉOS (fichiers locaux dans public/video/) ---
export const VIDEOS = {
  hero: "/video/fp.mp4",
  leftTop: "/video/cuisine_pres_snack.mp4", // Snack Content
  leftBottom: "/video/Aurillac.mp4", // Production
  rightTop: "/video/hdn.mp4", // Immobilier
  rightBottom: "/video/mrwk.mp4", // Live
};

// --- LOGOS ---
export const LOGOS = [
  {
    name: "Alina",
    url: "/img/Alina.png",
  },
  {
    name: "Aurasun",
    url: "/img/AURASUN.png",
  },
  {
    name: "Dalkia",
    url: "/img/Dalkia.png",
  },
  {
    name: "Hotel du port",
    url: "/img/HDP.png.webp",
  },
  {
    name: "Lekk Africa",
    url: "/img/LekkAfrica.png",
  },
  {
    name: "MrWorkout",
    url: "/img/MrWorkout.png",
  },
  {
    name: "Fitness Park",
    url: "/img/FitnessPark.png",
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
    company: "Fitness Park",
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
    company: "Fitness Park",
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
    title: "Essentiel (A determiner)",
    price: "600€",
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
    title: "Signature (A determiner)",
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
      video: "/video/cuisine.mp4",
      tag: "Format Court",
      title: 'Snack<br /><span class="text-orange-400">Culinaire</span>',
      expandTitle: 'Snack <span class="text-orange-500">Culinaire</span>',
      subtitle:
        "Vidéo dynamique et appétissante captant chaque geste en cuisine pour les réseaux sociaux.",
      expandDesc:
        "Réalisation d'une vidéo culinaire ultra-dynamique, pensée pour capter l'attention dès la première seconde sur les réseaux sociaux. Chaque plan est chorégraphié pour sublimer les gestes, les textures et les couleurs des ingrédients, dans un format court calibré pour TikTok et Instagram Reels.",
      tags: [
        "Food content",
        "Montage rythmé",
        "Sound design ASMR",
        "Multi-plateformes",
      ],
      client: "Client Restauration",
    },
    {
      video: "/video/snack-content-immo.mp4",
      tag: "Format Réel",
      title: 'Réel<br /><span class="text-orange-400">Immobilier</span>',
      expandTitle: 'Réel <span class="text-orange-500">Immobilier</span>',
      subtitle:
        "Vidéo publicitaire façon Réel/TikTok pour agence immobilière, pensée pour la viralité.",
      expandDesc:
        "Conception d'un contenu vertical percutant au format Réel/TikTok pour une agence immobilière. L'objectif : présenter des biens avec un dynamisme et un storytelling visuel qui génèrent des partages, des enregistrements et maximisent la portée organique sur les algorithmes des plateformes sociales.",
      tags: [
        "Format vertical",
        "Hook -3s",
        "Immobilier viral",
        "Algo natif",
      ],
      client: "Client Agence Immobilière",
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
      video: "/video/edf.mp4",
      tag: "Institutionnel",
      title: 'Dalkia<br /><span class="text-rose-400">Groupe EDF</span>',
      expandTitle: 'Dalkia <span class="text-rose-500">Groupe EDF</span>',
      subtitle:
        "Vidéo publicitaire institutionnelle réalisée pour un leader de l'énergie.",
      expandDesc:
        "Réalisation d'une vidéo publicitaire institutionnelle pour Dalkia, filiale du groupe EDF, spécialiste des services énergétiques. Une production soignée mêlant plans terrain, interviews et motion design pour véhiculer l'expertise et les valeurs d'un acteur majeur de la transition énergétique.",
      tags: [
        "Corporate premium",
        "Direction artistique",
        "Color grading",
        "4K broadcast",
      ],
      client: "Client Dalkia — Groupe EDF",
    },
    {
      video: "/video/Aurillac.mp4",
      tag: "Showroom",
      title: 'Aurasun<br /><span class="text-rose-400">Solaire</span>',
      expandTitle: 'Aurasun <span class="text-rose-500">Solaire</span>',
      subtitle:
        "Valorisation du showroom et de l'équipe d'un spécialiste du solaire à Aurillac.",
      expandDesc:
        "Nous avons conçu une vidéo pour Aurasun, entreprise spécialisée dans le solaire basée à Aurillac, afin de valoriser leur showroom et leur équipe. À travers un tournage axé sur les espaces et l'humain, nous avons mis en avant leur expertise en énergie renouvelable, tout en reflétant leur engagement et l'environnement accueillant qu'ils proposent.",
      tags: [
        "Tournage terrain",
        "Portraits d'équipe",
        "Showroom",
        "Énergie renouvelable",
      ],
      client: "Client Aurasun",
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
      video: "/video/hdn.mp4",
      tag: "Hôtellerie",
      title: 'Espaces<br /><span class="text-emerald-400">Événementiels</span>',
      expandTitle: 'Espaces <span class="text-emerald-500">Événementiels</span>',
      subtitle:
        "Vidéo immersive sublimant les volumes et l'ambiance d'un hôtel quatre étoiles.",
      expandDesc:
        "Réalisation d'une vidéo immersive destinée à mettre en avant les espaces événementiels d'un hôtel quatre étoiles à Nogent sur Marne. L'objectif était de sublimer les volumes, l'ambiance et le potentiel des lieux afin de faciliter la projection des clients et renforcer l'attractivité des services proposés.",
      tags: [
        "Hôtellerie premium",
        "Drone intérieur",
        "Lumière naturelle",
        "4K cinéma",
      ],
      client: "Hôtel de Nogent",
    },
    {
      video: "/video/ImmoStory.mp4",
      tag: "Format Story",
      title: 'Visite<br /><span class="text-emerald-400">Immersive</span>',
      expandTitle: 'Visite <span class="text-emerald-500">Immersive</span>',
      subtitle:
        "Visite immersive en format Story/Portrait conçue pour convertir sur mobile.",
      expandDesc:
        "Captation verticale optimisée pour le format Story, offrant une visite fluide et immersive de chaque bien. Ce format portrait natif maximise l'engagement sur Instagram Stories et TikTok, tout en donnant aux acquéreurs une expérience de visite naturelle et intuitive depuis leur smartphone.",
      tags: [
        "Format portrait",
        "Visite guidée",
        "Optimisé Stories",
        "Mobile-first",
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
      video: "/video/Spa.mp4",
      tag: "Interviews",
      title: 'Spa<br /><span class="text-violet-400">Témoignages</span>',
      expandTitle: 'Spa <span class="text-violet-500">Témoignages</span>',
      subtitle:
        "Captation d'interviews et de témoignages clients in-situ pour une entreprise de spa.",
      expandDesc:
        "Captation d'interviews et de témoignages clients réalisée directement sur site pour une entreprise de spa haut de gamme. Un dispositif léger mais soigné, pensé pour restituer l'atmosphère apaisante des lieux tout en donnant la parole aux clients avec authenticité et spontanéité.",
      tags: ["Interview in-situ", "Témoignages clients", "Ambiance premium", "Captation son"],
      client: "Client Spa Premium",
    },
    {
      video: "/video/mrwk.mp4",
      tag: "Promotionnel",
      title: 'MrWorkout<br /><span class="text-violet-400">Promo</span>',
      expandTitle: 'MrWorkout <span class="text-violet-500">Promo</span>',
      subtitle:
        "Vidéo promotionnelle dynamique de Florian présentant sa marque MrWorkout.",
      expandDesc:
        "Réalisation d'une vidéo promotionnelle haute énergie pour MrWorkout, la marque de Florian. Un montage percutant qui capture l'intensité du sport, la personnalité du fondateur et l'ADN de la marque dans un format pensé pour engager et convertir sur les réseaux sociaux.",
      tags: [
        "Vidéo promo",
        "Personal branding",
        "Montage dynamique",
        "Réseaux sociaux",
      ],
      client: "Client MrWorkout",
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
