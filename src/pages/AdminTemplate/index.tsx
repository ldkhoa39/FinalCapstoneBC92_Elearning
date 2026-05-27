import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './_components/AdminNavbar';
import Sidebar from './_components/Sidebar'; // Bạn nhớ đổi tên file 'Sidebard' thành 'Sidebar' nhé
import AdminBreadcrumb from './_components/AdminBreadcrumb';

const AdminTemplate: React.FC = () => {
  // State quản lý việc đóng/mở Sidebar (hữu ích khi làm responsive trên Mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-main-bg text-main-text">
      {/* ================= SIDEBAR BÊN TRÁI ================= */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* ================= KHU VỰC NỘI DUNG BÊN PHẢI ================= */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        
        {/* TOP NAVBAR */}
        <AdminNavbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* MAIN CONTENT CONTAINER */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto">
            
            {/* BREADCRUMB (Định vị vị trí trang) */}
            <AdminBreadcrumb />

            {/* DYNAMIC CONTENT (Nơi các trang con như Dashboard, Course, User sẽ hiển thị) */}
            <div className="mt-6">
              <Outlet />
            </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminTemplate;