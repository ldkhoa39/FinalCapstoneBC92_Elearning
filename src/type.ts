// COMMON TYPES
export interface PaginatedResult<T> {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: T[];
}

// USER TYPES
export type UserRole = "HV" | "GV";

export interface User {
  taiKhoan: string;
  matKhau?: string;
  hoTen: string;
  soDT: string;
  email: string;
  maLoaiNguoiDung: UserRole;
  maNhom: string;
}

export interface UserLogin extends User {
  accessToken: string;
}

export interface UserType {
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}

// COURSE TYPES
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

// ENROLLMENT TYPES
export interface EnrollmentPayload {
  maKhoaHoc: string;
  taiKhoan: string;
}

export interface EnrolledUser {
  taiKhoan: string;
  hoTen: string;
  biDanh?: string;
}