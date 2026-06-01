import {
  User,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react";

import type { UserProfile } from "../../../../type";

interface Props {
  profile: UserProfile;
}

const ProfileInfo = ({ profile }: Props) => {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6 backdrop-blur-xl">
      <h2 className="text-xl font-bold">
        Thông tin cá nhân
      </h2>

      <p className="text-sm text-slate-400 mt-1 mb-6">
        Thông tin tài khoản học viên chi tiết.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <InfoItem
          icon={<User size={16} />}
          label="Tài khoản"
          value={profile.taiKhoan}
        />

        <InfoItem
          icon={<Mail size={16} />}
          label="Email"
          value={profile.email}
        />

        <InfoItem
          icon={<Phone size={16} />}
          label="Số điện thoại"
          value={profile.soDT}
        />

        <InfoItem
          icon={<GraduationCap size={16} />}
          label="Loại người dùng"
          value={
            profile.maLoaiNguoiDung === "GV"
              ? "Giảng viên"
              : "Học viên"
          }
        />
      </div>
    </div>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) => (
  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
    <div className="flex gap-2 items-center text-slate-400 mb-3">
      {icon}
      <span>{label}</span>
    </div>

    <p className="font-semibold break-all">
      {value || "Chưa cập nhật"}
    </p>
  </div>
);

export default ProfileInfo;