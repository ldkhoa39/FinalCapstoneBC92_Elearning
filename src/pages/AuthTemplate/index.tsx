// =========================
// AUTH TEMPLATE
// auth/index.tsx
// =========================

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const AuthTemplate: React.FC = () => {
  const { userLogin } = useSelector((state: RootState) => state.auth);

  if (userLogin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_30%)]" />

      <div className="relative grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between border-r border-white/5 px-14 py-12">
          
          {/* Logo */}
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md">
              <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              
              <span className="text-sm font-semibold tracking-[0.25em] text-slate-200">
                CYBER ACADEMY
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
              Modern Learning Platform
            </p>

            <h1 className="text-6xl font-black leading-[1.05] tracking-tight text-white">
              Build your
              <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
                future in tech.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-slate-400">
              Học lập trình theo hướng thực chiến với trải nghiệm học tập hiện đại,
              trực quan và tập trung vào sản phẩm thực tế.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                ["10K+", "Students"],
                ["250+", "Projects"],
                ["24/7", "Support"],
              ].map(([number, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-white">
                    {number}
                  </div>

                  <div className="mt-1 text-sm text-slate-400">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-slate-500">
            <p>© 2026 CyberSoft BC92</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex items-center justify-center px-6 py-10 sm:px-10">
          
          {/* Glow */}
          <div className="absolute h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 w-full max-w-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;