// src/pages/AdminTemplate/_components/AdminBreadcrumb.tsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const AdminBreadcrumb: React.FC = () => {
  const location = useLocation();
  // Tách URL thành các mảng chữ (bỏ qua dấu / trống)
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Từ điển dịch URL sang Tiếng Việt
  const breadcrumbNameMap: Record<string, string> = {
    'admin': 'Trang chủ Admin',
    'user-management': 'Quản lý người dùng',
    'course-management': 'Quản lý khóa học'
  };

  return (
    <nav className="text-slate-400 text-sm mb-6 bg-card-bg w-fit px-4 py-2 rounded-lg border border-slate-800 shadow-sm">
      <ul className="flex items-center space-x-2">
        {pathnames.map((value, index) => {
          // Tạo lại đường dẫn cho từng cấp
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const title = breadcrumbNameMap[value] || value; // Dịch tên, nếu không có trong từ điển thì lấy URL gốc

          return (
            <li key={to} className="flex items-center">
              {index > 0 && <span className="mx-2 text-slate-600"><i className="fa fa-chevron-right text-[10px]"></i></span>}
              
              {isLast ? (
                // Nếu là chặng cuối (trang hiện tại) thì in đậm và đổi màu, không click được
                <span className="text-accent-cyan font-semibold">{title}</span>
              ) : (
                // Nếu là chặng trước đó thì cho phép click quay lại
                <Link to={to} className="hover:text-white transition-colors">
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AdminBreadcrumb;