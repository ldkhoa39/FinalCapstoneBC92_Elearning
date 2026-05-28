import React, { useState, useEffect } from "react";
import { courseService } from "../../../services/courseService";

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  course: any; // Trùng khớp với prop course={selectedCourse} bạn đang truyền
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  course,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State lưu dữ liệu text
  const [formData, setFormData] = useState({
    maKhoaHoc: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    danhGia: 0,
    maNhom: "GP01",
    maDanhMucKhoaHoc: "BackEnd",
    taiKhoanNguoiTao: "",
  });

  // State lưu file hình ảnh (nếu user muốn đổi ảnh mới)
  const [file, setFile] = useState<File | null>(null);

  // Tự động điền dữ liệu của khóa học vào form mỗi khi mở modal
  useEffect(() => {
    if (course && isOpen) {
      setFormData({
        maKhoaHoc: course.maKhoaHoc || "",
        tenKhoaHoc: course.tenKhoaHoc || "",
        moTa: course.moTa || "",
        luotXem: course.luotXem || 0,
        danhGia: course.danhGia || 0,
        maNhom: course.maNhom || "GP01",
        maDanhMucKhoaHoc: course.danhMucKhoaHoc?.maDanhMucKhoahoc || "BackEnd",
        taiKhoanNguoiTao: course.nguoiTao?.taiKhoan || "",
      });
      setFile(null); // Reset lại file mỗi khi mở modal khóa học khác
    }
  }, [course, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("maKhoaHoc", formData.maKhoaHoc);
      submitData.append("tenKhoaHoc", formData.tenKhoaHoc);
      submitData.append("moTa", formData.moTa);
      submitData.append("luotXem", formData.luotXem.toString());
      submitData.append("danhGia", formData.danhGia.toString());
      submitData.append("maDanhMucKhoaHoc", formData.maDanhMucKhoaHoc);
      submitData.append("maNhom", formData.maNhom);
      submitData.append("taiKhoanNguoiTao", formData.taiKhoanNguoiTao);

      // 🔥 TUYỆT CHIÊU XỬ LÝ HÌNH ẢNH:
      if (file) {
        // Trường hợp 1: User chủ động chọn file ảnh mới
        submitData.append("hinhAnh", file, file.name);
      } else if (course?.hinhAnh) {
        // Trường hợp 2: User KHÔNG chọn ảnh mới -> Ta tự "tải" ảnh cũ về thành File object
        try {
          const response = await fetch(course.hinhAnh);
          const blob = await response.blob();
          // Biến blob thành File object để đánh lừa Backend là có up file
          const fakeFile = new File([blob], "current-image.jpg", {
            type: blob.type,
          });
          submitData.append("hinhAnh", fakeFile, fakeFile.name);
        } catch (fetchImgErr) {
          console.error(
            "Không thể lấy ảnh cũ do lỗi CORS hoặc link hỏng:",
            fetchImgErr,
          );
          // Nếu lỗi (ví dụ link ảnh từ server khác bị chặn CORS), đành chịu và báo user
          alert("Vui lòng chọn một file ảnh mới cho khóa học này!");
          setIsSubmitting(false);
          return;
        }
      }

      // Gọi API cập nhật của bạn
      await courseService.updateCourseUploadImage(submitData);

      alert("Cập nhật khóa học thành công!");
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Lỗi khi cập nhật:", error);
      alert(error.response?.data || "Có lỗi xảy ra khi cập nhật khóa học!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700 bg-slate-800/50">
          <h3 className="text-xl font-bold text-white">Chỉnh sửa Khóa học</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <i className="fa fa-times text-xl"></i>
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mã khóa học (Read-only) */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">
                Mã khóa học (Không đổi)
              </label>
              <input
                type="text"
                name="maKhoaHoc"
                value={formData.maKhoaHoc}
                disabled
                className="w-full bg-slate-800 border border-slate-700 text-slate-400 rounded-lg px-4 py-2 opacity-70 cursor-not-allowed"
              />
            </div>

            {/* Tên khóa học */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">
                Tên khóa học
              </label>
              <input
                type="text"
                name="tenKhoaHoc"
                value={formData.tenKhoaHoc}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2 focus:border-cyan-500 outline-none"
              />
            </div>

            {/* Danh mục khóa học */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">
                Danh Mục
              </label>
              <select
                name="maDanhMucKhoaHoc"
                value={formData.maDanhMucKhoaHoc}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2 focus:border-cyan-500 outline-none"
              >
                <option value="FrontEnd">Lập trình Front-end</option>
                <option value="BackEnd">Lập trình Back-end</option>
                <option value="Design">Thiết kế Web</option>
                <option value="DiDong">Lập trình Di động</option>
                <option value="FullStack">Lập trình Full Stack</option>
                <option value="TuDuy">Tư duy lập trình</option>
              </select>
            </div>

            {/* Hình ảnh (File Upload) */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">
                Cập nhật hình ảnh (Tùy chọn)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-slate-400 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
              />
            </div>

            {/* Mô tả */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-slate-300">
                Mô tả khóa học
              </label>
              <textarea
                name="moTa"
                value={formData.moTa}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2 focus:border-cyan-500 outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-lg disabled:opacity-50 flex items-center transition-all"
            >
              {isSubmitting ? (
                <>
                  <i className="fa fa-circle-notch fa-spin mr-2"></i> Đang
                  lưu...
                </>
              ) : (
                "Lưu thay đổi"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
