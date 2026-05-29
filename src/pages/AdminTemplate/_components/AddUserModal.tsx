import React, { useState } from "react";
import { userService } from "../../../services/userServices";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDT: "",
    maLoaiNguoiDung: "HV" as "HV" | "GV",
    maNhom: "GP01",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await userService.addUser(formData);
      alert("Thêm người dùng thành công! 🎉");

      // Reset form về trạng thái trống
      setFormData({
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        email: "",
        soDT: "",
        maLoaiNguoiDung: "HV",
        maNhom: "GP01",
      });

      onSuccess(); // Gọi hàm load lại danh sách ở component cha
      onClose(); // Đóng modal
    } catch (error: any) {
      console.error("Lỗi khi thêm người dùng:", error);
      alert(
        error.response?.data ||
          "Có lỗi xảy ra, vui lòng kiểm tra lại tài khoản hoặc email!",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-fade-in">
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-3">
          <h3 className="text-xl font-bold text-cyan-400">
            Thêm Người Dùng Mới
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form Nhập Liệu */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                Tài Khoản
              </label>
              <input
                required
                type="text"
                name="taiKhoan"
                value={formData.taiKhoan}
                onChange={handleChange}
                placeholder="Nhập tài khoản..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                Mật Khẩu
              </label>
              <input
                required
                type="password"
                name="matKhau"
                value={formData.matKhau}
                onChange={handleChange}
                placeholder="Nhập mật khẩu..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
              Họ và Tên
            </label>
            <input
              required
              type="text"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              placeholder="Nhập họ và tên..."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                Số Điện Thoại
              </label>
              <input
                required
                type="text"
                name="soDT"
                value={formData.soDT}
                onChange={handleChange}
                placeholder="Nhập số điện thoại..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                Loại Người Dùng
              </label>
              <select
                name="maLoaiNguoiDung"
                value={formData.maLoaiNguoiDung}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-sm text-white"
              >
                <option value="HV">Học Viên</option>
                <option value="GV">Giáo Viên</option>
              </select>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-all"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-cyan-500/20"
            >
              {isSubmitting ? "Đang xử lý..." : "Xác nhận thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
