import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { localStorageValid, getLocalStorage, setupLocalStorage } from '../../auth/auth';
import { AdminForm } from '../../components/Form/AdminForm';
import { UserForm } from '../../components/Form/UserForm';
import styles from './login.module.css';

const Login = () => {
	const [ isAdmin, setUserType ] = useState(false);

	const handleSelection = (e) => {
		setUserType((prevState) => !prevState);
	};

	let navigate = useNavigate();

	const user = useUserContext()['user'];
	const setUser = useUserContext()['updateUser'];

	const fetchSubs = useUserContext()['fetchSubs'];

	// useEffect(() => {
	// 	const userIsStored = localStorageValid('user');
	// 	console.log(userIsStored);
	// 	if (userIsStored) {
	// 		const user = getLocalStorage('user');
	// 		setUser(user);
	// 		navigate(`/dashboard/${user.user_id}`);
	// 	}
	// }, []);

	return (
		<section className={styles['login-sub-container']}>
			{isAdmin ? (
				<Fragment>
					<h2 className={styles['formHeader']}>Sign In (Admin)</h2>
					<AdminForm />
				</Fragment>
			) : (
				<Fragment>
					<h2 className={styles['formHeader']}>Sign In</h2>
					<UserForm />
				</Fragment>
			)}
			<div className={styles['login-radio-section']}>
				<div>
					<label htmlFor="admin">Admin</label>
					<input type="radio" name="admin" value={isAdmin} onChange={handleSelection} checked={isAdmin} />
				</div>
				<div>
					<label htmlFor="user">User</label>
					<input type="radio" name="user" value={!isAdmin} onChange={handleSelection} checked={!isAdmin} />
				</div>
			</div>
		</section>
	);
};

export default Login;
