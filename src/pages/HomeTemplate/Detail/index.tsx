import React from "react";
import { useDetail } from "./useDetail";
import Loading from "../_Components/Loading"; // Đường dẫn tuỳ thuộc cấu trúc của Khoa

const Detail: React.FC = () => {
  const { courseDetail, isLoading, isEnrolling, handleEnroll } = useDetail();

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
    <main className="bg-[#020617] min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Cột trái: Chi tiết khóa học */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            {courseDetail.tenKhoaHoc}
          </h1>
          <p className="text-slate-400 text-lg">
            {courseDetail.moTa || "Khóa học này chưa có mô tả chi tiết."}
          </p>
          
          <div className="flex items-center gap-6 mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-slate-300">
              <span className="block text-xs text-slate-500 uppercase font-bold mb-1">Giảng viên</span>
              <span className="font-medium text-cyan-400">{courseDetail.nguoiTao?.hoTen || "Admin"}</span>
            </div>
            <div className="w-px h-10 bg-slate-700"></div>
            <div className="text-slate-300">
              <span className="block text-xs text-slate-500 uppercase font-bold mb-1">Lượt xem</span>
              <span className="font-medium">{courseDetail.luotXem}</span>
            </div>
          </div>
        </div>

        {/* Cột phải: Thẻ hiển thị ảnh & Nút Ghi danh (Dính chặt khi cuộn trang) */}
        <div className="relative">
          <div className="sticky top-28 bg-[#0F172A] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl p-5">
            <img 
              src={courseDetail.hinhAnh} 
              alt={courseDetail.tenKhoaHoc} 
              className="w-full h-48 object-cover rounded-xl mb-6 bg-slate-800"
              onError={(e) => {
                // Hiển thị ảnh mặc định nếu API bị lỗi hình
                e.currentTarget.src = "https://via.placeholder.com/400x250/0f172a/22d3ee?text=Cyber+Academy";
              }}
            />
            
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-300
                ${isEnrolling 
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:-translate-y-1"
                }`}
            >
              {isEnrolling ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fa fa-spinner fa-spin"></i> Đang xử lý...
                </span>
              ) : (
                "GHI DANH NGAY"
              )}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Detail;