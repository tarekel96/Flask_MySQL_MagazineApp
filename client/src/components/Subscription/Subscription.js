import { useState, useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import styles from './subscription.module.css';

export const Subscription = ({
	subID = 1,
	magazineName = 'Cat in the Hat',
	cost = 5.99,
	category = 'children',
	startDate = '10/12/2021',
	endDate = '03/01/2022'
}) => {
	const user = useUserContext()['user'];
	const fetchSubStatus = useUserContext()['fetchSubStatus'];
	const [ subscribed, setSubscribed ] = useState(false);

	// useEffect(() => {
	// 	if (user !== null) {
	// 		setSubscribed(fetchSubStatus(user.user_id, subID));
	// 	}
	// }, []);
	const handleChange = () => setSubscribed((prevState) => !prevState);
	// TODO - make handle submit

	return (
		<tr className={styles['subscription-article']}>
			<td>{subID}</td>
			<td>{magazineName}</td>
			<td>${cost}</td>
			<td>{category}</td>
			<td>{startDate}</td>
			<td>{endDate}</td>
			<td>
				<input type="checkbox" checked={subscribed} onChange={handleChange} value={subscribed} />
			</td>
		</tr>
	);
};

export const SubscriptionLabels = () => {
	return (
		<tr className={styles['subscription-labels']}>
			<th>ID</th>
			<th>Name</th>
			<th>Monthly Cost ($)</th>
			<th>Category</th>
			<th>Subscription Start Date</th>
			<th>Subscription End Date</th>
			<th>Subscribed</th>
		</tr>
	);
};
