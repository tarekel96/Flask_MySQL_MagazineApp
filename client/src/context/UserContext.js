import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
	const [ user, setUser ] = useState(null);
	const [ subs, setSubs ] = useState(null);

	const updateUser = useCallback((newUser) => {
		setUser(newUser);
	}, []);

	const logout = useCallback(() => {
		setUser(null);
		localStorage.clear();
		alert('You are now logged out.');
		navigate('/');
	}, []);

	const fetchSubs = useCallback(async (id) => {
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
					console.log('Subs');
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
			subs,
			fetchSubs,
			fetchSubStatus
		}),
		[ user, updateUser, logout, subs, fetchSubs, fetchSubStatus ]
	);

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
