import React from "react";
import { useLogin } from "./useLogin";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const { formik } = useLogin();

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
      
      {/* Header */}
      <div className="mb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-300/80">
          Welcome Back
        </p>

        <h2 className="text-4xl font-black tracking-tight text-white">
          Đăng nhập
        </h2>

        <p className="mt-3 text-base leading-7 text-slate-400">
          Tiếp tục hành trình học tập và xây dựng dự án của bạn.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        
        {/* Account */}
        <div className="space-y-2">
          <label
            htmlFor="taiKhoan"
            className="text-sm font-medium text-slate-300"
          >
            Tài khoản
          </label>

          <input
            id="taiKhoan"
            type="text"
            name="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.taiKhoan}
            placeholder="Nhập tài khoản..."
            className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-cyan-500/10"
          />

          {formik.touched.taiKhoan && formik.errors.taiKhoan && (
            <p className="text-sm text-red-400">
              {formik.errors.taiKhoan}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="matKhau"
              className="text-sm font-medium text-slate-300"
            >
              Mật khẩu
            </label>

            <button
              type="button"
              className="text-sm text-cyan-300 transition hover:text-cyan-200"
            >
              Quên mật khẩu?
            </button>
          </div>

          <input
            id="matKhau"
            type="password"
            name="matKhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.matKhau}
            placeholder="••••••••"
            className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-cyan-500/10"
          />

          {formik.touched.matKhau && formik.errors.matKhau && (
            <p className="text-sm text-red-400">
              {formik.errors.matKhau}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-base font-bold text-white transition-all duration-300 hover:translate-y-[-1px] hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
        >
          Tiến vào hệ thống
        </button>
      </form>

      {/* Bottom */}
      <div className="mt-8 border-t border-white/5 pt-6 text-center">
        <p className="text-sm text-slate-400">
          Chưa có tài khoản?{" "}
          <Link 
            to="/register" 
            className="font-semibold text-cyan-300 transition hover:text-cyan-200"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;