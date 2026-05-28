import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [taiKhoan, setTaiKhoan] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra rỗng
    if (!taiKhoan.trim() || !matKhau.trim()) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu!');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // BƯỚC 1: CHỖ NÀY SAU NÀY GỌI API THẬT
      // Ví dụ: const res = await authService.loginAdmin({ taiKhoan, matKhau });
      
      // TẠM THỜI: Giả lập thời gian chờ API 1 giây
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // BƯỚC 2: KIỂM TRA ĐĂNG NHẬP (Giả lập logic)
      // Tạm thời mình fix cứng tài khoản test là admin / 123456
      if (taiKhoan === 'admin' && matKhau === '123456') {
        
        // Lưu thông tin vào localStorage để AdminGuard kiểm tra
        const mockUserInfo = {
          taiKhoan: 'admin',
          hoTen: 'Quản Trị Viên',
          maLoaiNguoiDung: 'GV', // Bắt buộc phải là GV để lọt qua AdminGuard
          accessToken: 'chuoi-token-gia-lap-abc-xyz'
        };
        localStorage.setItem('userLogin', JSON.stringify(mockUserInfo));

        // BƯỚC 3: CHUYỂN HƯỚNG VÀO TRANG QUẢN TRỊ
        navigate('/admin/course-management');
        
      } else {
        setError('Tài khoản hoặc mật khẩu không chính xác! (Gợi ý: admin / 123456)');
      }

    } catch (err: any) {
      setError(err.response?.data || 'Có lỗi xảy ra khi kết nối đến máy chủ!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Đèn Led Ám */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-8 relative z-10 animate-fade-in">
        
        {/* Logo Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4">
            <i className="fa fa-shield-alt text-slate-950 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide uppercase">Cổng Đăng Nhập</h2>
          <p className="text-xs text-slate-400 mt-1.5 font-medium">Khu vực dành riêng cho Ban Quản Trị & Giáo Vụ</p>
        </div>

        {/* Form Đăng Nhập */}
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          
          {/* Input Tài Khoản */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tài khoản</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                value={taiKhoan}
                onChange={(e) => {
                  setTaiKhoan(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Nhập tài khoản quản trị..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 text-slate-200 text-sm rounded-xl pl-11 pr-4 py-3.5 outline-none transition-all"
              />
            </div>
          </div>

          {/* Input Mật Khẩu */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mật khẩu</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                value={matKhau}
                onChange={(e) => {
                  setMatKhau(e.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 text-slate-200 text-sm rounded-xl pl-11 pr-4 py-3.5 outline-none transition-all"
              />
            </div>
          </div>

          {/* Hiển thị lỗi */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-xs font-medium animate-fade-in">
              <i className="fa fa-exclamation-circle text-sm"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Nút Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {isLoading ? (
              <i className="fa fa-circle-notch fa-spin text-lg"></i>
            ) : (
              <>
                <span>ĐĂNG NHẬP HỆ THỐNG</span>
                <i className="fa fa-arrow-right text-xs"></i>
              </>
            )}
          </button>
        </form>
        
        {/* Nút Back về trang chủ User */}
        <div className="mt-6 pt-6 border-t border-slate-800/60 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <i className="fa fa-arrow-left"></i> Quay lại trang chủ học viên
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;