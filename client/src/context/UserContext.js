import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
// context objects
const UserContext = createContext(null);
// context hooks: These hooks make so dont have to import useContext with useUserContext, in each file
export const useUserContext = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	// default state of user obj
	const [ user, setUser ] = useState(null);
	const [ subs, setSubs ] = useState(null);

	const updateUser = useCallback((newUser) => {
		setUser(newUser);
	}, []);

	const logout = useCallback(() => {
		setUser(null);
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
					return json.data[subID].subscribed;
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
			fetchSubs
		}),
		[ user, updateUser, logout, subs, fetchSubs ]
	);

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
