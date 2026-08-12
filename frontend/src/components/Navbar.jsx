import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import LanguageDropdown from "./common/LanguageDropdown";

function Navbar() {
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
          gap-3
          sm:gap-6
        "
      >

        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

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
              h-10
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
              size={24}
              className="text-green-600 dark:text-green-400 sm:w-7 sm:h-7"
            />
          </div>

          <span
            className="
              text-lg
              sm:text-2xl
              lg:text-3xl
              font-bold
              text-green-600
              dark:text-green-400
              whitespace-nowrap
            "
          >
            CarbonTracker
          </span>
        </Link>


        {/* ================================================= */}
        {/* CENTER LINKS */}
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

          <a
            href="#features"
            className="
              text-gray-700
              font-medium
              hover:text-green-600
              transition
            "
          >
            Features
          </a>

          <a
            href="#impact"
            className="
              text-gray-700
              font-medium
              hover:text-green-600
              transition
            "
          >
            Impact
          </a>

          <a
            href="#analytics"
            className="
              text-gray-700
              font-medium
              hover:text-green-600
              transition
            "
          >
            Analytics
          </a>

          <a
            href="#rewards"
            className="
              text-gray-700
              font-medium
              hover:text-green-600
              transition
            "
          >
            Rewards
          </a>

        </div>


        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div
          className="
            flex
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
              font-semibold
              hover:bg-green-50
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
              transition
              whitespace-nowrap
            "
          >
            Get Started
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;