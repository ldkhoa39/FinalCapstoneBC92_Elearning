// src/pages/AdminTemplate/_components/AdminNavbar.tsx
import React from 'react';

interface NavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AdminNavbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-card-bg border-b border-slate-800 shadow-sm flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
      
      {/* Nút Đóng/Mở Sidebar */}
      <button 
        onClick={toggleSidebar} 
        className="w-10 h-10 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center justify-center"
      >
        <i className="fa fa-bars text-xl"></i>
      </button>

      {/* Thông tin Admin góc phải */}
      <div className="flex items-center gap-4">
        <span className="font-medium text-slate-300 hidden sm:block">
          Xin chào, <strong className="text-white">Admin</strong>!
        </span>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold cursor-pointer shadow-lg hover:opacity-80 transition-opacity">
          A
        </div>
      </div>

    </header>
  );
};

export default AdminNavbar;