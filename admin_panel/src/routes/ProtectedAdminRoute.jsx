import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../lib/authStore";

export default function ProtectedAdminRoute() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.accessToken);

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
