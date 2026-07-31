// src/pages/AdminTemplate/Dashboard/index.tsx
import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {

  // useEffect(() => {
  //   console.log("✅ Dashboard Mounted");
  // }, []);     

  const stats = [
    {
      id: 1,
      title: "Tổng khóa học",
      value: "142",
      icon: "fa-book-open",
      color: "from-blue-600 to-cyan-500",
      desc: "Đang lưu hành trên hệ thống",
    },
    {
      id: 2,
      title: "Tổng học viên",
      value: "1,250",
      icon: "fa-users",
      color: "from-purple-600 to-indigo-500",
      desc: "+48 học viên mới tuần này",
    },
    {
      id: 3,
      title: "Yêu cầu ghi danh",
      value: "18",
      icon: "fa-clipboard-check",
      color: "from-amber-500 to-orange-500",
      desc: "Đang chờ admin xét duyệt",
    },
    {
      id: 4,
      title: "Lượt xem tháng",
      value: "45.2K",
      icon: "fa-eye",
      color: "from-emerald-600 to-teal-500",
      desc: "Tăng 12% so với tháng trước",
    },
  ];


  return (
    <div className="space-y-8 animate-fade-in">
      {/* TIÊU ĐỀ */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bảng điều khiển hệ thống
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Chào mừng trở lại! Dưới đây là tổng quan các chỉ số vận hành của trung
          tâm Elearning hôm nay.
        </p>
      </div>

      {/* THẺ THỐNG KÊ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.id}
            className="bg-white
            dark:bg-slate-900

            border-slate-200
            dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-lg group hover:border-slate-700 transition-all duration-300"
          >
            <div
              className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-full group-hover:scale-125 transition-transform duration-500`}
            ></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {item.title}
                </p>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-2 tracking-tight">
                  {item.value}
                </h3>
              </div>
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-slate-950 shadow-md`}
              >
                <i className={`fa ${item.icon} text-xl`}></i>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 flex items-center gap-1">
              <i className="fa fa-chart-line text-[10px]"></i>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/*KHU VỰC THAO TÁC NHANH & DANH SÁCH */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* QUICK ACTIONS */}
        <div
          className="
      xl:col-span-2

      bg-white
      dark:bg-slate-900

      border
      border-slate-200
      dark:border-slate-800

      rounded-2xl
      p-6

      shadow-md
      dark:shadow-lg
    "
        >
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <i className="fa fa-bolt text-amber-400"></i>
            Thao tác quản trị nhanh
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* COURSE */}
            <Link
              to="/admin/course-management"
              className="
          p-4
          rounded-xl

          border
          border-slate-200
          dark:border-slate-800

          bg-slate-50
          dark:bg-slate-950/40

          hover:border-blue-500/40
          hover:shadow-md

          transition-all duration-200

          flex items-center gap-4
          group
        "
            >
              <div
                className="
            w-10 h-10
            rounded-lg

            bg-blue-500/10
            text-blue-500

            flex items-center justify-center

            group-hover:bg-blue-500
            group-hover:text-white

            transition-all
          "
              >
                <i className="fa fa-plus"></i>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                  Thêm Khóa Học
                </h4>

                <p className="text-xs text-slate-500">
                  Tạo mới khóa học và đăng tải hình ảnh
                </p>
              </div>
            </Link>

            {/* USER */}
            <Link
              to="/admin/user-management"
              className="
          p-4
          rounded-xl

          border
          border-slate-200
          dark:border-slate-800

          bg-slate-50
          dark:bg-slate-950/40

          hover:border-purple-500/40
          hover:shadow-md

          transition-all duration-200

          flex items-center gap-4
          group
        "
            >
              <div
                className="
            w-10 h-10
            rounded-lg

            bg-purple-500/10
            text-purple-500

            flex items-center justify-center

            group-hover:bg-purple-500
            group-hover:text-white

            transition-all
          "
              >
                <i className="fa fa-user-plus"></i>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                  Thêm Thành Viên
                </h4>

                <p className="text-xs text-slate-500">
                  Cấp tài khoản mới cho học viên/giáo vụ
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div
          className="
      bg-white
      dark:bg-slate-900

      border
      border-slate-200
      dark:border-slate-800

      rounded-2xl
      p-6

      shadow-md
      dark:shadow-lg

      flex flex-col justify-between
    "
        >
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="fa fa-server text-emerald-400"></i>
              Trạng thái hệ thống
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  API Gateway
                </span>

                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Tải máy chủ
                </span>

                <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                  24% bình thường
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            Hệ thống Elearning v2.0 • Hoạt động ổn định
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
