import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  Car,
  Plug,
  Recycle,
  Sprout,
  CircleCheck,
} from "lucide-react";

/* -------------------------------------------------------------------- */
/*  Fonts + keyframes                                                    */
/*  Fraunces  -> display serif (headline, big numerals)                  */
/*  Inter     -> body / UI                                               */
/*  IBM Plex Mono -> readouts, eyebrows, data labels                     */
/* -------------------------------------------------------------------- */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

      .ct-font-display { font-family: 'Fraunces', ui-serif, Georgia, serif; }
      .ct-font-body    { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      .ct-font-mono    { font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace; }

      @keyframes ct-pulse-dot {
        0%, 100% { opacity: 1; }
        50% { opacity: .35; }
      }
      .ct-dot { animation: ct-pulse-dot 2.2s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .ct-dot { animation: none; }
        * { scroll-behavior: auto !important; }
      }
    `}</style>
  );
}

/* -------------------------------------------------------------------- */
/*  Topographic contour-line background, used behind the hero and CTA    */
/* -------------------------------------------------------------------- */
function Contours({ className = "" }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <path d="M-50 620 C 200 560, 320 700, 560 640 S 900 520, 1250 600" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <path d="M-50 680 C 220 630, 340 760, 580 700 S 920 590, 1250 660" stroke="currentColor" strokeWidth="1" opacity="0.28" />
      <path d="M-50 100 C 260 40, 380 160, 640 90 S 980 10, 1250 90" stroke="currentColor" strokeWidth="1" opacity="0.22" />
      <path d="M-50 160 C 240 110, 400 220, 660 150 S 960 70, 1250 150" stroke="currentColor" strokeWidth="1" opacity="0.16" />
      <path d="M-50 380 C 300 340, 420 430, 700 380 S 1000 320, 1250 380" stroke="currentColor" strokeWidth="1" opacity="0.12" />
    </svg>
  );
}

/* -------------------------------------------------------------------- */
/*  Animated instrument-style counter, respects reduced-motion           */
/* -------------------------------------------------------------------- */
function ReadoutCounter({ target, decimals = 0, duration = 1400 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();

            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(target * eased);
              if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
    </span>
  );
}

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

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Open the native browser installation prompt
  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  // Hide the mobile install banner
  const dismissInstall = () => {
    setShowInstall(false);
  };

  return (
    <MainLayout>
      <GlobalStyle />

      <div className="ct-font-body bg-[#F3F1E7] dark:bg-[#0E1B16] transition-colors duration-300">
        {/* ============================================================ */}
        {/* HERO                                                          */}
        {/* ============================================================ */}
        <section className="relative overflow-hidden border-b border-[#D8D3C0] dark:border-[#24352C]">
          <Contours className="text-[#3F6B4F]/40 dark:text-[#6FA37F]/25" />

          <div
            className="
              relative z-10 mx-auto max-w-7xl
              px-5 sm:px-8 lg:px-12
              pt-16 pb-16
              sm:pt-20 sm:pb-20
              lg:pt-28 lg:pb-28
              grid gap-12 lg:gap-10
              lg:grid-cols-[1.1fr_0.9fr] lg:items-center
            "
          >
            {/* LEFT */}
            <div>
              <div
                className="
                  ct-font-mono
                  inline-flex items-center gap-2
                  rounded-full border border-[#3F6B4F]/30 dark:border-[#6FA37F]/40
                  bg-[#3F6B4F]/5 dark:bg-[#6FA37F]/10
                  px-4 py-1.5
                  text-[11px] sm:text-xs font-medium uppercase tracking-widest
                  text-[#2C4A37] dark:text-[#9FCBAA]
                "
              >
                <Globe size={14} strokeWidth={2} />
                Smart sustainability platform
              </div>

              <h1
                className="
                  ct-font-display
                  mt-6 sm:mt-7
                  text-[2.6rem] leading-[1.05]
                  sm:text-6xl sm:leading-[1.05]
                  lg:text-[4.5rem] lg:leading-[1.02]
                  font-medium
                  text-[#14261F] dark:text-[#F3F1E7]
                  text-balance
                "
              >
                Track carbon.
                <br />
                <span className="italic text-[#3F6B4F] dark:text-[#7FB88F]">
                  Protect tomorrow.
                </span>
              </h1>

              <p
                className="
                  mt-5 sm:mt-6
                  max-w-md sm:max-w-lg
                  text-base sm:text-lg
                  leading-relaxed
                  text-[#4B5A50] dark:text-[#B9C4BC]
                "
              >
                Carbon Tracker helps you understand your everyday footprint,
                build better habits, and see your impact add up — one
                logged action at a time.
              </p>

              {/* HERO ACTIONS */}
              <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link to="/register" className="w-full sm:w-auto">
                  <button
                    className="
                      group w-full sm:w-auto
                      inline-flex items-center justify-center gap-2
                      rounded-xl bg-[#24402F] dark:bg-[#3F6B4F]
                      px-6 sm:px-7 py-3.5
                      text-sm sm:text-base font-semibold text-[#F3F1E7]
                      transition-all hover:bg-[#14261F] dark:hover:bg-[#4C7C5C]
                      hover:-translate-y-0.5
                      motion-reduce:hover:translate-y-0
                      focus-visible:outline focus-visible:outline-2
                      focus-visible:outline-offset-2 focus-visible:outline-[#3F6B4F]
                    "
                  >
                    Start tracking
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </button>
                </Link>

                <Link to="/login" className="w-full sm:w-auto">
                  <button
                    className="
                      w-full sm:w-auto
                      rounded-xl border-2 border-[#24402F]/25 dark:border-[#7FB88F]/40
                      px-6 sm:px-7 py-3.5
                      text-sm sm:text-base font-semibold
                      text-[#24402F] dark:text-[#B9C4BC]
                      transition hover:border-[#24402F] hover:bg-[#24402F]/5
                      dark:hover:border-[#7FB88F] dark:hover:bg-[#7FB88F]/10
                      focus-visible:outline focus-visible:outline-2
                      focus-visible:outline-offset-2 focus-visible:outline-[#3F6B4F]
                    "
                  >
                    Log in
                  </button>
                </Link>

                {showInstall && (
                  <button
                    onClick={handleInstall}
                    className="
                      hidden md:inline-flex
                      items-center gap-2
                      rounded-xl border-2 border-dashed border-[#3F6B4F]/40 dark:border-[#7FB88F]/40
                      px-6 py-3.5
                      text-sm font-semibold
                      text-[#3F6B4F] dark:text-[#9FCBAA]
                      transition hover:bg-[#3F6B4F]/5 dark:hover:bg-[#7FB88F]/10
                      focus-visible:outline focus-visible:outline-2
                      focus-visible:outline-offset-2 focus-visible:outline-[#3F6B4F]
                    "
                  >
                    <Download size={18} />
                    Install app
                  </button>
                )}
              </div>

              <div className="ct-font-mono mt-8 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#6B7A70] dark:text-[#7E8D83]">
                <span className="flex items-center gap-1.5">
                  <CircleCheck size={14} className="text-[#3F6B4F] dark:text-[#7FB88F]" />
                  No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <CircleCheck size={14} className="text-[#3F6B4F] dark:text-[#7FB88F]" />
                  2-minute setup
                </span>
              </div>
            </div>

            {/* RIGHT — instrument readout card */}
            <div className="relative">
              <div
                className="
                  relative overflow-hidden
                  rounded-3xl border border-[#D8D3C0] dark:border-[#24352C]
                  bg-white/70 dark:bg-[#12241C]
                  shadow-[0_20px_60px_-15px_rgba(20,38,31,0.25)]
                  backdrop-blur-sm
                  p-6 sm:p-8
                "
              >
                <div className="ct-font-mono flex items-center justify-between text-[11px] uppercase tracking-widest text-[#6B7A70] dark:text-[#7E8D83]">
                  <span className="flex items-center gap-2">
                    <span className="ct-dot inline-block h-2 w-2 rounded-full bg-[#3F6B4F] dark:bg-[#7FB88F]" />
                    Live readout
                  </span>
                  <span>Unit: kg CO₂e</span>
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="ct-font-display text-6xl sm:text-7xl font-medium tabular-nums text-[#14261F] dark:text-[#F3F1E7]">
                    <ReadoutCounter target={38.2} decimals={1} />
                  </span>
                  <span className="ct-font-mono text-sm text-[#6B7A70] dark:text-[#7E8D83]">
                    saved this week
                  </span>
                </div>

                <svg viewBox="0 0 300 60" className="mt-6 h-14 w-full text-[#3F6B4F] dark:text-[#7FB88F]" preserveAspectRatio="none" aria-hidden="true">
                  <polyline
                    points="0,45 40,40 70,48 100,30 140,34 170,18 210,24 240,10 300,14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.9"
                  />
                </svg>

                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[#D8D3C0] dark:border-[#24352C] pt-5">
                  {[
                    { label: "Transport", value: "-14%" },
                    { label: "Energy", value: "-9%" },
                    { label: "Waste", value: "-21%" },
                  ].map((row) => (
                    <div key={row.label}>
                      <p className="ct-font-mono text-[10px] uppercase tracking-wider text-[#6B7A70] dark:text-[#7E8D83]">
                        {row.label}
                      </p>
                      <p className="ct-font-mono mt-1 text-sm font-semibold text-[#24402F] dark:text-[#9FCBAA]">
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="
                  absolute -bottom-5 -left-5 hidden sm:flex
                  items-center gap-2 rounded-2xl
                  bg-[#24402F] dark:bg-[#3F6B4F]
                  px-4 py-3 shadow-lg
                "
              >
                <Leaf size={18} className="text-[#F3F1E7]" />
                <p className="ct-font-mono text-xs font-medium text-[#F3F1E7]">
                  Every action, counted
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* IMPACT DASHBOARD STRIP                                        */}
        {/* ============================================================ */}
        <section className="bg-[#14261F] dark:bg-[#0A130F] text-[#F3F1E7]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-10 sm:py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <Impact value={10} suffix="K+" text="Active users" />
              <Impact value={25} suffix="K+" text="Eco actions logged" />
              <Impact value={500} suffix="+" text="Rewards earned" />
              <Impact value={30} suffix="T" text="CO₂e reduced" />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FEATURES                                                      */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to stay on track"
          />

          <div className="mt-10 sm:mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<Activity size={22} />}
              title="Carbon tracking"
              text="Log your daily activity and watch your footprint update in real time."
            />
            <Feature
              icon={<BarChart3 size={22} />}
              title="Analytics"
              text="Break down your emissions by category to see exactly where they come from."
            />
            <Feature
              icon={<Trophy size={22} />}
              title="Rewards"
              text="Earn badges and milestones for the green habits you build over time."
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* CATEGORIES                                                    */}
        {/* ============================================================ */}
        <section className="border-y border-[#D8D3C0] dark:border-[#24352C] bg-[#EDEADC] dark:bg-[#0F1F19]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
            <SectionHeading
              eyebrow="Coverage"
              title="Track your whole lifestyle"
              align="center"
            />

            <div className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Category icon={<Car size={26} />} title="Transport" />
              <Category icon={<Plug size={26} />} title="Energy" />
              <Category icon={<Sprout size={26} />} title="Lifestyle" />
              <Category icon={<Recycle size={26} />} title="Waste" />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* RECOMMENDATIONS                                               */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Guidance"
                title="Smart, personal recommendations"
              />

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#4B5A50] dark:text-[#B9C4BC]">
                Get personalized suggestions, based on your own logged
                habits, that make cutting emissions feel manageable.
              </p>

              <ul className="mt-7 space-y-4">
                <RecTip icon={<Car size={18} />} text="Reduce unnecessary travel" />
                <RecTip icon={<Zap size={18} />} text="Save on electricity usage" />
                <RecTip icon={<Recycle size={18} />} text="Improve your recycling habits" />
              </ul>
            </div>

            <div
              className="
                relative overflow-hidden rounded-3xl
                bg-[#14261F] dark:bg-[#0A130F]
                text-[#F3F1E7]
                p-7 sm:p-10
              "
            >
              <Contours className="text-[#F3F1E7]/10" />

              <div className="relative z-10">
                <h3 className="ct-font-display text-2xl sm:text-3xl font-medium">
                  Your green journey
                </h3>

                <div className="mt-6 space-y-3">
                  <JourneyRow label="Complete eco goals" progress={72} />
                  <JourneyRow label="Earn badges" progress={45} />
                  <JourneyRow label="Reduce carbon" progress={61} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* WHY CHOOSE                                                    */}
        {/* ============================================================ */}
        <section className="border-y border-[#D8D3C0] dark:border-[#24352C] bg-[#EDEADC] dark:bg-[#0F1F19]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
            <SectionHeading
              eyebrow="Why Carbon Tracker"
              title="Built to make tracking effortless"
              align="center"
            />

            <div className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Why icon={<ShieldCheck size={22} />} text="Secure by default" />
              <Why icon={<Zap size={22} />} text="Fast, smart insights" />
              <Why icon={<Target size={22} />} text="Goals that fit you" />
              <Why icon={<Leaf size={22} />} text="Eco-friendly, always" />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* TESTIMONIALS                                                  */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
          <SectionHeading eyebrow="From users" title="What people are saying" align="center" />

          <div className="mt-10 sm:mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Testimonial text="Easy way to understand my carbon impact." />
            <Testimonial text="The recommendations genuinely improved my habits." />
            <Testimonial text="Rewards make sustainability feel like a game." />
          </div>
        </section>

        {/* ============================================================ */}
        {/* CTA                                                           */}
        {/* ============================================================ */}
        <section className="relative overflow-hidden bg-[#14261F] dark:bg-[#0A130F] text-[#F3F1E7]">
          <Contours className="text-[#F3F1E7]/10" />

          <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-20 lg:py-24 text-center">
            <h2 className="ct-font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-balance">
              Start your green journey today
              <span className="ml-2 italic text-[#7FB88F]">🌱</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#B9C4BC]">
              It takes two minutes to set up your first tracker.
            </p>

            <Link to="/register" className="mt-8 sm:mt-9 inline-block">
              <button
                className="
                  inline-flex items-center gap-2
                  rounded-xl bg-[#F3F1E7] px-8 py-4
                  text-sm sm:text-base font-bold text-[#14261F]
                  transition hover:bg-white hover:-translate-y-0.5
                  motion-reduce:hover:translate-y-0
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-[#7FB88F]
                "
              >
                Create your account
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </section>

        {/* ============================================================ */}
        {/* MOBILE PWA INSTALL BANNER                                     */}
        {/* ============================================================ */}
        {showInstall && (
          <div
            className="
              fixed bottom-4 left-4 right-4 z-50 md:hidden
              flex items-center gap-3
              rounded-2xl border border-[#D8D3C0] dark:border-[#24352C]
              bg-white dark:bg-[#12241C]
              p-4 shadow-2xl
            "
            role="dialog"
            aria-label="Install Carbon Tracker"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#3F6B4F]/10 dark:bg-[#7FB88F]/15">
              <Leaf size={22} className="text-[#3F6B4F] dark:text-[#7FB88F]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[#14261F] dark:text-white">
                Install Carbon Tracker
              </p>
              <p className="text-sm text-[#6B7A70] dark:text-[#B9C4BC]">
                Quick access to your dashboard
              </p>
            </div>

            <button
              onClick={handleInstall}
              className="
                flex-shrink-0 rounded-xl bg-[#24402F] dark:bg-[#3F6B4F]
                px-4 py-2 text-sm font-semibold text-white
                transition hover:bg-[#14261F] dark:hover:bg-[#4C7C5C]
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-[#3F6B4F]
              "
            >
              Install
            </button>

            <button
              onClick={dismissInstall}
              aria-label="Dismiss install banner"
              className="
                flex-shrink-0 text-[#8A9790] transition hover:text-[#14261F]
                dark:hover:text-white
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-[#3F6B4F]
                rounded-lg
              "
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

/* -------------------------------------------------------------------- */
/*  Sub-components                                                       */
/* -------------------------------------------------------------------- */

function SectionHeading({ eyebrow, title, align = "left" }) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "text-center" : ""}>
      <p className="ct-font-mono text-xs font-medium uppercase tracking-widest text-[#3F6B4F] dark:text-[#7FB88F]">
        {eyebrow}
      </p>
      <h2
        className={`
          ct-font-display mt-2
          text-3xl sm:text-4xl lg:text-[2.75rem]
          font-medium leading-tight text-balance
          text-[#14261F] dark:text-white
          ${isCenter ? "mx-auto max-w-2xl" : "max-w-xl"}
        `}
      >
        {title}
      </h2>
    </div>
  );
}

function Impact({ value, suffix, text }) {
  return (
    <div className="text-center sm:text-left">
      <h3 className="ct-font-mono text-3xl sm:text-4xl font-semibold tabular-nums">
        <ReadoutCounter target={value} />
        {suffix}
      </h3>
      <p className="mt-1 text-sm text-[#B9C4BC]">{text}</p>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div
      className="
        group rounded-2xl border border-[#D8D3C0] dark:border-[#24352C]
        bg-white dark:bg-[#12241C]
        p-6 sm:p-7
        transition hover:-translate-y-1 hover:shadow-lg
        motion-reduce:hover:translate-y-0
      "
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3F6B4F]/10 dark:bg-[#7FB88F]/15 text-[#3F6B4F] dark:text-[#7FB88F]">
        {icon}
      </div>

      <h3 className="ct-font-display mt-4 text-xl font-medium text-[#14261F] dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#5B6B60] dark:text-[#B9C4BC]">
        {text}
      </p>
    </div>
  );
}

function Category({ icon, title }) {
  return (
    <div
      className="
        flex flex-col items-center gap-3 rounded-2xl
        border border-[#D8D3C0] dark:border-[#24352C]
        bg-white dark:bg-[#12241C]
        px-4 py-7 sm:py-8
        text-center
        transition hover:-translate-y-1 hover:shadow-md
        motion-reduce:hover:translate-y-0
      "
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3F6B4F]/10 dark:bg-[#7FB88F]/15 text-[#3F6B4F] dark:text-[#7FB88F]">
        {icon}
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-[#14261F] dark:text-white">
        {title}
      </h3>
    </div>
  );
}

function RecTip({ icon, text }) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-[#D8D3C0] dark:border-[#24352C] bg-white dark:bg-[#12241C] px-4 py-3.5">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#3F6B4F]/10 dark:bg-[#7FB88F]/15 text-[#3F6B4F] dark:text-[#7FB88F]">
        {icon}
      </span>
      <span className="text-sm sm:text-base font-medium text-[#14261F] dark:text-[#EDEAE0]">
        {text}
      </span>
    </li>
  );
}

function JourneyRow({ label, progress }) {
  return (
    <div className="rounded-xl bg-white/10 px-4 py-3.5">
      <div className="flex items-center justify-between text-sm font-medium">
        <span>{label}</span>
        <span className="ct-font-mono text-xs text-[#7FB88F]">{progress}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-[#7FB88F] transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function Why({ icon, text }) {
  return (
    <div
      className="
        flex flex-col items-center gap-3 rounded-2xl
        bg-white dark:bg-[#12241C]
        border border-[#D8D3C0] dark:border-[#24352C]
        px-4 py-6 text-center
        transition hover:-translate-y-1 hover:shadow-md
        motion-reduce:hover:translate-y-0
      "
    >
      <div className="text-[#3F6B4F] dark:text-[#7FB88F]">{icon}</div>
      <p className="text-sm font-semibold text-[#14261F] dark:text-white">
        {text}
      </p>
    </div>
  );
}

function Testimonial({ text }) {
  return (
    <div className="rounded-2xl border border-[#D8D3C0] dark:border-[#24352C] bg-white dark:bg-[#12241C] p-6 sm:p-7">
      <span className="ct-font-display text-4xl leading-none text-[#3F6B4F]/40 dark:text-[#7FB88F]/40">
        “
      </span>
      <p className="-mt-2 text-[#4B5A50] dark:text-[#B9C4BC] leading-relaxed">
        {text}
      </p>
    </div>
  );
}

export default Home;