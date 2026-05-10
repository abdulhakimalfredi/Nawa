import { Navigate, Outlet } from 'react-router-dom';

const ManagerProtectedLayout = () => {
  const token = localStorage.getItem('token');
  const userRaw = localStorage.getItem('user');

  if (!token || token === 'undefined' || !userRaw) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userRaw);
    if (user.role !== 'manager') {
      return <Navigate to="/home" replace />;
    }
  } catch {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ManagerProtectedLayout;
