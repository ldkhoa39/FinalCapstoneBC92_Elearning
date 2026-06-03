import React from "react";
import { useSelector } from "react-redux";

const AdminProfile: React.FC = () => {
  // SỬA Ở ĐÂY: Lấy đúng biến userLogin từ state.auth
  const { userLogin } = useSelector((state: any) => state.auth || {});

  // Hàm tạo Avatar từ chữ cái đầu tiên của Tên hoặc Tài khoản
  const getInitial = (name?: string) => {
    if (!name) return "A";
    const nameParts = name.trim().split(" ");
    return nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  };

  return (
    <div className="p-6 md:p-8 min-h-screen">
      {/* --- PHẦN HEADER: AVATAR & TÊN --- */}
      <div 
        className="
          flex items-center gap-6 
          bg-slate-900/50 
          border border-slate-800 
          p-6 rounded-2xl 
          mb-8 shadow-sm
        "
      >
        {/* Avatar */}
        <div 
          className="
            w-20 h-20 rounded-2xl 
            bg-gradient-to-br from-cyan-500 to-blue-600 
            flex items-center justify-center 
            text-4xl font-bold text-white shadow-lg
          "
        >
          {getInitial(userLogin?.hoTen || userLogin?.taiKhoan)}
        </div>

        {/* Thông tin chức danh */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {userLogin?.hoTen || userLogin?.taiKhoan || "Quản trị viên"}
          </h1>
          <span 
            className="
              inline-block px-3 py-1 
              bg-slate-800 
              text-cyan-400 text-xs font-medium 
              rounded-full border border-slate-700
            "
          >
            Administrator
          </span>
        </div>
      </div>

      {/* --- PHẦN THÔNG TIN CHI TIẾT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card: Thông tin cá nhân */}
        <div 
          className="
            bg-slate-900/50 
            border border-slate-800 
            rounded-2xl p-6 shadow-sm
          "
        >
          <h2 className="text-xl font-bold text-white mb-6">Thông tin cá nhân</h2>
          
          <div className="space-y-4">
            {/* Row: Tài khoản */}
            <div className="flex justify-between items-center py-3 border-b border-slate-800/60">
              <span className="text-slate-400 font-medium">Tài khoản</span>
              <span className="text-slate-200 font-semibold">{userLogin?.taiKhoan || "N/A"}</span>
            </div>

            {/* Row: Họ tên */}
            <div className="flex justify-between items-center py-3 border-b border-slate-800/60">
              <span className="text-slate-400 font-medium">Họ tên</span>
              <span className="text-slate-200 font-semibold">{userLogin?.hoTen || "N/A"}</span>
            </div>

            {/* Row: Email */}
            <div className="flex justify-between items-center py-3 border-b border-slate-800/60">
              <span className="text-slate-400 font-medium">Email</span>
              <span className="text-slate-200 font-semibold">{userLogin?.email || "N/A"}</span>
            </div>

            {/* Row: Số điện thoại */}
            <div className="flex justify-between items-center py-3">
              <span className="text-slate-400 font-medium">Số điện thoại</span>
              <span className="text-slate-200 font-semibold">{userLogin?.soDT || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Card phụ bên phải: Trạng thái hệ thống */}
        <div 
          className="
            bg-slate-900/50 
            border border-slate-800 
            rounded-2xl p-6 shadow-sm
          "
        >
          <h2 className="text-xl font-bold text-white mb-6">Trạng thái hệ thống</h2>
          <div className="flex flex-col items-center justify-center h-40 text-slate-500">
            <i className="fa fa-chart-line text-4xl mb-3 opacity-50" />
            <p className="text-sm">Chưa có hoạt động gần đây</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminProfile;