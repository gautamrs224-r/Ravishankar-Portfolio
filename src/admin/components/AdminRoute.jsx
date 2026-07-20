import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext.jsx";

/**
 * AdminRoute
 * Wraps any admin page. If the token check is still loading, shows a spinner.
 * If not logged in, redirects to /admin (the login page).
 */
export default function AdminRoute({ children }) {
  const { isLoggedIn, loading } = useAdmin();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return isLoggedIn ? children : <Navigate to="/admin" replace />;
}
