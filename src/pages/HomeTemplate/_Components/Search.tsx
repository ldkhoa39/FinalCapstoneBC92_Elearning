// src/pages/Search/Search.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon, BookOpen, AlertCircle } from "lucide-react";
import { courseService } from "/FinalCapstoneBC92_Elearning/elearningbc92/src/services/courseService";
import type { Course } from "/FinalCapstoneBC92_Elearning/elearningbc92/src/type";

const Search: React.FC = () => {
  // Lấy keyword từ URL (ví dụ: /search?keyword=react)
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!keyword) return;

      try {
        setLoading(true);
        const res = await courseService.layDanhSachKhoaHoc(keyword);

        const strictResults = res.data.filter((course: Course) =>
          course.tenKhoaHoc.toLowerCase().includes(keyword.toLowerCase()),
        );

        // Set dữ liệu đã lọc sạch vào state
        setCourses(strictResults);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm khóa học:", error);
        setCourses([]); // Nếu lỗi hoặc không tìm thấy, set về mảng rỗng
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]); // Chạy lại mỗi khi keyword trên URL thay đổi

  return (
    <main className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-4 lg:px-8">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black flex items-center gap-3">
            <SearchIcon className="w-8 h-8 text-cyan-400" />
            Kết quả tìm kiếm
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Hiển thị kết quả cho từ khóa:{" "}
            <span className="text-cyan-400 font-bold">"{keyword}"</span>
          </p>
        </div>

        {/* Content */}
        {loading ? (
          // Skeleton Loading
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-80 rounded-[24px] bg-slate-900 border border-slate-800"
              />
            ))}
          </div>
        ) : courses.length > 0 ? (
          // Render Danh sách khóa học
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={course.maKhoaHoc}
                className="group flex flex-col bg-white/[0.02] border border-white/5 rounded-[24px] overflow-hidden hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img
                    src={course.hinhAnh}
                    alt={course.tenKhoaHoc}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400/020617/06b6d4?text=Course";
                    }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full w-max mb-3">
                    {course.danhMucKhoaHoc?.tenDanhMuc || "Khóa học"}
                  </span>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-cyan-400 transition-colors">
                    {course.tenKhoaHoc}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">
                    {course.moTa?.replace(/<[^>]*>/g, "") ||
                      "Chưa có mô tả chi tiết."}
                  </p>
                  <Link
                    to={`/detail/${course.maKhoaHoc}`}
                    className="w-full text-center bg-slate-800 hover:bg-cyan-400 hover:text-black text-white font-semibold py-2.5 rounded-xl transition-all"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Empty State khi không tìm thấy khóa nào
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 bg-slate-900/30 rounded-[32px] border border-dashed border-slate-700"
          >
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Rất tiếc, không tìm thấy khóa học nào!
            </h2>
            <p className="text-slate-400 text-center max-w-md">
              Chúng tôi không tìm thấy kết quả nào phù hợp với từ khóa{" "}
              <span className="text-white font-semibold">"{keyword}"</span>. Vui
              lòng thử lại với một từ khóa khác.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Search;
