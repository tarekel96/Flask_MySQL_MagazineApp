import Button from '@mui/material/Button';
import styles from './cart.module.css';

export const CartItem = ({ item }) => {
	return (
		<article className={styles['cart-item']}>
			<div>
				<h3>{item.title}</h3>
				<div className={styles['cart-item-info']}>
					<p>Price: ${item.cost}</p>
					<p>Category: ${item.category}</p>
				</div>
				<div className={styles['cart-item-btn-container']}>
					<Button size="small" disableElevation={true} variant="contained">
						&times;
					</Button>
				</div>
			</div>
		</article>
	);
};

export const Cart = ({ cartItems }) => {
	return (
		<aside className={styles['cart']}>
			<h2>Your Shopping Cart</h2>
			{cartItems.length === 0 && <p>No items in cart.</p>}
			{cartItems.map((item) => (
				<CartItem key={String(item.id) + ' ' + item.title + ' ' + String(item.cost)} item={item} />
			))}
		</aside>
	);
};
