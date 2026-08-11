import {
  Menu,
  X,
  Building2,
  Home,
  Users,
  ClipboardList,
  Award,
  Layers,
  BarChart3,
  Trophy,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function OrganizationSidebar({ collapsed, setCollapsed }) {
  const menuItem = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex
        items-center
        ${collapsed ? "justify-center" : "gap-4"}

        px-4
        py-3
        mx-3
        mb-2

        rounded-xl

        transition-all
        duration-200

        ${
          isActive
            ? `
              bg-green-600
              text-white
              shadow-md
            `
            : `
              text-gray-600
              hover:bg-green-50
              hover:text-green-700

              dark:text-gray-300
              dark:hover:bg-green-950/40
              dark:hover:text-green-400
            `
        }
      `}
      title={collapsed ? label : undefined}
    >
      <Icon size={22} />

      {!collapsed && (
        <span className="font-medium whitespace-nowrap">
          {label}
        </span>
      )}
    </NavLink>
  );

  return (
    <div className="h-full flex flex-col">

      {/* ================================================= */}
      {/* SIDEBAR HEADER */}
      {/* ================================================= */}

      <div
        className="
          h-20
          flex
          items-center
          justify-between
          px-5

          border-b
          border-gray-200
          dark:border-gray-800
        "
      >
        <div className="flex items-center gap-3 min-w-0">

          {/* LOGO */}

          <div
            className="
              w-12
              h-12
              rounded-xl

              bg-green-600

              flex
              items-center
              justify-center

              text-white

              shadow-md
              flex-shrink-0
            "
          >
            <Building2 size={26} />
          </div>

          {/* TITLE */}

          {!collapsed && (
            <div className="min-w-0">
              <h1
                className="
                  text-xl
                  font-bold
                  truncate

                  text-green-700
                  dark:text-green-400
                "
              >
                Corporate Portal
              </h1>

              <p className="text-xs text-gray-400">
                Organization
              </p>
            </div>
          )}
        </div>

        {/* COLLAPSE BUTTON */}

        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          className="
            p-2
            rounded-lg

            hover:bg-gray-100
            dark:hover:bg-gray-800

            text-gray-600
            dark:text-gray-300

            transition
            flex-shrink-0
          "
        >
          {collapsed ? (
            <Menu size={22} />
          ) : (
            <X size={22} />
          )}
        </button>
      </div>

      {/* ================================================= */}
      {/* NAVIGATION */}
      {/* ================================================= */}

      <nav className="flex-1 overflow-y-auto py-6">

        {/* ORGANIZATION */}

        {!collapsed && (
          <p
            className="
              px-7
              mb-3

              text-xs
              font-semibold
              uppercase
              tracking-wider

              text-gray-400
            "
          >
            Organization
          </p>
        )}

        {/* DASHBOARD */}

        {menuItem({
          to: "/organization/dashboard",
          icon: Home,
          label: "Corporate Dashboard",
        })}

        {/* EMPLOYEES */}

        {menuItem({
          to: "/organization/employees",
          icon: Users,
          label: "Employees",
        })}

        {/* ACTIVITIES */}

        {menuItem({
          to: "/organization/activities",
          icon: ClipboardList,
          label: "Activity Management",
        })}

        {/* BADGES */}

        {menuItem({
          to: "/organization/badges",
          icon: Award,
          label: "Employee Badges",
        })}

        {/* ================================================= */}
        {/* CARBON FOOTPRINT */}
        {/* ================================================= */}

        {!collapsed && (
          <p
            className="
              px-7
              mt-8
              mb-3

              text-xs
              font-semibold
              uppercase
              tracking-wider

              text-gray-400
            "
          >
            Carbon Footprint
          </p>
        )}

        {/* EMISSION FACTORS */}

        {menuItem({
          to: "/organization/emission-factors",
          icon: Layers,
          label: "Emission Factors",
        })}

        {/* ================================================= */}
        {/* INSIGHTS */}
        {/* ================================================= */}

        {!collapsed && (
          <p
            className="
              px-7
              mt-8
              mb-3

              text-xs
              font-semibold
              uppercase
              tracking-wider

              text-gray-400
            "
          >
            Insights
          </p>
        )}

        {/* ANALYTICS */}

        {menuItem({
          to: "/organization/analytics",
          icon: BarChart3,
          label: "Analytics & Reports",
        })}

        {/* LEADERBOARD */}

        {menuItem({
          to: "/organization/leaderboard",
          icon: Trophy,
          label: "Leaderboard",
        })}
      </nav>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      {!collapsed && (
        <div
          className="
            border-t
            border-gray-200
            dark:border-gray-800

            px-5
            py-4

            text-sm
            text-gray-400
          "
        >
          © 2026 Carbon Tracker
        </div>
      )}
    </div>
  );
}

export default OrganizationSidebar;