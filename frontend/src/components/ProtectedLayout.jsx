import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || token === 'undefined' || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
