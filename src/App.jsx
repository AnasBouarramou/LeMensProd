import { useRef, useState, useEffect } from "react";
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

// Composants Communs & Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Modal from "./components/common/Modal";

// Pages de détails
import ServiceDetailPage from "./components/services/ServiceDetailPage";

// Sections de la Landing Page
import HeroGrid from "./components/sections/HeroGrid";
import TrustSlider from "./components/sections/TrustSlider";
import About from "./components/sections/About";
import Testimonials from "./components/sections/Testimonials";
import KeyFigures from "./components/sections/KeyFigures";
import Process from "./components/sections/Process";
import Offers from "./components/sections/Offers";
import FAQ from "./components/sections/FAQ";
import ContactForm from "./components/sections/ContactForm";

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
  const [rootElement, setRootElement] = useState(null);

  // Audio global exclusif : une seule source audio active sur tout le site
  const [activeAudioId, setActiveAudioId] = useState(null);

  // Coupe le son quand on change de section (landing ↔ detail)
  const handleSetActivePage = (page) => {
    setActiveAudioId(null);
    setActivePage(page);
  };

  const PAGE_CONFIGS = {
    snack: SNACK_CONFIG,
    production: PRODUCTION_CONFIG,
    immo: IMMO_CONFIG,
    live: LIVE_CONFIG,
  };

  useEffect(() => {
    setRootElement(document.getElementById("root") || document.body);
  }, []);

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
        activeAudioId={activeAudioId}
        setActiveAudioId={setActiveAudioId}
      />

      <TrustSlider />

      <div id="about">
        <About />
      </div>

      <Testimonials />

      <KeyFigures />

      <Process />

      <div id="projects">
        <Offers onSelectOffer={setSelectedOffer} />
      </div>

      <FAQ />
      <ContactForm />

      <Footer onBack={() => window.scrollTo({ top: 0, behavior: "smooth" })} />

      {/* =========================================
          2. LES SURCOUCHES (Overlays / Modales)
      ========================================== */}

      {/* OVERLAY : La page de détail d'un service */}
      {/* Grâce à AnimatePresence ici, la page va disparaître avec un fondu fluide */}
      <AnimatePresence>
        {activePage && PAGE_CONFIGS[activePage] && (
          <ServiceDetailPage
            config={PAGE_CONFIGS[activePage]}
            onBack={() => handleSetActivePage(null)}
            activeAudioId={activeAudioId}
            setActiveAudioId={setActiveAudioId}
          />
        )}
      </AnimatePresence>

      {/* OVERLAY : La modale Calendly */}
      <Modal
        selectedOffer={selectedOffer}
        onClose={() => setSelectedOffer(null)}
        rootElement={rootElement}
      />
    </div>
  );
}
