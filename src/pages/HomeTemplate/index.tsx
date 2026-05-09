import { Outlet } from "react-router-dom";
import Header from "./_Components/Header";
import Footer from "./_Components/Footer";

const HomeTemplate = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header dùng chung cho toàn bộ trang học viên */}
      <Header />

      {/* Main content: Nơi các trang con (Home, Detail...) hiển thị */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer dùng chung */}
      <Footer />
    </div>
  );
};

export default HomeTemplate;