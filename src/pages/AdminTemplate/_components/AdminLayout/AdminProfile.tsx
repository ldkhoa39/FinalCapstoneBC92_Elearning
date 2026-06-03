import React from "react";
import { useSelector } from "react-redux";

const AdminProfile: React.FC = () => {
  const { userLogin } = useSelector((state: any) => state.auth);

  const getInitial = (name?: string) => {
    if (!name) return "A";

    const words = name.trim().split(" ");
    return words[words.length - 1][0].toUpperCase();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER */}
      <div
        className="
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl
          p-6
          shadow-lg
        "
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div
            className="
              w-24 h-24 rounded-2xl
              bg-gradient-to-br
              from-cyan-500
              to-blue-600
              flex items-center justify-center
              text-4xl font-bold text-white
              shadow-lg
            "
          >
            {getInitial(userLogin?.hoTen || userLogin?.taiKhoan)}
          </div>

          {/* Info */}
          <div className="text-center md:text-left">
            <h1
              className="
                text-2xl font-bold
                text-slate-900 dark:text-white
              "
            >
              {userLogin?.hoTen || "Quản trị viên"}
            </h1>

            <p
              className="
                text-slate-500 dark:text-slate-400
                mt-1
              "
            >
              {userLogin?.email}
            </p>

            <span
              className="
                inline-flex mt-3
                px-3 py-1 rounded-full
                bg-cyan-500/10
                text-cyan-500
                text-xs font-semibold
              "
            >
              Administrator
            </span>
          </div>
        </div>
      </div>

      {/* DETAIL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div
          className="
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-800
            rounded-2xl
            p-6
            shadow-lg
          "
        >
          <h2
            className="
              text-lg font-bold mb-5
              text-slate-900 dark:text-white
            "
          >
            Thông tin cá nhân
          </h2>

          <div className="space-y-4">
            <InfoRow
              label="Tài khoản"
              value={userLogin?.taiKhoan || "N/A"}
            />

            <InfoRow
              label="Họ tên"
              value={userLogin?.hoTen || "N/A"}
            />

            <InfoRow
              label="Email"
              value={userLogin?.email || "N/A"}
            />

            <InfoRow
              label="Số điện thoại"
              value={userLogin?.soDT || "N/A"}
            />
          </div>
        </div>

        {/* System Info */}
        <div
          className="
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-800
            rounded-2xl
            p-6
            shadow-lg
          "
        >
          <h2
            className="
              text-lg font-bold mb-5
              text-slate-900 dark:text-white
            "
          >
            Thông tin hệ thống
          </h2>

          <div className="space-y-4">
            <InfoRow
              label="Vai trò"
              value="Quản trị viên"
            />

            <InfoRow
              label="Trạng thái"
              value="Đang hoạt động"
            />

            <InfoRow
              label="Quyền hạn"
              value="Full Access"
            />

            <InfoRow
              label="Phiên bản"
              value="Elearning v2.0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div
    className="
      flex items-center justify-between
      border-b
      border-slate-200
      dark:border-slate-800
      pb-3
    "
  >
    <span
      className="
        text-sm
        text-slate-500 dark:text-slate-400
      "
    >
      {label}
    </span>

    <span
      className="
        text-sm font-semibold
        text-slate-900 dark:text-slate-200
      "
    >
      {value}
    </span>
  </div>
);

export default AdminProfile;