import React, { useState } from "react";
import { userService } from "../../../services/userServices";

interface DeleteUserBtnProps {
  taiKhoan: string;
  onSuccess: () => void; 
}

const DeleteUserBtn: React.FC<DeleteUserBtnProps> = ({ taiKhoan, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false); 

  const handleDelete = async () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${taiKhoan}" không? Hành động này không thể hoàn tác.`)) {
      try {
        setIsDeleting(true);

        await userService.deleteUser(taiKhoan);
        
        alert("Xóa người dùng thành công! 🎉");
        onSuccess();
        
      } catch (err: any) {
        console.error("Delete user error:", err);
        const errorResponse = err.response?.data;
        const errorMsg = typeof errorResponse === "string" ? errorResponse : "Xóa người dùng thất bại! Vui lòng kiểm tra lại.";
        alert(errorMsg);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      title="Xóa người dùng"
      className="w-7 h-7 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? (
        <i className="fa fa-circle-notch fa-spin text-xs"></i> 
      ) : (
        <i className="fa fa-trash text-xs"></i> 
      )}
    </button>
  );
};

export default DeleteUserBtn;