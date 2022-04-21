import Button from '@mui/material/Button';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useCartContext } from '../../context/CartContext';
import styles from './cart.module.css';

export const CartItem = ({ item }) => {
	const setSelectionModel = useCartContext()['setSelectionModel'];

	const cart = useCartContext()['cart'];
	const setCart = useCartContext()['setCart'];

	const handleClick = (id) => {
		let newCart = [ ...cart ];
		let newSelectionMode = [];

		newCart = newCart.filter((item) => {
			if (item.magID !== id) {
				newSelectionMode.push(item.magID);
				return item;
			}
		});
		console.log(newCart, newSelectionMode);
		setSelectionModel(() => {
			setCart(() => newCart);
			return newSelectionMode;
		});
	};

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
					onClick={() => handleClick(item.magID)}
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
				<CartItem key={String(item.magID) + ' ' + item.magazineName + ' ' + String(item.cost)} item={item} />
			))}
		</aside>
	);
};
