import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Globe,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function OrganizationNavbar() {
  const navigate = useNavigate();

  const [languageOpen, setLanguageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const languageRef = useRef(null);
  const profileRef = useRef(null);

  // =====================================================
  // LANGUAGES
  // =====================================================

  const languages = [
    { name: "English", code: "en", flag: "🇬🇧" },
    { name: "Telugu", code: "te", flag: "🇮🇳" },
    { name: "Hindi", code: "hi", flag: "🇮🇳" },
    { name: "Tamil", code: "ta", flag: "🇮🇳" },
    { name: "Kannada", code: "kn", flag: "🇮🇳" },
    { name: "Malayalam", code: "ml", flag: "🇮🇳" },
    { name: "French", code: "fr", flag: "🇫🇷" },
    { name: "German", code: "de", flag: "🇩🇪" },
    { name: "Spanish", code: "es", flag: "🇪🇸" },
    { name: "Italian", code: "it", flag: "🇮🇹" },
    { name: "Portuguese", code: "pt", flag: "🇵🇹" },
    { name: "Russian", code: "ru", flag: "🇷🇺" },
    { name: "Japanese", code: "ja", flag: "🇯🇵" },
    { name: "Korean", code: "ko", flag: "🇰🇷" },
    { name: "Chinese", code: "zh-CN", flag: "🇨🇳" },
    { name: "Arabic", code: "ar", flag: "🇸🇦" },
  ];

  // =====================================================
  // CLOSE DROPDOWNS
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target)
      ) {
        setLanguageOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =====================================================
  // GOOGLE TRANSLATE
  // =====================================================

  const changeLanguage = (languageCode) => {
    const googleSelect =
      document.querySelector(".goog-te-combo");

    if (!googleSelect) {
      console.warn(
        "Google Translate is not loaded yet."
      );

      setLanguageOpen(false);
      return;
    }

    googleSelect.value = languageCode;

    googleSelect.dispatchEvent(
      new Event("change")
    );

    setLanguageOpen(false);
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("organization");
    localStorage.removeItem("token");

    setProfileOpen(false);

    navigate("/login");
  };

  return (
    <header
      className="
        h-20
        bg-white
        dark:bg-gray-900

        border-b
        border-gray-200
        dark:border-gray-800

        flex
        items-center
        justify-between

        px-6

        shadow-sm

        relative
      "
    >
      {/* ================================================= */}
      {/* ORGANIZATION */}
      {/* ================================================= */}

      <div
        className="
          flex
          items-center
          gap-3

          px-4
          py-2

          rounded-full

          bg-green-50
          dark:bg-green-950/40

          text-green-700
          dark:text-green-400
        "
      >
        <Building2 size={18} />

        <span className="font-semibold">
          Infosys
        </span>
      </div>

      {/* ================================================= */}
      {/* RIGHT SIDE */}
      {/* ================================================= */}

      <div className="flex items-center gap-5">

        {/* ================================================= */}
        {/* LANGUAGE */}
        {/* ================================================= */}

        <div
          ref={languageRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => {
              setLanguageOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className="
              flex
              items-center
              gap-2

              px-5
              py-2.5

              rounded-lg

              border
              border-gray-300
              dark:border-gray-700

              bg-white
              dark:bg-gray-800

              text-gray-700
              dark:text-gray-200

              hover:bg-gray-50
              dark:hover:bg-gray-700

              transition
            "
          >
            <Globe size={19} />

            <span>
              GB English
            </span>

            <ChevronDown
              size={17}
              className={`
                transition-transform
                ${
                  languageOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>

          {/* LANGUAGE MENU */}

          {languageOpen && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-2

                w-56
                max-h-[420px]
                overflow-y-auto

                bg-white
                dark:bg-gray-800

                border
                border-gray-200
                dark:border-gray-700

                rounded-xl

                shadow-xl

                py-2

                z-[100]
              "
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() =>
                    changeLanguage(
                      language.code
                    )
                  }
                  className="
                    w-full

                    flex
                    items-center
                    gap-3

                    px-4
                    py-2.5

                    text-left

                    text-gray-700
                    dark:text-gray-200

                    hover:bg-green-50
                    dark:hover:bg-green-950/40

                    hover:text-green-700
                    dark:hover:text-green-400

                    transition
                  "
                >
                  <span className="text-lg">
                    {language.flag}
                  </span>

                  <span>
                    {language.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================================================= */}
        {/* ORGANIZATION ADMIN */}
        {/* ================================================= */}

        <div
          ref={profileRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setLanguageOpen(false);
            }}
            className="
              flex
              items-center
              gap-3

              px-3
              py-2

              rounded-xl

              hover:bg-gray-50
              dark:hover:bg-gray-800

              transition
            "
          >
            <div
              className="
                w-11
                h-11

                rounded-full

                bg-green-600

                flex
                items-center
                justify-center

                text-white
                font-bold
              "
            >
              O
            </div>

            <div className="hidden md:block text-left">
              <p
                className="
                  font-semibold
                  text-gray-700
                  dark:text-gray-200
                "
              >
                Organization Admin
              </p>

              <p
                className="
                  text-xs
                  text-gray-400
                "
              >
                Corporate Portal
              </p>
            </div>

            <ChevronDown
              size={18}
              className={`
                text-gray-400
                transition-transform
                ${
                  profileOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>

          {/* ================================================= */}
          {/* PROFILE MENU */}
          {/* ================================================= */}

          {profileOpen && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-2

                w-48

                bg-white
                dark:bg-gray-800

                border
                border-gray-200
                dark:border-gray-700

                rounded-xl

                shadow-xl

                py-2

                z-[100]
              "
            >

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                className="
                  w-full

                  flex
                  items-center
                  gap-3

                  px-4
                  py-3

                  text-left

                  text-red-600
                  dark:text-red-400

                  hover:bg-red-50
                  dark:hover:bg-red-950/30

                  transition
                "
              >
                <LogOut size={19} />

                <span>
                  Logout
                </span>
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default OrganizationNavbar;

