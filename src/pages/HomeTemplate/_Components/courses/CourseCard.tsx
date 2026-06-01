import React from "react";
import { Link } from "react-router-dom";
import type { Course } from "../../../../type";

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400&auto=format&fit=crop";

  const cleanText = (text?: string) =>
    text
      ?.replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim() || "Chưa có mô tả";

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const img = e.currentTarget;

    if (img.src !== FALLBACK_IMAGE) {
      img.src = FALLBACK_IMAGE;
    } else {
      img.onerror = null;
    }
  };

  return (
    <div className="group relative bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-accent-cyan/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col">
      <div className="relative h-48 overflow-hidden bg-slate-900">
        <img
          src={course.hinhAnh}
          alt={course.tenKhoaHoc}
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-60"></div>
        <div className="absolute top-3 right-3 bg-primary-blue/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
          New
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-main-text font-bold text-lg line-clamp-1 group-hover:text-accent-cyan transition-colors">
          {course.tenKhoaHoc}
        </h3>

        {/* Hiển thị text đã được làm sạch */}
        <p className="text-slate-400 text-sm mt-2 line-clamp-2 min-h-[40px]">
          {cleanText(course.moTa)}
        </p>

        <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-800/50">
          <div className="flex items-center text-slate-300 text-sm">
            <i className="fa fa-eye mr-2 text-accent-cyan"></i>
            <span>{course.luotXem}</span>
          </div>

          <Link
            to={`/detail/${course.maKhoaHoc}`}
            className="text-sm font-semibold text-accent-cyan flex items-center group/btn"
          >
            CHI TIẾT
            <i className="fa fa-arrow-right ml-2 transform transition-transform group-hover/btn:translate-x-1"></i>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary-blue to-accent-cyan transition-all duration-500 group-hover:w-full"></div>
    </div>
  );
};

export default CourseCard;
