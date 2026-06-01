// src/Pages/HomeTemplate/CourseCatalog/index.tsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { courseService } from "../../../services/courseService";
import CourseCard from "../_Components/courses/CourseCard";
import Loading from "../_Components/common/Loading";
import type { Course } from "../../../type";

const CourseCatalog: React.FC = () => {
  // Bắt tham số maDanhMuc từ URL
  const { maDanhMuc } = useParams<{ maDanhMuc: string }>(); 
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoursesByCategory = useCallback(async () => {
    if (!maDanhMuc) return;
    
    try {
      setIsLoading(true);
      setError(null);
      // Gọi API lấy khóa học theo danh mục
      const res = await courseService.getCourseByCategory(maDanhMuc);
      setCourses(res.data);
    } catch (err) {
      console.error("Lỗi tải danh sách khóa học theo danh mục:", err);
      setError("Không tìm thấy khóa học nào cho danh mục này.");
    } finally {
      setIsLoading(false);
    }
  }, [maDanhMuc]);

  useEffect(() => {
    // Mỗi khi maDanhMuc trên URL thay đổi (user click danh mục khác), hàm này sẽ chạy lại
    fetchCoursesByCategory();
  }, [fetchCoursesByCategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <Loading />
      </div>
    );
  }

  return (
    <main className="bg-[#020617] min-h-screen pt-24 pb-16">
      <div className="max-w-screen-xl mx-auto px-4">
        
        {/* Tiêu đề trang */}
        <div className="mb-12">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm font-semibold mb-3">
            DANH MỤC KHÓA HỌC
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-extrabold uppercase">
            {maDanhMuc}
          </h2>
          <div className="w-24 h-1 mt-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
        </div>

        {/* Render danh sách khóa học */}
        {error ? (
          <div className="text-center text-slate-400 py-20 bg-[#0F172A] rounded-2xl border border-slate-800">
            <i className="fa fa-folder-open text-4xl mb-4 opacity-50"></i>
            <p className="text-lg">{error}</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center text-slate-400 py-20 bg-[#0F172A] rounded-2xl border border-slate-800">
            <i className="fa fa-box-open text-4xl mb-4 opacity-50"></i>
            <p className="text-lg">Hiện chưa có khóa học nào trong danh mục này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.maKhoaHoc} course={course} />
            ))}
          </div>
        )}
        
      </div>
    </main>
  );
};

export default CourseCatalog;