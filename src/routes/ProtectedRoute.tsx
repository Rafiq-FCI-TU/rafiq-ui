import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 backdrop-blur-sm">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-200 border-solid rounded-full"></div>
          <div className="absolute top-0 w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-slate-600 font-semibold tracking-wide animate-pulse">
          Verifying session...
        </p>
      </div>
    );
  }

  if (!user?.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
