import {
  LayoutDashboard,
  PlusCircle,
  History,
  BarChart3,
  Lightbulb,
  Gift,
  Trophy,
  Menu,
  LifeBuoy,
  Target,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/add-activity", label: "Add Activity", icon: PlusCircle },
  { to: "/activity-history", label: "Activity History", icon: History },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/recommendations", label: "Recommendations", icon: Lightbulb },
  { to: "/goals", label: "Goal Tracking", icon: Target },
  { to: "/user-rewards", label: "Rewards", icon: Gift },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/user/my-tickets", label: "Support", icon: LifeBuoy },
];

function UserSidebar({ collapsed, setCollapsed, onClose }) {

  // The mobile drawer (onClose is passed by UserLayout only in that
  // context) already overlays the page and is opened/closed by the
  // parent (backdrop tap, route change, etc.), so the collapse-to-0
  // behavior below is a desktop-only space-saving feature. On mobile
  // the drawer always renders fully expanded while it's mounted.
  const isMobileDrawer = Boolean(onClose);
  const effectiveCollapsed = isMobileDrawer ? false : collapsed;

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900/50 hover:text-green-700 dark:hover:text-green-300"
    }`;


  return (

    // Fragment: the collapsible sidebar itself, plus a small floating
    // "reopen" tab that only renders while fully collapsed on desktop
    // (see below). The tab is what makes the sidebar reopenable once
    // it's fully closed — the sidebar's own toggle button is clipped
    // away with it at w-0.
    <>

    {effectiveCollapsed && !isMobileDrawer && (
      <button
        onClick={() => setCollapsed(false)}
        className="
          fixed
          top-4
          left-0
          z-40
          p-2
          rounded-r-lg
          bg-white dark:bg-gray-900
          border border-l-0
          border-gray-200 dark:border-gray-700
          text-gray-700 dark:text-gray-200
          hover:bg-green-100
          dark:hover:bg-green-900/50
          hover:text-green-600
          dark:hover:text-green-400
          shadow-md
          transition
        "
        title="Open Sidebar"
        aria-label="Open Sidebar"
      >
        <Menu size={20} />
      </button>
    )}

    <div
      className={`${
        effectiveCollapsed
          ? "w-0 border-r-0 shadow-none"
          : "w-72 border-r border-gray-200 dark:border-gray-700 shadow-lg"
      }
      h-screen
      h-[100dvh]
      max-w-[85vw]
      sm:max-w-full
      bg-white dark:bg-gray-900
      text-gray-900 dark:text-white
      flex flex-col
      transition-all duration-300
      overflow-hidden`}
    >

      {/* Fixed-width inner wrapper — the OUTER div animates 0 <-> 18rem
          and clips via overflow-hidden, while everything inside keeps
          its normal full-width layout instead of being squeezed/reflowed
          mid-animation. This gives a clean slide-away instead of a
          "thin sliver" of visible content when collapsed. */}

      <div className="w-72 h-full flex flex-col flex-shrink-0">

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            p-4
            sm:p-5
            border-b
            border-gray-200
            dark:border-gray-700
            flex-shrink-0
          "
        >

          {/* COLLAPSE / MENU TOGGLE — same single-button pattern as
              AdminSidebar. No separate close (X) button; the mobile
              drawer is dismissed via this same toggle or by tapping
              a nav item (see onClose usage below). */}

          <button
            onClick={() => (isMobileDrawer ? onClose() : setCollapsed(!collapsed))}
            className="
              -ml-1.5
              p-1.5
              rounded-lg
              text-gray-700
              dark:text-gray-200
              hover:bg-green-100
              dark:hover:bg-green-900/50
              hover:text-green-600
              dark:hover:text-green-400
              transition
              leading-none
            "
            title={isMobileDrawer ? "Close menu" : "Toggle Sidebar"}
            aria-label={isMobileDrawer ? "Close menu" : "Toggle Sidebar"}
          >
            <Menu size={22} />
          </button>

          <h1
            className="
              text-xl
              sm:text-2xl
              lg:text-3xl
              font-bold
              mt-3
              sm:mt-4
              truncate
              text-gray-900
              dark:text-white
            "
            title="Carbon Tracker"
          >
            🌿 Carbon Tracker
          </h1>


          <p
            className="
              text-green-600
              dark:text-green-400
              text-xs
              sm:text-sm
              mt-1.5
              sm:mt-2
              truncate
            "
          >
            User Panel
          </p>

        </div>


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav
          className="
            flex-1
            mt-4
            sm:mt-6
            px-2.5
            sm:px-3
            pb-[max(1rem,env(safe-area-inset-bottom))]
            space-y-1.5
            sm:space-y-2
            overflow-y-auto
            overflow-x-hidden
          "
        >

          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={isMobileDrawer ? onClose : undefined}
              className={menuClass}
              title={label}
            >
              <Icon size={22} className="flex-shrink-0" />

              <span className="whitespace-nowrap truncate text-sm sm:text-base">
                {label}
              </span>
            </NavLink>
          ))}

        </nav>

      </div>

    </div>

    </>
  );
}


export default UserSidebar;