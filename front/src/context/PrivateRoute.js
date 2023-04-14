import { useContext } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { AuthContext } from '../helpers/authContext';
import { getToken } from '../helpers/usuario';

function PrivateRoutes() {
  const { auth } = useContext(AuthContext);
  const token = getToken();
  
  return (
    token ? <Outlet /> : <Navigate to="/login" />
  );
}

export default PrivateRoutes;
