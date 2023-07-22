import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ allowedRoles }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const role = user?.user?.role_id;

  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : !user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
