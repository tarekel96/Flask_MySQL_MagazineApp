import Button from '@mui/material/Button';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useUserContext } from '../../context/UserContext';
import { useCartContext } from '../../context/CartContext';
// @ts-ignore
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
			return null;
		});

		setSelectionModel(() => {
			setCart(() => newCart);
			return newSelectionMode;
		});
	};

	return (
		<article className={styles['cart-item']}>
			<ul>
				<li>
					<h3>{item.magazineName}</h3>
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
	const calcTotal = () => cartItems.reduce((amount, curr) => amount + curr.cost, 0).toFixed(2);

	const user = useUserContext()['user'];

	const emptyCart = useCartContext()['emptyCart'];
	const handleCheckout = useCartContext()['handleCheckout'];

	return (
		<aside className={styles['cart']}>
			<div className={styles['cart-header-container']}>
				<DoubleArrowIcon
					sx={{
						height: '60px',
						width: '60px',
						transform: 'scale(-1)',
						color: '#20df7f',
						'&:hover': {
							cursor: 'pointer'
						}
					}}
					onClick={closeCart}
				/>
				<h2>Your Shopping Cart</h2>
			</div>
			{cartItems.length === 0 && <p>No items in cart.</p>}
			{cartItems.map((item) => (
				<CartItem key={String(item.magID) + ' ' + item.magazineName + ' ' + String(item.cost)} item={item} />
			))}
			{cartItems.length > 0 && <h2>Total: ${calcTotal()}</h2>}
			{cartItems.length > 0 && (
				<div className={styles['cart-btn-container']}>
					<form onClick={(e) => handleCheckout(e, user.user_id)}>
						<Button
							type="submit"
							sx={{
								color: '#20df7f',
								borderColor: '#20df7f',
								'&:hover': {
									color: '#20df7f',
									borderColor: '#20df7f',
									cursor: 'pointer'
								}
							}}
							variant="outlined"
							endIcon={<ShoppingCartCheckoutIcon />}
						>
							Checkout
						</Button>
					</form>
					<Button
						onClick={emptyCart}
						variant="outlined"
						color="error"
						sx={{
							'&:hover': {
								cursor: 'pointer'
							}
						}}
						endIcon={<DeleteForeverIcon />}
					>
						Clear Cart
					</Button>
				</div>
			)}
		</aside>
	);
};
