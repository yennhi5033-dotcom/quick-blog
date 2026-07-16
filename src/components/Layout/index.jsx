import { Header } from "../Header";
import { Footer } from "../Footer";
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  //useState quản lý isDarkMode, mặc định lấy từ localStorage
    const [isDarkMode, setIsDarkMode] = useState(() => {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode ? savedMode === "true" : false;
    });
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      // Lưu chế độ sáng/tối vào localStorage
      localStorage.setItem("darkMode", !isDarkMode);
    };
    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, [isDarkMode]);
    // Ghi nhớ chế độ sáng/tối
    useEffect(() => {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode) {
        setIsDarkMode(savedMode === "true");
      }
    }, []);
  
  return (
    <>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">{children}</main>
      <Footer isDarkMode={isDarkMode} />
    </>
  );
};

export default Layout;
