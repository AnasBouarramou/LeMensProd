// src/components/common/Modal.jsx
import { useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/lemensprod/45min";

const Modal = ({ selectedOffer, onClose }) => {
  useEffect(() => {
    if (!selectedOffer) return;

    // Charge le CSS Calendly
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Charge le JS Calendly
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, [selectedOffer]);

  if (!selectedOffer) return null;

  const url = `${CALENDLY_URL}?hide_event_type_details=0&hide_gdpr_banner=1&primary_color=000000&text_color=4d5055&background_color=ffffff&utm_source=Site+Web&utm_medium=Page+Offres&utm_campaign=${encodeURIComponent(selectedOffer)}`;

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
        <div
          className="calendly-inline-widget"
          data-url={url}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default Modal;
