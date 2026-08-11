import { useEffect } from "react";

function GoogleTranslate() {
  useEffect(() => {
    // Already initialized
    if (window.googleTranslateInitialized) {
      return;
    }

    const initializeGoogleTranslate = () => {
      if (
        !window.google ||
        !window.google.translate ||
        !window.google.translate.TranslateElement
      ) {
        return;
      }

      // Prevent duplicate initialization
      if (window.googleTranslateInitialized) {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "en,te,hi,ta,kn,ml,fr,de,es,it,pt,ru,ja,ko,zh-CN,ar",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      window.googleTranslateInitialized = true;
    };

    // Google callback
    window.googleTranslateElementInit =
      initializeGoogleTranslate;

    // Check if Google Translate is already available
    if (
      window.google &&
      window.google.translate &&
      window.google.translate.TranslateElement
    ) {
      initializeGoogleTranslate();
      return;
    }

    // Prevent duplicate script
    const existingScript = document.getElementById(
      "google-translate-script"
    );

    if (existingScript) {
      return;
    }

    const script = document.createElement("script");

    script.id = "google-translate-script";

    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      // Don't remove Google's script.
      // Google Translate needs to remain available
      // while navigating between React routes.
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default GoogleTranslate;