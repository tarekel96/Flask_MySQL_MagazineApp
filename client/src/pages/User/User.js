import { useUserContext } from '../../context/UserContext';
import { UserSubsTable } from '../../components/UserSubsTable/UserSubsTable';
import { TopRightMenu } from '../../components/TopRightMenu/TopRightMenu';
import { Loading } from '../../components/Loading/Loading';
import styles from './user.module.css';
import { useState } from 'react';

const User = () => {
	const user = useUserContext()['user'];
	const subs = useUserContext()['subs'];
	const logout = useUserContext()['logout'];

	const [ isOpen, toggle ] = useState(false);
	const handleClick = () => toggle((prev) => !prev);

	// const TopRightMenu = () => {
	// 	return (
	// 		<artcile className={styles['top-right-menu-wrapper']}>
	// 			<Button
	// 				id="basic-button"
	// 				aria-controls={isOpen ? 'basic-menu' : undefined}
	// 				aria-haspopup="true"
	// 				aria-expanded={isOpen ? 'true' : undefined}
	// 				onClick={handleClick}
	// 				className={styles['top-right-menu-btn']}
	// 			>
	// 				<MenuIcon className={styles['menu-icon']} />
	// 			</Button>
	// 			<Menu
	// 				className={styles['top-right-menu']}
	// 				id="basic-menu"
	// 				anchorEl={isOpen}
	// 				open={isOpen}
	// 				onClose={handleClick}
	// 				anchorOrigin={{
	// 					vertical: 'top',
	// 					horizontal: 'right'
	// 				}}
	// 				transformOrigin={{
	// 					vertical: 'top',
	// 					horizontal: 'right'
	// 				}}
	// 				// MenuListProps={{
	// 				// 	'aria-labelledby': 'basic-button'
	// 				// }}
	// 			>
	// 				<Stack direction="row" spacing={2}>
	// 					<Paper>
	// 						<MenuList>
	// 							<MenuItem onClick={logout} className={styles['logout-btn']}>
	// 								Logout
	// 							</MenuItem>
	// 						</MenuList>
	// 					</Paper>
	// 				</Stack>
	// 			</Menu>
	// 		</artcile>
	// 	);
	// };

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
			<TopRightMenu logout={logout} isOpen={isOpen} handleClick={handleClick}/>
		</section>
	);
};

export default User;
