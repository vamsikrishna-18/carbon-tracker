
import { useEffect, useState } from "react";

function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already running as an installed PWA
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      setInstalled(true);
    }

    // Capture the browser's PWA install prompt
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    // Detect successful installation
    const handleAppInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) {
      alert(
        "Installation is not available yet. Please use your browser's Install App or Add to Home Screen option."
      );
      return;
    }

    await installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setInstalled(true);
    }

    setInstallPrompt(null);
  };

  // The browser only exposes prompt() after beforeinstallprompt fires.
  // Keeping the control hidden until then prevents a dead install banner.
  if (installed || !installPrompt) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleInstall}
      title="Install Carbon Tracker"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 9999,

        display: "flex",
        alignItems: "center",
        gap: "8px",

        padding: "12px 18px",
        border: "none",
        borderRadius: "12px",

        background: "#22c55e",
        color: "#ffffff",

        fontSize: "14px",
        fontWeight: "600",

        cursor: "pointer",

        boxShadow:
          "0 6px 20px rgba(34, 197, 94, 0.35)",

        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 8px 24px rgba(34, 197, 94, 0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 6px 20px rgba(34, 197, 94, 0.35)";
      }}
    >
      <span style={{ fontSize: "18px" }}>📲</span>
      Install App
    </button>
  );
}

export default InstallPWA;

