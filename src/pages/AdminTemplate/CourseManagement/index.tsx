import React, { useState, useEffect, useCallback } from "react";
import { courseService } from "../../../services/courseService";

import DeleteCourseModal from "../_components/CourseManagements/DeleteCourse";
import AddCourse from "../_components/CourseManagements/AddCourseModal";
import EditCourseModal from "../_components/CourseManagements/EditCourseModal";

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await courseService.getCourseList();
      setCourses(res.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const filteredCourses = courses.filter((c) =>
    `${c.tenKhoaHoc} ${c.maKhoaHoc}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const openDelete = (course: any) => {
    setSelectedCourse(course);
    setIsDeleteOpen(true);
  };

  const openEdit = (course: any) => {
    setSelectedCourse(course);
    setIsEditOpen(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl min-h-[70vh]">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Quản lý khóa học
          </h2>
          <p className="text-slate-400 text-sm">
            CRUD khóa học hệ thống
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm khóa học..."
            className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-white w-full md:w-64 text-sm"
          />

          <button
            onClick={() => setIsAddOpen(true)}
            className="px-3 md:px-4 py-2 bg-cyan-500 text-black font-bold rounded-lg text-sm whitespace-nowrap"
          >
            + Thêm
          </button>
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto border border-slate-800 rounded-xl">
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
                      className="w-10 h-10 rounded object-cover"
                    />
                  </td>

                  <td className="max-w-[200px] truncate">
                    {course.tenKhoaHoc}
                  </td>

                  <td>{course.nguoiTao?.taiKhoan || "N/A"}</td>

                  <td className="text-center">{course.luotXem}</td>

                  <td>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => openEdit(course)}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => openDelete(course)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs"
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

      {/* ================= MOBILE CARD ================= */}
      <div className="md:hidden space-y-3">
        {filteredCourses.map((course) => (
          <div
            key={course.maKhoaHoc}
            className="bg-slate-950 border border-slate-800 rounded-xl p-4"
          >
            <div className="flex gap-3">
              <img
                src={course.hinhAnh}
                className="w-14 h-14 rounded object-cover"
              />

              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm line-clamp-2">
                  {course.tenKhoaHoc}
                </h3>

                <p className="text-slate-400 text-xs mt-1">
                  {course.nguoiTao?.taiKhoan || "N/A"}
                </p>

                <p className="text-slate-500 text-xs">
                  Views: {course.luotXem}
                </p>
              </div>
            </div>

            {/* ACTION */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => openEdit(course)}
                className="flex-1 py-2 bg-blue-500 text-white rounded text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => openDelete(course)}
                className="flex-1 py-2 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODALS */}
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
        onConfirm={async () => {
          if (!selectedCourse) return;
          setIsDeleting(true);
          await courseService.deleteCourse(selectedCourse.maKhoaHoc);
          setIsDeleting(false);
          setIsDeleteOpen(false);
          fetchCourses();
        }}
        courseName={selectedCourse?.tenKhoaHoc || ""}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default CourseManagement;