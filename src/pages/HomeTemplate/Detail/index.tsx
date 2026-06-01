import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useDetail } from "./useDetail";
import Loading from "../_Components/common/Loading";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const slideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const Detail: React.FC = () => {
  const {
    courseDetail,
    isLoading,
    isEnrolling,
    handleEnroll,
  } = useDetail();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <Loading />
      </div>
    );
  }

  if (!courseDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <p>Không tìm thấy khóa học!</p>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#020617] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />

      <div className="absolute bottom-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-14">

          {/* LEFT CONTENT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-6">
              <i className="fa fa-graduation-cap"></i>
              Khóa học trực tuyến
            </div>

            {/* Title */}
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                xl:text-6xl
                font-black
                text-white
                leading-tight
              "
            >
              {courseDetail.tenKhoaHoc}
            </h1>

            {/* Description */}
            <p
              className="
                mt-6
                text-base
                md:text-lg
                text-slate-400
                leading-relaxed
                max-w-4xl
              "
            >
              {courseDetail.moTa ||
                "Khóa học này hiện chưa có mô tả chi tiết."}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Giảng viên
                </p>

                <p className="mt-2 text-cyan-400 font-semibold">
                  {courseDetail.nguoiTao?.hoTen || "Admin"}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Lượt xem
                </p>

                <p className="mt-2 text-white font-semibold">
                  {courseDetail.luotXem}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm col-span-2 md:col-span-1">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Trạng thái
                </p>

                <p className="mt-2 text-emerald-400 font-semibold">
                  Đang mở đăng ký
                </p>
              </div>

            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="
                sticky
                top-28

                bg-slate-900/70
                backdrop-blur-xl

                border
                border-slate-700/80

                rounded-3xl

                overflow-hidden

                shadow-[0_20px_60px_rgba(0,0,0,0.45)]
              "
            >

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={courseDetail.hinhAnh}
                  alt={courseDetail.tenKhoaHoc}
                  className="
                    w-full
                    aspect-video
                    object-cover

                    transition-transform
                    duration-700

                    hover:scale-105
                  "
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/800x450/0f172a/22d3ee?text=Cyber+Academy";
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">

                <div className="mb-6">
                  <p className="text-slate-500 text-sm uppercase tracking-wider">
                    Sẵn sàng bắt đầu?
                  </p>

                  <h3 className="text-white text-xl font-bold mt-2">
                    Tham gia khóa học ngay hôm nay
                  </h3>

                  <p className="text-slate-400 text-sm mt-2">
                    Học tập cùng giảng viên giàu kinh nghiệm và cộng đồng học viên năng động.
                  </p>
                </div>

                <button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className={`
                    w-full

                    py-4

                    rounded-2xl

                    font-bold
                    text-base
                    md:text-lg

                    transition-all
                    duration-300

                    ${
                      isEnrolling
                        ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                        : `
                          bg-gradient-to-r
                          from-cyan-500
                          to-blue-600

                          text-white

                          hover:scale-[1.02]
                          hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]

                          active:scale-[0.98]
                        `
                    }
                  `}
                >
                  {isEnrolling ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fa fa-spinner fa-spin"></i>
                      Đang xử lý...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      GHI DANH NGAY
                      <i className="fa fa-arrow-right"></i>
                    </span>
                  )}
                </button>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
};

export default Detail;