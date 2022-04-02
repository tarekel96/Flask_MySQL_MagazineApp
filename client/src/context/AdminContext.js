import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupLocalStorage } from '../auth/auth';

const AdminContext = createContext(null);
export const useAuthContext = () => {
	return useContext(AdminContext);
};

export const AuthProvider = ({ children }) => {
	let navigate = useNavigate();

	const [ isAdmin, setIsAdmin ] = useState(false);

	const authenticateAdmin = useCallback(() => {
		console.log('here');
		localStorage.clear();
		setIsAdmin(true);
		setupLocalStorage('auth');
	}, []);

	const logoutAuth = useCallback(
		() => {
			setIsAdmin(false);
			localStorage.clear();
			return navigate('/');
		},
		[ navigate ]
	);

	// memoize the full context value
	const contextValue = useMemo(
		() => ({
			isAdmin,
			setIsAdmin,
			authenticateAdmin,
			logoutAuth
		}),
		[ isAdmin, setIsAdmin, authenticateAdmin, logoutAuth ]
	);

	return <AdminContext.Provider value={contextValue}>{children}</AdminContext.Provider>;
};
