import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./_components/AdminLayout/AdminNavbar";
import Sidebar from "./_components/AdminLayout/Sidebar";
import AdminBreadcrumb from "./_components/AdminLayout/AdminBreadcrumb";

const AdminTemplate: React.FC = () => {
  // State quản lý việc đóng/mở Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="
      flex h-screen overflow-hidden relative

      bg-slate-50
      text-slate-900

      dark:bg-slate-950
      dark:text-slate-200

      transition-colors duration-300
    "
    >
      {/* SIDEBAR */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="
          fixed inset-0
          bg-black/40
          backdrop-blur-sm
          z-30
          lg:hidden
          animate-fade-in
        "
          onClick={toggleSidebar}
        />
      )}

      {/* CONTENT AREA */}
      <div
        className="
        relative
        flex flex-1 flex-col
        overflow-y-auto
        overflow-x-hidden
        w-full
      "
      >
        {/* TOP NAVBAR */}
        <AdminNavbar toggleSidebar={toggleSidebar} />

        {/* MAIN */}
        <main
          className="
          flex-1
          p-4 md:p-6 lg:p-8

          bg-slate-50
          dark:bg-slate-950

          transition-colors duration-300
        "
        >
          <div className="max-w-screen-2xl mx-auto w-full">
            {/* BREADCRUMB */}
            <AdminBreadcrumb />

            {/* PAGE CONTENT */}
            <div
              className="
              mt-4 md:mt-6

              rounded-2xl

              bg-white
              dark:bg-slate-900

              border
              border-slate-200
              dark:border-slate-800

              shadow-sm
              dark:shadow-none

              p-4 md:p-6

              transition-all duration-300
            "
            >
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminTemplate;
