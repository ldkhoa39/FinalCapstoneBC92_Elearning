import React, { useState, useEffect } from "react";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="
        w-10 h-10 rounded-xl transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-500/50
        bg-slate-200 text-slate-500 hover:bg-slate-300
        dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white
      "
    >
      {isDarkMode ? (
        <i className="fa fa-sun text-yellow-400 text-lg" />
      ) : (
        <i className="fa fa-moon text-lg" />
      )}
    </button>
  );
};

export default DarkModeToggle;