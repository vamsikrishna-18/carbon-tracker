import { useState } from "react";

import OrganizationSidebar from "../components/organization/OrganizationSidebar";
import OrganizationNavbar from "../components/organization/OrganizationNavbar";
import { Menu, X } from "lucide-react";

function OrganizationLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-100 dark:bg-gray-950">

      {/* ================================================= */}
      {/* MOBILE HAMBURGER BUTTON */}
      {/* ================================================= */}

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
        className="
          lg:hidden
          fixed
          top-4
          left-4
          z-50

          w-10
          h-10

          rounded-lg

          flex
          items-center
          justify-center

          bg-green-600
          text-white

          shadow-lg
          shadow-green-600/20

          active:scale-95

          transition-all
        "
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* ================================================= */}
      {/* MOBILE OVERLAY */}
      {/* ================================================= */}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          z-50

          w-72

          bg-white
          dark:bg-gray-900
          border-r
          border-gray-200
          dark:border-gray-800

          transition-transform
          duration-300
          ease-in-out

          lg:translate-x-0
          lg:transition-[width]
          lg:duration-300

          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "lg:w-20" : "lg:w-72"}
        `}
      >
        <OrganizationSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </aside>

      {/* ================================================= */}
      {/* MAIN AREA */}
      {/* ================================================= */}

      <div
        className={`
          min-h-screen
          min-w-0
          transition-all
          duration-300
          ${collapsed ? "lg:ml-20" : "lg:ml-72"}
        `}
      >

        {/* ================================================= */}
        {/* NAVBAR */}
        {/* ================================================= */}

        <div className="sticky top-0 z-30">
          <OrganizationNavbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
        </div>

        {/* ================================================= */}
        {/* PAGE CONTENT */}
        {/* ================================================= */}

        <main
          className="
            min-h-[calc(100vh-64px)]
            sm:min-h-[calc(100vh-80px)]
            min-w-0
            p-3
            sm:p-4
            md:p-6
            lg:p-8
            bg-gray-100
            dark:bg-gray-950
            text-gray-900
            dark:text-gray-100
            overflow-x-hidden
            transition-colors
            duration-300
          "
        >
          {children}
        </main>

      </div>
    </div>
  );
}

export default OrganizationLayout;