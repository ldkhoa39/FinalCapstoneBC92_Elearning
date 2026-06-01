import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './_components/AdminNavbar';
import Sidebar from './_components/Sidebar'; 
import AdminBreadcrumb from './_components/AdminBreadcrumb';

const AdminTemplate: React.FC = () => {
  // State quản lý việc đóng/mở Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-200 relative">
      
      {/*  SIDEBAR BÊN TRÁI  */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/*  BACKGROUND */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={toggleSidebar}
        ></div>
      )}

      {/*  KHU VỰC NỘI DUNG BÊN PHẢI  */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-full">
        
        <AdminNavbar toggleSidebar={toggleSidebar} />

        {/* MAIN CONTENT CONTAINER */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto w-full">
            
            <AdminBreadcrumb />

            <div className="mt-4 md:mt-6">
              <Outlet />
            </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminTemplate;