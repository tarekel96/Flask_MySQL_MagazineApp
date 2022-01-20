import axios from 'axios';
import { useState } from 'react';
import styles from './form.module.css';
export const Form = () => {
	const [ password, setPassword ] = useState('');
	const handleChange = (e) => {
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
				<label for="password">Password</label>
				<input
					onChange={(e) => handleChange(e)}
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
