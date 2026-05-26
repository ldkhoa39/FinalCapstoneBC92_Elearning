import React from 'react';
// 1. Import motion từ thư viện framer-motion
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const Hero: React.FC = () => {
  // Cấu hình hiệu ứng xuất hiện tuần tự cho phần text bên trái
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // 3. Định nghĩa kiểu dữ liệu : Variants cho object này luôn
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section className="relative bg-main-bg py-16 md:py-24 overflow-hidden">
      {/* Hiệu ứng Glow nền tảng - Cho hiện mượt mà khi load trang */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent-cyan blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-accent-purple blur-[80px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none"
      ></motion.div>

      <div className="max-w-screen-xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
        
        {/* Nội dung bên trái (Dùng containerVariants để kích hoạt stagger) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="md:w-3/5 text-center md:text-left mb-12 md:mb-0"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold text-main-text leading-tight mb-6">
            Khởi đầu sự nghiệp <br /> 
            <span className="text-accent-cyan drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
              Lập trình viên
            </span> chuyên nghiệp
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-main-text opacity-70 text-lg md:text-xl mb-10 max-w-2xl mx-auto md:mx-0">
            Học từ các dự án thực tế, lộ trình bài bản từ Zero đến có việc làm. 
            Tham gia cộng đồng hơn 100.000 học viên tại E-LEARNING ngay hôm nay.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Hiệu ứng Hover & Tap cho Nút bấm */}
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary-blue hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center cursor-pointer"
            >
              XEM KHÓA HỌC <i className="fa fa-rocket ml-2"></i>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="border border-slate-700 text-main-text px-8 py-4 rounded-xl font-bold transition-colors flex items-center justify-center cursor-pointer"
            >
              TÌM HIỂU THÊM
            </motion.button>
          </motion.div>

          {/* Thống kê nhỏ */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex items-center justify-center md:justify-start space-x-8 border-t border-slate-800 pt-8"
          >
            <div>
              <p className="text-accent-cyan text-2xl font-bold">1000+</p>
              <p className="text-main-text opacity-50 text-sm uppercase">Khóa học</p>
            </div>
            <div>
              <p className="text-accent-purple text-2xl font-bold">50k+</p>
              <p className="text-main-text opacity-50 text-sm uppercase">Học viên</p>
            </div>
            <div>
              <p className="text-accent-cyan text-2xl font-bold">4.9/5</p>
              <p className="text-main-text opacity-50 text-sm uppercase">Đánh giá</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Hình ảnh/Visual bên phải (Hiệu ứng bay bồng bềnh vô tận - Floating) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="md:w-2/5 flex justify-center relative"
        >
          {/* Box bọc ngoài xử lý animation bồng bềnh */}
          <motion.div 
            animate={{ y: [0, -12, 0] }} 
            transition={{
              duration: 4, // Thời gian lặp lại chu kỳ bay (4 giây)
              repeat: Infinity, // Lặp lại vô hạn
              ease: "easeInOut" // Di chuyển mượt mà ở điểm đầu và cuối
            }}
            className="relative w-full max-w-[400px]"
          >
             {/* Khung trang trí phía sau */}
             <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-2xl blur opacity-30 animate-pulse"></div>
             
             <div className="relative bg-card-bg border border-slate-700 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                
                <div className="space-y-4">
                   <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                   <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                   <div className="flex items-center space-x-4 pt-4">
                      <div className="w-12 h-12 rounded-full bg-accent-purple opacity-20 flex items-center justify-center text-accent-purple text-xl">
                        <i className="fa fa-code"></i>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-slate-700 rounded w-full"></div>
                        <div className="h-2 bg-slate-700 rounded w-2/3"></div>
                      </div>
                   </div>
                   <div className="p-4 bg-main-bg rounded-lg border border-slate-800">
                      <p className="text-accent-cyan font-mono text-sm">npm install framer-motion</p>
                   </div>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;