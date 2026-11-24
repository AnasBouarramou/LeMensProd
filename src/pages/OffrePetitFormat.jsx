// src/pages/OffrePetitFormat.jsx
// Sous-page indépendante : /offre-petit-format/ (envoyée aux prospects, absente du menu).
import { useState, useEffect, lazy, Suspense } from "react";
import OffersLocal from "../components/sections/OffersLocal";
import LocalProof from "../components/sections/LocalProof";

const Modal = lazy(() => import("../components/common/Modal"));

const OffrePetitFormat = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Même comportement que la page d'accueil : on fige le fond quand le Calendly est ouvert.
  useEffect(() => {
    document.body.style.overflow = selectedOffer ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedOffer]);

  return (
    <div className="bg-neutral-100 min-h-screen font-sans text-neutral-900">
      <header className="flex items-center justify-between px-4 md:px-[2vw] py-5 md:py-6">
        <a href="/" aria-label="Lemen's Prod, accueil">
          <img src="/img/Logo.webp" alt="Lemen's Prod" className="h-12 md:h-14 w-auto" />
        </a>
        <a
          href="/"
          className="text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          Découvrir l'agence
        </a>
      </header>

      <main>
        <OffersLocal onSelectOffer={setSelectedOffer} />
        <LocalProof onSelectOffer={setSelectedOffer} />
      </main>

      <footer className="bg-neutral-900 text-neutral-300 py-10 px-4 text-center text-sm">
        <p className="mb-2">
          Une question avant de choisir ? Écrivez-nous :{" "}
          <a className="text-white underline" href="mailto:lemensprod@gmail.com">
            lemensprod@gmail.com
          </a>{" "}
          · 06 47 55 11 40
        </p>
        <p className="text-neutral-500 text-xs">
          © 2026 Lemen's Prod · Paris, France ·{" "}
          <a className="underline" href="/">
            lemensprod.com
          </a>
        </p>
      </footer>

      <Suspense fallback={null}>
        <Modal selectedOffer={selectedOffer} onClose={() => setSelectedOffer(null)} />
      </Suspense>
    </div>
  );
};

export default OffrePetitFormat;
