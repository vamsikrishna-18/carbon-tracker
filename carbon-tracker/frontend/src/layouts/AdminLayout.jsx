import { useState } from "react";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminLayout({ children }) {

    const [collapsed, setCollapsed] = useState(false);

    return (

        <div className="flex min-h-screen bg-gray-100">

            <AdminSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <div className="flex-1 transition-all duration-300">

                <AdminNavbar />

                <div className="p-6">

                    {children}

                </div>

            </div>

        </div>

    );
}

export default AdminLayout;