import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Leaf,
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import LanguageDropdown from "../components/common/LanguageDropdown";

function MainLayout({ children }) {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className="
        min-h-screen
        bg-white
        text-gray-900
        dark:bg-[#070d18]
        dark:text-white
        transition-colors
        duration-300
      "
    >

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <header
        className="
          sticky
          top-0
          z-50
          w-full

          bg-white
          dark:bg-[#111827]

          border-b
          border-gray-200
          dark:border-gray-700

          transition-colors
          duration-300
        "
      >

        <div
          className="
            max-w-[1450px]
            mx-auto
            px-4
            sm:px-6
            lg:px-10

            h-16
            sm:h-20
            lg:h-24

            flex
            items-center
            justify-between
          "
        >

          {/* ============================================= */}
          {/* LOGO */}
          {/* ============================================= */}

          <Link
            to="/"
            className="
              flex
              items-center
              gap-2
              sm:gap-3
              flex-shrink-0
            "
          >

            <div
              className="
                w-10
                sm:w-12
                lg:w-14
                h-10
                sm:h-12
                lg:h-14
                rounded-lg
                sm:rounded-xl
                lg:rounded-2xl

                flex
                items-center
                justify-center

                bg-green-100
                dark:bg-green-900/40

                text-green-600
                dark:text-green-400

                transition-colors
              "
            >
              <Leaf
                size={24}
                strokeWidth={2.5}
                className="sm:w-7 sm:h-7 lg:w-8 lg:h-8"
              />
            </div>

            <span
              className="
                text-lg
                sm:text-2xl
                lg:text-3xl
                font-extrabold
                tracking-tight

                text-green-600
                dark:text-green-400

                whitespace-nowrap
              "
            >
              CarbonTracker
            </span>

          </Link>


          {/* ============================================= */}
          {/* CENTER NAVIGATION */}
          {/* ============================================= */}

          <nav
            className="
              hidden
              lg:flex
              items-center
              gap-10
              ml-10
            "
          >

            <a
              href="#features"
              className="
                text-[15px]
                font-semibold

                text-gray-500
                hover:text-green-600

                dark:text-gray-300
                dark:hover:text-green-400

                transition-colors
              "
            >
              Features
            </a>

            <a
              href="#impact"
              className="
                text-[15px]
                font-semibold

                text-gray-500
                hover:text-green-600

                dark:text-gray-300
                dark:hover:text-green-400

                transition-colors
              "
            >
              Impact
            </a>

            <a
              href="#analytics"
              className="
                text-[15px]
                font-semibold

                text-gray-500
                hover:text-green-600

                dark:text-gray-300
                dark:hover:text-green-400

                transition-colors
              "
            >
              Analytics
            </a>

            <a
              href="#rewards"
              className="
                text-[15px]
                font-semibold

                text-gray-500
                hover:text-green-600

                dark:text-gray-300
                dark:hover:text-green-400

                transition-colors
              "
            >
              Rewards
            </a>

          </nav>


          {/* ============================================= */}
          {/* RIGHT SIDE */}
          {/* ============================================= */}

          <div
            className="
              hidden
              md:flex
              items-center
              gap-3
            "
          >

            {/* ----------------------------------------- */}
            {/* LANGUAGE */}
            {/* ----------------------------------------- */}

            <div
              className="
                flex
                items-center
                justify-center
                px-2
              "
            >
              <LanguageDropdown />
            </div>


            {/* ----------------------------------------- */}
            {/* THEME */}
            {/* ----------------------------------------- */}

            <button
              onClick={toggleTheme}
              title={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="
                w-10
                h-10

                rounded-lg

                flex
                items-center
                justify-center

                text-gray-600
                hover:text-green-600
                hover:bg-gray-100

                dark:text-gray-300
                dark:hover:text-green-400
                dark:hover:bg-gray-800

                transition-all
              "
            >
              {darkMode ? (
                <Sun size={21} />
              ) : (
                <Moon size={21} />
              )}
            </button>


            {/* ----------------------------------------- */}
            {/* VERTICAL SEPARATOR */}
            {/* ----------------------------------------- */}

            <div
              className="
                h-8
                w-px

                bg-gray-200
                dark:bg-gray-700

                mx-1
              "
            />


            {/* ----------------------------------------- */}
            {/* LOGIN */}
            {/* ----------------------------------------- */}

            <button
              onClick={() => navigate("/login")}
              className="
                px-6
                py-2.5

                rounded-xl

                border-2
                border-green-600
                dark:border-green-400

                text-green-600
                dark:text-green-400

                font-bold

                hover:bg-green-600
                hover:text-white

                dark:hover:bg-green-500
                dark:hover:text-white

                transition-all
              "
            >
              Login
            </button>


            {/* ----------------------------------------- */}
            {/* GET STARTED */}
            {/* ----------------------------------------- */}

            <button
              onClick={() => navigate("/register")}
              className="
                px-6
                py-2.5

                rounded-xl

                bg-green-600
                dark:bg-green-500

                text-white

                font-bold

                flex
                items-center
                gap-2

                shadow-md
                shadow-green-600/20

                hover:bg-green-700
                dark:hover:bg-green-400

                transition-all
              "
            >
              Get Started

              <ArrowRight size={18} />

            </button>

          </div>


          {/* ============================================= */}
          {/* MOBILE BUTTON */}
          {/* ============================================= */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="
              md:hidden

              w-10
              h-10

              rounded-lg

              flex
              items-center
              justify-center

              text-gray-700
              hover:bg-gray-100

              dark:text-white
              dark:hover:bg-gray-800
            "
          >
            {mobileMenu ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>


        {/* ================================================= */}
        {/* MOBILE NAVIGATION */}
        {/* ================================================= */}

        {mobileMenu && (

          <div
            className="
              md:hidden

              border-t
              border-gray-200
              dark:border-gray-700

              bg-white
              dark:bg-[#111827]

              px-6
              py-5

              space-y-3
            "
          >

            <a
              href="#features"
              onClick={() => setMobileMenu(false)}
              className="
                block
                py-2
                font-semibold
                text-gray-700
                dark:text-gray-200
              "
            >
              Features
            </a>

            <a
              href="#impact"
              onClick={() => setMobileMenu(false)}
              className="
                block
                py-2
                font-semibold
                text-gray-700
                dark:text-gray-200
              "
            >
              Impact
            </a>

            <a
              href="#analytics"
              onClick={() => setMobileMenu(false)}
              className="
                block
                py-2
                font-semibold
                text-gray-700
                dark:text-gray-200
              "
            >
              Analytics
            </a>

            <a
              href="#rewards"
              onClick={() => setMobileMenu(false)}
              className="
                block
                py-2
                font-semibold
                text-gray-700
                dark:text-gray-200
              "
            >
              Rewards
            </a>


            <div className="pt-3">
              <LanguageDropdown />
            </div>


            <button
              onClick={toggleTheme}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-3

                py-3

                rounded-xl

                bg-gray-100
                dark:bg-gray-800

                text-gray-700
                dark:text-white

                font-semibold
              "
            >
              {darkMode ? (
                <>
                  <Sun size={20} />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={20} />
                  Dark Mode
                </>
              )}
            </button>


            <button
              onClick={() => navigate("/login")}
              className="
                w-full
                py-3

                rounded-xl

                border-2
                border-green-600
                dark:border-green-400

                text-green-600
                dark:text-green-400

                font-bold
              "
            >
              Login
            </button>


            <button
              onClick={() => navigate("/register")}
              className="
                w-full
                py-3

                rounded-xl

                bg-green-600
                dark:bg-green-500

                text-white
                font-bold
              "
            >
              Get Started
            </button>

          </div>

        )}

      </header>


      {/* ================================================= */}
      {/* PAGE CONTENT */}
      {/* ================================================= */}

      <main className="min-w-0 w-full overflow-x-hidden">
  {children}
</main>

    </div>
  );
}

export default MainLayout;