// src/Pages/HomeTemplate/Home/index.tsx
import { useEffect, useState, useCallback } from "react";
import Hero from "./Hero";
import CourseCard from "../_Components/CourseCard";
import Loading from "../_Components/Loading";
import { courseService } from "../../../services/courseService";
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
      <Hero />

      <section aria-label="Danh sách khóa học phổ biến" className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="mb-12">
          <p className="text-accent-cyan uppercase tracking-[0.3em] text-sm font-semibold mb-3">
            E-Learning Platform
          </p>
          <h2 className="text-main-text text-3xl md:text-4xl font-extrabold">
            Khóa học phổ biến
          </h2>
          <div className="w-24 h-1 mt-4 rounded-full bg-gradient-to-r from-primary-blue to-accent-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
        </div>

        {/* Xử lý các trạng thái UI */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loading />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">
            <i className="fa fa-exclamation-triangle mb-4 text-4xl"></i>
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {listCourse.slice(0, 8).map((course) => (
              <CourseCard key={course.maKhoaHoc} course={course} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;