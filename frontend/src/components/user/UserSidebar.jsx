import {
  LayoutDashboard,
  PlusCircle,
  History,
  BarChart3,
  Lightbulb,
  Gift,
  Trophy,
  Menu,
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

  const menuClass = ({ isActive }) =>
    `flex items-center ${
      collapsed ? "justify-center" : "gap-3"
    } px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900/50 hover:text-green-700 dark:hover:text-green-300"
    }`;


  return (

    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      } h-screen
      max-w-full
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
            title="Toggle Sidebar"
          >
            <Menu size={22} />
          </button>

          {/* MOBILE CLOSE BUTTON — only rendered inside the mobile drawer,
              where UserLayout passes a real onClose handler */}

          {onClose && (
            <button
              onClick={onClose}
              className="
                lg:hidden
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


        {!collapsed && (

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
            className={menuClass}
            title={label}
          >
            <Icon size={22} className="flex-shrink-0" />

            {!collapsed && (
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