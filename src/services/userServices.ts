import api from "./api";
import type {
  LoginPayload,
  UserLogin,
  RegisterPayload,
  UserProfile,
  User,             
  PaginatedResult,  
} from "../type";

export const userService = {

  // 1. LOGIN
  login: (data: LoginPayload) => {
    return api.post<UserLogin>(
      "QuanLyNguoiDung/DangNhap",
      data
    );
  },

  // 2. REGISTER
  register: (data: RegisterPayload) => {
    return api.post(
      "QuanLyNguoiDung/DangKy",
      data
    );
  },

  // 3. GET PROFILE (Client)
  getProfile: () => {
    return api.post<UserProfile>(
      "QuanLyNguoiDung/ThongTinTaiKhoan"
    );
  },

  // 4. UPDATE PROFILE (Client)
  updateProfile: (data: UserProfile) => {
    return api.put(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data
    );
  },

  // 5. GET USER PAGINATION (Lấy danh sách phân trang)
  getUserPagination: (page: number, pageSize: number, keyword?: string) => {
    let url = `QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP01&page=${page}&pageSize=${pageSize}`;
    if (keyword) {
      url += `&tuKhoa=${encodeURIComponent(keyword)}`;
    }
    return api.get<PaginatedResult<User>>(url);
  },

  // 6. GET ALL USERS (Dùng để search nhanh hoặc export)
  getUserList: (keyword?: string) => {
    let url = `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`;
    if (keyword) {
      url += `&tuKhoa=${encodeURIComponent(keyword)}`;
    }
    return api.get<User[]>(url);
  },

  // 7. ADD USER (Admin thêm người dùng)
  addUser: (data: User & { matKhau: string }) => { 
    return api.post(
      "QuanLyNguoiDung/ThemNguoiDung",
      data
    );
  },

  // 8. UPDATE USER (Admin cập nhật thông tin User khác)
  updateUser: (data: User) => {
    return api.put(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data
    );
  },

  // 9. DELETE USER (Xóa người dùng)
  deleteUser: (taiKhoan: string) => {
    return api.delete(
      `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  },
};