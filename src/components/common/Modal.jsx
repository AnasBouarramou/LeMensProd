// src/components/common/Modal.jsx

const CALENDLY_URL = "https://calendly.com/lemensprod/45min";

const Modal = ({ selectedOffer, onClose }) => {
  if (!selectedOffer) return null;

  const iframeSrc = `${CALENDLY_URL}?embed_type=Inline&hide_event_type_details=0&hide_gdpr_banner=1&primary_color=000000&text_color=4d5055&background_color=ffffff&utm_source=Site+Web&utm_medium=Page+Offres&utm_campaign=${encodeURIComponent(selectedOffer)}`;

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
        <iframe
          src={iframeSrc}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Prendre rendez-vous"
        />
      </div>
    </div>
  );
};

export default Modal;
