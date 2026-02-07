import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../common/Loader';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loader text="Loading..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
