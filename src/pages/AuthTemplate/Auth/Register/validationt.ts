import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  taiKhoan: Yup.string().required("Tài khoản không được để trống!"),
  
  // GỘP CHUNG TẤT CẢ ĐIỀU KIỆN ĐỂ SHOW HẾT RA 1 LẦN
  matKhau: Yup.string()
    .required("Mật khẩu không được để trống!")
    .test(
      "password-strength",
      "Mật khẩu phải đảm bảo các điều kiện sau:\n• Từ 6 ký tự trở lên\n• Có ít nhất 1 chữ thường\n• Có ít nhất 1 chữ hoa\n• Có ít nhất 1 chữ số\n• Có ít nhất 1 ký tự đặc biệt (@, $, !, %, *, ?, &)",
      (value) => {
        if (!value) return false;
        
        // Kiểm tra từng điều kiện một
        const hasMinLength = value.length >= 6;
        const hasLowerCase = /[a-z]/.test(value);
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[@$!%*?&]/.test(value);
        
        // Chỉ khi thỏa mãn TẤT CẢ thì mới trả về true (hết lỗi)
        return hasMinLength && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;
      }
    ),

  hoTen: Yup.string().required("Họ tên không được để trống!"),
  
  email: Yup.string()
    .email("Email không đúng định dạng (Ví dụ: ten_bạn@gmail.com)!")
    .required("Email không được để trống!"),
    
  soDT: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số!")
    .min(10, "Số điện thoại phải có ít nhất 10 số!")
    .required("Số điện thoại không được để trống!"),
});