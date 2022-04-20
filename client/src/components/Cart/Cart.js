import Button from '@mui/material/Button';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import styles from './cart.module.css';

export const CartItem = ({ item }) => {
	return (
		<article className={styles['cart-item']}>
			<ul>
				<li>
					<h3>{item.title}</h3>
				</li>
				<li>
					<p>Price: ${item.cost}</p>
				</li>
				<li>
					<p>Category: {item.category}</p>
				</li>
			</ul>

			<div className={styles['cart-item-btn-container']}>
				<Button
					variant="outlined"
					color="error"
					size="small"
					disableElevation={true}
					sx={{
						fontWeight: 500,
						fontSize: 20
					}}
				>
					&times;
				</Button>
			</div>
		</article>
	);
};

export const Cart = ({ cartItems, closeCart }) => {
	return (
		<aside className={styles['cart']}>
			<div className={styles['cart-header-container']}>
				<DoubleArrowIcon
					sx={{
						height: '60px',
						width: '60px',
						transform: 'scale(-1)',
						color: '#20df7f'
					}}
					onClick={closeCart}
				/>
				<h2>Your Shopping Cart</h2>
			</div>
			{cartItems.length === 0 && <p>No items in cart.</p>}
			{cartItems.map((item) => (
				<CartItem key={String(item.id) + ' ' + item.title + ' ' + String(item.cost)} item={item} />
			))}
		</aside>
	);
};
