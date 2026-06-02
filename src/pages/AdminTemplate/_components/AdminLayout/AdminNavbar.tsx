import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DarkModeToggle from "../../../../darkmode";

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
        h-20
        sticky top-0 z-30
        flex items-center justify-between
        px-4 lg:px-8

        bg-white/80
        dark:bg-slate-950/80

        border-b
        border-slate-200
        dark:border-slate-800

        backdrop-blur-md
        transition-colors
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="
            w-10 h-10 rounded-xl
            flex items-center justify-center

            bg-slate-100
            text-slate-600

            hover:bg-slate-200

            dark:bg-slate-800/50
            dark:text-slate-400
            dark:hover:bg-slate-700
            dark:hover:text-white

            transition-all
          "
        >
          <i className="fa fa-bars" />
        </button>

        <div
          className="
            hidden md:flex items-center
            px-4 py-2 rounded-xl
            w-72

            bg-white
            border border-slate-200

            dark:bg-slate-900/50
            dark:border-slate-700/50
          "
        >
          <i className="fa fa-search mr-2 text-slate-400" />

          <input
            type="text"
            placeholder="Tìm kiếm nhanh..."
            className="
              w-full
              bg-transparent
              outline-none

              text-slate-700
              placeholder-slate-400

              dark:text-slate-100
              dark:placeholder-slate-500
            "
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <DarkModeToggle />

        <button
          className="
            relative w-10 h-10 rounded-xl
            flex items-center justify-center

            text-slate-500
            hover:bg-slate-100

            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-white

            transition-all
          "
        >
          <i className="fa fa-bell" />

          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-ping opacity-70" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        <div
          className="
            h-6 w-px
            bg-slate-300
            dark:bg-slate-800
          "
        />

        <div
          className="
            flex items-center gap-3
            p-1 pr-2 rounded-xl
            cursor-pointer

            hover:bg-slate-100
            dark:hover:bg-slate-800/50

            transition-all
          "
        >
          <div
            className="
              w-9 h-9 rounded-lg
              bg-gradient-to-br
              from-cyan-500
              to-blue-600

              flex items-center justify-center
              text-white font-bold
            "
          >
            A
          </div>

          <div className="hidden sm:block">
            <p
              className="
                text-sm font-semibold

                text-slate-800
                dark:text-slate-200
              "
            >
              Admin
            </p>

            <p
              className="
                text-xs

                text-slate-500
                dark:text-slate-400
              "
            >
              Quản trị viên
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;