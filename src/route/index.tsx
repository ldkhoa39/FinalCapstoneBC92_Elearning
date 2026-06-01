// src/routes/index.tsx

import { useRoutes } from "react-router-dom";

import HomeTemplate from "../pages/HomeTemplate";
import AuthTemplate from "../pages/AuthTemplate";
import AdminTemplate from "../pages/AdminTemplate";

import AdminGuard from "../components/AdminGuard";

import Home from "../pages/HomeTemplate/Home";
import Detail from "../pages/HomeTemplate/Detail";
import CourseCatalog from "../pages/HomeTemplate/CourseCatalog";
import Search from "../pages/HomeTemplate/Search.tsx";
import Profile from "../pages/HomeTemplate/Profile";

import Login from "../pages/AuthTemplate/Auth/Login";
import Register from "../pages/AuthTemplate/Auth/Register";

import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../pages/AdminTemplate/Dashboard";
import UserManagement from "../pages/AdminTemplate/UserManagement";
import CourseManagement from "../pages/AdminTemplate/CourseManagement";
import AdminProfile from "../pages/AdminTemplate/_components/AdminLayout/AdminProfile";

const Router = () => {
  return useRoutes([
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

    {
      path: "/",
      element: <AuthTemplate />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },

    {
      path: "/admin/login",
      element: <AdminLogin />,
    },

    {
      path: "/admin",
      element: (
        <AdminGuard>
          <AdminTemplate />
        </AdminGuard>
      ),
      children: [
        { index: true, element: <Dashboard /> }, // mặc định
        { path: "dashboard", element: <Dashboard /> },
        { path: "user-management", element: <UserManagement /> },
        { path: "course-management", element: <CourseManagement /> },
        { path: "profile", element: <AdminProfile /> },
      ],
    },

    {
      path: "*",
      element: (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-3xl font-bold text-white">
          404 - Trang không tồn tại
        </div>
      ),
    },
  ]);
};

export default Router;