import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { MaterialModal } from '../../../Modal/Modal';
import { ButtonSx } from '../../../../styles/MUI_styles';
import { useState } from 'react';
// @ts-ignore
import styles from './signupform.module.css';

export const SignupForm = () => {
	let statusCode = -1;
	let navigate = useNavigate();
	const [ modal, setModal ] = useState(false);
	const toggleModal = () => setModal((prev) => !prev);
	const handleClose = () => {
		toggleModal();
		if (statusCode === 201) {
			navigate('/', { replace: true });
		}
	};

	const [ modalTitle, setModalTitle ] = useState('');
	const [ modalMsg, setModalMsg ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (firstname === '' || lastname === '' || username === '' || password === '') {
			alert('Please fill out all of the fields.');
			return;
		}
		return axios
			.post(
				'http://127.0.0.1:5000/auth/signup',
				JSON.stringify({
					user_first_name: firstname,
					user_last_name: lastname,
					user_username: username,
					user_password: password
				}),
				{ headers: { 'Content-Type': 'application/json' } }
			)
			.then((res) => {
				statusCode = res.status;
				if (statusCode === 201) {
					const successMessage = `You have created an account!`;
					setModalTitle('Success:');
					setModalMsg(successMessage);
				}
				else if (statusCode === 500) {
					const errorMessage = `Error: An error occurred in the database.`;
					setModalTitle('Error:');
					setModalMsg(errorMessage);
					return;
				}
				else if (statusCode === 400) {
					const errorMessage = `Error: An account with the username, ${username}, already exists!`;
					setModalTitle('Error:');
					setModalMsg(errorMessage);
					return;
				}
				else if (statusCode === 502) {
					const errorMessage = `Error: An error occurred in creating your account.`;
					setModalTitle('Error:');
					setModalMsg(errorMessage);
					return;
				}
			})
			.catch((e) => {
				console.log(e);
				alert(e);
			});
	};

	const [ firstname, setFirstName ] = useState('');
	const handleChangeFName = (e) => {
		setFirstName(e.target.value);
	};

	const [ lastname, setLastName ] = useState('');
	const handleChangeLName = (e) => {
		setLastName(e.target.value);
	};

	const [ username, setUsername ] = useState('');
	const handleChangeUsername = (e) => {
		setUsername(e.target.value);
	};
	const [ password, setPassword ] = useState('');
	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<form className={styles['signup-form']} onSubmit={(e) => handleSubmit(e)}>
			<div className={styles['signup-form-body']}>
				<input
					onChange={(e) => handleChangeFName(e)}
					value={firstname}
					type="text"
					name="firstname"
					placeholder="First Name.."
					className={styles['first-name-input']}
				/>
				<input
					onChange={(e) => handleChangeLName(e)}
					value={lastname}
					type="text"
					name="lastname"
					placeholder="Last Name.."
					className={styles['last-name-input']}
				/>
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
				<Button
					sx={ButtonSx}
					type="submit"
					className={styles['submit-button']}
					disabled={firstname === '' || lastname === '' || username === '' || password === ''}
				>
					Signup
				</Button>
			</div>
			<MaterialModal open={modal} handleClose={handleClose} message={modalMsg} title={modalTitle} />
		</form>
	);
};
