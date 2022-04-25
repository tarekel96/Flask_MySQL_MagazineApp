import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { UserSubsTable } from '../../components/UserSubsTable/UserSubsTable';
import { TopLeftMenu } from '../../components/TopLeftMenu/TopLeftMenu';
import { Loading } from '../../components/Loading/Loading';
import { ProfileIcon } from '../../components/ProfileIcon/ProfileIcon';
import styles from './user.module.css';

const User = () => {
	const user = useUserContext()['user'];
	const subs = useUserContext()['subs'];

	const setUser = useUserContext()['updateUser'];
	const fetchSubs = useUserContext()['fetchSubs'];

	let navigate = useNavigate();

	const [ isOpen, toggle ] = useState(false);
	const handleClick = () => toggle((prev) => !prev);

	useEffect(() => {
		const savedUser = JSON.parse(window.localStorage.getItem('user'));
		if (user === null && savedUser !== null && savedUser !== undefined) {
			setUser(savedUser);
			fetchSubs(savedUser.user_id);
		}
		else if (user !== null && user !== undefined) {
			setUser(user);
			fetchSubs(user.user_id);
			//navigate(`/dashboard/${user.user_id}`);
		}
	}, []);

	return (
		<section className={styles['user-section']}>
			<header className={styles['user-header']}>
				<h2>Welcome {user !== null ? user['user_first_name'] : 'John Doe'}!</h2>
			</header>
			<h3 className={styles['user-subs-header']}>Subscriptions</h3>
			<section className={styles['user-subs']}>
				{subs === null || subs.length === 0 ? (
					<Loading />
				) : subs !== null && Object.keys(subs[0]).length !== 0 ? (
					<UserSubsTable subs={subs} />
				) : (
					<h1>No Subscriptions</h1>
				)}
			</section>
			<TopLeftMenu isOpen={isOpen} handleClick={handleClick} />
			<ProfileIcon />
		</section>
	);
};

export default User;
