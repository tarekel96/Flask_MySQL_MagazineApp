import styles from './custitem.module.css';
export const CustItem = ({ custID, userName, firstName, lastName }) => (
	<div className={styles['cust-item-container']}>
		<p className={styles['cust-id']}>ID: {custID}</p>
		<p className={styles['cust-username']}>Username: {userName}</p>
		<p className={styles['cust-first-name']}>First Name: {firstName}</p>
		<p className={styles['cust-last-name']}>Last Name: {lastName}</p>
	</div>
);
