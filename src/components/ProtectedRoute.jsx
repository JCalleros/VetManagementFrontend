import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, redirectTo="/"}) => {
   
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        return <h1>Loading....</h1>;
    }
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />
    }

    return <Outlet />
}

export default ProtectedRoute