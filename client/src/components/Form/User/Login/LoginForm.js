import axios from 'axios';
import Button from '@mui/material/Button';
import { MaterialModal } from '../../../Modal/Modal';
import { ButtonSx } from '../../../../styles/MUI_styles';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from '../../../../context/UserContext';
// @ts-ignore
import styles from './loginform.module.css';
export const LoginForm = () => {
	let userID = null;
	const [ modal, setModal ] = useState(false);
	const toggleModal = () => setModal((prev) => !prev);
	const handleClose = () => {
		toggleModal();
		if (statusCode === 201) {
			navigate(`/dashboard/${userID}`);
		}
	};

	const [ modalTitle, setModalTitle ] = useState('');
	const [ modalMsg, setModalMsg ] = useState('');

	const setUser = useUserContext()['updateUser'];
	const fetchSubs = useUserContext()['fetchSubs'];
	const [ statusCode, setStatusCode ] = useState(-1);

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
				setStatusCode(res.status);
				if (res.status === 201) {
					const successMessage = `Logged in as ${res.data['user_username']}.\nWelcome ${res.data[
						'user_first_name'
					]} ${res.data['user_last_name']}!`;
					setModalTitle('Success:');
					setModalMsg(successMessage);
					toggleModal();
					userID = res.data['user_id'];
					const chosenUser = {
						user_id: res.data['user_id'],
						user_first_name: res.data['user_first_name'],
						user_last_name: res.data['user_last_name'],
						user_username: res.data['user_username'],
						user_password: res.data['user_password'],
						user_start_date: res.data['user_start_date']
					};
					setUser(chosenUser);
					fetchSubs(userID);
				}
				else if (res.status === 401) {
					const errorMessage = `${res.data}\nError: Invalid password provided.`;
					setModalTitle('Error:');
					setModalMsg(errorMessage);
					toggleModal();
					console.log(res.status);
				}
			})
			.catch((e) => {
				const errorMessage = `Error Message: ${String(e)}`;
				setModalTitle('Error:');
				setModalMsg(errorMessage);
				toggleModal();
				console.log(e);
			});
	};
	return (
		<form className={styles['user-form']} onSubmit={(e) => handleSubmit(e)}>
			<div className={styles['user-form-body']}>
				<input
					onChange={(e) => handleChangeUsername(e)}
					value={username}
					type="text"
					name="username"
					placeholder="Username.."
					className={styles['username-input']}
				/>

				<input
					onChange={(e) => handleChangePassword(e)}
					value={password}
					type="password"
					name="password"
					placeholder="Password.."
					className={styles['password-input']}
				/>
				<Link to="/signup" className={styles['signupLink']}>
					Don't have an account? Register!
				</Link>
				<Button sx={ButtonSx} disabled={username === '' || password === ''} type="submit">
					Login
				</Button>
			</div>
			<MaterialModal open={modal} handleClose={handleClose} message={modalMsg} title={modalTitle} />
		</form>
	);
};
