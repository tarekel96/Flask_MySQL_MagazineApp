import { useUserContext } from '../../context/UserContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import styles from './catalogbanner.module.css';
import { useState } from 'react';
export const CatalogBanner = () => {
	const count = useUserContext()['cart'].length;

	const [ cartOpen, setCartOpen ] = useState(false);

	const toggle = (e) => {
		if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
			return;
		}
		setCartOpen((prev) => !prev);
	};

	const handleClickAway = () => {
		setCartOpen(false);
	};

	const ShoppingCartList = () => {
		const DrawerList = (anchor) => {
			return (
				<Box
					sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
					role="presentation"
					onClick={(e) => toggle(e)}
					onKeyDown={(e) => toggle(e)}
				>
					<List>
						<ListItem
							button
							sx={{
								display: 'flex',
								justifyContent: 'flex-start',
								'&:hover': {
									color: '#20df7f',
									'& svg': {
										color: '#20df7f'
									}
								}
							}}
							onClick={(e) => toggle(e)}
						>
							<ListItemIcon>
								<DoubleArrowIcon
									sx={{
										height: '36px',
										width: '36px',
										transform: 'scale(-1)',
										color: '#20df7f'
									}}
								/>
							</ListItemIcon>
						</ListItem>
						<ListItem
							button
							sx={{
								'&:hover': {
									color: '#20df7f',
									'& svg': {
										color: '#20df7f'
									}
								}
							}}
						>
							<ListItemText primary={'Item'} />
							<ListItemIcon>&times;</ListItemIcon>
						</ListItem>
					</List>
					<Divider sx={{ borderColor: 'rgb(255, 255, 255)' }} />
				</Box>
			);
		};

		return (
			<Drawer
				sx={{
					'& .MuiDrawer-paperAnchorRight': {
						backgroundColor: 'rgb(18, 18, 18)',
						color: 'rgb(255, 255, 255)'
					}
				}}
				anchor={'right'}
				open={cartOpen}
				onClose={(_, reason) => (reason === 'backdropClick' ? reason === 'escapeKeyDown' : handleClickAway)}
			>
				{DrawerList('right')}
			</Drawer>
		);
	};
	return (
		<article className={styles['shopping-cart-container']} onClick={(e) => toggle(e)}>
			<ShoppingCartIcon
				sx={{
					color: 'rgb(26, 32, 39)',
					width: '36px',
					height: '36px',
					position: 'relative'
				}}
				className={styles['shopping-cart']}
			/>
			<span className={styles['shopping-cart-counter']}>{count}</span>
			{cartOpen && <ShoppingCartList />}
		</article>
	);
};
