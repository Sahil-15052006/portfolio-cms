import { Outlet } from 'react-router';
import { AuthProvider } from '../context/AuthContext';
import { PortfolioProvider } from '../context/PortfolioContext';

export default function Root() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Outlet />
      </PortfolioProvider>
    </AuthProvider>
  );
}
