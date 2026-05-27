// src/pages/AdminTemplate/CourseManagement/index.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { courseService } from '../../../services/courseService'; 
import DeleteCourseModal from '../_components/DeleteCourse';

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Delete khoá học
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<{ma: string, ten: string} | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hàm gọi API thật lấy danh sách khóa học
  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await courseService.getCourseList(); 
      setCourses(res.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách khóa học:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Xử lý logic tìm kiếm cơ bản ngay trên frontend (nếu backend không có API search riêng)
  // Nếu backend có API search riêng, bạn sẽ gọi API đó trong onChange của input
  const filteredCourses = courses.filter(course => 
    course.tenKhoaHoc?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.maKhoaHoc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete khoá học
  const handleOpenDeleteModal = (maKhoaHoc: string, tenKhoaHoc: string) => {
    setCourseToDelete({ ma: maKhoaHoc, ten: tenKhoaHoc });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;
    
    setIsDeleting(true);
    try {
      await courseService.deleteCourse(courseToDelete.ma);
      
      alert("Xóa khóa học thành công!");
      fetchCourses(); // Gọi lại list mới
      setIsDeleteModalOpen(false); // Đóng modal
    } catch (error: any) {
      console.error("Lỗi khi xóa:", error);
      alert(error.response?.data || "Xóa khóa học thất bại do đã có học viên đăng ký!");
    } finally {
      setIsDeleting(false);
      setCourseToDelete(null);
    }
  };
  // End Delete khoá học

  

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl min-h-[70vh] animate-fade-in">
      
      {/* ================= HEADER & THANH CÔNG CỤ ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Quản lý Khóa học</h2>
          <p className="text-sm text-slate-400 mt-1">Xem, thêm, sửa, xóa danh sách khóa học trên hệ thống.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1 md:w-64">
            <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
            <input 
              type="text" 
              placeholder="Tìm tên hoặc mã khóa học..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-sm text-slate-200 rounded-lg pl-10 pr-4 py-2.5 focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/40 outline-none transition-all"
            />
          </div>

          {/* Nút Thêm Khóa Học */}
          <button className="px-4 py-2.5 bg-gradient-to-r from-primary-blue to-accent-cyan text-[#020617] text-sm font-bold rounded-lg shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all whitespace-nowrap">
            <i className="fa fa-plus mr-2"></i> Thêm Khóa Học
          </button>
        </div>
      </div>

      {/* ================= BẢNG DỮ LIỆU THẬT TỪ API ================= */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950 text-slate-300 uppercase font-semibold text-xs border-b border-slate-800">
            <tr>
              <th className="px-4 py-4 w-16 text-center">STT</th>
              <th className="px-4 py-4 w-24">Hình ảnh</th>
              <th className="px-4 py-4">Tên khóa học</th>
              <th className="px-4 py-4 w-32">Người tạo</th>
              <th className="px-4 py-4 w-24 text-center">Lượt xem</th>
              <th className="px-4 py-4 w-32 text-center">Thao tác</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-800/60">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <i className="fa fa-circle-notch fa-spin text-accent-cyan text-3xl"></i>
                  <p className="mt-2 text-slate-500">Đang tải dữ liệu từ server...</p>
                </td>
              </tr>
            ) : filteredCourses.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-slate-500">
                  {searchTerm ? "Không tìm thấy khóa học nào phù hợp với từ khóa." : "Hệ thống chưa có khóa học nào."}
                </td>
              </tr>
            ) : (
              filteredCourses.map((course, index) => (
                <tr key={course.maKhoaHoc} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-4 py-4 text-center font-medium">{index + 1}</td>
                  
                  <td className="px-4 py-4">
                    <img 
                      src={course.hinhAnh} 
                      alt={course.tenKhoaHoc} 
                      className="w-14 h-14 object-cover rounded-lg border border-slate-700 shadow-sm"
                      onError={(e: any) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }} 
                    />
                  </td>
                  
                  <td className="px-4 py-4 font-bold text-slate-200">
                    {course.tenKhoaHoc}
                    <div className="text-xs text-slate-500 font-normal mt-0.5">Mã: {course.maKhoaHoc}</div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium">
                      {course.nguoiTao?.hoTen || course.nguoiTao || 'N/A'}
                    </span>
                  </td>
                  
                  <td className="px-4 py-4 text-center">
                    <i className="fa fa-eye text-slate-500 mr-1.5 text-[10px]"></i>
                    {course.luotXem}
                  </td>
                  
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Nút Sửa */}
                      <button 
                        title="Chỉnh sửa"
                        className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      
                      {/* Nút Xóa */}
                      <button 
                        onClick={() => handleOpenDeleteModal(course.maKhoaHoc, course.tenKhoaHoc)}
                        className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      // 
      <DeleteCourseModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        courseName={courseToDelete?.ten || ""}
        isDeleting={isDeleting}
      />

    </div>
  );
};

export default CourseManagement;