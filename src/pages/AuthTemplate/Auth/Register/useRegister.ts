import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "./validationt";
import { userService } from "../../../../services/userServices";

export const useRegister = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maNhom: "GP01",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await userService.register(values);
        alert("Đăng ký thành công! Đang chuyển hướng sang trang đăng nhập...");
        navigate("/login");
      } catch (err: any) {
        alert(err.response?.data?.content || "Đăng ký thất bại");
      }
    },
  });

  return { formik };
};