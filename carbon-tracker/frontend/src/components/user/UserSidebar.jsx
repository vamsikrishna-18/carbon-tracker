import {
  LayoutDashboard,
  PlusCircle,
  History,
  BarChart3,
  Lightbulb,
  Gift,
  Trophy,
  Leaf,
  User,
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import { Target } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function UserSidebar({ collapsed, setCollapsed }) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } min-h-screen bg-gradient-to-b from-green-900 to-green-700 text-white flex flex-col transition-all duration-300`}
    >

      {/* Header */}
      <div className="p-5 border-b border-green-700">

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-green-700 transition"
        >
          <Menu size={24} />
        </button>

        {!collapsed && (
          <>
            <h1 className="text-2xl font-bold mt-4">
              🌿 Carbon Tracker
            </h1>

            <p className="text-green-200 text-sm mt-2">
              User Panel
            </p>
          </>
        )}

      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3 space-y-2">

        <Link
          to="/dashboard"
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } px-5 py-4 rounded-lg hover:bg-green-700 transition`}
        >
          <LayoutDashboard size={22} />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        <Link
          to="/add-activity"
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } px-5 py-4 rounded-lg hover:bg-green-700 transition`}
        >
          <PlusCircle size={22} />
          {!collapsed && <span>Add Activity</span>}
        </Link>

        <Link
          to="/activity-history"
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } px-5 py-4 rounded-lg hover:bg-green-700 transition`}
        >
          <History size={22} />
          {!collapsed && <span>Activity History</span>}
        </Link>

        <Link
          to="/analytics"
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } px-5 py-4 rounded-lg hover:bg-green-700 transition`}
        >
          <BarChart3 size={22} />
          {!collapsed && <span>Analytics</span>}
        </Link>

        <Link
          to="/recommendations"
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } px-5 py-4 rounded-lg hover:bg-green-700 transition`}
        >
          <Lightbulb size={22} />
          {!collapsed && <span>Recommendations</span>}
        </Link>
       <Link
  to="/goals"
  className={`flex items-center ${
    collapsed ? "justify-center" : "gap-3"
  } px-5 py-4 rounded-lg hover:bg-green-700 transition`}
>
  <Target size={22} />
  {!collapsed && <span>Goal Tracking</span>}
</Link>
        <Link
          to="/user-rewards"
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } px-5 py-4 rounded-lg hover:bg-green-700 transition`}
        >
          <Gift size={22} />
          {!collapsed && <span>Rewards</span>}
        </Link>

        <Link
          to="/leaderboard"
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } px-5 py-4 rounded-lg hover:bg-green-700 transition`}
        >
          <Trophy size={22} />
          {!collapsed && <span>Leaderboard</span>}
        </Link>

        

        <Link
          to="/profile"
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } px-5 py-4 rounded-lg hover:bg-green-700 transition`}
        >
          <User size={22} />
          {!collapsed && <span>Profile</span>}
        </Link>

        <Link
          to="/settings"
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } px-5 py-4 rounded-lg hover:bg-green-700 transition`}
        >
          <Settings size={22} />
          {!collapsed && <span>Settings</span>}
        </Link>

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-700">

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

export default UserSidebar;