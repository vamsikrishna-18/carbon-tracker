import {
  LayoutDashboard,
  Users,
  BarChart3,
  Megaphone,
  Activity,
  Menu,
  PieChart,
  LifeBuoy,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";


function AdminSidebar({
  collapsed,
  setCollapsed,
}) {

  const navigate = useNavigate();


  const menuClass = ({ isActive }) =>
    `flex items-center ${
      collapsed
        ? "justify-center"
        : "gap-3"
    } px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900/50 hover:text-green-700 dark:hover:text-green-300"
    }`;


  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    navigate("/login");

  };


  return (

    <div
      className={`${
        collapsed
          ? "w-20"
          : "w-72"
      }
      h-screen
      h-[100dvh]
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

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
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
          title="Toggle Sidebar"
          aria-label="Toggle Sidebar"
        >

          <Menu size={22} />

        </button>


        {!collapsed && (

          <>

            <h1
              className="
                text-xl
                sm:text-2xl
                font-bold
                mt-3
                truncate
                text-gray-900
                dark:text-white
              "
              title="Carbon Tracker"
            >
              🌱 Carbon Tracker
            </h1>


            <p
              className="
                text-green-600
                dark:text-green-400
                text-xs
                sm:text-sm
                mt-1
                truncate
              "
            >
              Admin Panel
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

        {/* Dashboard */}

        <NavLink
          to="/admin/dashboard"
          className={menuClass}
          title="Dashboard"
        >

          <LayoutDashboard size={21} className="flex-shrink-0" />

          {!collapsed && (
            <span className="text-sm sm:text-base truncate">
              Dashboard
            </span>
          )}

        </NavLink>


        {/* Analytics */}

        <NavLink
          to="/admin-analytics"
          className={menuClass}
          title="Analytics"
        >

          <PieChart size={21} className="flex-shrink-0" />

          {!collapsed && (
            <span className="text-sm sm:text-base truncate">
              Analytics
            </span>
          )}

        </NavLink>


        {/* Manage Users */}

        <NavLink
          to="/manage-users"
          className={menuClass}
          title="Manage Users"
        >

          <Users size={21} className="flex-shrink-0" />

          {!collapsed && (
            <span className="text-sm sm:text-base truncate">
              Manage Users
            </span>
          )}

        </NavLink>


        {/* Activity Monitor */}

        <NavLink
          to="/activity-monitor"
          className={menuClass}
          title="Activity Monitor"
        >

          <Activity size={21} className="flex-shrink-0" />

          {!collapsed && (
            <span className="text-sm sm:text-base truncate">
              Activity Monitor
            </span>
          )}

        </NavLink>


        {/* Support Tickets */}

        <NavLink
          to="/admin/support"
          className={menuClass}
          title="Support Tickets"
        >

          <LifeBuoy size={21} className="flex-shrink-0" />

          {!collapsed && (
            <span className="text-sm sm:text-base truncate">
              Support Tickets
            </span>
          )}

        </NavLink>


        {/* Reports */}

        <NavLink
          to="/reports"
          className={menuClass}
          title="Reports"
        >

          <BarChart3 size={21} className="flex-shrink-0" />

          {!collapsed && (
            <span className="text-sm sm:text-base truncate">
              Reports
            </span>
          )}

        </NavLink>


        {/* Announcements */}

        <NavLink
          to="/announcements"
          className={menuClass}
          title="Announcements"
        >

          <Megaphone size={21} className="flex-shrink-0" />

          {!collapsed && (
            <span className="text-sm sm:text-base truncate">
              Announcements
            </span>
          )}

        </NavLink>

      </nav>


      {/* =================================================
          LOGOUT
      ================================================= */}

      <div
        className="
          p-2.5
          sm:p-3
          border-t
          border-gray-200
          dark:border-gray-700
          flex-shrink-0
          pb-[max(0.625rem,env(safe-area-inset-bottom))]
        "
      >

        <button
          onClick={handleLogout}
          className={`
            w-full
            flex
            items-center
            ${
              collapsed
                ? "justify-center"
                : "gap-3"
            }
            px-4
            sm:px-5
            py-3
            sm:py-3.5
            rounded-lg
            text-gray-700
            dark:text-gray-200
            hover:bg-red-600
            hover:text-white
            transition-all
            duration-300
          `}
          title="Logout"
        >

          <LogOut size={21} className="flex-shrink-0" />

          {!collapsed && (
            <span className="text-sm sm:text-base">
              Logout
            </span>
          )}

        </button>

      </div>

    </div>
  );
}


export default AdminSidebar;