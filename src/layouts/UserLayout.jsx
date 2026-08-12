import { useState } from "react";
import UserSidebar from "../components/user/UserSidebar";
import UserNavbar from "../components/user/UserNavbar";

function UserLayout({ children }) {

  const [collapsed, setCollapsed] = useState(false);

  return (

    <div className="min-h-screen w-full overflow-x-hidden">

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

          ${
            collapsed
              ? "w-20"
              : "w-72"
          }
        `}
      >

        <UserSidebar
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

          <UserNavbar />

        </div>


        {/* ================================================= */}
        {/* PAGE CONTENT */}
        {/* ================================================= */}

        <main
          className="
            min-h-[calc(100vh-80px)]

            min-w-0

            p-6

            overflow-x-hidden
          "
        >

          {children}

        </main>

      </div>

    </div>

  );
}

export default UserLayout;