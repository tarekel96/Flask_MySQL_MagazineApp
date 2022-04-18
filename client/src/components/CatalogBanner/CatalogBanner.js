import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './catalogbanner.module.css';
export const CatalogBanner = ({ count }) => {
	return (
		<article className={styles['shopping-cart-container']}>
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
		</article>
	);
};
