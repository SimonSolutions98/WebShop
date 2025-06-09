import { useEffect } from "react";
import { createPortal } from "react-dom";

function YesNoPopUp({ message, onConfirm, onCancel }) {
  // Scroll lock with Lenis
  useEffect(() => {
    const stopScroll = () => {
      if (window?.lenis?.stop) {
        window.lenis.stop();
        // console.log("✅ Lenis scroll locked");
      }
    };

    const startScroll = () => {
      if (window?.lenis?.start) {
        window.lenis.start();
        // console.log("🔓 Lenis scroll resumed");
      }
    };

    const delay = setTimeout(stopScroll, 10); // Micro-delay helps avoid race conditions

    // Escape key closes modal
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(delay);
      startScroll();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  // Click outside = cancel
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const modal = (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-primary text-accent p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
        <p className="text-fluid-s mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-transparent border border-accent text-accent px-4 py-2 rounded hover:bg-accent/20 transition"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-accent border border-blend text-primary px-4 py-2 rounded hover:bg-accent/30 transition"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

export default YesNoPopUp;
