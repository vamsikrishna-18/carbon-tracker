import {
  LayoutDashboard,
  Users,
  BarChart3,
  Gift,
  Leaf,
  Megaphone,
  Settings,
  LogOut,
  Activity,
  Menu,
  PieChart,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center ${
      collapsed ? "justify-center" : "gap-3"
    } px-5 py-4 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-green-600 text-white"
        : "hover:bg-green-700 hover:text-white"
    }`;

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      } min-h-screen bg-gradient-to-b from-green-900 to-green-700 text-white flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-5 border-b border-green-600">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-green-800 transition"
        >
          <Menu size={26} />
        </button>

        {!collapsed && (
          <>
            <h1 className="text-3xl font-bold mt-4">
              🌱 Carbon Tracker
            </h1>

            <p className="text-green-200 text-sm mt-2">
              Admin Panel
            </p>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3 space-y-2">

        <NavLink to="/admin-dashboard" className={menuClass}>
          <LayoutDashboard size={22} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/admin-analytics" className={menuClass}>
          <PieChart size={22} />
          {!collapsed && <span>Analytics</span>}
        </NavLink>

        <NavLink to="/manage-users" className={menuClass}>
          <Users size={22} />
          {!collapsed && <span>Manage Users</span>}
        </NavLink>

        <NavLink to="/activity-monitor" className={menuClass}>
          <Activity size={22} />
          {!collapsed && <span>Activity Monitor</span>}
        </NavLink>

        <NavLink to="/reports" className={menuClass}>
          <BarChart3 size={22} />
          {!collapsed && <span>Reports</span>}
        </NavLink>

        <NavLink to="/rewards" className={menuClass}>
          <Gift size={22} />
          {!collapsed && <span>Rewards</span>}
        </NavLink>

        <NavLink to="/eco-tips" className={menuClass}>
          <Leaf size={22} />
          {!collapsed && <span>Eco Tips</span>}
        </NavLink>

        <NavLink to="/announcements" className={menuClass}>
          <Megaphone size={22} />
          {!collapsed && <span>Announcements</span>}
        </NavLink>

        <NavLink to="/admin-settings" className={menuClass}>
          <Settings size={22} />
          {!collapsed && <span>Settings</span>}
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-600">
        <button
          onClick={logout}
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } w-full bg-red-600 hover:bg-red-700 rounded-lg px-5 py-3 transition`}
        >
          <LogOut size={22} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;