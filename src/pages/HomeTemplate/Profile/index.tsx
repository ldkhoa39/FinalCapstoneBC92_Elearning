import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Mail,
  Phone,
  User,
  LayoutGrid,
  GraduationCap,
  Search,
} from "lucide-react";

import { userService } from "../../../services/userServices";

import type { Course, UserProfile } from "../../../type";

type TabType = "profile" | "courses";

const tabs: { id: TabType; label: string }[] = [
  {
    id: "profile",
    label: "Thông tin",
  },
  {
    id: "courses",
    label: "Khóa học",
  },
];

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const [search, setSearch] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);

      const res = await userService.getProfile();

      setProfile(res.data);
    } catch (error) {
      console.error("Fetch profile failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const enrolledCourses = useMemo(() => {
    if (!profile?.chiTietKhoaHocGhiDanh) return [];

    return profile.chiTietKhoaHocGhiDanh.filter((course) =>
      course.tenKhoaHoc.toLowerCase().includes(search.toLowerCase())
    );
  }, [profile, search]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-28 pb-20">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 lg:p-10"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px]" />

          <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
            {/* AVATAR */}
            <div className="relative">
              <div className="w-28 h-28 rounded-[28px] bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px]">
                <div className="w-full h-full rounded-[26px] bg-[#020617] flex items-center justify-center text-4xl font-black">
                  {profile?.hoTen?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            {/* INFO */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-cyan-400" />

                <p className="text-cyan-400 text-sm font-medium">
                  Student Dashboard
                </p>
              </div>

              <h1 className="text-3xl lg:text-5xl font-black tracking-tight">
                {profile?.hoTen}
              </h1>

              <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed">
                Quản lý thông tin cá nhân và các khóa học bạn đã đăng ký.
              </p>

              {/* QUICK STATS */}
              <div className="flex flex-wrap gap-4 mt-8">
                <StatCard
                  icon={<BookOpen className="w-5 h-5" />}
                  label="Khóa học đã đăng ký"
                  value={
                    profile?.chiTietKhoaHocGhiDanh?.length?.toString() || "0"
                  }
                />

                <StatCard
                  icon={<LayoutGrid className="w-5 h-5" />}
                  label="Danh mục khoá học"
                  value={
                    new Set(
                      profile?.chiTietKhoaHocGhiDanh?.map(
                        (course) => course.danhMucKhoaHoc?.tenDanhMuc
                      )
                    ).size.toString()
                  }
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* TABS */}
        <div className="mt-10 flex justify-center lg:justify-start">
          <div className="bg-slate-900/70 border border-slate-800 p-1 rounded-2xl flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-cyan-400 rounded-xl"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          {activeTab === "profile" ? (
            <motion.section
              key="profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10"
            >
              {/* LEFT */}
              <div className="lg:col-span-2">
                <Card>
                  <SectionTitle
                    title="Thông tin cá nhân"
                    description="Thông tin tài khoản học viên."
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem
                      icon={<User className="w-4 h-4" />}
                      label="Tài khoản"
                      value={profile?.taiKhoan}
                    />

                    <InfoItem
                      icon={<Mail className="w-4 h-4" />}
                      label="Email"
                      value={profile?.email}
                    />

                    <InfoItem
                      icon={<Phone className="w-4 h-4" />}
                      label="Số điện thoại"
                      value={profile?.soDT}
                    />

                    <InfoItem
                      icon={<GraduationCap className="w-4 h-4" />}
                      label="Loại người dùng"
                      value="Học viên"
                    />
                  </div>
                </Card>
              </div>

              {/* RIGHT */}
              <div className="space-y-6">
                <Card>
                  <SectionTitle
                    title="Tổng quan"
                    description="Thông tin nhanh."
                  />

                  <div className="space-y-4">
                    <MiniStat
                      label="Tổng khóa học"
                      value={
                        profile?.chiTietKhoaHocGhiDanh?.length?.toString() ||
                        "0"
                      }
                    />

                    <MiniStat
                      label="Email"
                      value={profile?.email || "N/A"}
                    />

                    <MiniStat
                      label="Tài khoản"
                      value={profile?.taiKhoan || "N/A"}
                    />
                  </div>
                </Card>

                <Card>
                  <SectionTitle
                    title="Khám phá thêm"
                    description="Tìm thêm khóa học phù hợp."
                  />

                  <button className="w-full bg-cyan-400 hover:bg-cyan-300 transition-colors text-black font-semibold py-3 rounded-2xl">
                    Khám phá khóa học
                  </button>
                </Card>
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="courses"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mt-10"
            >
              {/* SEARCH */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                <input
                  type="text"
                  placeholder="Tìm kiếm khóa học..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <CourseCard
                      key={course.maKhoaHoc}
                      course={course}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Profile;

/* =========================
   COMPONENTS
========================= */

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6 backdrop-blur-xl">
      {children}
    </div>
  );
};

const SectionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold">{title}</h2>

      <p className="text-sm text-slate-400 mt-1">{description}</p>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="min-w-[180px] bg-white/[0.03] border border-white/10 rounded-2xl p-5">
      <div className="text-cyan-400 mb-3">{icon}</div>

      <p className="text-3xl font-bold">{value}</p>

      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  );
};

const MiniStat = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
      <span className="text-slate-400">{label}</span>

      <span className="font-medium text-right break-all">{value}</span>
    </div>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center gap-2 text-slate-400 mb-3">
        {icon}

        <span className="text-sm">{label}</span>
      </div>

      <p className="font-semibold break-all">
        {value || "Chưa cập nhật"}
      </p>
    </div>
  );
};

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden h-52">
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

      {/* CONTENT */}
      <div className="p-6">
        {/* CATEGORY */}
        <div className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400 mb-4">
          {course.danhMucKhoaHoc?.tenDanhMuc || "Khóa học"}
        </div>

        {/* TITLE */}
        <h3 className="text-xl font-bold mb-3 line-clamp-2">
          {course.tenKhoaHoc}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
          {course.moTa?.replace(/<[^>]*>/g, "") ||
            "Chưa có mô tả cho khóa học này."}
        </p>

        {/* ACTION */}
        <div className="flex items-center justify-between mt-6">
          <button className="bg-cyan-400 hover:bg-cyan-300 transition-colors text-black font-semibold px-5 py-3 rounded-xl">
            Xem khóa học
          </button>

          <button className="text-sm text-slate-500 hover:text-red-400 transition-colors">
            Hủy
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const EmptyState = () => {
  return (
    <div className="rounded-[32px] border border-dashed border-slate-700 bg-white/[0.02] py-24 px-6 text-center">
      <div className="w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-10 h-10 text-cyan-400" />
      </div>

      <h2 className="text-2xl font-bold mb-3">
        Không tìm thấy khóa học
      </h2>

      <p className="text-slate-400 max-w-md mx-auto">
        Không có khóa học nào phù hợp với từ khóa tìm kiếm của bạn.
      </p>
    </div>
  );
};

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#020617] px-4 py-20 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="h-72 rounded-[32px] bg-slate-900 border border-slate-800" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          <div className="lg:col-span-2 h-96 rounded-[28px] bg-slate-900 border border-slate-800" />

          <div className="h-96 rounded-[28px] bg-slate-900 border border-slate-800" />
        </div>
      </div>
    </div>
  );
};