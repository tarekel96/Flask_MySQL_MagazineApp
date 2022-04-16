import { useUserContext } from '../../context/UserContext';
import { UserSubsTable } from '../../components/UserSubsTable/UserSubsTable';
import { Button } from '../../components/Button/Button';
import { Loading } from '../../components/Loading/Loading';
import styles from './user.module.css';

const User = () => {
	const user = useUserContext()['user'];
	const subs = useUserContext()['subs'];
	const logout = useUserContext()['logout'];

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
			<form onSubmit={logout} className={styles['logout-btn-container']}>
				<Button type="submit">Logout</Button>
			</form>
		</section>
	);
};

export default User;
