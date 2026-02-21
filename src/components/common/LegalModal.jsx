// src/components/common/LegalModal.jsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LEGAL_CONTENT = {
  "Mentions légales": {
    title: "Mentions Légales",
    body: `Conformément aux dispositions des articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (L.C.E.N.), les présentes mentions légales sont portées à la connaissance des utilisateurs du site.

ÉDITEUR DU SITE
Raison sociale : Lemen's Prod
Forme juridique : [À COMPLÉTER]
Siège social : [À COMPLÉTER]
SIRET : [À COMPLÉTER]
Email : contact@lemensprod.com
Directeur de la publication : [À COMPLÉTER]

NOM DE DOMAINE
Le site est accessible à l'adresse : lemensprod.pages.dev

HÉBERGEMENT
Le site est hébergé par :
Cloudflare, Inc.
101 Townsend St, San Francisco, CA 94107, USA
Site : www.cloudflare.com

PROPRIÉTÉ INTELLECTUELLE
L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes) est la propriété exclusive de Lemen's Prod, sauf mentions contraires. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, est interdite sans autorisation écrite préalable.

RESPONSABILITÉ
Lemen's Prod s'efforce de maintenir les informations publiées sur ce site aussi précises et à jour que possible. Toutefois, la société ne pourra être tenue responsable des omissions, inexactitudes ou carences dans la mise à jour, qu'elles soient de son fait ou du fait de tiers.`,
  },
  Confidentialité: {
    title: "Politique de Confidentialité",
    body: `Lemen's Prod s'engage à protéger la vie privée des utilisateurs de son site lemensprod.pages.dev. La présente politique vous informe de la manière dont vos données personnelles sont collectées et traitées, conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679).

1. RESPONSABLE DU TRAITEMENT
Lemen's Prod — contact@lemensprod.com

2. DONNÉES COLLECTÉES
Les seules données personnelles collectées sont celles que vous saisissez volontairement dans le formulaire de contact : nom, adresse e-mail, et message. Aucune donnée n'est collectée automatiquement à des fins de profilage ou de publicité.

3. FINALITÉ DU TRAITEMENT
Les données sont utilisées exclusivement pour répondre à vos demandes de contact et, avec votre accord, vous adresser des informations relatives à nos prestations. Elles ne sont jamais revendues ni cédées à des tiers.

4. HÉBERGEMENT ET COOKIES TECHNIQUES
Ce site est hébergé sur l'infrastructure de Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA). Cloudflare peut déposer des cookies techniques strictement nécessaires au bon fonctionnement du réseau de diffusion (CDN) et à la protection contre les attaques. Ces cookies ne nécessitent pas de consentement au titre du RGPD.

5. DURÉE DE CONSERVATION
Vos données sont conservées pour une durée maximale de 3 ans à compter du dernier contact, puis supprimées.

6. VOS DROITS
Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de vos données. Pour exercer ces droits : contact@lemensprod.com

7. RÉCLAMATION
Vous pouvez adresser une réclamation à la CNIL (www.cnil.fr) si vous estimez que vos droits ne sont pas respectés.`,
  },
  CGV: {
    title: "Conditions Générales de Vente",
    body: `Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Lemen's Prod (ci-après « le Prestataire ») et tout client ayant recours à ses prestations (ci-après « le Client »).

1. OBJET
Les présentes CGV définissent les droits et obligations des parties dans le cadre de la fourniture de prestations de production audiovisuelle : snack content, films institutionnels et publicitaires, vidéo immobilière, captation et diffusion live multi-caméras.

2. DEVIS ET COMMANDES
Toute prestation fait l'objet d'un devis détaillé et personnalisé, valable 30 jours à compter de sa date d'émission. La commande est ferme et définitive après retour du devis signé et versement de l'acompte prévu.

3. MODALITÉS DE PAIEMENT
Les tarifs sont exprimés en euros hors taxes (HT). Un acompte de [X]% du montant total est exigible à la signature du devis, afin de bloquer les dates de tournage et lancer la pré-production. Le solde est dû à la livraison finale, dans un délai de 30 jours à réception de facture. Tout retard de paiement entraîne des pénalités au taux légal en vigueur.

4. DÉLAIS DE LIVRAISON
Les délais indicatifs sont précisés dans le devis. Ils sont susceptibles d'évoluer en cas de modifications demandées par le Client en cours de production. Lemen's Prod ne saurait être tenu responsable des retards imputables au Client (défaut de validation, fourniture tardive de documents).

5. DROITS DE CESSION ET PROPRIÉTÉ INTELLECTUELLE
Les fichiers sources et droits de propriété intellectuelle sur les contenus produits restent la propriété de Lemen's Prod jusqu'au paiement intégral de la prestation. À réception du solde, le Client dispose d'une licence d'utilisation non exclusive sur les supports convenus (web, réseaux sociaux, usage interne). Toute diffusion TV, cinéma ou exploitation commerciale élargie fera l'objet d'un contrat de cession de droits spécifique.

6. DROIT À L'IMAGE
Le Client est responsable d'obtenir les autorisations nécessaires auprès des personnes filmées (droit à l'image, droit à la voix). Lemen's Prod ne pourra être tenu responsable en cas de litige lié à l'absence d'autorisation.

7. RÉSILIATION
En cas d'annulation par le Client après signature du devis, l'acompte versé reste acquis au Prestataire à titre d'indemnité forfaitaire. Si le tournage a déjà eu lieu, le montant correspondant aux jours de production effectués sera facturé.

8. DROIT APPLICABLE
Les présentes CGV sont soumises au droit français. Tout litige relève de la compétence exclusive des tribunaux de Paris.`,
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
