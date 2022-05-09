import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { setupLocalStorageAdmin } from '../auth/auth';

const AdminContext = createContext(null);
export const useAuthContext = () => {
	return useContext(AdminContext);
};

export const AuthProvider = ({ children }) => {
	let navigate = useNavigate();

	// default state of user obj
	const [ admin, setAdmin ] = useLocalStorage('admin', null);

	const authenticateAdmin = useCallback(
		(savedAdmin) => {
			window.localStorage.clear();
			setAdmin(savedAdmin);
			setupLocalStorageAdmin();
		},
		[ setAdmin ]
	);

	const logoutAuth = useCallback(
		() => {
			setAdmin(null);
			window.localStorage.clear();
			alert('You are not logged out.');
			return navigate('/');
		},
		[ setAdmin, navigate ]
	);

	// memoize the full context value
	const contextValue = useMemo(
		() => ({
			admin,
			setAdmin,
			authenticateAdmin,
			logoutAuth
		}),
		[ admin, setAdmin, authenticateAdmin, logoutAuth ]
	);

	return <AdminContext.Provider value={contextValue}>{children}</AdminContext.Provider>;
};
