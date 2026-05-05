import { Navigate } from "react-router-dom";

export default function CustomerRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.venueManager) {
    return <Navigate to="/manager" replace />;
  }

  return children;
}