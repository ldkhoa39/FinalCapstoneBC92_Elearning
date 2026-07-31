import api from "./api";
import type { Course, CourseCategory, PaginatedResult } from "../type";

const MA_NHOM = "GP01";

const withGroup = (params: Record<string, any> = {}) => ({
  ...params,
  MaNhom: MA_NHOM,
});

export const courseService = {

  // 1. Danh mục khóa học
  getCourseCategories: () => {
    return api.get<CourseCategory[]>(
      "QuanLyKhoaHoc/LayDanhMucKhoaHoc"
    );
  },


  // 2. Danh sách khóa học
  getCourseList: () => {
    return api.get<Course[]>(
      "QuanLyKhoaHoc/LayDanhSachKhoaHoc",
      { params: withGroup() }
    );
  },


  // 3. Lọc theo danh mục
  getCourseByCategory: (maDanhMuc: string) => {
    return api.get<Course[]>(
      "QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc",
      {
        params: withGroup({ maDanhMuc }),
      }
    );
  },


  // 4. Chi tiết khóa học
  getCourseDetail: (maKhoaHoc: string) => {
    return api.get<Course>(
      "QuanLyKhoaHoc/LayThongTinKhoaHoc",
      {
        params: { maKhoaHoc },
      }
    );
  },


  // 5. Search khóa học
  searchCourse: (tenKhoaHoc: string) => {
    return api.get<Course[]>(
      "QuanLyKhoaHoc/LayDanhSachKhoaHoc",
      {
        params: withGroup({ tenKhoaHoc }),
      }
    );
  },


  // 6. Pagination (giữ 1 hàm thôi)
  getCoursePagination: (page: number, pageSize: number) => {
    return api.get<PaginatedResult<Course>>(
      "QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang",
      {
        params: withGroup({ page, pageSize }),
      }
    );
  },


  // 7. Ghi danh / Hủy ghi danh
  ghiDanhKhoaHoc: (payload: { maKhoaHoc: string; taiKhoan: string }) => {
    return api.post("QuanLyKhoaHoc/DangKyKhoaHoc", payload);
  },

  huyGhiDanhKhoaHoc: (payload: { maKhoaHoc: string; taiKhoan: string }) => {
    return api.post("QuanLyKhoaHoc/HuyGhiDanh", payload);
  },


  // 8. Xóa khóa học
  deleteCourse: (maKhoaHoc: string) => {
    return api.delete("QuanLyKhoaHoc/XoaKhoaHoc", {
      params: { maKhoaHoc },
    });
  },


  // 9. Thêm khóa học
  addCourseUploadImage: (formData: FormData) => {
    return api.post("QuanLyKhoaHoc/ThemKhoaHocUploadHinh", formData);
  },


  // 10. Cập nhật khóa học
  updateCourseUploadImage: (formData: FormData) => {
    return api.post("QuanLyKhoaHoc/CapNhatKhoaHocUpload", formData);
  },
};