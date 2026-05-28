import api from "./api";
import type {
  LoginPayload,
  UserLogin,
  RegisterPayload,
  UserProfile,
} from "../type";

export const userService = {
  // =========================
  // 1. LOGIN
  // =========================
  login: (data: LoginPayload) => {
    return api.post<UserLogin>(
      "QuanLyNguoiDung/DangNhap",
      data
    );
  },

  // =========================
  // 2. REGISTER
  // =========================
  register: (data: RegisterPayload) => {
    return api.post(
      "QuanLyNguoiDung/DangKy",
      data
    );
  },

  // =========================
  // 3. GET PROFILE
  // =========================
  getProfile: () => {
    return api.post<UserProfile>(
      "QuanLyNguoiDung/ThongTinTaiKhoan"
    );
  },

  // =========================
  // 4. UPDATE PROFILE
  // =========================
  updateProfile: (data: UserProfile) => {
    return api.put(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data
    );
  },
};