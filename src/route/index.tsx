import { useRoutes } from "react-router-dom";
// Import Templates
// import HomeTemplate from "../Pages/HomeTemplate";
// import AdminTemplate from "../Pages/AdminTemplate";

// Import Pages (Tạm thời bạn có thể tạo các file dummy để test)
// import Home from "../Pages/HomeTemplate/Home";
// import Login from "../Pages/HomeTemplate/Login";
// import UserManagement from "../Pages/AdminTemplate/UserManagement";

const Router = () => {
  const routes = useRoutes([
    // Luồng cho Client (Người dùng/Học viên)
    {
      path: "",
      // element: <HomeTemplate />, 
      children: [
        {
          path: "/",
          element: <div>Trang Chủ (Home)</div>, // Sau này thay bằng component <Home />
        },
        {
          path: "/course-category/:id",
          element: <div>Danh mục khóa học</div>,
        },
        {
          path: "/detail/:id",
          element: <div>Chi tiết khóa học</div>,
        },
        {
          path: "/login",
          element: <div>Trang Đăng Nhập</div>,
        },
      ],
    },

    // Luồng cho Quản trị viên (Admin)
    {
      path: "/admin",
      // element: <AdminTemplate />,
      children: [
        {
          path: "user-management",
          element: <div>Quản lý người dùng</div>,
        },
        {
          path: "course-management",
          element: <div>Quản lý khóa học</div>,
        },
      ],
    },

    // Route cho các trường hợp không tìm thấy trang (404)
    {
      path: "*",
      element: <div>Trang này không tồn tại - 404</div>,
    },
  ]);

  return routes;
};

export default Router;