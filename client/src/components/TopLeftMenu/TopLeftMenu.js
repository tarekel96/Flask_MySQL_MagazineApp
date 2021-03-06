import { useState } from 'react';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { MaterialModal } from '../Modal/Modal';
import { useUserContext } from '../../context/UserContext';
// @ts-ignore
import styles from './topleftmenu.module.css';

export const TopLeftMenu = () => {
	const user = useUserContext()['user'];
	const logout = useUserContext()['logout'];
	const logoutModal = useUserContext()['logoutModal'];
	const navToHome = useUserContext()['navToHome'];
	const navToCatalog = useUserContext()['navToCatalog'];

	const [ modal, setModal ] = useState(false);
	const toggleModal = () => setModal((prev) => !prev);

	const [ isOpen, setOpen ] = useState(false);
	const toggleDrawer = (e) => {
		if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
			return;
		}
		setOpen((prev) => !prev);
	};

	const DrawerList = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
			role="presentation"
			onClick={(e) => toggleDrawer(e)}
			onKeyDown={(e) => toggleDrawer(e)}
		>
			<List>
				<ListItem
					button
					onClick={() => navToHome(user.user_id)}
					sx={{
						'&:hover': {
							color: '#20df7f',
							'& svg': {
								color: '#20df7f'
							}
						}
					}}
				>
					<ListItemIcon>
						<LoyaltyIcon sx={{ color: 'rgb(255, 255, 255)' }} />
					</ListItemIcon>
					<ListItemText primary={'My Subscriptions'} />
				</ListItem>
				<Divider sx={{ borderColor: 'rgb(255, 255, 255)' }} />
				<ListItem
					button
					onClick={() => navToCatalog(user.user_id)}
					sx={{
						'&:hover': {
							color: '#20df7f',
							'& svg': {
								color: '#20df7f'
							}
						}
					}}
				>
					<ListItemIcon>
						<ImportContactsIcon sx={{ color: 'rgb(255, 255, 255)' }} />
					</ListItemIcon>
					<ListItemText primary={'View Catalog'} />
				</ListItem>
				<Divider sx={{ borderColor: 'rgb(255, 255, 255)' }} />
				<MaterialModal
					title={'Success'}
					message={'You are now logged out.'}
					open={modal}
					handleClose={() => setModal(false)}
				/>
				<ListItem
					button
					onClick={logout}
					sx={{
						'&:hover': {
							color: '#20df7f',
							'& svg': {
								color: '#20df7f'
							}
						}
					}}
				>
					<ListItemIcon>
						<LogoutIcon sx={{ color: 'rgb(255, 255, 255)' }} />
					</ListItemIcon>
					<ListItemText primary={'Sign Out'} />
				</ListItem>
			</List>
			<Divider sx={{ borderColor: 'rgb(255, 255, 255)' }} />
		</Box>
	);

	return (
		<article className={styles['top-left-menu-wrapper']}>
			<Button className={styles['top-left-menu-btn']} onClick={(e) => toggleDrawer(e)}>
				<MenuIcon className={styles['menu-icon']} />
			</Button>
			<div>
				<Drawer
					sx={{
						'& .MuiDrawer-paperAnchorLeft': {
							backgroundColor: 'rgb(18, 18, 18)',
							color: 'rgb(255, 255, 255)'
						}
					}}
					className={styles['drawer']}
					anchor={'left'}
					open={isOpen}
					onClose={(e) => toggleDrawer(e)}
				>
					{DrawerList('left')}
				</Drawer>
			</div>
		</article>
	);
};
