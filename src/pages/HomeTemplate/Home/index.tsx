// src/Pages/HomeTemplate/Home/index.tsx
import React from "react";
import Hero from "./Hero";
import CourseList from "../_Components/courses/CourseList";

const Home: React.FC = () => {
  return (
    <main className="bg-[#020617] min-h-screen">

      <Hero />

      <section 
        aria-label="Danh sách khóa học phổ biến" 
        className="max-w-screen-xl mx-auto px-4 py-16"
      >

        <div className="mb-12">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm font-semibold mb-3">
            E-Learning Platform
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-extrabold">
            Khóa học phổ biến
          </h2>
          <div className="w-24 h-1 mt-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
        </div>

        <CourseList />
      </section>
    </main>
  );
};

export default Home;