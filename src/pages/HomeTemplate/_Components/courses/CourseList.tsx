import React, { useEffect, useState } from "react";
import { courseService } from "../../../../services/courseService";
import type { Course } from "../../../../type";
import CourseCard from "./CourseCard"; 
import SkeletonLoading from "../common/SkelentonLoading"; 

const CourseList: React.FC = () => {
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pageSize = 8; 

  useEffect(() => {
    // Bật loading mỗi khi bắt đầu gọi API hoặc đổi trang
    setIsLoading(true);

    courseService
      .getCoursePagination(currentPage, pageSize)
      .then((res) => {
        setCourseData(res.data.items);
        setTotalPages(res.data.totalPages);
        
        window.scrollTo({ top: 500, behavior: 'smooth' });
      })
      .catch((err) => {
        console.error("Lỗi lấy danh sách khóa học:", err);
      })
      .finally(() => {
        // Delay 300ms cho hiệu ứng skeleton
        setTimeout(() => setIsLoading(false), 300);
      });
  }, [currentPage]);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">
        Danh sách khóa học
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? 
            [...Array(pageSize)].map((_, index) => (
              <SkeletonLoading key={index} />
            ))
          : courseData.map((course) => (
              <CourseCard key={course.maKhoaHoc} course={course} />
            ))}
      </div>

      {/* Thanh phân trang */}
      <div className="flex justify-center items-center space-x-4 mt-12">
        <button
          disabled={currentPage === 1 || isLoading}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-6 py-2 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Trang trước
        </button>

        <div className="flex items-center bg-slate-800/50 px-4 py-2 rounded-lg border border-white/5">
          <span className="text-cyan-400 font-bold mr-1">{currentPage}</span>
          <span className="text-slate-500 mx-2">/</span>
          <span className="text-white">{totalPages}</span>
        </div>

        <button
          disabled={currentPage === totalPages || isLoading}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-6 py-2 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default CourseList;