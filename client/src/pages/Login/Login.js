import { Fragment } from 'react';
import { AdminForm } from '../../components/Form/AdminForm';
import { UserForm } from '../../components/Form/UserForm';
import { useState } from 'react';
import styles from './login.module.css';

const Login = () => {
	const [ isAdmin, setUserType ] = useState(false);

	const handleSelection = (e) => {
		setUserType((prevState) => !prevState);
	};

	return (
		<div>
			{isAdmin ? (
				<Fragment>
					<h2>Admin Login Page</h2>
					<AdminForm />
				</Fragment>
			) : (
				<Fragment>
					<h2>User Login Page</h2>
					<UserForm />
				</Fragment>
			)}
			<div className={styles['login-radio-section']}>
				<label htmlFor="admin">Admin</label>
				<input type="radio" name="admin" value={isAdmin} onChange={handleSelection} checked={isAdmin} />
				<label htmlFor="user">User</label>
				<input type="radio" name="user" value={!isAdmin} onChange={handleSelection} checked={!isAdmin} />
			</div>
		</div>
	);
};

export default Login;
