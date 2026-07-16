import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import  {Home}  from "./pages/Home"
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { BlogDetails } from "./pages/BlogDetails";
import { MyPosts } from "./pages/MyPosts";
import { CreateBlog } from "./pages/CreateBlog";
import Layout  from "./components/Layout";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
            {/* dùng layout cho home và blog details */}
            <Route
              path="/home"
              element={<Layout><Home /></Layout>}
            />
            <Route path="/posts/:id" element={<Layout><BlogDetails  /></Layout>} />
            <Route path="/myposts" element={<Layout><MyPosts /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Layout><CreateBlog /></Layout>} />

            <Route path="/signup" element={<Signup />} />

          </Routes>
        </BrowserRouter>
        </>
  )
}

export default App
