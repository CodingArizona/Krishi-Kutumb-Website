import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { ROUTES } from "../../routes/routeConfig";

// ─── Protects any route that needs login ──────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn, isLoading } = useAuthStore();

  // ── Still loading ──
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-fpo-cream">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-12 h-12 border-4 border-fpo-green border-t-transparent
                          rounded-full animate-spin"
          />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // ── Not logged in → Login page ──
  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
