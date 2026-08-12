import { useState } from "react";

import OrganizationSidebar from "../components/organization/OrganizationSidebar";
import OrganizationNavbar from "../components/organization/OrganizationNavbar";

function OrganizationLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-100 dark:bg-gray-950">

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          z-40
          bg-white
          dark:bg-gray-900
          border-r
          border-gray-200
          dark:border-gray-800
          transition-all
          duration-300
          ${collapsed ? "w-20" : "w-72"}
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
          ${collapsed ? "ml-20" : "ml-72"}
        `}
      >

        {/* ================================================= */}
        {/* NAVBAR */}
        {/* ================================================= */}

        <div className="sticky top-0 z-30">
          <OrganizationNavbar />
        </div>

        {/* ================================================= */}
        {/* PAGE CONTENT */}
        {/* ================================================= */}

        <main
          className="
            min-h-[calc(100vh-80px)]
            p-6
            md:p-8
            bg-gray-100
            dark:bg-gray-950
            text-gray-900
            dark:text-gray-100
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