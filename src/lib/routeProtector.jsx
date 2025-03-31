import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

export const AdminRoute = ({ children }) => {
  const { user, getUserLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  if (getUserLoading) return <Loading />;

  if (user && user.role !== "admin" && !getUserLoading)
    return <Navigate to="/" />;
  if (!user && !getUserLoading && !isAuthenticated) return <Navigate to="/" />;
  if (!user && !getUserLoading) return <Navigate to="/" />;

  return <>{children}</>;
};

export const AuthRoute = ({ children }) => {
  const { user, getUserLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  if (getUserLoading) return <Loading />;

  if (user && user.role === "admin" && !getUserLoading)
    return <Navigate to="/admin/orders" />;

  if (user && !getUserLoading && isAuthenticated) return <Navigate to="/" />;

  return <>{children}</>;
};
