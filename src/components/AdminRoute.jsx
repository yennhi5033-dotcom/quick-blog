import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  // Tạo biến role lấy từ key localStorage = user filed role
  const user = localStorage.getItem("user");
  const role = JSON.parse(user).role;

  if (!token) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AdminRoute;
