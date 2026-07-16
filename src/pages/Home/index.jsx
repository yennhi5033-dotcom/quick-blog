import React, { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { SearchSection } from "@/components/SearchSection";
import { BlogSection } from "@/components/BlogSection";
import {getPosts} from "@/services/postServices";

export const Home = () => {
const [posts, setPosts] = useState([]);
// useEffect call api getPosts using try catch
useEffect(() => {
  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.items);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();
}, []);

  const [searchTerm, setSearchTerm] = useState("");
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
//
<BlogSection posts={filteredBlogPosts} />;
  return (
    <div
     className="flex min-h-screen flex-col bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50"
    >
      <div className="sticky top-0 z-30 border-b border-transparent bg-white/90 backdrop-blur dark:bg-slate-950/90">
      </div>
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
          {/* if posts > 0 */}
          {posts.length > 0 ? (
            <BlogSection posts={posts} />
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};
