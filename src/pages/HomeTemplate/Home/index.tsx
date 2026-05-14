// src/Pages/HomeTemplate/Home/index.tsx
import { useEffect, useState, useCallback } from "react";
import Hero from "./Hero";
import Loading from "../_Components/Loading"; // Đảm bảo đường dẫn này đúng với project của bạn
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
      // Giả lập delay một chút để test hiệu ứng loading nếu cần
      setTimeout(() => {
        setIsLoading(false);
      }, 500); 
    }
  }, []);

  useEffect(() => {
    fetchListCourse();
  }, [fetchListCourse]);

  // Logic
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <Loading />
      </div>
    );
  }

  // Render
  return (
    <main className="bg-[#020617] min-h-screen">
      {/* 1. Phần Hero Banner */}
      <Hero />

      {/* 2. Phần Danh sách khóa học chính */}
      <section 
        aria-label="Danh sách khóa học phổ biến" 
        className="max-w-screen-xl mx-auto px-4 py-16"
      >
        {/* Phần Tiêu đề */}
        <div className="mb-12">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm font-semibold mb-3">
            E-Learning Platform
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-extrabold">
            Khóa học phổ biến
          </h2>
          <div className="w-24 h-1 mt-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
        </div>

        {/* 3. Component CourseList */}
        {error ? (
          <div className="text-center text-red-400 py-10">{error}</div>
        ) : (
          <CourseList />
        )}
      </section>
    </main>
  );
};

export default Home;