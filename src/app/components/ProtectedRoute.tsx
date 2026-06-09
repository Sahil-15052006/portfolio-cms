import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  return <AdminDashboard />;
}
