import React, { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { courseService } from "../../../services/courseService";
import type { CourseCategory } from "../../../type";

const Header: React.FC = () => {
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    try {
      const res = await courseService.getCourseCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi tải danh mục Header:", err);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-[#020617]/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo mới: Mũ Bachelor + Elearning-BC92 */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 bg-gradient-to-br from-primary-blue to-accent-cyan rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-transform group-hover:rotate-6">
            <i className="fa fa-graduation-cap text-[#020617] text-2xl"></i>
          </div>
          <span className="self-center text-xl font-extrabold whitespace-nowrap text-white tracking-tight">
            Elearning-<span className="text-accent-cyan">BC92</span>
          </span>
        </Link>

        {/* Nút Mobile Menu */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-300 p-2 hover:text-accent-cyan transition-colors"
        >
          <i className={`fa ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>

        {/* Thanh tìm kiếm */}
        <form 
          onSubmit={handleSearch}
          className="hidden lg:flex items-center bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-2 ml-8 flex-1 max-w-sm focus-within:border-accent-cyan/50 focus-within:ring-1 focus-within:ring-accent-cyan/40 transition-all"
        >
          <i className="fa fa-search text-slate-500 mr-2 text-sm"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm khóa học của bạn..."
            className="bg-transparent border-none text-sm text-slate-200 focus:ring-0 w-full outline-none placeholder:text-slate-600"
          />
        </form>

        {/* Menu chính */}
        <div className={`${isMobileMenuOpen ? 'block animate-fade-in' : 'hidden'} w-full md:block md:w-auto mt-4 md:mt-0`}>
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 items-center">
            
            {/* Dropdown Danh mục */}
            <li className="relative group w-full md:w-auto py-2">
              <button className="flex items-center justify-between w-full md:w-auto text-slate-300 hover:text-accent-cyan transition-colors uppercase text-[13px] font-bold tracking-wider">
                DANH MỤC <i className="fa fa-chevron-down ml-2 text-[10px] transition-transform group-hover:rotate-180"></i>
              </button>

              <div className="absolute z-10 hidden group-hover:block top-full left-0 pt-2">
                <ul className="bg-[#0F172A] border border-slate-800 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-60 overflow-hidden p-2 backdrop-blur-xl">
                  {categories.map((item, index) => (
                    <li key={item.maDanhMuc || `cat-${index}`}> 
                      <Link
                        to={`/course-category/${item.maDanhMuc}`}
                        className="block px-4 py-3 text-sm text-slate-400 hover:bg-primary-blue/20 hover:text-accent-cyan rounded-lg transition-all border-b border-slate-800/40 last:border-0"
                      >
                        {item.tenDanhMuc}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Mục KHÓA HỌC với hiệu ứng Underline chạy từ trái qua */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative pb-1 text-[13px] font-bold uppercase tracking-wider transition-all duration-300
                  after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent-purple after:transition-all after:duration-300 hover:after:w-full
                  ${isActive ? "text-accent-cyan after:w-full after:bg-accent-cyan" : "text-primary-blue hover:text-accent-purple"}`
                }
              >
                KHÓA HỌC
              </NavLink>
            </li>

            {/* Auth Buttons */}
            <div className="flex items-center gap-5 ml-4 mt-4 md:mt-0">
              <Link
                to="/login"
                className="text-slate-400 text-[13px] font-bold uppercase hover:text-white transition-colors"
              >
                Đăng nhập
              </Link>

              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-blue to-accent-cyan text-[#020617] text-[13px] font-bold uppercase tracking-tight shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Ghi danh
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;