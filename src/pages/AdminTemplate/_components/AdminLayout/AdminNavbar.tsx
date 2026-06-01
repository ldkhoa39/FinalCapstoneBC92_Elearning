import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface NavbarProps {
  toggleSidebar: () => void;
}

const AdminNavbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // LẤY DỮ LIỆU TỪ REDUX ĐỂ HIỂN THỊ TÊN & AVATAR TRÊN NAVBAR
  const { userInfo } = useSelector((state: any) => state.auth || {});

  // Hàm lấy chữ cái đầu của tên để làm Avatar
  const getInitial = (name?: string) => {
    if (!name) return "A";
    const nameParts = name.trim().split(" ");
    return nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Xóa data trong localStorage
    localStorage.removeItem("USER_LOGIN");
    localStorage.removeItem("TOKEN");

    //Chuyển hướng về trang đăng nhập hoặc trang chủ
    navigate("/");
  };

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

        {/* Profile (Có thêm Dropdown) */}
        <div className="relative">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 cursor-pointer group p-1 pr-2 rounded-xl hover:bg-slate-800/50 transition-all"
          >
            {/* AVATAR ĐỘNG */}
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
              {userInfo ? getInitial(userInfo.hoTen || userInfo.name) : "A"}
            </div>

            {/* TÊN ĐỘNG */}
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-200 leading-none mb-1 group-hover:text-cyan-400 transition-colors max-w-[120px] truncate">
                {userInfo?.hoTen || userInfo?.name || "Admin"}
              </p>
              <p className="text-[10px] text-slate-500 leading-none uppercase">
                {userInfo?.maLoaiNguoiDung || userInfo?.loaiNguoiDung || "Quản trị viên"}
              </p>
            </div>

            <i
              className={`fa fa-chevron-down text-[10px] text-slate-500 hidden sm:block transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-slate-900 border border-slate-700/50 rounded-xl shadow-xl shadow-black/50 py-2 animate-in fade-in slide-in-from-top-2">
              <button
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-3 transition-colors"
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate("/admin/profile"); 
                }}
              >
                <i className="fa fa-user text-slate-400" />
                Hồ sơ của tôi
              </button>

              <div className="h-px bg-slate-800 my-1"></div>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 flex items-center gap-3 transition-colors"
              >
                <i className="fa fa-sign-out text-rose-400" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;