import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function RequireAuth({ children }) {

  const { user, loading } = useAuth();
  console.log(user);

  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
