import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";

// Configuration globale
import {
  SNACK_CONFIG,
  PRODUCTION_CONFIG,
  IMMO_CONFIG,
  LIVE_CONFIG,
} from "./config/content";

// Hooks
import { useScrollProgress } from "./hooks/useScrollProgress";

// Composants critiques (chargement immédiat)
import Navbar from "./components/layout/Navbar";
import HeroGrid from "./components/sections/HeroGrid";
import About from "./components/sections/About";

// Composants différés (lazy load)
const Footer = lazy(() => import("./components/layout/Footer"));
const Modal = lazy(() => import("./components/common/Modal"));
const ServiceDetailPage = lazy(() => import("./components/services/ServiceDetailPage"));
const TrustSlider = lazy(() => import("./components/sections/TrustSlider"));
const Testimonials = lazy(() => import("./components/sections/Testimonials"));
const KeyFigures = lazy(() => import("./components/sections/KeyFigures"));
const Process = lazy(() => import("./components/sections/Process"));
const Offers = lazy(() => import("./components/sections/Offers"));
const FAQ = lazy(() => import("./components/sections/FAQ"));
const ContactForm = lazy(() => import("./components/sections/ContactForm"));

export default function App() {
  const containerRef = useRef(null);

  // --- HOOK DE SCROLL GLOBAL ---
  const smoothProgress = useScrollProgress({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- GESTION DES ÉTATS ---
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [activePage, setActivePage] = useState(null);
  const handleSetActivePage = (page) => {
    setActivePage(page);
  };

  const PAGE_CONFIGS = {
    snack: SNACK_CONFIG,
    production: PRODUCTION_CONFIG,
    immo: IMMO_CONFIG,
    live: LIVE_CONFIG,
  };

  // CORRECTION MAJEURE :
  // On bloque le scroll de la page d'accueil si une offre OU une page de détail est ouverte.
  useEffect(() => {
    if (selectedOffer || activePage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedOffer, activePage]);

  // ON NE FAIT PLUS DE "if (activePage) return ..." ICI !
  // La landing page est rendue en permanence, et on superpose les éléments par-dessus.

  return (
    <div className="bg-neutral-100 relative font-sans">
      {/* =========================================
          1. LA LANDING PAGE (Toujours en fond)
      ========================================== */}
      <Navbar progress={smoothProgress} />

      <HeroGrid
        progress={smoothProgress}
        setActivePage={handleSetActivePage}
        containerRef={containerRef}
      />

      <About />

      <Suspense fallback={null}>
        <TrustSlider />

        <Testimonials />

        <KeyFigures />

        <Process />

        <div id="projects">
          <Offers onSelectOffer={setSelectedOffer} />
        </div>

        <FAQ />
        <div id="contact">
          <ContactForm />
        </div>

        <Footer
          onBack={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          setActivePage={handleSetActivePage}
        />
      </Suspense>

      {/* =========================================
          2. LES SURCOUCHES (Overlays / Modales)
      ========================================== */}

      {/* OVERLAY : La page de détail d'un service */}
      <Suspense fallback={null}>
        <AnimatePresence>
          {activePage && PAGE_CONFIGS[activePage] && (
            <ServiceDetailPage
              key={activePage}
              config={PAGE_CONFIGS[activePage]}
              onBack={() => handleSetActivePage(null)}
              setActivePage={handleSetActivePage}
            />
          )}
        </AnimatePresence>

        {/* OVERLAY : La modale Calendly */}
        <Modal
          selectedOffer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      </Suspense>
    </div>
  );
}
