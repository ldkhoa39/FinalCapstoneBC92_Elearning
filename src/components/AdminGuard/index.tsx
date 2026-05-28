import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  // Lấy dữ liệu user đã lưu khi đăng nhập thành công
  // (Lưu ý: Tên key 'userLogin' có thể khác tùy vào cách bạn đặt ở file Login)
  const userInfoString = localStorage.getItem('userLogin');
  const userLogin = userInfoString ? JSON.parse(userInfoString) : null;

  // Trường hợp 1: Chưa đăng nhập -> Đá về trang đăng nhập của Admin
  if (!userLogin) {
    return <Navigate to="/admin/login" replace />;
  }

  // Trường hợp 2: Đã đăng nhập nhưng mã loại người dùng KHÔNG phải là Giáo Vụ ('GV')
  // (Nếu API của bạn quy định quyền Admin là 'QuanTri' thì sửa lại chữ 'GV' nhé)
  if (userLogin.maLoaiNguoiDung !== 'GV') {
    alert("Cảnh báo: Tài khoản của bạn không có quyền truy cập hệ thống Quản trị!");
    return <Navigate to="/" replace />; // Đá về trang chủ của Client
  }

  // Trường hợp 3: Hợp lệ -> Cho phép render các component con (AdminTemplate)
  return <>{children}</>;
};

export default AdminGuard;