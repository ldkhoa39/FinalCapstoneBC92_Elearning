// src/Pages/HomeTemplate/_Components/CourseCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { Course } from "../../../type";

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  return (
    <div className="group relative bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#22D3EE]/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.hinhAnh}
          alt={course.tenKhoaHoc}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/400x250";
          }}
        />
        {/* Overlay gradient khi hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-60"></div>

        {/* Badge lượt xem/phổ biến */}
        <div className="absolute top-3 right-3 bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          New
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[#E2E8F0] font-bold text-lg line-clamp-1 group-hover:text-[#22D3EE] transition-colors">
          {course.tenKhoaHoc}
        </h3>

        <p
          className="text-slate-400 text-sm mt-2 line-clamp-2 min-h-[40px]"
          dangerouslySetInnerHTML={{ __html: course.moTa }}
        />

        <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-800/50">
          <div className="flex items-center text-slate-300 text-sm">
            <i className="fa fa-eye mr-2 text-[#22D3EE]"></i>
            <span>{course.luotXem}</span>
          </div>

          <Link
            to={`/detail/${course.maKhoaHoc}`}
            className="text-sm font-semibold text-[#22D3EE] flex items-center group/btn"
          >
            CHI TIẾT
            <i className="fa fa-arrow-right ml-2 transform transition-transform group-hover/btn:translate-x-1"></i>
          </Link>
        </div>
      </div>

      {/* Đường kẻ sáng ở dưới cùng khi hover */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#22D3EE] transition-all duration-500 group-hover:w-full"></div>
    </div>
  );
};

export default CourseCard;
