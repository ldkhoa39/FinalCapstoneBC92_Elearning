import React, { useState, useEffect, useCallback } from "react";
import { courseService } from "../../../services/courseService";

import DeleteCourseModal from "../_components/DeleteCourse";
import AddCourse from "../_components/AddCourseModal";
import EditCourseModal from "../_components/EditCourseModal";

const CourseManagement: React.FC = () => {
  // =========================
  // DATA STATE
  // =========================
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // =========================
  // MODAL STATE
  // =========================
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // =========================
  // SELECTED COURSE
  // =========================
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  // delete loading
  const [isDeleting, setIsDeleting] = useState(false);

  // =========================
  // FETCH COURSES
  // =========================
  const fetchCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await courseService.getCourseList();
      setCourses(res.data);
    } catch (err) {
      console.error("Fetch courses error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // =========================
  // FILTER
  // =========================
  const filteredCourses = courses.filter((c) => {
    const keyword = searchTerm.toLowerCase();
    return (
      c.tenKhoaHoc?.toLowerCase().includes(keyword) ||
      c.maKhoaHoc?.toLowerCase().includes(keyword)
    );
  });

  // =========================
  // DELETE
  // =========================
  const openDelete = (course: any) => {
    setSelectedCourse(course);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCourse) return;

    try {
      setIsDeleting(true);

      await courseService.deleteCourse(selectedCourse.maKhoaHoc);

      alert("Xóa khóa học thành công!");

      setIsDeleteOpen(false);
      setSelectedCourse(null);

      fetchCourses();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data || "Xóa thất bại!");
    } finally {
      setIsDeleting(false);
    }
  };

  // =========================
  // EDIT
  // =========================
  const openEdit = (course: any) => {
    setSelectedCourse(course);
    setIsEditOpen(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl min-h-[70vh]">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Quản lý khóa học
          </h2>
          <p className="text-slate-400 text-sm">
            CRUD khóa học hệ thống
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">

          {/* SEARCH */}
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm khóa học..."
            className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-lg text-white w-full md:w-64"
          />

          {/* ADD */}
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-4 py-2 bg-cyan-500 text-black font-bold rounded-lg"
          >
            + Thêm
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto border border-slate-800 rounded-xl">

        <table className="w-full text-sm text-slate-300">

          <thead className="bg-slate-950 text-xs uppercase">
            <tr>
              <th className="p-3">STT</th>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Người tạo</th>
              <th>Views</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center p-10">
                  Loading...
                </td>
              </tr>
            ) : filteredCourses.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-10">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              filteredCourses.map((course, index) => (
                <tr key={course.maKhoaHoc} className="border-t border-slate-800">

                  <td className="text-center p-3">{index + 1}</td>

                  <td>
                    <img
                      src={course.hinhAnh}
                      className="w-12 h-12 rounded"
                    />
                  </td>

                  <td>
                    {course.tenKhoaHoc}
                  </td>

                  <td>
                    {course.nguoiTao?.taiKhoan || "N/A"}
                  </td>

                  <td className="text-center">
                    {course.luotXem}
                  </td>

                  <td>
                    <div className="flex gap-2 justify-center">

                      {/* EDIT */}
                      <button
                        onClick={() => openEdit(course)}
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => openDelete(course)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>

      {/* ================= MODALS ================= */}

      <AddCourse
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={fetchCourses}
      />

      <EditCourseModal
        isOpen={isEditOpen}
        course={selectedCourse}
        onClose={() => setIsEditOpen(false)}
        onSuccess={fetchCourses}
      />

      <DeleteCourseModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        courseName={selectedCourse?.tenKhoaHoc || ""}
        isDeleting={isDeleting}
      />

    </div>
  );
};

export default CourseManagement;