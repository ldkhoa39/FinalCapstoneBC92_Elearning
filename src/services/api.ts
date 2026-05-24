import axios from "axios";

const api = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api/",
});

api.interceptors.request.use((config) => {
  config.headers["TokenCybersoft"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MiIsIkhldEhhblN0cmluZyI6IjE5LzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTc3NjAwMDAwMCIsIm5iZiI6MTc2MTMyNTIwMCwiZXhwIjoxNzg5OTIzNjAwfQ.ArBHlkISJbOimRkNdscBYDKzIqhCxv2DkUsGJh3zRLY";

  return config;
});

api.interceptors.request.use(
  (config) => {
    // 1. Lên LocalStorage tìm xem có userLogin không
    const userLocal = localStorage.getItem("userLogin");
    
    if (userLocal) {
      // 2. Parse chuỗi JSON thành object
      const user = JSON.parse(userLocal);
      
      // 3. Lấy accessToken và gắn vào Header Authorization
      // (Khoa check lại xem trong object user của bạn là accessToken hay mã token nhé, thường là accessToken)
      if (user.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
