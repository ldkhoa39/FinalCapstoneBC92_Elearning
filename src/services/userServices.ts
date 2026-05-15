import api from "./api";
// Sử dụng import type cho các interface từ file type.ts nằm trong src
import type { LoginPayload, UserLogin, RegisterPayload } from "../type";

export const userService = {
  /**
   * Đăng nhập người dùng
   * Vì baseURL đã có "/api/", ta chỉ cần bắt đầu từ "QuanLyNguoiDung"
   */
  login: (data: LoginPayload) => {
    return api.post<UserLogin>("QuanLyNguoiDung/DangNhap", data);
  },

  /**
   * Đăng ký người dùng mới
   */
  register: (data: RegisterPayload) => {
    return api.post("QuanLyNguoiDung/DangKy", data);
  },
};