import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppSelector } from "../../hooks/utils/redux";

const AdminProtected = () => {
  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);

  const cookieRole = Cookies.get("role");
  const hasUser = Cookies.get("userDetails");

  console.log("Admin Check:", {
    reduxUser: user?.email,
    cookieRole,
    auth: cookieRole === "admin",
  });

  if (cookieRole === "admin" && hasUser) {
    return <Outlet />;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminProtected;
