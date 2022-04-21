import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const CartContext = createContext(null);
export const useCartContext = () => {
	return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
	const [ selectionModel, setSelectionModel ] = useState([]);

	const [ cart, setCart ] = useState([]);
	const [ cartOpen, setCartOpen ] = useState(false);

	const toggleCart = useCallback(() => setCartOpen((prev) => !prev), []);

	// memoize the full context value
	const contextValue = useMemo(
		() => ({
			cart,
			setCart,
			cartOpen,
			setCartOpen,
			toggleCart,
			selectionModel,
			setSelectionModel
		}),
		[ cart, setCart, cartOpen, setCartOpen, toggleCart, selectionModel, setSelectionModel ]
	);

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
