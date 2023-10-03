import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HomeLayout = () => {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};
