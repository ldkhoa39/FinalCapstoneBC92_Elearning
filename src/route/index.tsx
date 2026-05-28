// src/routes/index.tsx
import { useRoutes } from "react-router-dom";

// Templates
import HomeTemplate from "../pages/HomeTemplate";
import AuthTemplate from "../pages/AuthTemplate";
import AdminTemplate from "../pages/AdminTemplate"; // Thêm dòng này

// Pages Client
import Home from "../pages/HomeTemplate/Home";
import Detail from "../pages/HomeTemplate/Detail";
import Login from "../pages/AuthTemplate/Auth/Login";
import Register from "../pages/AuthTemplate/Auth/Register";
import CourseCatalog from "../pages/HomeTemplate/CourseCatalog";
import Search from "../pages/HomeTemplate/_Components/Search";
import Profile from "../pages/HomeTemplate/Profile";

// Pages Admin (Thêm cụm import này)
import Dashboard from "../pages/AdminTemplate/Dashboard";
import CourseManagement from "../pages/AdminTemplate/CourseManagement";
import UserManagement from "../pages/AdminTemplate/UserManagement";

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
        { path: "course-category/:maDanhMuc", element: <CourseCatalog /> },
        { path: "profile", element: <Profile /> },
        { path: "search", element: <Search /> },
      ],
    },

    // ========================================================
    // AUTH ROUTES (Layout riêng, không vướng Header/Footer trang Home)
    // ========================================================
    {
      path: "/", 
      element: <AuthTemplate />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },

    // ========================================================
    // ADMIN ROUTES (Đã lên đồ chuẩn chỉnh)
    // ========================================================
    {
      path: "/admin",
      element: <AdminTemplate />, // Đã kích hoạt layout tổng AdminTemplate ở đây
      children: [
        // Trang chính khi vừa vào /admin (Ví dụ: xem biểu đồ thống kê)
        { index: true, element: <Dashboard /> },
        
        // Trang quản lý người dùng: /admin/user-management
        {
          path: "user-management",
          element: <UserManagement />,
        },
        
        // Trang quản lý khóa học: /admin/course-management
        {
          path: "course-management",
          element: <CourseManagement />,
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