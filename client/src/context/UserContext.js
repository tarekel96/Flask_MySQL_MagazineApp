import { createContext, useContext, useState, useMemo, useCallback } from 'react';
// context objects
const UserContext = createContext(null);
// context hooks: These hooks make so dont have to import useContext with useUserContext, in each file
export const useUserContext = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	// default state of user obj
	const [ user, setUser ] = useState(null);

	const updateUser = useCallback((newUser) => {
		setUser(newUser);
	}, []);

	const logout = useCallback(() => {
		setUser(null);
	}, []);

	// memoize the full context value
	const contextValue = useMemo(
		() => ({
			user,
			updateUser,
			logout
		}),
		[ user, updateUser, logout ]
	);

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
