import { Outlet } from "react-router-dom";
import Header from "./_Components/Header"; 
import Footer from "./_Components/Footer"; 

const HomeTemplate = () => {
  return (
    <div className="bg-main-bg min-h-screen flex flex-col">
      <Header /> 
      
      <main className="flex-grow">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
};

export default HomeTemplate;