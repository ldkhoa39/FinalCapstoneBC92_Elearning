// src/Pages/HomeTemplate/Home/index.tsx
import { useEffect, useState } from "react";
import Hero from "./Hero";
import CourseCard from "../_Components/CourseCard";
import { courseService } from "../../../services/courseService";
import type { Course } from "../../../type";

const Home = () => {
  // 1. Tạo state để lưu danh sách khóa học
  const [listCourse, setListCourse] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Gọi API khi component vừa load
  useEffect(() => {
    const fetchListCourse = async () => {
      try {
        setIsLoading(true);
        // Gọi hàm layDanhSachKhoaHoc từ service của bạn
        const result = await courseService.getCourseList();
        setListCourse(result.data);
      } catch (error) {
        console.error("Lỗi lấy danh sách khóa học:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListCourse();
  }, []);

  return (
      <>
        <Hero />

        {/* SỬA TẠI ĐÂY: Thay 'container' bằng 'max-w-screen-xl' */}
        <section className="max-w-screen-xl mx-auto px-4 py-16">
          {/* Tiêu đề phần danh sách */}
          <div className="mb-12">
            <h2 className="text-[#22D3EE] text-3xl font-bold tracking-tight uppercase">
              Khóa học phổ biến
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#2563EB] to-[#22D3EE] mt-2"></div>
          </div>

          {/* Phần lưới danh sách khóa học */}
          {isLoading ? (
            <div className="text-white text-center py-10 italic opacity-70">
              Đang tải dữ liệu từ hệ thống...
            </div>
          ) : (
            /* Giữ nguyên Grid của bạn, nó sẽ tự co lại theo khung 1280px ở trên */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listCourse.slice(0, 8).map((course) => (
                <CourseCard key={course.maKhoaHoc} course={course} />
              ))}
            </div>
          )}
        </section>
      </>
    );
  };

export default Home;
