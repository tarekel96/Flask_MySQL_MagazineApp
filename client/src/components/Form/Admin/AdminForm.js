import { Button } from '../../Button/Button';
import { useAuthContext } from '../../../context/AdminContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './adminform.module.css';
export const AdminForm = () => {
	const authenticateAdmin = useAuthContext()['authenticateAdmin'];
	let navigate = useNavigate();

	const [ password, setPassword ] = useState('');
	const handleChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		return axios
			.post('http://127.0.0.1:5000/auth/admin', JSON.stringify({ password }), {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				if (res.status === 201) {
					authenticateAdmin();
					alert(res.data);
					navigate('/admin');
				}
			})
			.catch((e) => {
				console.log(e);
				alert(e);
			});
	};
	return (
		<form className={styles['admin-form']} onSubmit={(e) => handleSubmit(e)}>
			<div className={styles['admin-form-body']}>
				<div>
					<input
						onChange={(e) => handleChange(e)}
						value={password}
						type="text"
						name="password"
						placeholder="Password.."
						className={styles['password-input']}
					/>
				</div>
				<Button type="submit" className={styles['submit-button']}>
					Authenticate
				</Button>
			</div>
		</form>
	);
};
