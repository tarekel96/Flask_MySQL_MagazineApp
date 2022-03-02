import { createContext } from 'react';

const userConfig = {
	user_id: null,
	user_first_name: null,
	user_last_name: null,
	user_username: null,
	user_password: null,
	user_start_date: null
};

const userContext = createContext(userConfig);
