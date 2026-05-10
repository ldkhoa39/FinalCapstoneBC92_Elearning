import api from "./api"; 
import type { Course, CourseCategory } from "../type"; 

export const courseService = {
  // Lấy danh mục khóa học cho Menu Header
  getCourseCategories: () => {
    return api.get<CourseCategory[]>("QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },

  // Lấy danh sách toàn bộ khóa học cho Trang Chủ
  getCourseList: (maNhom: string = "GP01") => {
    return api.get<Course[]>(`QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${maNhom}`);
  }
};