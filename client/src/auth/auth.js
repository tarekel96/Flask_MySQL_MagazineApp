import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export const RequireAuth = ({ children }) => {
	let navigate = useNavigate();
	let location = useLocation();
	const user = useUserContext()['user'];
	let isAuthenticated = user !== null && user !== undefined;
	return isAuthenticated ? children : <Navigate to="/" state={{ from: location }} replace={true} />;
};
