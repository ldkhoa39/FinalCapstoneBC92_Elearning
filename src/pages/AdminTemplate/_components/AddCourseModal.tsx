// src/pages/AdminTemplate/_components/AddCourseModal.tsx
import React, { useState, useEffect } from 'react';
import { courseService } from '../../../services/courseService';

interface AddCourseProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Hàm callback để ép danh sách ở trang cha tự động load lại khi thêm thành công
}

const AddCourse: React.FC<AddCourseProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Khởi tạo cấu trúc state theo chuẩn payload API của dự án
  const [courseData, setCourseData] = useState({
    maKhoaHoc: '',
    tenKhoaHoc: '',
    moTa: '',
    luotXem: 0,
    danhGia: 0,
    hinhAnh: null as File | null,
    maDanhMucKhoaHoc: 'FrontEnd',
    maNhom: 'GP01',
    taiKhoanNguoiTao: '',
  });

  // Tự động lấy tài khoản người dùng đang đăng nhập để điền vào trường người tạo
  useEffect(() => {
    if (isOpen) {
      const userInfoString = localStorage.getItem('userLogin');
      if (userInfoString) {
        const userLogin = JSON.parse(userInfoString);
        setCourseData((prev) => ({
          ...prev,
          taiKhoanNguoiTao: userLogin.taiKhoan || '',
        }));
      }
      // Reset form và thông báo lỗi mỗi khi mở lại modal
      setErrorMessage('');
    }
  }, [isOpen]);

  // Nếu trạng thái ẩn thì không vẽ giao diện ra màn hình
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCourseData((prev) => ({ ...prev, hinhAnh: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Sử dụng FormData để bọc dữ liệu gửi lên vì có file đính kèm
      const formData = new FormData();
      formData.append('maKhoaHoc', courseData.maKhoaHoc);
      formData.append('tenKhoaHoc', courseData.tenKhoaHoc);
      formData.append('moTa', courseData.moTa);
      formData.append('luotXem', String(courseData.luotXem));
      formData.append('danhGia', String(courseData.danhGia));
      formData.append('maDanhMucKhoaHoc', courseData.maDanhMucKhoaHoc);
      formData.append('maNhom', courseData.maNhom);
      formData.append('taiKhoanNguoiTao', courseData.taiKhoanNguoiTao);

      if (courseData.hinhAnh) {
        // Tham số thứ 3 đảm bảo tên file không bị mất định dạng
        formData.append('File', courseData.hinhAnh, courseData.hinhAnh.name);
      } else {
        throw new Error('Vui lòng chọn hình ảnh minh họa cho khóa học!');
      }

      // Gọi API từ courseService (thường là endpoint ThemKhoaHocUploadHinhAnh)
      // Lưu ý: Tùy thuộc vào tên hàm trong file courseService của bạn, bạn hãy chỉnh lại tên hàm cho đúng (ví dụ: addCourse hoặc themKhoaHoc)
      await courseService.addCourseUploadImage(formData);

      alert('Thêm khóa học thành công!');
      
      // Nếu trang cha có truyền hàm làm mới dữ liệu thì kích hoạt nó
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (error: any) {
      console.error('Lỗi khi thêm khóa học:', error);
      setErrorMessage(
        error.response?.data || error.message || 'Có lỗi xảy ra trong quá trình xử lý!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      
      {/* Khung chứa Form */}
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Nút X đóng nhanh góc trên bên phải */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
          type="button"
        >
          <i className="fa fa-times text-lg"></i>
        </button>

        {/* Tiêu đề Modal */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white uppercase tracking-wider">
              Thêm Khóa Học Mới
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Điền các thông tin cần thiết bên dưới để đẩy khóa học lên hệ thống.
            </p>
          </div>
        </div>

        {/* Form nhập liệu */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Mã Khóa Học */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mã Khóa Học</label>
            <input
              type="text"
              name="maKhoaHoc"
              required
              value={courseData.maKhoaHoc}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-3 focus:border-cyan-500/50 outline-none transition-all"
              placeholder="VD: KH001"
            />
          </div>

          {/* Tên Khóa Học */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tên Khóa Học</label>
            <input
              type="text"
              name="tenKhoaHoc"
              required
              value={courseData.tenKhoaHoc}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-3 focus:border-cyan-500/50 outline-none transition-all"
              placeholder="VD: Lập trình ReactJS nâng cao"
            />
          </div>

          {/* Danh Mục Khóa Học */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Danh Mục</label>
            <select
              name="maDanhMucKhoaHoc"
              value={courseData.maDanhMucKhoaHoc}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-3 focus:border-cyan-500/50 outline-none transition-all"
            >
              <option value="FrontEnd">Lập trình Front-end</option>
              <option value="BackEnd">Lập trình Back-end</option>
              <option value="Design">Thiết kế Web</option>
              <option value="DiDong">Lập trình Di động</option>
              <option value="FullStack">Lập trình Full Stack</option>
            </select>
          </div>

          {/* Chọn File Ảnh */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hình Ảnh</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="w-full text-slate-400 text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 file:transition-colors"
            />
          </div>

          {/* Mô tả ngắn gọn */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mô Tả Chi Tiết</label>
            <textarea
              name="moTa"
              required
              rows={3}
              value={courseData.moTa}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-3 focus:border-cyan-500/50 outline-none transition-all resize-none"
              placeholder="Nội dung tóm tắt hoặc lộ trình khóa học..."
            />
          </div>

          {/* Thông báo lỗi từ API nếu có */}
          {errorMessage && (
            <div className="md:col-span-2 flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-xs font-medium">
              <i className="fa fa-exclamation-triangle"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Các nút bấm thao tác cuối form */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-2 border-t border-slate-800/60 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              HỦY BỎ
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <i className="fa fa-circle-notch fa-spin text-sm"></i>
              ) : (
                <i className="fa fa-plus-circle text-sm"></i>
              )}
              <span>TẠO KHÓA HỌC</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCourse;