import { useState } from 'react';
import { Subscription, SubscriptionLabels } from '../../components/Subscription/Subscription';
import styles from './user.module.css';

const User = () => {
	const [ username, setUsername ] = useState('jsmith');
	const [ name, setName ] = useState('John Smith');

	return (
		<section className={styles['user-section']}>
			<header className={styles['user-header']}>
				<h2>Welcome {name}!</h2>
			</header>
			<h3 className={styles['user-subs-header']}>Subscriptions</h3>
			<section className={styles['user-subs']}>
				<table className={styles['subscriptions']}>
					<tbody>
						<SubscriptionLabels />
						<Subscription />
						<Subscription />
					</tbody>
				</table>
			</section>
		</section>
	);
};

export default User;
