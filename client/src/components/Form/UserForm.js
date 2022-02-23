import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './userform.module.css';
export const UserForm = () => {
	let navigate = useNavigate();

	const [ email, setEmail ] = useState('');
	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};
	const [ password, setPassword ] = useState('');
	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		return navigate('/user');
	};
	return (
		<form className={styles['user-form']} onSubmit={(e) => handleSubmit(e)}>
			<div className={styles['user-form-body']}>
				<label htmlFor="password">Enter Email:</label>
				<input
					onChange={(e) => handleChangeEmail(e)}
					value={password}
					type="text"
					name="email"
					placeholder="email.."
					className={styles['email-input']}
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
