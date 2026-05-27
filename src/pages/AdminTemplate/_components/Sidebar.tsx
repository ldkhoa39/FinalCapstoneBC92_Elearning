// src/pages/AdminTemplate/_components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside 
      className={`bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col h-full
      ${isOpen ? 'w-64' : 'w-0 overflow-hidden md:w-20'}`}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700 whitespace-nowrap">
        <span className="font-extrabold text-xl tracking-wider text-accent-cyan">
          {isOpen ? 'E-LEARNING' : 'E'}
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto">
        <NavLink 
          to="/admin" 
          end 
          className={({ isActive }) => `p-3 rounded-xl flex items-center gap-4 transition-all ${isActive ? 'bg-primary-blue shadow-lg' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          <i className="fa fa-chart-line w-5 text-center text-lg"></i>
          {isOpen && <span className="font-medium whitespace-nowrap">Dashboard</span>}
        </NavLink>

        <NavLink 
          to="/admin/user-management" 
          className={({ isActive }) => `p-3 rounded-xl flex items-center gap-4 transition-all ${isActive ? 'bg-primary-blue shadow-lg' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          <i className="fa fa-users w-5 text-center text-lg"></i>
          {isOpen && <span className="font-medium whitespace-nowrap">Quản lý người dùng</span>}
        </NavLink>

        <NavLink 
          to="/admin/course-management" 
          className={({ isActive }) => `p-3 rounded-xl flex items-center gap-4 transition-all ${isActive ? 'bg-primary-blue shadow-lg' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          <i className="fa fa-book-open w-5 text-center text-lg"></i>
          {isOpen && <span className="font-medium whitespace-nowrap">Quản lý khóa học</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;