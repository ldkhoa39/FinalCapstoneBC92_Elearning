// src/pages/AdminTemplate/_components/AdminNavbar.tsx
import React from "react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const AdminNavbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header
      className="
        h-16 lg:h-20
        bg-slate-950/80 backdrop-blur-md
        border-b border-slate-800/80
        flex items-center justify-between
        px-4 lg:px-8
        sticky top-0 z-30
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Toggle */}
        <button
          onClick={toggleSidebar}
          className="
            w-10 h-10 rounded-xl
            bg-slate-800/50 text-slate-400
            hover:bg-slate-700 hover:text-white
            transition-all
            flex items-center justify-center
            focus:outline-none focus:ring-2 focus:ring-cyan-500/50
          "
        >
          <i className="fa fa-bars text-lg" />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2 w-56 lg:w-80">
          <i className="fa fa-search text-slate-500 mr-2 text-sm" />
          <input
            type="text"
            placeholder="Tìm kiếm nhanh..."
            className="bg-transparent outline-none text-sm text-white w-full placeholder-slate-500"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 sm:gap-5">
        {/* Notification */}
        <button className="relative w-10 h-10 rounded-xl hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all">
          <i className="fa fa-bell" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-ping opacity-70" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-slate-800/80" />

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-200 leading-none">
              Admin
            </p>
            <p className="text-[10px] text-slate-500 leading-none">
              Quản trị viên
            </p>
          </div>

          <i className="fa fa-chevron-down text-[10px] text-slate-500 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;