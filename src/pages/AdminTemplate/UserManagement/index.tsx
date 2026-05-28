// src/pages/AdminTemplate/UserManagement/index.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { userServices } from '../../../services/userServices';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Gọi API lấy danh sách người dùng
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await userServices.getUserList(); // Giả định hàm lấy danh sách trong userServices 
      setUsers(res.data);
    } catch (error) {
      console.error('Lỗi lấy danh sách người dùng:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Bộ lọc tìm kiếm local theo Tên, Tài khoản hoặc Email
  const filteredUsers = users.filter(
    (user) =>
      user.hoTen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.taiKhoan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (taiKhoan: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản [${taiKhoan}] không?`)) {
      try {
        await userServices.deleteUser(taiKhoan);
        alert('Xóa người dùng thành công!');
        fetchUsers();
      } catch (error: any) {
        alert(error.response?.data || 'Xóa thất bại!');
      }
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl min-h-[70vh] animate-fade-in">
      
      {/* HEADER & TOOLBAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Quản lý Người Dùng</h2>
          <p className="text-sm text-slate-400 mt-1">Phân quyền, quản lý thông tin học viên và giáo vụ trên hệ thống.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1 md:w-64">
            <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
            <input
              type="text"
              placeholder="Tìm tên, tài khoản, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-sm text-slate-200 rounded-lg pl-10 pr-4 py-2.5 focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/40 outline-none transition-all"
            />
          </div>

          {/* Nút Thêm Thành Viên */}
          <button className="px-4 py-2.5 bg-gradient-to-r from-primary-blue to-accent-cyan text-[#020617] text-sm font-bold rounded-lg shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all whitespace-nowrap">
            <i className="fa fa-user-plus mr-2"></i> Thêm Người Dùng
          </button>
        </div>
      </div>

      {/* TABLE DATA */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950 text-slate-300 uppercase font-semibold text-xs border-b border-slate-800">
            <tr>
              <th className="px-4 py-4 w-16 text-center">STT</th>
              <th className="px-4 py-4">Tài khoản</th>
              <th className="px-4 py-4">Họ và tên</th>
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4 w-32 text-center">Loại người dùng</th>
              <th className="px-4 py-4 w-32 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <i className="fa fa-circle-notch fa-spin text-accent-cyan text-3xl"></i>
                  <p className="mt-2 text-slate-500">Đang tải danh sách người dùng...</p>
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-slate-500">
                  {searchTerm ? 'Không tìm thấy kết quả phù hợp.' : 'Hệ thống chưa có người dùng nào.'}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user.taiKhoan} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-4 py-4 text-center font-medium">{index + 1}</td>
                  <td className="px-4 py-4 font-semibold text-accent-cyan">{user.taiKhoan}</td>
                  <td className="px-4 py-4 font-bold text-slate-200">{user.hoTen}</td>
                  <td className="px-4 py-4 text-slate-300">{user.email}</td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        user.maLoaiNguoiDung === 'GV' || user.maLoaiNguoiDung === 'QuanTri'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {user.maLoaiNguoiDung === 'GV' || user.maLoaiNguoiDung === 'QuanTri' ? 'Quản trị / GV' : 'Học viên'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="Sửa" className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center">
                        <i className="fa fa-edit"></i>
                      </button>
                      <button onClick={() => handleDeleteUser(user.taiKhoan)} title="Xóa" className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center">
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
    </div>
  );
};

export default UserManagement;