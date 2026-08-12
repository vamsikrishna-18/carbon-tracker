import { useState } from "react";
import UserSidebar from "../components/user/UserSidebar";
import UserNavbar from "../components/user/UserNavbar";
import { Menu, X } from "lucide-react";

function UserLayout({ children }) {

  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="min-h-screen w-full overflow-x-hidden">

      {/* ================================================= */}
      {/* MOBILE HAMBURGER BUTTON */}
      {/* ================================================= */}

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="
          lg:hidden
          fixed
          top-4
          left-4
          z-50
          p-2
          rounded-lg
          bg-green-600
          text-white
          hover:bg-green-700
          transition
        "
        title="Toggle Menu"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* ================================================= */}
      {/* MOBILE OVERLAY */}
      {/* ================================================= */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-30
            lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================================================= */}
      {/* FIXED SIDEBAR */}
      {/* ================================================= */}

      <div
        className={`
          fixed
          top-0
          left-0
          h-screen
          z-40
          transition-all
          duration-300
          hidden
          lg:block

          ${collapsed ? "w-20" : "w-72"}
        `}
      >

        <UserSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

      </div>

      {/* ================================================= */}
      {/* MOBILE SIDEBAR OVERLAY */}
      {/* ================================================= */}

      {sidebarOpen && (
        <div
          className={`
            fixed
            top-0
            left-0
            h-screen
            z-40
            lg:hidden
            w-72
            transition-all
            duration-300
          `}
        >
          <UserSidebar
            collapsed={false}
            setCollapsed={() => setSidebarOpen(false)}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* ================================================= */}
      {/* MAIN AREA */}
      {/* ================================================= */}

      <div
        className={`
          min-h-screen
          min-w-0
          transition-all
          duration-300
          lg:ml-72
          ${collapsed ? "lg:ml-20" : "lg:ml-72"}
        `}
      >

        {/* ================================================= */}
        {/* NAVBAR */}
        {/* ================================================= */}

        <div className="sticky top-0 z-30">

          <UserNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        </div>


        {/* ================================================= */}
        {/* PAGE CONTENT */}
        {/* ================================================= */}

        <main
          className="
            min-h-[calc(100vh-80px)]
            min-w-0
            p-3
            sm:p-4
            md:p-6
            lg:p-8
            overflow-x-hidden
            bg-gray-50
            dark:bg-gray-900/50
          "
        >

          {children}

        </main>

      </div>

    </div>

  );
}

export default UserLayout;