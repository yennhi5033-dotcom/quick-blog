import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { BlogDetails } from "./pages/BlogDetails";
import { MyPosts } from "./pages/MyPosts";
import { CreateBlog } from "./pages/CreateBlog";
import { UserManagement } from "./pages/UserManagement";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/posts/:id" element={<Layout><BlogDetails /></Layout>} />
          <Route path="/myposts" element={<Layout><MyPosts /></Layout>} />
          <Route path="/create" element={<Layout><CreateBlog /></Layout>} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/users" element={<Layout><UserManagement /></Layout>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
