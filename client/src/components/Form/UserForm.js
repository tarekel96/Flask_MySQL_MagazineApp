import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import styles from './userform.module.css';
export const UserForm = () => {
	const user = useUserContext()['user'];
	const setUser = useUserContext()['updateUser'];

	let navigate = useNavigate();

	const [ username, setUsername ] = useState('');
	const handleChangeUsername = (e) => {
		setUsername(e.target.value);
	};
	const [ password, setPassword ] = useState('');
	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		return axios
			.post('http://127.0.0.1:5000/auth/login', JSON.stringify({ username, password }), {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log(res);
				if (res.status === 201) {
					console.log(res);
					const successMessage = `Success: Logged in as ${res.data['user_username']}.\nWelcome ${res.data[
						'user_first_name'
					]} ${res.data['user_last_name']}!`;
					alert(successMessage);
					const userID = res.data['user_id'];
					const chosenUser = {
						user_id: res.data['user_id'],
						user_first_name: res.data['user_first_name'],
						user_last_name: res.data['user_last_name'],
						user_username: res.data['user_username'],
						user_password: res.data['user_password'],
						user_start_date: res.data['user_start_date']
					};
					setUser(chosenUser);
					navigate(`/dashboard/${userID}`);
				}
				else if (res.status === 401) {
					const errorMessage = `${res.data}\nError: Invalid password provided.`;
					console.log(res.status);
					console.log(errorMessage);
					alert(errorMessage);
				}
			})
			.catch((e) => {
				console.log(e);
				alert(e);
			});
	};
	return (
		<form className={styles['user-form']} onSubmit={(e) => handleSubmit(e)}>
			<div className={styles['user-form-body']}>
				<label htmlFor="username">Enter Username:</label>
				<input
					onChange={(e) => handleChangeUsername(e)}
					value={username}
					type="text"
					name="username"
					placeholder="username.."
					className={styles['username-input']}
				/>
				<label htmlFor="password">Enter Password:</label>
				<input
					onChange={(e) => handleChangePassword(e)}
					value={password}
					type="text"
					name="password"
					placeholder="password.."
					className={styles['password-input']}
				/>
				<input type="submit" className={styles['submit-button']} />
			</div>
		</form>
	);
};
