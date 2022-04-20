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
import { Cart } from '../Cart/Cart';
import styles from './catalogbanner.module.css';
import { useState } from 'react';

const defaultItems = [
	{
		id: 0,
		title: 'Cat in the Hat',
		category: 'children',
		cost: 14.99
	},
	{
		id: 1,
		title: 'Big Cats',
		category: 'animals',
		cost: 7.99
	},
	{
		id: 2,
		title: 'People',
		category: 'celebrity',
		cost: 9.99
	},
	{
		id: 3,
		title: 'Art of War',
		category: 'history',
		cost: 29.99
	},
	{
		id: 4,
		title: 'Diary of a Wimpy Kid',
		category: 'children',
		cost: 11.99
	}
];
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
				<Box
					sx={{ width: '500px' }}
					role="presentation"
					onClick={(e) => toggle(e)}
					onKeyDown={(e) => toggle(e)}
				>
					<Cart cartItems={defaultItems} closeCart={handleClickAway} />
				</Box>
			</Drawer>
		);
	};

	//{DrawerList('right')}
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
