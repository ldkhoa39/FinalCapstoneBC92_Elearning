import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSchema } from "./validation";
import { userService } from "../../../../services/userServices";
import { setUserLogin } from "../../../../store/slices/authSlice";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await userService.login(values);
        // Lưu vào Redux store và localStorage đúng như logic gốc của Khoa
        dispatch(setUserLogin(res.data));
        alert("Đăng nhập thành công!");
        navigate("/"); 
      } catch (err: any) {
        alert(err.response?.data?.content || "Đăng nhập thất bại");
      }
    },
  });

  return { formik };
};