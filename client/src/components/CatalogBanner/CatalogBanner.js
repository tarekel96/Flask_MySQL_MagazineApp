import { useUserContext } from '../../context/UserContext';
import { useCartContext } from '../../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Cart } from '../Cart/Cart';
import styles from './catalogbanner.module.css';
import { useState } from 'react';
export const CatalogBanner = () => {
	const cart = useCartContext()['cart'];
	const count = cart.length;

	const cartOpen = useCartContext()['cartOpen'];
	const setCartOpen = useCartContext()['setCartOpen'];

	const toggleCart = useCartContext()['toggleCart'];

	const toggle = (e) => {
		if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
			return;
		}
		toggleCart();
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
			>
				<Box
					sx={{ width: '500px' }}
					role="presentation"
					onClick={(e) => toggle(e)}
					onKeyDown={(e) => toggle(e)}
				>
					<Cart cartItems={cart} closeCart={() => setCartOpen(false)} />
				</Box>
			</Drawer>
		);
	};

	return (
		<article className={styles['shopping-cart-container']} onClick={(e) => toggle(e)}>
			<Badge
				sx={{
					'& .MuiBadge-badge': {
						fontSize: '16px',
						fontWeight: 500,
						border: `2px solid rgb(18,18,18)`,
						padding: '0 4px',
						color: `rgb(18,18,18)`
					}
				}}
				badgeContent={count}
				color="success"
			>
				<ShoppingCartIcon
					sx={{
						color: 'rgb(26, 32, 39)',
						width: '48px',
						height: '48px',
						position: 'relative'
					}}
					className={styles['shopping-cart']}
				/>
			</Badge>
			{cartOpen && <ShoppingCartList />}
		</article>
	);
};
