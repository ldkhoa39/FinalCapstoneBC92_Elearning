// src/routes/index.tsx

import { useRoutes } from "react-router-dom";

// Templates
import HomeTemplate from "../pages/HomeTemplate";

// Pages
import Home from "../pages/HomeTemplate/Home";
// import CourseCatalog from "../pages/HomeTemplate/CourseCatalog";
// import Detail from "../pages/HomeTemplate/Detail";
// import Login from "../pages/HomeTemplate/Auth/Login";
// import Register from "../pages/HomeTemplate/Auth/Register";
// import Profile from "../pages/HomeTemplate/Profile";

const Router = () => {
  const routes = useRoutes([
    // =========================
    // CLIENT ROUTES
    // =========================
    {
      path: "/",
      element: <HomeTemplate />,
      children: [
        // Home Page
        {
          index: true,
          element: <Home />,
        },

        // Course Category
        {
          path: "course-category/:id",
          // element: <CourseCatalog />,
        },

        // Course Detail
        {
          path: "detail/:id",
          // element: <Detail />,
        },

        // Auth
        {
          path: "login",
          // element: <Login />,
        },
        {
          path: "register",
          // element: <Register />,
        },

        // Profile
        {
          path: "profile",
          // element: <Profile />,
        },
      ],
    },

    // =========================
    // ADMIN ROUTES
    // =========================
    {
      path: "/admin",
      children: [
        {
          path: "user-management",
          element: (
            <div className="text-white p-10 text-center">
              Quản lý người dùng
            </div>
          ),
        },
        {
          path: "course-management",
          element: (
            <div className="text-white p-10 text-center">
              Quản lý khóa học
            </div>
          ),
        },
      ],
    },

    // =========================
    // 404 PAGE
    // =========================
    {
      path: "*",
      element: (
        <div className="min-h-screen flex items-center justify-center bg-main-bg text-main-text text-3xl font-bold">
          404 - Trang không tồn tại
        </div>
      ),
    },
  ]);

  return routes;
};

export default Router;