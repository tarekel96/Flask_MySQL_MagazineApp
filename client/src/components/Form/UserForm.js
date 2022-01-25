import axios from 'axios';
import { useState } from 'react';
import styles from './adminform.module.css';
export const UserForm = () => {
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
		return axios
			.post('http://127.0.0.1:5000/auth/admin', { password })
			.then((res) => {
				console.log(res);
				if (res.status === 201) alert(res.data);
			})
			.catch((e) => {
				console.log(e);
				alert(e);
			});
	};
	return (
		<form className={styles['admin-form']} onSubmit={(e) => handleSubmit(e)}>
			<div className={styles['admin-form-body']}>
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
