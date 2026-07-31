import React from "react";

const Advise: React.FC = () => {
  // Hàm giả lập gửi form để khi demo bấm vào không bị load lại trang
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "🎉 Đăng ký thành công! Dữ liệu tư vấn đã được chuyển về Admin Dashboard.",
    );
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 py-16 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* THÔNG TIN & LỢI ÍCH */}
        <div className="flex flex-col space-y-8">
          {/* Badge */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700 text-cyan-400 text-xs font-bold tracking-wide">
              <i className="fa fa-compass"></i>
              ĐỊNH HƯỚNG SỰ NGHIỆP
            </span>
          </div>

          {/* Tiêu đề */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            Chưa biết bắt đầu từ đâu? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Nhận Tư Vấn Lộ Trình 1:1
            </span>
          </h1>

          {/* Mô tả */}
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
            Đừng lo lắng nếu bạn là người mới hoàn toàn! Đội ngũ giảng viên tại{" "}
            <strong className="text-white font-bold">
              Elearning-<span className="text-accent-cyan">BC92</span>
            </strong>
            sẽ phân tích năng lực, mục tiêu và thiết kế riêng cho bạn lộ trình học ngắn nhất để đi làm ngay.
          </p>

          {/* Box Lợi ích */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {/* B1 */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 flex flex-col gap-2 hover:bg-slate-800/60 transition duration-300">
              <div className="text-cyan-400 text-xl mb-1">
                <i className="fa fa-bullseye"></i>
              </div>
              <h3 className="text-white font-bold text-sm">Đúng Mục Tiêu</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Không học lan man, tập trung công nghệ thị trường cần.
              </p>
            </div>
            {/* B2 */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 flex flex-col gap-2 hover:bg-slate-800/60 transition duration-300">
              <div className="text-blue-400 text-xl mb-1">
                <i className="fa fa-clock"></i>
              </div>
              <h3 className="text-white font-bold text-sm">Tiết Kiệm 50%</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Rút ngắn thời gian tự mày mò thử sai vô ích.
              </p>
            </div>
            {/* B3 */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 flex flex-col gap-2 hover:bg-slate-800/60 transition duration-300">
              <div className="text-teal-400 text-xl mb-1">
                <i className="fa fa-briefcase"></i>
              </div>
              <h3 className="text-white font-bold text-sm">Cam Kết Đầu Ra</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Hỗ trợ kết nối doanh nghiệp ngay sau khóa học.
              </p>
            </div>
          </div>
        </div>

        {/* FORM ĐĂNG KÝ */}
        <div
          className="
            bg-[#111827]
            border border-slate-700/80
            rounded-2xl
            p-8
            shadow-2xl
            relative
            overflow-hidden
            h-full
            flex
            flex-col
            "
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-2">
              Đăng Ký Tư Vấn Miễn Phí
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Điền thông tin bên dưới, chuyên viên sẽ liên hệ với bạn trong vòng{" "}
              <span className="text-cyan-400 font-semibold">15 phút.</span>
            </p>

            <div className="mt-3 mb-6 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
              <i className="fa fa-shield text-emerald-400 text-xs"></i>

              <span className="text-xs text-slate-300">
                Thông tin của bạn được bảo mật tuyệt đối.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Họ và tên */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  required
                  className="w-full bg-[#0b1120] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>

              {/* SĐT */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Số điện thoại / Zalo *
                </label>
                <input
                  type="tel"
                  placeholder="0901 234 567"
                  required
                  className="w-full bg-[#0b1120] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Email liên hệ
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full bg-[#0b1120] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>

              {/* Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Định hướng bạn quan tâm
                </label>
                <select className="w-full bg-[#0b1120] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none">
                  <option value="frontend">
                    Lập trình Front-End (ReactJS / HTML / CSS)
                  </option>
                  <option value="backend">
                    Lập trình Back-End (NodeJS / Java)
                  </option>
                  <option value="fullstack">Lập trình Full-Stack</option>
                  <option value="mobile">
                    Lập trình Mobile (React Native)
                  </option>
                  <option value="unknown">Chưa rõ, cần tư vấn thêm</option>
                </select>
              </div>

              {/* Nút Submit */}
              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <i className="fa fa-paper-plane"></i>
                GỬI YÊU CẦU TƯ VẤN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advise;
