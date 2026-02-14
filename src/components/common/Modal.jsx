// src/components/common/Modal.jsx
import { PopupModal } from "react-calendly";

const Modal = ({ selectedOffer, onClose, rootElement }) => {
  // Lien unique pour tes rendez-vous
  const CALENDLY_URL = "https://calendly.com/anasbouarramou/sur-mesure";

  // Si aucun rootElement ou aucune offre sélectionnée, on ne rend rien
  if (!rootElement || !selectedOffer) return null;

  return (
    <PopupModal
      url={CALENDLY_URL}
      prefill={{
        text: `Bonjour Anas, je suis intéressé par l'offre ${selectedOffer}. Discutons-en !`,
      }}
      pageSettings={{
        backgroundColor: "ffffff", // Fond de la fenêtre (blanc)
        hideEventTypeDetails: false, // Mettre 'true' pour cacher la barre latérale gauche
        hideLandingPageDetails: false, // Mettre 'true' pour cacher le titre
        primaryColor: "000000", // Couleur des boutons et liens
        textColor: "4d5055", // Couleur du texte
      }}
      utm={{
        utmSource: "Site Web",
        utmMedium: "Page Offres",
        utmCampaign: selectedOffer,
      }}
      rootElement={rootElement}
      open={!!selectedOffer}
      onModalClose={onClose}
    />
  );
};

export default Modal;
