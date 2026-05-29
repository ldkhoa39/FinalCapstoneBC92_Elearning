import React, { useState, useEffect } from "react";
import { userService } from "../../../services/userServices";
import type { User } from "../../../type";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null; // Dữ liệu user đang được chọn để sửa
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, onSuccess, user }) => {
  const [formData, setFormData] = useState<User>({
    taiKhoan: "",
    hoTen: "",
    email: "",
    soDT: "",
    maLoaiNguoiDung: "HV" as "HV" | "GV",
    maNhom: "GP01",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mỗi khi biến "user" từ cha truyền vào thay đổi, ta cập nhật lại form
  useEffect(() => {
  if (user) {
    setFormData({
      ...user, // Trải toàn bộ data cũ ra
      
      // 1. Fix lỗi 500: Ép cứng lại mã nhóm (do API danh sách không trả về maNhom)
      maNhom: "GP01", 
      
      // 2. Fix lỗi trống số điện thoại: Quét cả 2 trường hợp key của API
      // @ts-ignore (Bỏ qua cảnh báo TS nếu type User không có soDt)
      soDT: user.soDT || user.soDt || "", 
    });
  }
}, [user]);

  if (!isOpen || !user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await userService.updateUser(formData);
      alert("Cập nhật thông tin thành công! ✨");
      onSuccess();
      onClose();
    } catch (error: any) {
      alert(error.response?.data || "Có lỗi xảy ra khi cập nhật!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-3">
          <h3 className="text-xl font-bold text-blue-400">Chỉnh Sửa Người Dùng</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Tài Khoản (Không được sửa)</label>
            <input
              disabled
              type="text"
              value={formData.taiKhoan}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-500 cursor-not-allowed text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Họ và Tên</label>
            <input
              required
              type="text"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Email</label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Số Điện Thoại</label>
              <input
                required
                type="text"
                name="soDT"
                value={formData.soDT}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Loại Người Dùng</label>
              <select
                name="maLoaiNguoiDung"
                value={formData.maLoaiNguoiDung}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-500 outline-none text-sm"
              >
                <option value="HV">Học Viên</option>
                <option value="GV">Giáo Viên</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-5 py-2 text-slate-400 text-sm">Hủy</button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20"
            >
              {isSubmitting ? "Đang lưu..." : "Lưu Thay Đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;