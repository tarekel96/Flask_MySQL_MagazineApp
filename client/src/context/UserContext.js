import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
// import {}
// context objects
const UserContext = createContext(null);
// context hooks: These hooks make so dont have to import useContext with useUserContext, in each file
export const useUserContext = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	let navigate = useNavigate('/');
	// default state of user obj
	//const [ user, setUser ] = useState(null);
	const [ user, setUser ] = useLocalStorage('user', null);
	const [ subs, setSubs ] = useState(null);

	const updateUser = useCallback((newUser) => {
		setUser(newUser);
	}, []);

	const logout = useCallback(
		() => {
			setUser(null);
			//window.localStorage.clear();
			alert('You are now logged out.');
			navigate('/');
		},
		[ navigate, setUser ]
	);

	const navToHome = useCallback((id) => navigate(`/dashboard/${id}`), [ navigate ]);

	const navToCatalog = useCallback((id) => navigate(`/catalog/${id}`), [ navigate ]);

	const fetchSubs = useCallback(async (id) => {
		try {
			return axios
				.get(`http://127.0.0.1:5000/user/subs/${id}`)
				.then((res) => {
					console.log(res);
					if (res.status === 201) {
						return res;
					}
					console.log(res);
				})
				.then((json) => {
					console.log(json.data);
					setSubs(json.data);
				})
				.catch((e) => {
					console.log(e);
					alert(e);
				});
		} catch (e) {
			console.log(`Error: An error occurred in trying to fetch subscriptions.\n${e}`);
		}
	}, []);

	const fetchSubStatus = useCallback(async (id, subID) => {
		try {
			return axios
				.get(`http://127.0.0.1:5000/user/subs/${id}`)
				.then((res) => {
					if (res.status === 201) {
						return res;
					}
					console.log(res);
				})
				.then((json) => {
					let subs = json.data;
					if (Object.keys(subs[0]).length === 0) {
						return null;
					}
					let selectedSub = subs.find((sub) => sub.id === subID);
					return selectedSub.subscribed;
				})
				.catch((e) => {
					console.log(e);
					alert(e);
				});
		} catch (e) {
			console.log(`Error: An error occurred in trying to fetch subscriptions.\n${e}`);
		}
	}, []);

	// memoize the full context value
	const contextValue = useMemo(
		() => ({
			user,
			updateUser,
			logout,
			navToHome,
			navToCatalog,
			subs,
			fetchSubs,
			fetchSubStatus
		}),
		[ user, updateUser, logout, navToHome, navToCatalog, subs, fetchSubs, fetchSubStatus ]
	);

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
