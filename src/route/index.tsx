// src/routes/index.tsx
import { useRoutes } from "react-router-dom";

// Templates
import HomeTemplate from "../pages/HomeTemplate";
import AuthTemplate from "../pages/AuthTemplate"; // Import Template mới

// Pages
import Home from "../pages/HomeTemplate/Home";
import Detail from "../pages/HomeTemplate/Detail";
import Login from "../pages/AuthTemplate/Auth/Login"; // Đường dẫn theo cấu trúc mới
import Register  from "../pages/AuthTemplate/Auth/Register";
// import CourseCatalog from "../pages/HomeTemplate/CourseCatalog";
// import Profile from "../pages/HomeTemplate/Profile";

const Router = () => {
  const routes = useRoutes([
    // ========================================================
    // CLIENT ROUTES (Có Header & Footer của HomeTemplate)
    // ========================================================
    {
      path: "/",
      element: <HomeTemplate />,
      children: [
        { index: true, element: <Home /> },
        { path: "detail/:id", element: <Detail /> },
        
        // { path: "course-category/:id", element: <CourseCatalog /> },
        // { path: "profile", element: <Profile /> },
      ],
    },

    // ========================================================
    // AUTH ROUTES (Layout riêng, không vướng Header/Footer trang Home)
    // ========================================================
    {
      path: "/", // Để path là "/" hoặc "/auth" tùy Khoa, nhưng element là AuthTemplate
      element: <AuthTemplate />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },

    // ========================================================
    // ADMIN ROUTES
    // ========================================================
    {
      path: "/admin",
      // element: <AdminTemplate />, // Sau này Khoa bọc AdminTemplate vào đây
      children: [
        {
          path: "user-management",
          element: <div className="text-white p-10 text-center">Quản lý người dùng</div>,
        },
        {
          path: "course-management",
          element: <div className="text-white p-10 text-center">Quản lý khóa học</div>,
        },
      ],
    },

    // =========================
    // 404 PAGE
    // =========================
    {
      path: "*",
      element: (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-3xl font-bold">
          404 - Trang không tồn tại
        </div>
      ),
    },
  ]);

  return routes;
};

export default Router;