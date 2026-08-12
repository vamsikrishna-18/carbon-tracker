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
    } px-5 py-4 rounded-lg transition-all duration-300 ${
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

          <Menu size={26} />

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
              🌱 Carbon Tracker
            </h1>


            <p
              className="
                text-green-600
                dark:text-green-400
                text-sm
                mt-2
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
          mt-6
          px-3
          space-y-2
          overflow-y-auto
        "
      >

        {/* Dashboard */}

        <NavLink
          to="/admin/dashboard"
          className={menuClass}
          title="Dashboard"
        >

          <LayoutDashboard size={25} />

          {!collapsed && (
            <span className="text-lg whitespace-nowrap">
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

          <PieChart size={25} />

          {!collapsed && (
            <span className="text-lg whitespace-nowrap">
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

          <Users size={25} />

          {!collapsed && (
            <span className="text-lg whitespace-nowrap">
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

          <Activity size={25} />

          {!collapsed && (
            <span className="text-lg whitespace-nowrap">
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

          <LifeBuoy size={25} />

          {!collapsed && (
            <span className="text-lg whitespace-nowrap">
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

          <BarChart3 size={25} />

          {!collapsed && (
            <span className="text-lg whitespace-nowrap">
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

          <Megaphone size={25} />

          {!collapsed && (
            <span className="text-lg whitespace-nowrap">
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
          p-3
          border-t
          border-gray-200
          dark:border-gray-700
          flex-shrink-0
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
            px-5
            py-4
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

          <LogOut size={25} />

          {!collapsed && (
            <span className="text-lg">
              Logout
            </span>
          )}

        </button>

      </div>

    </div>
  );
}


export default AdminSidebar;