import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminLayout({ children }) {

  const [collapsed, setCollapsed] = useState(false);

  return (

    <div className="min-h-screen w-full overflow-x-hidden">

      {/* ================================================= */}
      {/* SIDEBAR */}
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

          ${
            collapsed
              ? "w-20"
              : "w-72"
          }
        `}
      >

        <AdminSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

      </div>


      {/* ================================================= */}
      {/* MAIN AREA */}
      {/* ================================================= */}

      <div
        className={`
          min-h-screen
          min-w-0
          transition-all
          duration-300

          ${
            collapsed
              ? "ml-20"
              : "ml-72"
          }
        `}
      >

        {/* ================================================= */}
        {/* NAVBAR */}
        {/* ================================================= */}

        <div className="sticky top-0 z-30">

          <AdminNavbar />

        </div>


        {/* ================================================= */}
        {/* PAGE CONTENT */}
        {/* ================================================= */}

        <main
          className="
            min-h-[calc(100vh-80px)]

            min-w-0

            p-6

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

export default AdminLayout;