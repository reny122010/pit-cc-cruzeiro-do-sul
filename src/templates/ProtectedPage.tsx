import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedPage() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
