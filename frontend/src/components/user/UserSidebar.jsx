import {
  LayoutDashboard,
  PlusCircle,
  History,
  BarChart3,
  Lightbulb,
  Gift,
  Trophy,
  PanelLeftClose,
  PanelLeftOpen,
  X,
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
  // context) already overlays the page and closes itself, so the
  // "collapsed / icon-only" affordance is a desktop-only space-saving
  // feature. Forcing it off on mobile keeps labels tappable and
  // readable instead of showing a cramped icon rail inside a drawer.
  const isMobileDrawer = Boolean(onClose);
  const effectiveCollapsed = isMobileDrawer ? false : collapsed;

  const menuClass = ({ isActive }) =>
    `flex items-center ${
      effectiveCollapsed ? "justify-center" : "gap-3"
    } px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900/50 hover:text-green-700 dark:hover:text-green-300"
    }`;


  return (

    <div
      className={`${
        effectiveCollapsed ? "w-20" : "w-72"
      } h-screen
      h-[100dvh]
      max-w-[85vw]
      sm:max-w-full
      bg-white dark:bg-gray-900
      border-r border-gray-200 dark:border-gray-700
      text-gray-900 dark:text-white
      flex flex-col
      transition-all duration-300
      overflow-hidden
      shadow-lg`}
    >

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

        <div className="flex items-center justify-between gap-2">

          {/* COLLAPSE TOGGLE — desktop persistent sidebar only.
              The mobile drawer has no use for this since it already
              collapses by closing entirely. */}

          {!isMobileDrawer && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="
                p-2
                rounded-lg
                text-gray-700
                dark:text-gray-200
                hover:bg-green-100
                dark:hover:bg-green-900/50
                hover:text-green-600
                dark:hover:text-green-400
                transition
                flex-shrink-0
              "
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <PanelLeftOpen size={22} />
              ) : (
                <PanelLeftClose size={22} />
              )}
            </button>
          )}

          {/* App name sits inline with the header row on mobile so
              the drawer doesn't waste a whole extra line before it */}

          {isMobileDrawer && (
            <h1
              className="
                text-lg
                font-bold
                truncate
                min-w-0
                flex-1
                text-gray-900
                dark:text-white
              "
              title="Carbon Tracker"
            >
              🌿 Carbon Tracker
            </h1>
          )}

          {/* MOBILE CLOSE BUTTON — only rendered inside the mobile drawer,
              where UserLayout passes a real onClose handler */}

          {onClose && (
            <button
              onClick={onClose}
              className="
                p-2
                rounded-lg
                text-gray-700
                dark:text-gray-200
                hover:bg-red-100
                dark:hover:bg-red-900/30
                hover:text-red-600
                dark:hover:text-red-400
                transition
                flex-shrink-0
              "
              title="Close menu"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          )}

        </div>


        {/* Desktop-only branding block — on mobile the title already
            lives in the header row above */}

        {!isMobileDrawer && !collapsed && (

          <>

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

          </>

        )}

        {isMobileDrawer && (
          <p
            className="
              text-green-600
              dark:text-green-400
              text-xs
              mt-1
              truncate
            "
          >
            User Panel
          </p>
        )}

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

            {!effectiveCollapsed && (
              <span className="whitespace-nowrap truncate text-sm sm:text-base">
                {label}
              </span>
            )}
          </NavLink>
        ))}

      </nav>

    </div>
  );
}


export default UserSidebar;