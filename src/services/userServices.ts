import api from "./api";
import type { LoginPayload, UserLogin, RegisterPayload, UserProfile } from "../type";

export const userService = {
  login: (data: LoginPayload) => {
    return api.post<UserLogin>("QuanLyNguoiDung/DangNhap", data);
  },

  register: (data: RegisterPayload) => {
    return api.post("QuanLyNguoiDung/DangKy", data);
  },

  // Lấy thông tin tài khoản (Bao gồm danh sách khóa học đã ghi danh)
  getProfile: () => {
    return api.post<UserProfile>("QuanLyNguoiDung/ThongTinTaiKhoan");
  },


  // Cập nhật thông tin người dùng
  updateProfile: (data: UserProfile) => {
    return api.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
  }
};