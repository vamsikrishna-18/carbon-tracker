import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import {
  Leaf,
  Globe,
  Activity,
  BarChart3,
  Trophy,
  ShieldCheck,
  Target,
  Zap,
  ArrowRight,
  Download,
  X,
} from "lucide-react";

function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    // Check whether the app is already installed
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      return;
    }

    // Browser says the PWA can be installed
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      setDeferredPrompt(event);
      setShowInstall(true);
    };

    // PWA successfully installed
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowInstall(false);
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

  // Open the native browser installation prompt
  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  // Hide the mobile install banner
  const dismissInstall = () => {
    setShowInstall(false);
  };

  return (
    <MainLayout>
      {/* HERO */}
      <section
        className="
          min-h-screen
          flex
          items-center
          px-6
          md:px-12
          bg-gradient-to-br
          from-green-50
          via-white
          to-green-100
          dark:from-gray-950
          dark:via-gray-900
          dark:to-gray-950
          transition-colors
          duration-300
        "
      >
        <div className="w-full grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-green-100
                text-green-700
                dark:bg-green-900/40
                dark:text-green-300
                px-5
                py-2
                rounded-full
                font-semibold
              "
            >
              <Globe size={18} />
              Smart Sustainability Platform
            </div>

            <h1
              className="
                mt-6
                text-5xl
                md:text-7xl
                font-black
                text-green-950
                dark:text-white
                leading-tight
              "
            >
              Track Carbon.
              <br />

              <span className="text-green-600 dark:text-green-400">
                Protect Tomorrow.
              </span>
            </h1>

            <p
              className="
                mt-6
                text-lg
                text-gray-600
                dark:text-gray-300
                max-w-xl
              "
            >
              Carbon Tracker helps individuals understand their carbon
              footprint, improve habits, and contribute towards a sustainable
              future.
            </p>

            {/* HERO ACTIONS */}
            <div className="mt-8 flex gap-5 flex-wrap">
              {/* START TRACKING */}
              <Link to="/register">
                <button
                  className="
                    bg-green-600
                    hover:bg-green-700
                    dark:bg-green-500
                    dark:hover:bg-green-600
                    text-white
                    px-8
                    py-4
                    rounded-xl
                    font-bold
                    flex
                    items-center
                    gap-2
                    transition
                  "
                >
                  Start Tracking
                  <ArrowRight size={20} />
                </button>
              </Link>

              {/* LOGIN */}
              <Link to="/login">
                <button
                  className="
                    border-2
                    border-green-600
                    dark:border-green-400
                    text-green-700
                    dark:text-green-400
                    px-8
                    py-4
                    rounded-xl
                    font-bold
                    hover:bg-green-50
                    dark:hover:bg-green-900/30
                    transition
                  "
                >
                  Login
                </button>
              </Link>

              {/* INSTALL APP - DESKTOP */}
              {showInstall && (
                <button
                  onClick={handleInstall}
                  className="
                    border-2
                    border-green-600
                    dark:border-green-400
                    text-green-700
                    dark:text-green-400
                    px-8
                    py-4
                    rounded-xl
                    font-bold
                    flex
                    items-center
                    gap-2
                    hover:bg-green-50
                    dark:hover:bg-green-900/30
                    transition
                    hidden
                    md:flex
                  "
                >
                  <Download size={20} />
                  Install App
                </button>
              )}
            </div>
          </div>

          {/* HERO CARD */}
          <div className="flex justify-center">
            <div
              className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                shadow-2xl
                p-10
                max-w-lg
                border
                border-gray-200
                dark:border-gray-700
                transition
              "
            >
              <Leaf
                size={80}
                className="text-green-600 dark:text-green-400"
              />

              <h2
                className="
                  mt-5
                  text-4xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Make Every Action Count
              </h2>

              <p
                className="
                  mt-4
                  text-gray-600
                  dark:text-gray-300
                "
              >
                Small sustainable decisions create a large environmental
                impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section
        className="
          bg-green-700
          dark:bg-green-900
          text-white
          py-14
          px-6
          md:px-12
          transition
        "
      >
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <Impact value="10K+" text="Users" />
          <Impact value="25K+" text="Eco Actions" />
          <Impact value="500+" text="Rewards" />
          <Impact value="30T" text="CO₂ Reduced" />
        </div>
      </section>

      {/* FEATURES */}
      <section
        className="
          py-16
          px-6
          md:px-12
          bg-white
          dark:bg-gray-900
          transition
        "
      >
        <h2
          className="
            text-4xl
            font-bold
            text-center
            text-green-950
            dark:text-white
          "
        >
          Everything You Need
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <Feature
            icon={<Activity />}
            title="Carbon Tracking"
            text="Monitor your daily environmental impact"
          />

          <Feature
            icon={<BarChart3 />}
            title="Analytics"
            text="Understand your emission patterns"
          />

          <Feature
            icon={<Trophy />}
            title="Rewards"
            text="Earn achievements for green actions"
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        className="
          bg-green-50
          dark:bg-gray-950
          py-16
          px-6
          md:px-12
          transition
        "
      >
        <h2
          className="
            text-4xl
            font-bold
            text-center
            text-gray-900
            dark:text-white
          "
        >
          Track Your Lifestyle
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-10">
          <Category emoji="🚗" title="Transport" />
          <Category emoji="⚡" title="Energy" />
          <Category emoji="🍃" title="Lifestyle" />
          <Category emoji="♻️" title="Waste" />
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section
        className="
          py-16
          px-6
          md:px-12
          bg-white
          dark:bg-gray-900
          transition
        "
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2
              className="
                text-4xl
                font-bold
                text-green-950
                dark:text-white
              "
            >
              Smart Green Recommendations
            </h2>

            <p
              className="
                mt-5
                text-gray-600
                dark:text-gray-300
                text-lg
              "
            >
              Get personalized suggestions that help you reduce emissions
              easily.
            </p>

            <div
              className="
                mt-6
                space-y-4
                text-gray-800
                dark:text-gray-200
              "
            >
              <p>🌱 Reduce unnecessary travel</p>
              <p>💡 Save electricity usage</p>
              <p>♻️ Improve recycling habits</p>
            </div>
          </div>

          <div
            className="
              bg-green-700
              dark:bg-green-900
              text-white
              rounded-3xl
              p-10
              transition
            "
          >
            <h3 className="text-3xl font-bold">
              Your Green Journey
            </h3>

            <div className="mt-6 space-y-4">
              <div className="bg-white/20 p-4 rounded-xl">
                Complete Eco Goals
              </div>

              <div className="bg-white/20 p-4 rounded-xl">
                Earn Badges
              </div>

              <div className="bg-white/20 p-4 rounded-xl">
                Reduce Carbon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section
        className="
          bg-green-50
          dark:bg-gray-950
          py-16
          px-6
          md:px-12
          transition
        "
      >
        <h2
          className="
            text-4xl
            font-bold
            text-center
            text-gray-900
            dark:text-white
          "
        >
          Why Choose Carbon Tracker?
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-10">
          <Why icon={<ShieldCheck />} text="Secure" />
          <Why icon={<Zap />} text="Smart" />
          <Why icon={<Target />} text="Goals" />
          <Why icon={<Leaf />} text="Eco Friendly" />
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section
        className="
          py-16
          px-6
          md:px-12
          bg-white
          dark:bg-gray-900
          transition
        "
      >
        <h2
          className="
            text-4xl
            font-bold
            text-center
            text-gray-900
            dark:text-white
          "
        >
          What Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <Testimonial text="Easy way to understand my carbon impact." />
          <Testimonial text="The recommendations improved my habits." />
          <Testimonial text="Rewards make sustainability fun." />
        </div>
      </section>

      {/* CTA */}
      <section
        className="
          bg-green-700
          dark:bg-green-900
          text-white
          py-16
          text-center
          transition
        "
      >
        <h2 className="text-4xl font-bold">
          Start Your Green Journey Today 🌱
        </h2>

        <Link to="/register">
          <button
            className="
              mt-8
              bg-white
              dark:bg-gray-100
              text-green-700
              px-10
              py-4
              rounded-xl
              font-bold
              hover:bg-gray-100
              transition
            "
          >
            Create Account
          </button>
        </Link>
      </section>

      {/* MOBILE PWA INSTALL BANNER */}
      {showInstall && (
        <div
          className="
            fixed
            bottom-4
            left-4
            right-4
            z-50
            md:hidden
            bg-white
            dark:bg-gray-800
            border
            border-green-200
            dark:border-gray-700
            shadow-2xl
            rounded-2xl
            p-4
            flex
            items-center
            gap-3
          "
        >
          {/* ICON */}
          <div
            className="
              w-11
              h-11
              rounded-xl
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
              className="text-green-600 dark:text-green-400"
            />
          </div>

          {/* TEXT */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 dark:text-white">
              Install Carbon Tracker
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-300">
              Quick access to your carbon dashboard
            </p>
          </div>

          {/* INSTALL */}
          <button
            onClick={handleInstall}
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-4
              py-2
              rounded-xl
              font-semibold
              transition
              flex-shrink-0
            "
          >
            Install
          </button>

          {/* CLOSE */}
          <button
            onClick={dismissInstall}
            className="
              text-gray-400
              hover:text-gray-700
              dark:hover:text-white
              transition
              flex-shrink-0
            "
            aria-label="Dismiss install banner"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </MainLayout>
  );
}

function Impact({ value, text }) {
  return (
    <div>
      <h3 className="text-4xl font-bold">{value}</h3>
      <p className="text-green-100">{text}</p>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div
      className="
        p-8
        rounded-2xl
        shadow-lg
        border
        border-gray-200
        dark:border-gray-700
        bg-white
        dark:bg-gray-800
        transition
      "
    >
      <div className="text-green-600 dark:text-green-400">
        {icon}
      </div>

      <h3
        className="
          mt-4
          font-bold
          text-xl
          text-gray-900
          dark:text-white
        "
      >
        {title}
      </h3>

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {text}
      </p>
    </div>
  );
}

function Category({ emoji, title }) {
  return (
    <div
      className="
        bg-white
        dark:bg-gray-800
        p-8
        rounded-2xl
        shadow
        border
        border-gray-200
        dark:border-gray-700
        text-center
        transition
      "
    >
      <div className="text-5xl">{emoji}</div>

      <h3
        className="
          mt-4
          font-bold
          text-xl
          text-gray-900
          dark:text-white
        "
      >
        {title}
      </h3>
    </div>
  );
}

function Why({ icon, text }) {
  return (
    <div
      className="
        bg-white
        dark:bg-gray-800
        p-6
        rounded-xl
        text-center
        shadow
        border
        border-gray-200
        dark:border-gray-700
        transition
      "
    >
      <div className="flex justify-center text-green-600 dark:text-green-400">
        {icon}
      </div>

      <p className="mt-3 font-bold text-gray-900 dark:text-white">
        {text}
      </p>
    </div>
  );
}

function Testimonial({ text }) {
  return (
    <div
      className="
        bg-white
        dark:bg-gray-800
        p-6
        rounded-xl
        shadow
        border
        border-gray-200
        dark:border-gray-700
        transition
      "
    >
      <p className="text-gray-600 dark:text-gray-300">
        "{text}"
      </p>
    </div>
  );
}

export default Home;