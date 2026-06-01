import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Hero: React.FC = () => {

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative bg-main-bg overflow-hidden py-16 md:py-24">
      {/* Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-accent-cyan blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-accent-purple blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none"
      />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LEFT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-3/5 text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-main-text leading-tight mb-6"
            >
              Khởi đầu sự nghiệp
              <br />
              <span className="text-accent-cyan drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                Lập trình viên
              </span>{" "}
              chuyên nghiệp
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-main-text/70 text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              Học từ các dự án thực tế, lộ trình bài bản từ Zero đến có việc làm.
              Tham gia cộng đồng hơn 100.000 học viên tại E-LEARNING ngay hôm nay.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary-blue hover:bg-blue-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all cursor-pointer flex items-center justify-center"
                >
                  XEM KHÓA HỌC
                  <i className="fa fa-rocket ml-2"></i>
                </motion.button>

                <motion.button
                  onClick={() => scrollToSection("footer-section")} 
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-slate-700 text-main-text px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center"
                >
                  TÌM HIỂU THÊM
                </motion.button> 
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-3 gap-4 text-center lg:text-left"
            >
              <div>
                <p className="text-accent-cyan text-2xl font-bold">1000+</p>
                <p className="text-main-text/50 text-xs sm:text-sm uppercase">Khóa học</p>
              </div>
              <div>
                <p className="text-accent-purple text-2xl font-bold">50k+</p>
                <p className="text-main-text/50 text-xs sm:text-sm uppercase">Học viên</p>
              </div>
              <div>
                <p className="text-accent-cyan text-2xl font-bold">4.9/5</p>
                <p className="text-main-text/50 text-xs sm:text-sm uppercase">Đánh giá</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-2/5 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 1, 0, -1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[420px]"
            >
              {/* Glow Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-2xl blur opacity-30 animate-pulse" />

              {/* Card */}
              <div className="relative bg-card-bg border border-slate-700 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                <div className="space-y-4">
                  <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                  <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="w-12 h-12 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple text-xl">
                      <i className="fa fa-code"></i>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2 bg-slate-700 rounded w-full"></div>
                      <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-main-bg rounded-lg border border-slate-800">
                    <p className="text-accent-cyan font-mono text-sm">
                      npm install framer-motion
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;