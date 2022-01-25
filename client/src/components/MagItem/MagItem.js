import styles from './magitem.module.css';
export const MagItem = ({ magID, magazineName, cost, category }) => (
	<div className={styles['mag-item-container']}>
		<p className={styles['mag-id']}>ID: {magID}</p>
		<p className={styles['mag-name']}>Name: {magazineName}</p>
		<p className={styles['mag-price']}>Price: ${cost}</p>
		<p className={styles['mag-category']}>Category: {category}</p>
	</div>
);
