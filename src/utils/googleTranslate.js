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

  return true;
}