// The Google website widget creates this toolbar outside React's DOM after a
// language change. Removing it is more reliable than trying to override its
// cross-origin iframe styles.
export function hideGoogleTranslateToolbar() {
  document.querySelectorAll("iframe.goog-te-banner-frame").forEach((banner) => {
    banner.remove();
  });

  document.documentElement.style.setProperty("margin-top", "0px", "important");
  document.documentElement.style.setProperty("top", "0px", "important");
  document.body.style.setProperty("margin-top", "0px", "important");
  document.body.style.setProperty("top", "0px", "important");
}

export function changeLanguage(language) {
  const languageMap = {
    en: "en",
    te: "te",
    hi: "hi",
    ta: "ta",
    kn: "kn",
    ml: "ml",
    fr: "fr",
    de: "de",
    es: "es",
    it: "it",
    pt: "pt",
    ru: "ru",
    ja: "ja",
    ko: "ko",
    "zh-CN": "zh-CN",
    ar: "ar",
  };

  const value = languageMap[language];

  if (!value) {
    console.warn("Unsupported language:", language);
    return false;
  }

  const select = document.querySelector(".goog-te-combo");

  if (!select) {
    console.warn("Google Translate is not ready yet.");
    return false;
  }

  // If already selected, don't unnecessarily trigger translation.
  if (select.value === value) {
    return true;
  }

  select.value = value;

  select.dispatchEvent(
    new Event("change", {
      bubbles: true,
    })
  );

  // The widget adds the toolbar asynchronously. Run after its change handler
  // and once more after it has had time to inject its iframe.
  hideGoogleTranslateToolbar();
  requestAnimationFrame(hideGoogleTranslateToolbar);
  window.setTimeout(hideGoogleTranslateToolbar, 100);

  return true;
}
