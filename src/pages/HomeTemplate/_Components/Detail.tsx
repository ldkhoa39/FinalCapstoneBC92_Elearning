import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courseService } from "../../../services/courseService";
import type { Course } from "../../../type";
import Loading from "../_Components/Loading";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy id từ URL
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      courseService
        .getCourseDetail(id)
        .then((res) => {
          setCourse(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Loading
  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <Loading />
        </div>
    );
}
  if (!course)
    return (
      <div className="text-white text-center py-20">
        Không tìm thấy khóa học!
      </div>
    );

    return (
        <section className="flex-grow pt-28 pb-24 bg-[#020617]">
            <div className="w-[70%] mx-auto">
                {/* I. HEADER - PHẦN TRÊN CÙNG */}
                <div className="mb-14">
                <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase border border-cyan-500/20 mb-6">
                    {/* Sửa lại logic tên danh mục cho đúng chuẩn API */}
                    {course.danhMucKhoaHoc?.tenDanhMuc ||
                    course.danhMucKhoaHoc?.tenDanhMuc ||
                    "Khóa học"}
                </span>

                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 max-w-4xl">
                    {course.tenKhoaHoc}
                </h1>

                <p className="text-slate-400 text-lg md:text-xl max-w-2xl">
                    Khóa học được thiết kế để giúp bạn xây dựng nền tảng vững chắc và
                    phát triển kỹ năng thực chiến.
                </p>
                </div>

                {/* IMAGE - Fix lỗi mất nội dung và thu nhỏ gọn lại */}
                <div className="relative mb-14 group flex justify-center">
                    
                    {/* Glow Background nhẹ nhàng */}
                    <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full opacity-30"></div>

                    <div className="relative w-full max-w-4xl">
                        
                        {/* Gradient Border bao quanh sát mép ảnh */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 rounded-[1.5rem] blur-sm opacity-50"></div>

                        <img
                            src={course.hinhAnh}
                            alt={course.tenKhoaHoc}
                            /* 
                            CHỐT HẠ: 
                            - object-contain: Giúp hiện toàn bộ ảnh, không bị cắt (crop).
                            - max-h-[500px]: Giới hạn chiều cao để ảnh không chiếm quá nhiều diện tích.
                            */
                            className="relative w-full max-h-[500px] rounded-[1.5rem] object-contain bg-[#0f172a]/50 shadow-2xl border border-white/5 transition-transform duration-500 group-hover:scale-[1.01]"
                            onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/1000x600?text=Course+Image";
                            }}
                        />
                    </div>
                </div>

                {/* III. DESCRIPTION + ACTION - PHẦN DƯỚI CÙNG */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
                {/* Description: Sửa logic render HTML */}
                <div className="max-w-3xl">
                    <h2 className="text-2xl font-bold text-white mb-4">
                    Giới thiệu khóa học
                    </h2>

                    {/* Dùng dangerouslySetInnerHTML để render nội dung có thẻ <p> từ API */}
                    <div
                    className="text-slate-400 leading-8 text-lg prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                        __html:
                        course.moTa ||
                        "Khóa học cung cấp kiến thức từ cơ bản đến nâng cao...",
                    }}
                    />
                </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap mt-20 gap-4">
                <button className="px-10 py-4 font-bold text-slate-950 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl hover:scale-105 hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] transition-all duration-300">
                    GHI DANH NGAY
                </button>

                <button className="px-10 py-4 font-bold text-white border border-slate-700 rounded-2xl hover:bg-slate-800/60 hover:border-slate-500 transition-all duration-300">
                    XEM LỘ TRÌNH
                </button>
                </div>
            </div>
        </section>
    );
};

export default Detail;
