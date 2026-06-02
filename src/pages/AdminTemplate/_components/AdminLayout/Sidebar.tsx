import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* BACKDROP MOBILE */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-40
          h-full
          bg-white
          dark:bg-slate-900

          text-slate-900
          dark:text-white

          border-r
          border-slate-200
          dark:border-slate-800/80
          transition-all duration-300
          flex flex-col overflow-hidden

          ${isOpen ? "w-64" : "w-0 md:w-20"}
        `}
      >
        {/* LOGO */}
        <div className="h-20 flex items-center justify-center border-b
          border-slate-200
          dark:border-slate-800/80"
        >
          <span className="font-bold text-cyan-400">
            {isOpen ? "E-LEARNING" : "E"}
          </span>
        </div>

        {/* NAV */}
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto">
          <SidebarItem
            to="/admin"
            icon="fa-chart-line"
            label="Dashboard"
            isOpen={isOpen}
            end
          />

          <SidebarItem
            to="/admin/user-management"
            icon="fa-users"
            label="Người dùng"
            isOpen={isOpen}
          />

          <SidebarItem
            to="/admin/course-management"
            icon="fa-book-open"
            label="Khóa học"
            isOpen={isOpen}
          />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

/* ITEM */
const SidebarItem = ({ to, icon, label, isOpen, end }: any) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `
        p-3 rounded-xl flex items-center gap-4
        transition-all
        ${
          isActive
            ? "bg-cyan-600 text-white"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }
      `}
    >
      <i className={`fa ${icon} w-5 text-center`} />
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
};