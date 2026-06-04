import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CustomerRoute({ children }) {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.venueManager) {
    return <Navigate to="/manager" replace />;
  }

  return children;
}
