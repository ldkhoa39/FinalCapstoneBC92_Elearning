import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../../store";
import { logout } from "../../../../store/slices/authSlice";

import DarkModeToggle from "../../../../darkmode";

interface NavbarProps {
  toggleSidebar: () => void;
}

const AdminNavbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector(
    (state: RootState) => state.auth.userLogin
  );

  const getInitial = (name?: string) => {
    if (!name) return "A";

    const parts = name.trim().split(" ");

    return parts[parts.length - 1]
      .charAt(0)
      .toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logout());

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
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="
            w-10 h-10
            rounded-xl

            flex items-center justify-center

            bg-slate-100
            hover:bg-slate-200

            text-slate-600

            dark:bg-slate-800
            dark:text-slate-300
            dark:hover:bg-slate-700

            transition-all
          "
        >
          <i className="fa fa-bars" />
        </button>

        {/* SEARCH */}
        <div
          className="
            hidden md:flex
            items-center

            w-72

            px-4 py-2

            rounded-xl

            bg-white
            dark:bg-slate-900

            border
            border-slate-200
            dark:border-slate-700
          "
        >
          <i className="fa fa-search mr-2 text-slate-400" />

          <input
            type="text"
            placeholder="Tìm kiếm nhanh..."
            className="
              flex-1

              bg-transparent
              outline-none

              text-sm

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

        {/* NOTIFICATION */}
        <button
          className="
            relative

            w-10 h-10
            rounded-xl

            flex items-center justify-center

            text-slate-500

            hover:bg-slate-100

            dark:text-slate-400
            dark:hover:bg-slate-800

            transition-all
          "
        >
          <i className="fa fa-bell" />

          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />

        {/* PROFILE */}
        <div className="relative">
          <div
            onClick={() =>
              setIsDropdownOpen(!isDropdownOpen)
            }
            className="
              flex items-center gap-3

              p-1 pr-2

              rounded-xl

              cursor-pointer

              hover:bg-slate-100
              dark:hover:bg-slate-800

              transition-all
            "
          >
            <div
              className="
                w-10 h-10

                rounded-xl

                bg-gradient-to-br
                from-cyan-500
                to-blue-600

                flex items-center justify-center

                text-white
                font-bold
              "
            >
              {getInitial(
                userLogin?.hoTen ||
                  userLogin?.taiKhoan
              )}
            </div>

            <div className="hidden sm:block">
              <p
                className="
                  text-sm
                  font-semibold

                  text-slate-800
                  dark:text-slate-200

                  max-w-[150px]
                  truncate
                "
              >
                {userLogin?.hoTen ||
                  userLogin?.taiKhoan ||
                  "Admin"}
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

            <i
              className={`fa fa-chevron-down text-[10px] text-slate-400 transition-transform duration-200 ${
                isDropdownOpen
                  ? "rotate-180"
                  : ""
              }`}
            />
          </div>

          {/* DROPDOWN */}
          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() =>
                  setIsDropdownOpen(false)
                }
              />

              <div
                className="
                  absolute
                  right-0
                  mt-2

                  w-60

                  bg-white
                  dark:bg-slate-900

                  border
                  border-slate-200
                  dark:border-slate-800

                  rounded-2xl

                  shadow-xl

                  overflow-hidden

                  z-50
                "
              >
                {/* USER INFO */}
                <div
                  className="
                    p-4

                    border-b
                    border-slate-200
                    dark:border-slate-800
                  "
                >
                  <p
                    className="
                      font-semibold
                      text-slate-900
                      dark:text-slate-100
                    "
                  >
                    {userLogin?.hoTen ||
                      "Administrator"}
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                      mt-1
                    "
                  >
                    {userLogin?.email}
                  </p>
                </div>

                {/* PROFILE */}
                <Link
                  to="/admin/profile"
                  onClick={() =>
                    setIsDropdownOpen(false)
                  }
                  className="
                    flex items-center gap-3

                    px-4 py-3

                    text-sm

                    text-slate-700
                    dark:text-slate-300

                    hover:bg-slate-100
                    dark:hover:bg-slate-800

                    transition-colors
                  "
                >
                  <i className="fa fa-user-circle w-4" />
                  Hồ sơ cá nhân
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                  className="
                    w-full

                    flex items-center gap-3

                    px-4 py-3

                    text-left
                    text-sm

                    text-rose-600

                    hover:bg-rose-50
                    dark:hover:bg-rose-950/30

                    transition-colors
                  "
                >
                  <i className="fa fa-sign-out w-4" />
                  Đăng xuất
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;