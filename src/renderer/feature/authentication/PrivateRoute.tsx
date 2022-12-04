import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthSelector } from '../../store/auth';

interface PropsPrivateRoute {
  children: any;
}

function PrivateRoute({ children }: PropsPrivateRoute) {
  const isAuth = useSelector(isAuthSelector);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
