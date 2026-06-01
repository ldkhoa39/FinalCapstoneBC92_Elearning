// src/pages/AdminTemplate/_components/AdminProfile.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProfile: React.FC = () => {
  const navigate = useNavigate();

  // 1. Lấy thông tin từ Redux Store (Khớp chuẩn 100% với biến userLogin của bạn)
  const { userLogin } = useSelector((state: any) => state.auth || {});

  // 2. Dự phòng: Nếu F5 trang, lấy tạm từ LocalStorage key "userLogin"
  const localUser = JSON.parse(localStorage.getItem("userLogin") || "null");

  // Ưu tiên data Redux, nếu trống thì dùng LocalStorage
  const currentUser = userLogin || localUser;

  // 3. Chốt chặn: Nếu chưa đăng nhập -> Đá về trang Login
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
        <div className="text-center max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
          <i className="fa fa-exclamation-triangle text-amber-500 text-5xl mb-4" />
          <h2 className="text-xl font-bold mb-2">Phiên làm việc đã hết hạn</h2>
          <p className="text-slate-400 text-sm mb-6">
            Vui lòng đăng nhập lại hệ thống để có thể truy cập vào trang quản trị cấu hình hồ sơ.
          </p>
          <button
            onClick={() => navigate("/admin/login")}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/20 transition-all focus:outline-none"
          >
            Quay lại Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  // Hàm hỗ trợ tách chữ cái cuối của tên làm Avatar
  const getInitial = (name?: string) => {
    if (!name) return "A";
    const nameParts = name.trim().split(" ");
    return nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 lg:p-8 animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* HEADER: Tiêu đề trang */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <i className="fa fa-id-card text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Hồ sơ cá nhân</h1>
            <p className="text-slate-400 text-xs mt-0.5">Quản lý và cập nhật thông tin tài khoản quản trị viên</p>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Cột trái: Avatar & Vai trò */}
          <div className="bg-slate-900/50 border border-slate-800/80 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md">
            <div className="relative group mb-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-cyan-500/10">
                {getInitial(currentUser.hoTen || currentUser.name)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-slate-950 rounded-full flex items-center justify-center shadow-md" title="Đang hoạt động">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            <h2 className="text-lg font-bold text-slate-200 truncate max-w-full">
              {currentUser.hoTen || currentUser.name || "Quản trị viên"}
            </h2>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-mono">
              {currentUser.maLoaiNguoiDung || currentUser.loaiNguoiDung || "ADMIN"}
            </p>

            <div className="w-full h-px bg-slate-800 my-4" />

            <p className="text-xs text-slate-400 italic">
              "Tài khoản này có toàn quyền điều phối dữ liệu hệ thống."
            </p>
          </div>

          {/* Cột phải: Chi tiết thông tin */}
          <div className="md:col-span-2 bg-slate-900/50 border border-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-4 tracking-wide uppercase">
                Thông tin chi tiết (Chỉ đọc)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Tài khoản */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Tài khoản</label>
                  <div className="bg-slate-950/40 border border-slate-800/30 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-mono cursor-not-allowed select-none opacity-60">
                    {currentUser.taiKhoan || currentUser.username || "Chưa cập nhật"}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Email</label>
                  <div className="bg-slate-950/40 border border-slate-800/30 rounded-xl px-4 py-2.5 text-sm text-slate-500 truncate cursor-not-allowed select-none opacity-60" title={currentUser.email}>
                    {currentUser.email || "Chưa cập nhật"}
                  </div>
                </div>

                {/* Số điện thoại */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Số điện thoại</label>
                  <div className="bg-slate-950/40 border border-slate-800/30 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-mono cursor-not-allowed select-none opacity-60">
                    {currentUser.soDT || currentUser.soDt || currentUser.phone || "Chưa cập nhật"}
                  </div>
                </div>

                {/* Mã nhóm */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Mã nhóm hệ thống</label>
                  <div className="bg-slate-950/40 border border-slate-800/30 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-mono cursor-not-allowed select-none opacity-60">
                    {currentUser.maNhom || "GP01"}
                  </div>
                </div>

              </div>
            </div>

            {/* Nút chức năng chân trang */}
            <div className="mt-8 pt-4 border-t border-slate-800/60 flex justify-end gap-3">
              <button
                onClick={() => navigate("/admin/user-management")}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 rounded-xl transition-all"
              >
                Quản lý User
              </button>
              <button
                onClick={() => alert("Tính năng chỉnh sửa hồ sơ đang được phát triển nâng cấp!")}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-xl shadow-md transition-all"
              >
                <i className="fa fa-edit mr-1.5" /> Chỉnh sửa hồ sơ
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminProfile;