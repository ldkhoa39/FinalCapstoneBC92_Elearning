import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { courseService } from "../../../services/courseService";
import type { CourseCategory } from "../../../type";

const Header: React.FC = () => {
  const [categories, setCategories] = useState<CourseCategory[]>([]);

  useEffect(() => {
    courseService
      .getCourseCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("Lỗi:", err));
  }, []);

  return (
    // Main background: #020617
    <nav className="bg-[#020617] border-b border-slate-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo với Accent Glow: #22D3EE */}
        <Link to="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-[#22D3EE] drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            <i className="fa fa-graduation-cap mr-2"></i> BC92 E-LEARNING
          </span>
        </Link>

        {/* Search Bar (Tùy chọn thêm để giao diện chuyên nghiệp hơn) */}
        <div className="hidden md:flex items-center bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-1.5 ml-8 flex-1 max-w-sm">
          <i className="fa fa-search text-slate-400 mr-2 text-sm"></i>
          <input
            type="text"
            placeholder="Tìm khóa học..."
            className="bg-transparent border-none text-sm text-[#E2E8F0] focus:ring-0 w-full"
          />
        </div>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 items-center">
            {/* Dropdown Danh mục */}
            <li className="relative group">
              <button className="flex items-center py-2 px-3 text-[#E2E8F0] hover:text-[#22D3EE] transition-colors">
                DANH MỤC <i className="fa fa-chevron-down ml-2 text-xs"></i>
              </button>

              {/* Card background: #0F172A */}
              <div className="absolute z-10 hidden group-hover:block top-full left-0 font-normal bg-[#0F172A] border border-slate-700 divide-y divide-slate-700 rounded-lg shadow-xl w-56 animate-fade-in">
                <ul className="py-2 text-sm text-[#E2E8F0]">
                  {categories.map((item) => (
                    <li key={item.maDanhMucKhoahoc}>
                      <Link
                        to={`/course-category/${item.maDanhMucKhoahoc}`}
                        className="block px-4 py-2 hover:bg-[#2563EB] hover:text-white transition-all duration-300 rounded-md mx-1"
                      >
                        {item.tenDanhMucKhoaHoc}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Link Khoá học */}
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-[#E2E8F0] hover:text-[#8B5CF6] transition-colors"
              >
                KHOÁ HỌC
              </Link>
            </li>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-4">
              {/* Login */}
              <Link
                to="/login"
                className="
                  px-4 py-2
                  rounded-xl
                  border border-slate-700
                  bg-slate-900/60
                  text-slate-200
                  text-sm font-medium
                  backdrop-blur-md
                  transition-all duration-300
                  hover:bg-slate-800
                  hover:border-slate-500
                  hover:text-white
                  hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]
                  active:scale-95
                "
              >
                Đăng nhập
              </Link>

              {/* Register */}
              <Link
              to="/register"
                className="
                  relative overflow-hidden
                  px-5 py-2
                  rounded-xl
                  bg-gradient-to-r from-blue-600 to-cyan-500
                  text-white
                  text-sm font-semibold
                  shadow-[0_0_20px_rgba(37,99,235,0.35)]
                  transition-all duration-300
                  hover:scale-105
                  hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]
                  active:scale-95
                "
              >
                <span className="relative z-10">Đăng ký</span>

                {/* Glow effect */}
                <div
                  className="
                    absolute inset-0
                    bg-white/10
                    opacity-0
                    hover:opacity-100
                    transition-opacity duration-300
                  "
                />
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
