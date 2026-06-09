import { createBrowserRouter, Navigate } from "react-router";
import Root from "./components/Root";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "admin",
        Component: ProtectedRoute,
      },
      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);
