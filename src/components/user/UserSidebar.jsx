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


function UserSidebar({ collapsed, setCollapsed }) {

  const menuClass = ({ isActive }) =>
    `flex items-center ${
      collapsed ? "justify-center" : "gap-3"
    } px-5 py-4 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900/50 hover:text-green-700 dark:hover:text-green-300"
    }`;


  return (

    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      } h-screen
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
          p-5
          border-b
          border-gray-200
          dark:border-gray-700
          flex-shrink-0
        "
      >

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
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
          "
          title="Toggle Sidebar"
        >

          <Menu size={24} />

        </button>


        {!collapsed && (

          <>

            <h1
              className="
                text-3xl
                font-bold
                mt-4
                whitespace-nowrap
                text-gray-900
                dark:text-white
              "
            >
              🌿 Carbon Tracker
            </h1>


            <p
              className="
                text-green-600
                dark:text-green-400
                text-sm
                mt-2
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
          mt-6
          px-3
          space-y-2
          overflow-y-auto
        "
      >

        {/* Dashboard */}

        <NavLink
          to="/dashboard"
          className={menuClass}
          title="Dashboard"
        >

          <LayoutDashboard size={22} />

          {!collapsed && (
            <span className="whitespace-nowrap">
              Dashboard
            </span>
          )}

        </NavLink>


        {/* Add Activity */}

        <NavLink
          to="/add-activity"
          className={menuClass}
          title="Add Activity"
        >

          <PlusCircle size={22} />

          {!collapsed && (
            <span className="whitespace-nowrap">
              Add Activity
            </span>
          )}

        </NavLink>


        {/* Activity History */}

        <NavLink
          to="/activity-history"
          className={menuClass}
          title="Activity History"
        >

          <History size={22} />

          {!collapsed && (
            <span className="whitespace-nowrap">
              Activity History
            </span>
          )}

        </NavLink>


        {/* Analytics */}

        <NavLink
          to="/analytics"
          className={menuClass}
          title="Analytics"
        >

          <BarChart3 size={22} />

          {!collapsed && (
            <span className="whitespace-nowrap">
              Analytics
            </span>
          )}

        </NavLink>


        {/* Recommendations */}

        <NavLink
          to="/recommendations"
          className={menuClass}
          title="Recommendations"
        >

          <Lightbulb size={22} />

          {!collapsed && (
            <span className="whitespace-nowrap">
              Recommendations
            </span>
          )}

        </NavLink>


        {/* Goal Tracking */}

        <NavLink
          to="/goals"
          className={menuClass}
          title="Goal Tracking"
        >

          <Target size={22} />

          {!collapsed && (
            <span className="whitespace-nowrap">
              Goal Tracking
            </span>
          )}

        </NavLink>


        {/* Rewards */}

        <NavLink
          to="/user-rewards"
          className={menuClass}
          title="Rewards"
        >

          <Gift size={22} />

          {!collapsed && (
            <span className="whitespace-nowrap">
              Rewards
            </span>
          )}

        </NavLink>


        {/* Leaderboard */}

        <NavLink
          to="/leaderboard"
          className={menuClass}
          title="Leaderboard"
        >

          <Trophy size={22} />

          {!collapsed && (
            <span className="whitespace-nowrap">
              Leaderboard
            </span>
          )}

        </NavLink>


        {/* Support */}

        <NavLink
          to="/user/my-tickets"
          className={menuClass}
          title="Support"
        >

          <LifeBuoy size={22} />

          {!collapsed && (
            <span className="whitespace-nowrap">
              Support
            </span>
          )}

        </NavLink>

      </nav>

    </div>
  );
}


export default UserSidebar;