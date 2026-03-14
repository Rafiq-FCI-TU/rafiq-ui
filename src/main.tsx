import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Assessment from "./pages/Assessment.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Sessions from "./pages/Sessions.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Session from "./pages/Session.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import PublicRoute from "./routes/PublicRoute.tsx";
import AppLayout from "./layouts/AppLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ),
      },
      {
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <h1>dashboard</h1> },
          {
            path: "sessions",
            element: <Sessions />,
          },
          {
            path: "sessions/:sessionId",
            element: <Session />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/forgotPassword",
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/assessment",
    element: (
      <ProtectedRoute>
        <Assessment />
      </ProtectedRoute>
    ),
  },
]);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={"Client_Id"}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
