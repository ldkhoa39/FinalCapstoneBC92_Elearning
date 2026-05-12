import React, { useEffect, useState } from "react";
import { courseService } from "../../../services/courseService";
import type { Course } from "../../../type";
import CourseCard from "./CourseCard"; // Giả sử bạn đã có component này

const CourseList: React.FC = () => {
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8; // Số lượng khóa học mỗi trang

  useEffect(() => {
    // Gọi API lấy danh sách phân trang
    courseService
      .getCoursePaginated(currentPage, pageSize)
      .then((res) => {
        // Dựa trên interface PaginatedResult trong type.ts của bạn
        setCourseData(res.data.items);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("Lỗi lấy danh sách khóa học:", err);
      });
  }, [currentPage]); // Chạy lại mỗi khi currentPage thay đổi

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold text-white mb-6">DANH SÁCH KHÓA HỌC</h2>

      {/* Hiển thị danh sách thẻ khóa học */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courseData.map((course) => (
          <CourseCard key={course.maKhoaHoc} course={course} />
        ))}
      </div>

      {/* Thanh phân trang đơn giản */}
      <div className="flex justify-center items-center space-x-4 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50"
        >
          Trang trước
        </button>

        <span className="text-white font-bold">
          Trang {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default CourseList;