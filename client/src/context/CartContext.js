import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartContext = createContext(null);
export const useCartContext = () => {
	return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
	let navigate = useNavigate();

	const [ selectionModel, setSelectionModel ] = useState([]);

	const [ cart, setCart ] = useState([]);
	const [ cartOpen, setCartOpen ] = useState(false);

	const toggleCart = useCallback(() => setCartOpen((prev) => !prev), []);

	const emptyCart = useCallback(() => {
		setCart([]);
		setSelectionModel([]);
	}, []);

	const handleCheckout = useCallback(
		(e, user_id) => {
			e.preventDefault();
			const d = new Date();
			const date = d.toISOString().slice(0, 10);
			const newMagIds = [];
			for (let i = 0; i < cart.length; ++i) {
				newMagIds[i] = cart[i]['magID'];
			}
			const payload = {
				new_mag_ids: newMagIds,
				date,
				id: user_id
			};
			console.log(JSON.stringify(payload));
			return axios
				.post(`http://127.0.0.1:5000/user/add-subs/${user_id}`, JSON.stringify(payload), {
					headers: {
						'Content-Type': 'application/json',

						'Access-Control-Allow-Origin': '*'
					}
				})
				.then((res) => {
					console.log(res);
					if (res.status === 201) {
						console.log(res);
						const successMessage = `Success: Checkout complete.`;
						alert(successMessage);
						navigate(`/dashboard/${user_id}`);
					}
				})
				.catch((e) => {
					console.log(e);
					alert(`Error: ${e}`);
				});
		},
		[ cart, navigate ]
	);

	// memoize the full context value
	const contextValue = useMemo(
		() => ({
			cart,
			setCart,
			cartOpen,
			setCartOpen,
			toggleCart,
			emptyCart,
			handleCheckout,
			selectionModel,
			setSelectionModel
		}),
		[
			cart,
			setCart,
			cartOpen,
			setCartOpen,
			toggleCart,
			emptyCart,
			handleCheckout,
			selectionModel,
			setSelectionModel
		]
	);

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
