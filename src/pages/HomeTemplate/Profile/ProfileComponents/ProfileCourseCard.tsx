import React from "react";
import { motion } from "framer-motion";
import type { Course } from "../../../../type";

interface ProfileCourseCardProps {
  course: Course;
  onCancel: (maKhoaHoc: string) => void;
}

const ProfileCourseCard: React.FC<ProfileCourseCardProps> = ({
  course,
  onCancel,
}) => {
  const cleanDescription = (text?: string) =>
    text?.replace(/<[^>]*>/g, "") || "Chưa có mô tả cho khóa học này.";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl flex flex-col h-full"
    >
      <div className="relative overflow-hidden h-52 shrink-0">
        <img
          src={course.hinhAnh}
          alt={course.tenKhoaHoc}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x400/020617/06b6d4?text=Course";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400 mb-4">
            {course.danhMucKhoaHoc?.tenDanhMuc || "Khóa học"}
          </div>

          <h3 className="text-xl font-bold mb-3 line-clamp-2">
            {course.tenKhoaHoc}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
            {cleanDescription(course.moTa)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button className="bg-cyan-400 hover:bg-cyan-300 transition-colors text-black font-semibold px-5 py-3 rounded-xl text-sm">
            Xem khóa học
          </button>

          <button
            onClick={() => onCancel(course.maKhoaHoc)}
            className="text-sm text-slate-500 hover:text-red-400 font-medium transition-colors"
          >
            Hủy khóa
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCourseCard;