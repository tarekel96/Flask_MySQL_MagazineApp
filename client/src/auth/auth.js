import { useLocation, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useAuthContext } from '../context/AdminContext';

export const RequireAuth = ({ children }) => {
	let location = useLocation();
	const user = useUserContext()['user'];
	let isAuthenticated = user !== null && user !== undefined;
	return isAuthenticated ? children : <Navigate to="/" state={{ from: location }} replace={true} />;
};

export const RequireAdminAuth = ({ children }) => {
	let location = useLocation();
	let admin = useAuthContext()['isAdmin'];
	let isAuthenticated = admin !== null && admin !== undefined && admin !== false;
	return isAuthenticated ? children : <Navigate to="/" state={{ from: location }} replace={true} />;
};

export const setupLocalStorage = (user_id, ttl = 5000) => {
	const now = new Date();
	localStorage.setItem(
		'user',
		JSON.stringify({
			user_id: user_id,
			expiry: now.getTime() + ttl
		})
	);
};

export const localStorageValid = (key = 'user') => {
	const itemStr = localStorage.getItem(key);
	// if the item doesn't exist, return null
	if (!itemStr) {
		return false;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key);
		return false;
	}
	return true;
};

export const getLocalStorage = (key = 'user') => {
	const itemStr = localStorage.getItem(key);
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
};
