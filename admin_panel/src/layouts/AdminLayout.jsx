import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="ml-64 flex-1 min-h-screen bg-gray-100 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
