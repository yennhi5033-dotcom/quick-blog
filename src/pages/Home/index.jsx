import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SearchSection } from "@/components/SearchSection";
import { Footer } from "@/components/Footer";
import { BlogSection } from "@/components/BlogSection";
export const Home = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredBlogPosts, setFilteredBlogPosts] = useState([]);
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

  // Dùng danh sách đã lọc để render ra giao diện
  const handleSearch = () => {
    // Lọc blog posts theo từ khóa
    const filtered = blogPosts.filter((post) => {
      const keyword = searchTerm.trim().toLowerCase();
      if (!keyword) return true;
      return (
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword)
      );
    });
    setFilteredBlogPosts(filtered);
  };

  return (
    <div
      className="min-h-screen
    bg-white dark:bg-slate-900
    text-gray-900 dark:text-slate-100
    font-sans
    transition-colors duration-300"
    >
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-9 sm:px-6 lg:pt-10">
          <div className="mx-auto max-w-3xl text-center">
            <HeroSection />
            <SearchSection
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
            />
          </div>
          <BlogSection  posts={filteredBlogPosts} />
          <Footer />
        </div>
      </div>
    </div>
  );
};
