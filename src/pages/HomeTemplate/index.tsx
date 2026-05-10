import { Outlet } from "react-router-dom";
import Header from "./_Components/Header"; 
import Footer from "./_Components/Footer"; 


const HomeTemplate = () => {
  return (
    <div>
      <Header /> 
      
      <main>
        <Outlet /> 
      </main>

      <Footer/>
    </div>
  );
};

export default HomeTemplate;