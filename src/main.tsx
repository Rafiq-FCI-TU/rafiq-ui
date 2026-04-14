import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Assessment from "./pages/Assessment.tsx";
import Sessions from "./pages/Sessions.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Session from "./pages/Session.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import PublicRoute from "./routes/PublicRoute.tsx";
import AppLayout from "./layouts/AppLayout.tsx";
import Specialist from "./pages/Specialist.tsx";
import SpecialistDetails from "./pages/SpecialistDetails.tsx";
import AIAssistant from "./pages/AIAssistant.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Patients from "./pages/Patients.tsx";

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
          { path: "dashboard", element: <Dashboard /> },
          {
            path: "sessions",
            element: <Sessions />,
          },
          {
            path: "sessions/:sessionId",
            element: <Session />,
          },
          { path: "specialist", element: <Specialist /> },
          { path: "specialist/:specialistId", element: <SpecialistDetails /> },
          { path: "patients", element: <Patients /> },
          { path: "ai-assistant", element: <AIAssistant /> },
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
