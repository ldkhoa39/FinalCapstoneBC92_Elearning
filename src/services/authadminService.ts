import api from "./api";

export const authService = {
  login: (data: { taiKhoan: string; matKhau: string }) => {
    return api.post("/QuanLyNguoiDung/DangNhap", data);
  },
};