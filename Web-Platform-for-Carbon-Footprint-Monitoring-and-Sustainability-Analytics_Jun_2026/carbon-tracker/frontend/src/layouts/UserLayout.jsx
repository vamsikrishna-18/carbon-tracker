import { useState } from "react";
import UserSidebar from "../components/user/UserSidebar";
import UserNavbar from "../components/user/UserNavbar";

function UserLayout({ children }) {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      <UserSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 flex flex-col">

        <UserNavbar />

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

export default UserLayout;