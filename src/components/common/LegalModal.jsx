// src/components/common/LegalModal.jsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LEGAL_CONTENT = {
  "Mentions légales": {
    title: "Mentions Légales",
    body: `Raison sociale : Lemen's Prod
Forme juridique : [Forme juridique]
Siège social : Paris, France
Email : contact@lemensprod.com

Directeur de la publication : [Nom du directeur]

Hébergeur : [Nom de l'hébergeur], [Adresse de l'hébergeur]

Conformément aux dispositions des articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs du site les présentes mentions légales.

Le site est accessible à l'adresse suivante : [URL du site]. L'accès et l'utilisation du site sont soumis aux présentes "Mentions légales" détaillées ci-après ainsi qu'aux lois et/ou règlements applicables.

La connexion, l'utilisation et l'accès à ce site impliquent l'acceptation intégrale et sans réserve de l'internaute de toutes les dispositions des présentes Mentions Légales.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  },
  Confidentialité: {
    title: "Politique de Confidentialité",
    body: `Lemen's Prod s'engage à protéger la vie privée des utilisateurs de son site internet. La présente politique de confidentialité a pour but d'informer les utilisateurs du site de la manière dont leurs informations personnelles sont collectées et traitées.

1. Collecte des données personnelles
Les données personnelles collectées sur ce site sont les suivantes : nom, prénom, adresse email, numéro de téléphone (le cas échéant). Ces données sont collectées lorsque l'utilisateur remplit le formulaire de contact ou prend rendez-vous via l'outil de réservation intégré.

2. Utilisation des données
Les données collectées sont utilisées uniquement dans le cadre de la relation commerciale entre Lemen's Prod et ses clients ou prospects. Elles ne sont en aucun cas cédées ou vendues à des tiers.

3. Durée de conservation
Les données personnelles sont conservées pour une durée maximale de 3 ans à compter du dernier contact avec l'utilisateur.

4. Droits des utilisateurs
Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à : contact@lemensprod.com

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
  },
  CGV: {
    title: "Conditions Générales de Vente",
    body: `Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Lemen's Prod et ses clients.

1. Objet
Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la vente de prestations de services audiovisuels proposées par Lemen's Prod.

2. Prestations
Lemen's Prod propose des prestations de production audiovisuelle incluant notamment : snack content, production vidéo, vidéo immobilière par drone FPV, et captation live.

3. Devis et commandes
Toute prestation fait l'objet d'un devis préalable détaillé et personnalisé. Le devis est valable 30 jours à compter de sa date d'émission. La commande est considérée comme ferme et définitive après signature du devis et versement de l'acompte.

4. Tarifs et paiement
Les tarifs sont indiqués en euros et hors taxes. Un acompte de 30% du montant total est demandé à la signature du devis. Le solde est payable à réception de la facture, dans un délai de 30 jours.

5. Propriété intellectuelle
Sauf accord contraire écrit, Lemen's Prod conserve l'intégralité des droits de propriété intellectuelle sur les contenus produits jusqu'au paiement intégral de la prestation.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
};

const LegalModal = ({ activeModal, onClose }) => {
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModal]);

  const content = activeModal ? LEGAL_CONTENT[activeModal] : null;

  return (
    <AnimatePresence>
      {activeModal && content && (
        <motion.div
          className="fixed inset-0 z-[500] flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full md:w-[600px] md:max-w-[90vw] max-h-[85vh] bg-neutral-900 text-white md:rounded-2xl rounded-t-2xl overflow-hidden flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-neutral-800 shrink-0">
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide">
                {content.title}
              </h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-all duration-300 cursor-pointer shrink-0"
                aria-label="Fermer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 md:px-8 py-6 md:py-8 overflow-y-auto flex-1">
              <p className="text-neutral-300 text-sm font-light leading-relaxed whitespace-pre-line">
                {content.body}
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 md:px-8 py-4 md:py-5 border-t border-neutral-800 shrink-0">
              <button
                onClick={onClose}
                className="group relative w-full py-3 bg-white overflow-hidden rounded-xl text-neutral-900 cursor-pointer"
              >
                <div className="absolute inset-0 bg-neutral-200 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 font-bold uppercase tracking-widest text-xs">
                  Fermer
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
