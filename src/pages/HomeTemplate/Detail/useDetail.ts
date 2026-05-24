import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { courseService } from "../../../services/courseService";
import type { RootState } from "../../../store";
import type { Course } from "../../../type";

export const useDetail = () => {
  // Lấy mã khóa học từ URL (ví dụ: /detail/React123 -> id = React123)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Lấy thông tin user đang đăng nhập từ Redux
  const { userLogin } = useSelector((state: RootState) => state.auth);

  // States quản lý UI
  const [courseDetail, setCourseDetail] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false); // Trạng thái loading của nút Ghi danh

  // 1. Hàm gọi API lấy chi tiết khóa học
  const fetchCourseDetail = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const result = await courseService.getCourseDetail(id);
      setCourseDetail(result.data);
    } catch (error) {
      console.error("Lỗi lấy chi tiết khóa học:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourseDetail();
  }, [fetchCourseDetail]);

  // 2. Hàm xử lý khi user bấm nút "Ghi danh"
  const handleEnroll = async () => {
    // Bước A: Chưa đăng nhập thì đá sang trang Login
    if (!userLogin) {
      alert("Bạn cần đăng nhập để ghi danh khóa học này!");
      navigate("/login");
      return;
    }

    if (!id) return;

    // Bước B: Đã đăng nhập -> Gọi API ghi danh
    try {
      setIsEnrolling(true);
      await courseService.ghiDanhKhoaHoc({
        maKhoaHoc: id,
        taiKhoan: userLogin.taiKhoan,
      });
      alert("🎉 Ghi danh thành công! Chúc bạn học tốt.");
    } catch (error: any) {
      console.error("Lỗi ghi danh:", error);
      // Backend thường trả về lỗi dạng text ở data (VD: "Đã đăng ký khóa học này rồi")
      const errorMsg = error.response?.data || "Có lỗi xảy ra khi ghi danh!";
      alert(`❌ ${errorMsg}`);
    } finally {
      setIsEnrolling(false);
    }
  };

  return { courseDetail, isLoading, isEnrolling, handleEnroll };
};