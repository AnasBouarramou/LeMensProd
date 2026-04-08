// src/components/common/Modal.jsx
import { InlineWidget } from "react-calendly";

const CALENDLY_URL = "https://calendly.com/lemensprod/45min";

const Modal = ({ selectedOffer, onClose }) => {
  if (!selectedOffer) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl mx-4"
        style={{ height: "700px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-600 text-lg leading-none"
          aria-label="Fermer"
        >
          ×
        </button>
        <InlineWidget
          url={CALENDLY_URL}
          utm={{
            utmSource: "Site Web",
            utmMedium: "Page Offres",
            utmCampaign: selectedOffer,
          }}
          pageSettings={{
            backgroundColor: "ffffff",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: "000000",
            textColor: "4d5055",
          }}
          styles={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default Modal;
