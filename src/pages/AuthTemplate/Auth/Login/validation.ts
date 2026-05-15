import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  taiKhoan: Yup.string().required("Vui lòng nhập tài khoản!"),
  matKhau: Yup.string().required("Vui lòng nhập mật khẩu!"),
});