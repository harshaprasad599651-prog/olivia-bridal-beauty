import { Navigate } from "react-router-dom";

function CustomerProtectedRoute({ children }) {
  const token = localStorage.getItem("customerToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default CustomerProtectedRoute;