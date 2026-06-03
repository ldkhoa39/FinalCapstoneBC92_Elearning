// 1. COMMON TYPES
export interface PaginatedResult<T> {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: T[];
}

// 2. USER TYPES
export type UserRole = "HV" | "GV";

// Interface gốc dùng cho hiển thị thông tin chung
export interface User {
  taiKhoan: string;
  hoTen: string;
  soDT: string;
  email: string;
  maLoaiNguoiDung: UserRole;
  maNhom: string;
}

export interface RegisterPayload extends Omit<User, 'maLoaiNguoiDung'> {
  matKhau: string;
}

// Data gửi lên khi Đăng Nhập (Login)
export interface LoginPayload {
  taiKhoan: string;
  matKhau: string;
}

// Data nhận về sau khi Login thành công (Chứa AccessToken)
export interface UserLogin extends Omit<User, 'maNhom'> {
  maNhom: string;
  accessToken: string;
}

// Data Profile đầy đủ (Dùng cho trang cá nhân sau này)
export interface UserProfile extends User {
  chiTietKhoaHocGhiDanh: Course[];
}

export interface UserType {
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}

// 3. COURSE TYPES 
export interface CourseCategory {
  maDanhMuc: string;     
  tenDanhMuc: string;      
}

export interface Creator {
  taiKhoan: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}

export interface Course {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  hinhAnh: string;
  luotXem: number;
  soLuongHocVien: number;
  maNhom: string;
  ngayTao: string;
  nguoiTao: Creator;
  danhMucKhoaHoc: CourseCategory;
}

// 4. ENROLLMENT TYPES 
export interface EnrollmentPayload {
  maKhoaHoc: string;
  taiKhoan: string;
}

export interface EnrolledUser {
  taiKhoan: string;
  hoTen: string;
  biDanh?: string;
}