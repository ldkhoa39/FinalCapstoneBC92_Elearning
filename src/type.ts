
// 1 - CÁC KIỂU DỮ LIỆU CHUNG (COMMON TYPES)

// Sử dụng cho các API trả về danh sách có phân trang
export interface PaginatedResult<T> {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: T[]; // T ở đây là Generic, có thể là danh sách Course hoặc User
}

// 2 - KIỂU DỮ LIỆU NGƯỜI DÙNG (USER TYPES)

export interface User {
  taiKhoan: string;
  matKhau?: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: "HV" | "GV"; // HV: Học Viên, GV: Giáo Vụ (Admin)
  maNhom: string;
  email: string;
}

// Interface khi người dùng đăng nhập thành công
export interface UserLogin extends User {
  accessToken: string;
}

// Interface cho loại người dùng
export interface UserType {
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}


// 3 - KIỂU DỮ LIỆU KHÓA HỌC (COURSE TYPES)

export interface CourseCategory {
  maDanhMucKhoahoc: string;
  tenDanhMucKhoaHoc: string;
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
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
  };
  danhMucKhoaHoc: CourseCategory;
}

// 4 - KIỂU DỮ LIỆU GHI DANH (ENROLLMENT TYPES)

// Payload gửi đi khi admin gán khóa học cho học viên hoặc học viên tự đăng ký
export interface EnrollmentPayload {
  maKhoaHoc: string;
  taiKhoan: string;
}

// Học viên chờ xét duyệt / đã xét duyệt trong 1 khóa học
export interface EnrolledUser {
  taiKhoan: string;
  hoTen: string;
  biDanh?: string;
}