import styles from './loading.module.css';
export const Loading = () => {
	return (
		<section className={styles['loadingSection']}>
			<img src={'/assets/images/loading.gif'} className={styles['loadingImg']} alt="loading" />
		</section>
	);
};
