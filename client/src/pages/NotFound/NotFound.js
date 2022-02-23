import styles from './notfound.module.css';

const NotFound = () => {
	return (
		<section className={styles['not-found-page']}>
			<header className={styles['not-found-header']}>
				<h2>404 Error: Page not found..</h2>
			</header>
		</section>
	);
};

export default NotFound;
