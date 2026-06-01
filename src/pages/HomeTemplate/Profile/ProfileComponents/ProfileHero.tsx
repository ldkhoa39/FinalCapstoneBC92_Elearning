import React from "react";
import {
  BookOpen,
  GraduationCap,
  LayoutGrid,
} from "lucide-react";
import type { UserProfile } from "../../../../type";

interface Props {
  profile: UserProfile;
}

const ProfileHero: React.FC<Props> = ({ profile }) => {
  const totalCourses =
    profile?.chiTietKhoaHocGhiDanh?.length ?? 0;

  const totalCategories = new Set(
    profile?.chiTietKhoaHocGhiDanh?.map(
      (course) => course.danhMucKhoaHoc?.tenDanhMuc,
    ),
  ).size;

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 lg:p-10">
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px]" />

      <div className="relative flex flex-col lg:flex-row gap-8 lg:items-center">
        <div className="w-28 h-28 rounded-[28px] bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px]">
          <div className="w-full h-full rounded-[26px] bg-[#020617] flex items-center justify-center text-4xl font-black">
            {profile.hoTen?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex-1">
          {profile.maLoaiNguoiDung === "GV" ? (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs uppercase tracking-widest">
              <GraduationCap className="w-3.5 h-3.5" />
              Giảng viên Cyber
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs uppercase tracking-widest">
              <GraduationCap className="w-3.5 h-3.5" />
              Học viên Cyber
            </span>
          )}

          <h1 className="text-4xl lg:text-5xl font-black mt-4">
            {profile.hoTen}
          </h1>

          <p className="text-slate-400 mt-3">
            Quản lý thông tin cá nhân và các khóa học đã đăng ký.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <StatCard
              icon={<BookOpen className="w-5 h-5" />}
              value={String(totalCourses)}
              label="Khóa học"
            />

            <StatCard
              icon={<LayoutGrid className="w-5 h-5" />}
              value={String(totalCategories)}
              label="Danh mục"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <div className="min-w-[180px] rounded-2xl border border-white/10 bg-white/[0.03] p-5">
    <div className="text-cyan-400 mb-3">{icon}</div>
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-slate-400">{label}</p>
  </div>
);

export default ProfileHero;