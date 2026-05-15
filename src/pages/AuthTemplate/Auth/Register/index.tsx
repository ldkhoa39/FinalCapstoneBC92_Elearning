import React from "react";
import { useRegister } from "./useRegister";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const { formik } = useRegister();

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
      
      {/* Header */}
      <div className="mb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-emerald-300/80">
          Create Account
        </p>

        <h2 className="text-4xl font-black tracking-tight text-white">
          Đăng ký
        </h2>

        <p className="mt-3 text-base leading-7 text-slate-400">
          Tạo tài khoản để bắt đầu hành trình trở thành developer chuyên nghiệp.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        
        {/* Account */}
        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="taiKhoan"
            className="text-sm font-medium text-slate-300"
          >
            Tài khoản
          </label>

          <input
            id="taiKhoan"
            name="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.taiKhoan}
            placeholder="Ví dụ: cyber_ninja"
            className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10"
          />

          {formik.touched.taiKhoan && formik.errors.taiKhoan && (
            <p className="text-sm text-red-400">
              {formik.errors.taiKhoan}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="matKhau"
            className="text-sm font-medium text-slate-300"
          >
            Mật khẩu
          </label>

          <input
            id="matKhau"
            type="password"
            name="matKhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.matKhau}
            placeholder="••••••••"
            className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10"
          />

          {formik.touched.matKhau && formik.errors.matKhau && (
            <p className="text-sm leading-6 text-red-400">
              {formik.errors.matKhau}
            </p>
          )}
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label
            htmlFor="hoTen"
            className="text-sm font-medium text-slate-300"
          >
            Họ và tên
          </label>

          <input
            id="hoTen"
            name="hoTen"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.hoTen}
            placeholder="Nguyễn Văn A"
            className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10"
          />

          {formik.touched.hoTen && formik.errors.hoTen && (
            <p className="text-sm text-red-400">
              {formik.errors.hoTen}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-300"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="email@domain.com"
            className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10"
          />

          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-400">
              {formik.errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label
            htmlFor="soDT"
            className="text-sm font-medium text-slate-300"
          >
            Số điện thoại
          </label>

          <input
            id="soDT"
            name="soDT"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.soDT}
            placeholder="0912345678"
            className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-emerald-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-emerald-500/10"
          />

          {formik.touched.soDT && formik.errors.soDT && (
            <p className="text-sm text-red-400">
              {formik.errors.soDT}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="sm:col-span-2 mt-2 flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-base font-bold text-white transition-all duration-300 hover:translate-y-[-1px] hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
        >
          Khởi tạo tài khoản
        </button>
      </form>

      {/* Bottom */}
      <div className="sm:col-span-2 mt-6 border-t border-white/5 pt-6 text-center">
        <p className="text-sm text-slate-400">
          Đã có tài khoản rồi?{" "}
          <Link 
            to="/login" 
            className="font-semibold text-emerald-400 transition hover:text-emerald-300"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;