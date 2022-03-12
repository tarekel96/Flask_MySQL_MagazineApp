import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { useState } from 'react';
import styles from './signupform.module.css';

export const SignupForm = () => {
	let navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		return navigate('/');
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
		<form className={styles['signup-form']} onSubmit={handleSubmit}>
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
					type="text"
					name="password"
					placeholder="Password.."
					className={styles['password-input']}
				/>
				<Button type="submit" className={styles['submit-button']}>
					Signup
				</Button>
			</div>
		</form>
	);
};
