import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    // Main background: #020617
    <footer className="bg-[#020617] border-t border-slate-800 pt-12 pb-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Logo & Slogan */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <span className="text-2xl font-bold text-[#22D3EE] drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                <i className="fa fa-graduation-cap mr-2"></i> E-LEARNING
              </span>
            </Link>
            <p className="text-[#E2E8F0] text-sm leading-relaxed opacity-80">
              Nền tảng đào tạo lập trình hàng đầu, giúp bạn chinh phục con đường trở thành Fullstack Developer chuyên nghiệp.
            </p>
          </div>

          {/* Danh mục (Link nhanh) */}
          <div>
            <h3 className="text-[#22D3EE] font-semibold mb-4 uppercase tracking-wider text-sm">Liên kết</h3>
            <ul className="text-[#E2E8F0] space-y-2 text-sm opacity-70">
              <li><Link to="/" className="hover:text-[#8B5CF6] transition-colors">Trang chủ</Link></li>
              <li><Link to="/" className="hover:text-[#8B5CF6] transition-colors">Tất cả khóa học</Link></li>
              <li><Link to="/admin/user-management" className="hover:text-[#8B5CF6] transition-colors">Quản trị</Link></li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="text-[#22D3EE] font-semibold mb-4 uppercase tracking-wider text-sm">Hỗ trợ</h3>
            <ul className="text-[#E2E8F0] space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:text-[#8B5CF6] transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-[#8B5CF6] transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-[#8B5CF6] transition-colors">Câu hỏi thường gặp</a></li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-[#22D3EE] font-semibold mb-4 uppercase tracking-wider text-sm">Liên hệ</h3>
            <ul className="text-[#E2E8F0] space-y-3 text-sm opacity-70">
              <li className="flex items-center">
                <i className="fa fa-map-marker-alt w-5 text-[#8B5CF6]"></i>
                <span>Quận 10, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center">
                <i className="fa fa-phone-alt w-5 text-[#8B5CF6]"></i>
                <span>0909 123 456</span>
              </li>
              <li className="flex items-center">
                <i className="fa fa-envelope w-5 text-[#8B5CF6]"></i>
                <span>support@elearning.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Đường kẻ ngang và Bản quyền */}
        <div className="border-t border-slate-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-xs mb-4 md:mb-0">
            CYBERSOFT© 2026 BC92 - E-LEARNING PROJECT. All rights reserved.
          </p>
          
          {/* Social Icons - Accent Glow: #22D3EE */}
          <div className="flex space-x-6 text-[#E2E8F0]">
            <a href="#" className="hover:text-[#22D3EE] transition-all text-lg"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-[#22D3EE] transition-all text-lg"><i className="fab fa-youtube"></i></a>
            <a href="#" className="hover:text-[#22D3EE] transition-all text-lg"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;