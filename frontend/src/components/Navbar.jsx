import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import LanguageDropdown from "./common/LanguageDropdown";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#impact", label: "Impact" },
  { href: "#analytics", label: "Analytics" },
  { href: "#rewards", label: "Rewards" },
];

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav
      className="
        w-full
        bg-white
        dark:bg-gray-900
        border-b
        border-gray-200
        dark:border-gray-700
        shadow-sm
        relative
        z-50
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          h-16
          sm:h-20
          px-4
          sm:px-6
          flex
          items-center
          justify-between
          gap-2
          sm:gap-6
        "
      >

        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <Link
          to="/"
          onClick={() => setMobileMenu(false)}
          className="
            flex
            items-center
            gap-2
            sm:gap-3
            flex-shrink-0
            min-w-0
          "
        >
          <div
            className="
              w-9
              sm:w-12
              h-9
              sm:h-12
              rounded-lg
              sm:rounded-xl
              bg-green-100
              dark:bg-green-900/40
              flex
              items-center
              justify-center
              flex-shrink-0
            "
          >
            <Leaf
              size={20}
              className="text-green-600 dark:text-green-400 sm:w-7 sm:h-7"
            />
          </div>

          <span
            className="
              text-base
              sm:text-2xl
              lg:text-3xl
              font-bold
              text-green-600
              dark:text-green-400
              whitespace-nowrap
              truncate
            "
          >
            CarbonTracker
          </span>
        </Link>


        {/* ================================================= */}
        {/* CENTER LINKS — DESKTOP */}
        {/* ================================================= */}

        <div
          className="
            hidden
            lg:flex
            items-center
            justify-center
            gap-8
            flex-1
            whitespace-nowrap
          "
        >

          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="
                text-gray-700
                dark:text-gray-200
                font-medium
                hover:text-green-600
                dark:hover:text-green-400
                transition
              "
            >
              {item.label}
            </a>
          ))}

        </div>


        {/* ================================================= */}
        {/* RIGHT SIDE — DESKTOP */}
        {/* ================================================= */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-4
            flex-shrink-0
            whitespace-nowrap
          "
        >

          {/* LANGUAGE */}

          <div className="flex-shrink-0">
            <LanguageDropdown />
          </div>


          {/* LOGIN */}

          <Link
            to="/login"
            className="
              px-5
              py-2.5
              rounded-xl
              border-2
              border-green-600
              text-green-700
              dark:text-green-400
              font-semibold
              hover:bg-green-50
              dark:hover:bg-green-900/30
              transition
              whitespace-nowrap
            "
          >
            Login
          </Link>


          {/* GET STARTED */}

          <Link
            to="/register"
            className="
              px-6
              py-2.5
              rounded-xl
              bg-green-600
              text-white
              font-semibold
              hover:bg-green-700
              shadow-lg
              shadow-green-200
              dark:shadow-none
              transition
              whitespace-nowrap
            "
          >
            Get Started
          </Link>

        </div>


        {/* ================================================= */}
        {/* MOBILE MENU BUTTON */}
        {/* ================================================= */}

        <button
          onClick={() => setMobileMenu((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenu}
          aria-controls="public-mobile-menu"
          className="
            lg:hidden
            w-10
            h-10
            flex-shrink-0
            rounded-lg
            flex
            items-center
            justify-center
            text-gray-700
            dark:text-gray-200
            hover:bg-gray-100
            dark:hover:bg-gray-800
            active:scale-95
            transition-all
          "
        >
          {mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>


      {/* ================================================= */}
      {/* MOBILE MENU PANEL */}
      {/* ================================================= */}

      {mobileMenu && (
        <div
          id="public-mobile-menu"
          className="
            lg:hidden
            border-t
            border-gray-200
            dark:border-gray-700
            bg-white
            dark:bg-gray-900
            px-4
            sm:px-6
            py-4
            space-y-1
            max-h-[calc(100vh-4rem)]
            overflow-y-auto
          "
        >

          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenu(false)}
              className="
                block
                py-2.5
                px-2
                rounded-lg
                font-semibold
                text-gray-700
                dark:text-gray-200
                hover:bg-gray-100
                dark:hover:bg-gray-800
                transition-colors
              "
            >
              {item.label}
            </a>
          ))}

          <div className="pt-2 pb-1 px-2">
            <LanguageDropdown />
          </div>

          <div className="flex gap-3 pt-1">
            <Link
              to="/login"
              onClick={() => setMobileMenu(false)}
              className="
                flex-1
                text-center
                py-3
                rounded-xl
                border-2
                border-green-600
                text-green-700
                dark:text-green-400
                font-semibold
                transition-colors
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMobileMenu(false)}
              className="
                flex-1
                text-center
                py-3
                rounded-xl
                bg-green-600
                text-white
                font-semibold
                transition-colors
              "
            >
              Get Started
            </Link>
          </div>

        </div>
      )}
    </nav>
  );
}

export default Navbar;import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import LanguageDropdown from "./common/LanguageDropdown";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#impact", label: "Impact" },
  { href: "#analytics", label: "Analytics" },
  { href: "#rewards", label: "Rewards" },
];

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav
      className="
        w-full
        bg-white
        dark:bg-gray-900
        border-b
        border-gray-200
        dark:border-gray-700
        shadow-sm
        relative
        z-50
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          h-16
          sm:h-20
          px-4
          sm:px-6
          flex
          items-center
          justify-between
          gap-2
          sm:gap-6
        "
      >

        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <Link
          to="/"
          onClick={() => setMobileMenu(false)}
          className="
            flex
            items-center
            gap-2
            sm:gap-3
            flex-shrink-0
            min-w-0
          "
        >
          <div
            className="
              w-9
              sm:w-12
              h-9
              sm:h-12
              rounded-lg
              sm:rounded-xl
              bg-green-100
              dark:bg-green-900/40
              flex
              items-center
              justify-center
              flex-shrink-0
            "
          >
            <Leaf
              size={20}
              className="text-green-600 dark:text-green-400 sm:w-7 sm:h-7"
            />
          </div>

          <span
            className="
              text-base
              sm:text-2xl
              lg:text-3xl
              font-bold
              text-green-600
              dark:text-green-400
              whitespace-nowrap
              truncate
            "
          >
            CarbonTracker
          </span>
        </Link>


        {/* ================================================= */}
        {/* CENTER LINKS — DESKTOP */}
        {/* ================================================= */}

        <div
          className="
            hidden
            lg:flex
            items-center
            justify-center
            gap-8
            flex-1
            whitespace-nowrap
          "
        >

          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="
                text-gray-700
                dark:text-gray-200
                font-medium
                hover:text-green-600
                dark:hover:text-green-400
                transition
              "
            >
              {item.label}
            </a>
          ))}

        </div>


        {/* ================================================= */}
        {/* RIGHT SIDE — DESKTOP */}
        {/* ================================================= */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-4
            flex-shrink-0
            whitespace-nowrap
          "
        >

          {/* LANGUAGE */}

          <div className="flex-shrink-0">
            <LanguageDropdown />
          </div>


          {/* LOGIN */}

          <Link
            to="/login"
            className="
              px-5
              py-2.5
              rounded-xl
              border-2
              border-green-600
              text-green-700
              dark:text-green-400
              font-semibold
              hover:bg-green-50
              dark:hover:bg-green-900/30
              transition
              whitespace-nowrap
            "
          >
            Login
          </Link>


          {/* GET STARTED */}

          <Link
            to="/register"
            className="
              px-6
              py-2.5
              rounded-xl
              bg-green-600
              text-white
              font-semibold
              hover:bg-green-700
              shadow-lg
              shadow-green-200
              dark:shadow-none
              transition
              whitespace-nowrap
            "
          >
            Get Started
          </Link>

        </div>


        {/* ================================================= */}
        {/* MOBILE MENU BUTTON */}
        {/* ================================================= */}

        <button
          onClick={() => setMobileMenu((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenu}
          aria-controls="public-mobile-menu"
          className="
            lg:hidden
            w-10
            h-10
            flex-shrink-0
            rounded-lg
            flex
            items-center
            justify-center
            text-gray-700
            dark:text-gray-200
            hover:bg-gray-100
            dark:hover:bg-gray-800
            active:scale-95
            transition-all
          "
        >
          {mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>


      {/* ================================================= */}
      {/* MOBILE MENU PANEL */}
      {/* ================================================= */}

      {mobileMenu && (
        <div
          id="public-mobile-menu"
          className="
            lg:hidden
            border-t
            border-gray-200
            dark:border-gray-700
            bg-white
            dark:bg-gray-900
            px-4
            sm:px-6
            py-4
            space-y-1
            max-h-[calc(100vh-4rem)]
            overflow-y-auto
          "
        >

          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenu(false)}
              className="
                block
                py-2.5
                px-2
                rounded-lg
                font-semibold
                text-gray-700
                dark:text-gray-200
                hover:bg-gray-100
                dark:hover:bg-gray-800
                transition-colors
              "
            >
              {item.label}
            </a>
          ))}

          <div className="pt-2 pb-1 px-2">
            <LanguageDropdown />
          </div>

          <div className="flex gap-3 pt-1">
            <Link
              to="/login"
              onClick={() => setMobileMenu(false)}
              className="
                flex-1
                text-center
                py-3
                rounded-xl
                border-2
                border-green-600
                text-green-700
                dark:text-green-400
                font-semibold
                transition-colors
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMobileMenu(false)}
              className="
                flex-1
                text-center
                py-3
                rounded-xl
                bg-green-600
                text-white
                font-semibold
                transition-colors
              "
            >
              Get Started
            </Link>
          </div>

        </div>
      )}
    </nav>
  );
}

export default Navbar;