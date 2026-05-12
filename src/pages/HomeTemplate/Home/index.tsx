// src/Pages/HomeTemplate/Home/index.tsx
import { useEffect, useState, useCallback } from "react";
import Hero from "./Hero";
import CourseCard from "../_Components/CourseCard";
import Loading from "../_Components/Loading";
import { courseService } from "../../../services/courseService";
import CourseList from "../_Components/CourseList";
import type { Course } from "../../../type";

const Home = () => {
  const [listCourse, setListCourse] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dùng useCallback để tối ưu bộ nhớ
  const fetchListCourse = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await courseService.getCourseList();
      
      // Kiểm tra nếu có data thì mới set
      if (result && result.data) {
        setListCourse(result.data);
      }
    } catch (err: any) {
      console.error("Lỗi lấy danh sách khóa học:", err);
      setError("Không thể tải danh sách khóa học. Vui lòng thử lại sau!");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListCourse();
  }, [fetchListCourse]);

  return (
    <main className="bg-[#020617] min-h-screen">
      {/* 1. Phần Hero Banner: Giữ nguyên để tạo ấn tượng đầu trang */}
      <Hero />

      {/* 2. Phần Danh sách khóa học chính */}
      <section 
        aria-label="Danh sách khóa học phổ biến" 
        className="max-w-screen-xl mx-auto px-4 py-16"
      >
        {/* Phần Tiêu đề: Đã được thiết kế lại với phong cách Elearning-BC92 */}
        <div className="mb-12">
          <p className="text-accent-cyan uppercase tracking-[0.3em] text-sm font-semibold mb-3">
            E-Learning Platform
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-extrabold">
            Khóa học phổ biến
          </h2>
          <div className="w-24 h-1 mt-4 rounded-full bg-gradient-to-r from-primary-blue to-accent-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
        </div>

        {/* 3. Component CourseList: 
            Đây là nơi xử lý toàn bộ logic phân trang, gọi API và render CourseCard.
            Việc tách ra giúp code trang Home ngắn gọn và dễ bảo trì hơn. 
        */}
        <CourseList />
      </section>
    </main>
  );
};

export default Home;