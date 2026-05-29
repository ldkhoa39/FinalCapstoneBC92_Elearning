import React, { useState, useEffect, useCallback, useMemo } from "react";
import { userService } from "../../../services/userServices";
import type { User } from "../../../type";
import AddUserModal from "../_components/AddUserModal";
import SearchInput from "../_components/UserSearch";
import DeleteUserBtn from "../_components/UserDelete";
import EditUserModal from "../_components/UserEdit";

const PAGE_SIZE = 10;

const normalizeText = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userEditing, setUserEditing] = useState<User | null>(null);

  // Chỉ fetch dữ liệu khi cần
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await userService.getUserList();
      setUsers(res.data || []);
    } catch (error) {
      console.error("Fetch users error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter dữ liệu
  const filteredUsers = useMemo(() => {
    if (!keyword.trim()) return users;

    const keywords = normalizeText(keyword).split(" ");

    return users.filter((user) => {
      const hoTen = normalizeText(user.hoTen || "");
      const taiKhoan = normalizeText(user.taiKhoan || "");

      return keywords.every((k) => hoTen.includes(k) || taiKhoan.includes(k));
    });
  }, [users, keyword]);

  // Tổng số trang
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  // Dữ liệu phân trang
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredUsers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredUsers, currentPage]);

  const handleSearch = useCallback((value: string) => {
    setKeyword(value);
    setCurrentPage(1);
  }, []);

  const handleEdit = useCallback((user: User) => {
    setUserEditing(user);
    setIsEditOpen(true);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl min-h-[70vh] animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            Quản lý Người Dùng
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Quản lý danh sách học viên và giáo viên trên hệ thống.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <SearchInput
            onSearch={handleSearch}
            placeholder="Tìm tài khoản hoặc họ tên người dùng..."
          />

          <button
            onClick={() => setIsAddOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 bg-cyan-500 text-black text-sm font-bold rounded-lg shadow-lg hover:bg-cyan-400 transition-all whitespace-nowrap"
          >
            + Thêm Người Dùng
          </button>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950 text-slate-300 uppercase font-semibold text-[10px] border-b border-slate-800">
            <tr>
              <th className="px-4 py-4 w-12 text-center">STT</th>
              <th className="px-4 py-4">Tài Khoản</th>
              <th className="px-4 py-4">Họ Tên</th>
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4">Số ĐT</th>
              <th className="px-4 py-4 text-center">Vai Trò</th>
              <th className="px-4 py-4 text-center">Thao Tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center py-10">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-cyan-500 text-2xl animate-spin">
                      ⏳
                    </span>
                    <span className="text-slate-500 text-xs">
                      Đang tải dữ liệu...
                    </span>
                  </div>
                </td>
              </tr>
            ) : paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-500">
                  {keyword
                    ? `Không tìm thấy kết quả nào cho "${keyword}"`
                    : "Không có dữ liệu phù hợp."}
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user, index) => (
                <tr
                  key={user.taiKhoan}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-4 py-4 text-center font-medium">
                    {(currentPage - 1) * PAGE_SIZE + index + 1}
                  </td>

                  <td className="px-4 py-4 font-bold text-slate-200">
                    {user.taiKhoan}
                  </td>

                  <td className="px-4 py-4">{user.hoTen}</td>

                  <td className="px-4 py-4 text-xs">{user.email}</td>

                  <td className="px-4 py-4 text-xs">{user.soDT || (user as any).soDt}</td>

                  <td className="px-4 py-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        user.maLoaiNguoiDung === "GV"
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          : "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20"
                      }`}
                    >
                      {user.maLoaiNguoiDung === "GV" ? "GIÁO VIÊN" : "HỌC VIÊN"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="w-7 h-7 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center"
                      >
                        <i className="fa fa-edit text-xs"></i>
                      </button>

                      <DeleteUserBtn
                        taiKhoan={user.taiKhoan}
                        onSuccess={fetchUsers}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          <div className="text-center py-10 text-slate-400">
            Đang tải dữ liệu...
          </div>
        ) : paginatedUsers.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            {keyword
              ? `Không tìm thấy kết quả nào cho "${keyword}"`
              : "Không có dữ liệu phù hợp."}
          </div>
        ) : (
          paginatedUsers.map((user, index) => (
            <div
              key={user.taiKhoan}
              className="bg-slate-800/40 border border-slate-700 rounded-xl p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-cyan-400 text-xs font-bold">
                    #{(currentPage - 1) * PAGE_SIZE + index + 1}
                  </p>

                  <h3 className="text-white font-semibold">{user.hoTen}</h3>

                  <p className="text-slate-400 text-xs">{user.taiKhoan}</p>
                </div>

                <span
                  className={`px-2 py-1 rounded text-[10px] font-bold ${
                    user.maLoaiNguoiDung === "GV"
                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      : "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20"
                  }`}
                >
                  {user.maLoaiNguoiDung === "GV" ? "GIÁO VIÊN" : "HỌC VIÊN"}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500">Email:</span>{" "}
                  <span className="text-slate-300 break-all">{user.email}</span>
                </div>

                <div>
                    <span className="text-slate-500">SĐT:</span>{" "}
                    <span className="text-slate-300">{user.soDT || (user as any).soDt}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="w-8 h-8 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center"
                >
                  <i className="fa fa-edit text-xs"></i>
                </button>

                <DeleteUserBtn
                  taiKhoan={user.taiKhoan}
                  onSuccess={fetchUsers}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-8">
        <button
          disabled={currentPage === 1 || isLoading}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="w-full sm:w-auto px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 disabled:opacity-30 transition-all"
        >
          Trang trước
        </button>

        <span className="text-slate-400 text-xs font-medium">
          Trang <span className="text-cyan-500">{currentPage}</span> /{" "}
          {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages || isLoading}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="w-full sm:w-auto px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 disabled:opacity-30 transition-all"
        >
          Trang sau
        </button>
      </div>

      <AddUserModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={fetchUsers}
      />

      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={fetchUsers}
        user={userEditing}
      />
    </div>
  );
};

export default UserManagement;
