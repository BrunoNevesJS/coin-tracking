import { Navigate, Outlet } from 'react-router-dom';

export const SignInRoutesTemplate = (): JSX.Element => {
  const auth = localStorage.getItem('@auth');

  return auth ? <Outlet /> : <Navigate to="/register" />;
}
