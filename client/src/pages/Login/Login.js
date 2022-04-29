import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { AdminForm } from '../../components/Form/Admin/AdminForm';
import { LoginForm } from '../../components/Form/User/Login/LoginForm';
import styles from './login.module.css';

const Login = () => {
	const [ isAdmin, setUserType ] = useState(false);

	const handleSelection = (e) => {
		setUserType((prevState) => !prevState);
	};

	let navigate = useNavigate();

	const setUser = useUserContext()['updateUser'];

	const fetchSubs = useUserContext()['fetchSubs'];

	useEffect(() => {
		const savedUser = JSON.parse(window.localStorage.getItem('user'));
		if (savedUser !== null && savedUser !== undefined) {
			setUser(savedUser);
			fetchSubs(savedUser.user_id);
			navigate(`/dashboard/${savedUser.user_id}`);
		}
	}, []);

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
					<LoginForm />
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
