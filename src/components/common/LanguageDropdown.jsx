import { useState } from "react";
import { Languages, ChevronDown } from "lucide-react";
import { changeLanguage } from "../../utils/googleTranslate";

function LanguageDropdown() {
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "te", name: "తెలుగు" },
    { code: "hi", name: "हिन्दी" },
    { code: "ta", name: "தமிழ்" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "ml", name: "മലയാളം" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "es", name: "Español" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "zh-CN", name: "中文" },
    { code: "ar", name: "العربية" },
  ];

  const handleLanguageChange = (language) => {
    const changed = changeLanguage(language.code);

    if (changed) {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex items-center gap-2
          px-3 py-2
          rounded-lg
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition
        "
      >
        <Languages size={18} />

        <span className="hidden sm:inline">
          Language
        </span>

        <ChevronDown
          size={16}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-full
            mt-2
            w-48
            max-h-80
            overflow-y-auto
            bg-white
            dark:bg-gray-800
            border
            border-gray-200
            dark:border-gray-700
            rounded-xl
            shadow-xl
            z-[9999]
          "
        >
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() =>
                handleLanguageChange(language)
              }
              className="
                w-full
                text-left
                px-4
                py-2.5
                text-sm
                text-gray-700
                dark:text-gray-200
                hover:bg-green-50
                dark:hover:bg-green-900/30
                hover:text-green-700
                dark:hover:text-green-400
                transition
              "
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageDropdown;