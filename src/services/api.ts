import axios from "axios";

const api = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api/",
});

api.interceptors.request.use((config) => {
  config.headers["TokenCybersoft"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MiIsIkhldEhhblN0cmluZyI6IjE5LzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTc3NjAwMDAwMCIsIm5iZiI6MTc2MTMyNTIwMCwiZXhwIjoxNzg5OTIzNjAwfQ.ArBHlkISJbOimRkNdscBYDKzIqhCxv2DkUsGJh3zRLY";

  return config;
});

export default api;
