// src/routes/index.tsx
import { useRoutes } from "react-router-dom";

// Templates & Chốt chặn Bảo mật
import HomeTemplate from "../pages/HomeTemplate";
import AuthTemplate from "../pages/AuthTemplate";
import AdminTemplate from "../pages/AdminTemplate"; 
import AdminGuard from "../components/AdminGuard"; 

// Pages Client
import Home from "../pages/HomeTemplate/Home";
import Detail from "../pages/HomeTemplate/Detail";
import Login from "../pages/AuthTemplate/Auth/Login";
import Register from "../pages/AuthTemplate/Auth/Register";
import CourseCatalog from "../pages/HomeTemplate/CourseCatalog";
import Search from "../pages/HomeTemplate/_Components/Search";
import Profile from "../pages/HomeTemplate/Profile";

// Pages Admin (Thêm cụm import này)
// import Dashboard from "../pages/AdminTemplate/Dashboard";
import CourseManagement from "../pages/AdminTemplate/CourseManagement";
// import UserManagement from "../pages/AdminTemplate/UserManagement";

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
    // CLIENT AUTH ROUTES (Layout riêng cho Học viên đăng nhập/đăng ký)
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
    // ADMIN AUTH ROUTE (Hoàn toàn độc lập, giao diện Blank Layout)
    // ========================================================
    {
      path: "/admin/login",
      element: <AdminLogin />, // Đứng một mình, không bị vướng Sidebar hay Navbar bọc ngoài
    },

    // ========================================================
    // PROTECTED ADMIN ROUTES (Đã được bảo vệ nghiêm ngặt)
    // ========================================================
    {
      path: "/admin",
      element: (
        <AdminGuard>
          <AdminTemplate />
        </AdminGuard>
      ), // Chỉ khi AdminGuard mở cửa, AdminTemplate mới bắt đầu render layout
      children: [
        // Trang chính khi vừa vào /admin (Ví dụ: xem biểu đồ thống kê)
        // { index: true, element: <Dashboard /> },
        
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