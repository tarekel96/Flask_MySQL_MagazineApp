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
	const [ user, setUser ] = useLocalStorage('user', null);

	const updateUser = useCallback(
		(newUser) => {
			setUser(newUser);
		},
		[ setUser ]
	);

	const logout = useCallback(
		() => {
			setUser(null);
			window.localStorage.clear();
			alert('You are now logged out.');
			navigate('/');
		},
		[ navigate, setUser ]
	);
	const [ subs, setSubs ] = useState(null);

	const [ subIDs, setSubIDs ] = useState([]);

	const navToHome = useCallback((id) => navigate(`/dashboard/${id}`), [ navigate ]);

	const navToCatalog = useCallback((id) => navigate(`/catalog/${id}`), [ navigate ]);

	const fetchSubs = useCallback(async (id) => {
		try {
			return axios
				.get(`http://127.0.0.1:5000/user/subs/${id}`)
				.then((res) => {
					if (res.status === 204) {
						return;
					}
					if (res.status === 201) {
						return res;
					}
				})
				.then((json) => {
					if (json === undefined || json === null) {
						setSubIDs([]);
						setSubs([]);
						console.log('No subscriptions were found.');
						return;
					}
					if (json.data === [] || json.data === null || json.data === undefined) {
						setSubIDs([]);
						setSubs([]);
						console.log('No subscriptions were found.');
						return;
					}

					let subIds = [];
					json.data.forEach((item) => subIds.push(item.id));

					setSubIDs(subIds);
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
		if(subs === null || subs?.length === 0) {
			return true;
		}
		try {
			return axios
				.get(`http://127.0.0.1:5000/user/subs/${id}`)
				.then((res) => {
					if (res.status === 204) {
						setSubIDs([]);
						setSubs([]);
						console.log('No subscriptions were found.');
						return;
					}
					if (res.status === 201) {
						return res;
					}
				})
				.then((json) => {
					if(json.data === undefined) return true;
					let subs = json.data;
					if (subs === undefined || subs === null) return true;
					if (Object.keys(subs[0]).length === 0) {
						return true;
					}
					let selectedSub = subs.find((sub) => sub.id === subID);
					if (selectedSub === undefined) return true;
					return selectedSub.subscribed;
				})
				.catch((e) => {
					console.log(e);
					alert(e);
				});
		} catch (e) {
			console.log(`Error: An error occurred in trying to fetch subscriptions.\n${e}`);
		}
	}, [subs]);

	// memoize the full context value
	const contextValue = useMemo(
		() => ({
			user,
			updateUser,
			logout,
			navToHome,
			navToCatalog,
			subs,
			subIDs,
			fetchSubs,
			fetchSubStatus
		}),
		[ user, updateUser, logout, navToHome, navToCatalog, subs, subIDs, fetchSubs, fetchSubStatus ]
	);

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
