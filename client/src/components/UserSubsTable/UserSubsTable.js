import { Fragment, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { SmallLoading } from '../Loading/Loading';
import { useUserContext } from '../../context/UserContext';
import styles from './usersubtable.module.css';
export const UserSubsTable = ({
	column_names = [
		'Subscription ID',
		'Magazine Name',
		'Subscription Cost',
		'Magazine Category',
		'Subscription Start Date',
		'Subscription End Date',
		'Subscribed'
	],
	subs
}) => {
	const TableHeader = () => {
		return (
			<TableHead styles={styles['table-header']}>
				<TableRow>{column_names.map((col_name) => <TableCell>{col_name}</TableCell>)}</TableRow>
			</TableHead>
		);
	};

	const SubEntry = ({
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
		//const [ loading, setLoading ] = useState(false);
		const [ loading, setLoading ] = useState(true);

		useEffect(
			() => {
				if (user !== null) {
					console.log(`SubID ${subID}`);
					setSubscribed(fetchSubStatus(user.user_id, subID));
					setLoading(false);
				}
			},
			[ fetchSubStatus, subID, user ]
		);
		const handleChange = () => setSubscribed((prevState) => !prevState);
		return (
			<Fragment>
				{loading === true ? (
					<TableRow>
						<TableCell>{subID}</TableCell>
						<TableCell>{magazineName}</TableCell>
						<TableCell>${cost}</TableCell>
						<TableCell>{category}</TableCell>
						<TableCell>{startDate}</TableCell>
						<TableCell>{endDate}</TableCell>
						<TableCell padding="checkbox">
							<SmallLoading />
						</TableCell>
					</TableRow>
				) : (
					<TableRow>
						<TableCell>{subID}</TableCell>
						<TableCell>{magazineName}</TableCell>
						<TableCell>${cost}</TableCell>
						<TableCell>{category}</TableCell>
						<TableCell>{startDate}</TableCell>
						<TableCell>{endDate}</TableCell>
						<TableCell padding="checkbox">
							<Checkbox type="checkbox" checked={subscribed} onChange={handleChange} value={subscribed} />
						</TableCell>
					</TableRow>
				)}
			</Fragment>
		);
	};

	return (
		<TableContainer className={styles['table-container']}>
			<Table className={styles['table']}>
				<TableHeader />
				<TableBody>
					{subs.map((sub) => (
						<SubEntry
							subID={sub.id}
							magazineName={sub.name}
							cost={sub.price}
							category={sub.category}
							startDate={sub.startDate}
							endDate={sub.endDate}
							key={sub.id + ' ' + sub.name + ' ' + sub.startDate}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
