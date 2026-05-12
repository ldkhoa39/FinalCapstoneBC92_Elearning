import api from "./api"; 
import type { Course, CourseCategory } from "../type"; 

// Thống nhất mã nhóm là GP01 cho toàn dự án
const MA_NHOM = "GP01";

export const courseService = {
  /**
   * 1. Lấy danh mục khóa học (Dùng cho Menu Header)
   */
  getCourseCategories: () => {
    return api.get<CourseCategory[]>("QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },

  /**
   * 2. Lấy danh sách toàn bộ khóa học (Dùng cho Trang Chủ)
   */
  getCourseList: (maNhom: string = MA_NHOM) => {
    return api.get<Course[]>(`QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${maNhom}`);
  },

  /**
   * 3. Lấy danh sách khóa học theo danh mục (Dùng cho trang lọc)
   */
  getCourseByCategory: (maDanhMuc: string) => {
    return api.get<Course[]>(
      `QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=${MA_NHOM}`
    );
  },

  /**
   * 4. Lấy chi tiết khóa học (Dùng cho trang Detail)
   */
  getCourseDetail: (id: string) => {
    return api.get<Course>(`QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`);
  },

  /**
   * 5. Tìm kiếm khóa học (Dùng cho thanh Search trên Header)
   */
  searchCourse: (tenKhoaHoc: string) => {
    return api.get<Course[]>(
      `QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=${MA_NHOM}`
    );
  },

  /**
   * 6. Lấy danh sách khóa học phân trang (Dùng cho Pagination sau này)
   */
  getCourseListPagination: (page: number, pageSize: number) => {
    return api.get<any>(
      `QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${page}&pageSize=${pageSize}&MaNhom=${MA_NHOM}`
    );
  }
};