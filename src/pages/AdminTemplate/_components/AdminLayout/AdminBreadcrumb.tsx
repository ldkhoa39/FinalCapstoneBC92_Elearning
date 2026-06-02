// src/pages/AdminTemplate/_components/AdminBreadcrumb.tsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const AdminBreadcrumb: React.FC = () => {
  const location = useLocation();
  // Tách URL thành các mảng chữ (bỏ qua dấu / trống)
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Từ điển dịch URL sang Tiếng Việt
  const breadcrumbNameMap: Record<string, string> = {
    admin: "Trang chủ Admin",
    "user-management": "Quản lý người dùng",
    "course-management": "Quản lý khóa học",
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 lg:mb-8 w-full overflow-x-auto no-scrollbar"
    >
      <ol
        className="flex items-center space-x-1.5 w-fit whitespace-nowrap bg-white
        dark:bg-slate-900/60

        border-slate-200
        dark:border-slate-800/60 px-4 py-2.5 rounded-xl border border-slate-800/60 shadow-sm"
      >
        {/* Nút Home*/}
        <li>
          <Link
            to="/admin"
            className="text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <i className="fa fa-home"></i>
            <span className="hidden sm:inline">Trang chủ</span>
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const title = breadcrumbNameMap[value] || value;

          return (
            <li key={to} className="flex items-center">
              {/* Icon phân cách */}
              <i className="fa fa-chevron-right text-[9px] text-slate-600 mx-1.5"></i>

              {isLast ? (
                // Chặng cuối: Highlight như một cái tag (badge)
                <span className="text-cyan-400 font-bold text-[13px] px-2.5 py-1 bg-cyan-500/10 rounded-md border border-cyan-500/20 shadow-inner">
                  {title}
                </span>
              ) : (
                // Các chặng trước: Link text mờ, hover sáng
                <Link
                  to={to}
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-[13px] font-medium"
                >
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default AdminBreadcrumb;
