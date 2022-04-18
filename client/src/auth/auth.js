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

export const setupLocalStorage = (user, ttl = 5000) => {
	const { user_id, user_first_name, user_last_name, user_username, user_start_date } = user;

	const now = new Date();
	window.localStorage.setItem(
		'user',
		JSON.stringify({
			user_id,
			user_first_name,
			user_last_name,
			user_username,
			user_start_date,
			expiry: now.getTime() + ttl
		})
	);
};

export const localStorageValid = (key = 'user') => {
	try {
		window.localStorage.getItem(key);
	} catch (e) {
		console.log('Key does not exist.');
		return false;
	}
	const itemStr = window.localStorage.getItem(key);
	console.log(`Local storage ${itemStr}`);

	// if the item doesn't exist, return null
	if (!itemStr || itemStr === undefined || itemStr === null) {
		return false;
	}
	const item = JSON.parse(itemStr);
	if (item === null) {
		return false;
	}
	const now = new Date();
	console.log('Item expiry: ' + String(item.expiry));
	console.log(now.getTime());
	// compare the expiry time of the item with the current time
	if (now.getTime() < item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		window.localStorage.removeItem(key);
		return false;
	}
	return true;
};

export const getLocalStorage = (key = 'user') => {
	const itemStr = window.localStorage.getItem(key);
	console.log(itemStr);
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
		window.localStorage.removeItem(key);
		return null;
	}
	return item.user;
};
