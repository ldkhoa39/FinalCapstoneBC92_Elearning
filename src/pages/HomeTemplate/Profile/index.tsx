import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";

import { userService } from "../../../services/userServices";
import { courseService } from "../../../services/courseService";

import type { UserProfile } from "../../../type";

import SkeletonLoading from "../_Components/common/SkelentonLoading";

import ProfileHero from "./ProfileComponents/ProfileHero";
import ProfileTabs from "./ProfileComponents/ProfileTabs";
import ProfileInfo from "./ProfileComponents/ProfileInfo";
import ProfileCourseCard from "./ProfileComponents/ProfileCourseCard";
import EmptyState from "./ProfileComponents/emtyState";

type TabType = "profile" | "courses";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] =
    useState<TabType>("profile");
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

  const handleCancelCourse = async (
    maKhoaHoc: string,
  ) => {
    if (!profile?.taiKhoan) return;

    const isConfirm = window.confirm(
      "Bạn có chắc chắn muốn hủy khóa học này không?",
    );

    if (!isConfirm) return;

    try {
      await courseService.huyGhiDanhKhoaHoc({
        maKhoaHoc,
        taiKhoan: profile.taiKhoan,
      });

      alert("Hủy khóa học thành công!");

      fetchProfile();
    } catch (error) {
      console.error("Lỗi khi hủy khóa học:", error);

      alert("Đã xảy ra lỗi, hủy khóa học thất bại!");
    }
  };

  const enrolledCourses = useMemo(() => {
    if (!profile?.chiTietKhoaHocGhiDanh) return [];

    return profile.chiTietKhoaHocGhiDanh.filter((course) =>
      course.tenKhoaHoc
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [profile, search]);

  if (loading) {
    return <SkeletonLoading />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Không thể tải thông tin người dùng.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ProfileHero profile={profile} />
        </motion.div>

        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <AnimatePresence mode="wait">
          {activeTab === "profile" ? (
            <motion.section
              key="profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              <ProfileInfo profile={profile} />
            </motion.section>
          ) : (
            <motion.section
              key="courses"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                <input
                  type="text"
                  placeholder="Tìm kiếm khóa học..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="
                    w-full
                    bg-white/[0.03]
                    border border-white/10
                    rounded-2xl
                    pl-12 pr-4 py-4
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    focus:border-cyan-400
                    transition-colors
                  "
                />
              </div>

              {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <ProfileCourseCard
                      key={course.maKhoaHoc}
                      course={course}
                      onCancel={handleCancelCourse}
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