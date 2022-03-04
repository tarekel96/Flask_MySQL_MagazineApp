import { Fragment } from 'react';
import { useUserContext } from '../../context/UserContext';
import { Subscription, SubscriptionLabels } from '../../components/Subscription/Subscription';
import styles from './user.module.css';

const User = () => {
	const user = useUserContext()['user'];
	const subs = useUserContext()['subs'];
	console.log(subs);
	return (
		<section className={styles['user-section']}>
			<header className={styles['user-header']}>
				<h2>Welcome {user !== null ? user['user_first_name'] : 'John Doe'}!</h2>
			</header>
			<h3 className={styles['user-subs-header']}>Subscriptions</h3>
			<section className={styles['user-subs']}>
				<table className={styles['subscriptions']}>
					<tbody>
						{subs === null ? (
							<Fragment>
								<SubscriptionLabels />
								<Subscription />
								<Subscription />
							</Fragment>
						) : (
							subs.map((sub) => (
								<Subscription
									subID={sub.id}
									magazineName={sub.name}
									cost={sub.price}
									category={sub.category}
									startDate={sub.startDate}
									endDate={sub.endDate}
									subscribed={sub.subscribed}
								/>
							))
						)}
					</tbody>
				</table>
			</section>
		</section>
	);
};

export default User;
