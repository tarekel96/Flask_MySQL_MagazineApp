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
			<TableHead
				sx={{
					backgroundColor: 'rgb(18, 18, 18)'
				}}
			>
				<TableRow>
					{column_names.map((col_name, index) => (
						<TableCell key={col_name + ' ' + String(index)}>{col_name}</TableCell>
					))}
				</TableRow>
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
		const subs = useUserContext()['subs'];
		const fetchSubStatus = useUserContext()['fetchSubStatus'];
		const [ subscribed, setSubscribed ] = useState(false);
		//const [ loading, setLoading ] = useState(false);
		const [ loading, setLoading ] = useState(true);

		useEffect(
			() => {
				if (user !== null && subs !== null && subs !== undefined) {
					if (subs.length > 0) {
						const subStatus = fetchSubStatus(user.user_id, subID);
						setSubscribed(Boolean(subStatus));
						setLoading(false);
					}
				}
			},
			[ fetchSubStatus, subID, user, subs ]
		);
		const handleChange = () => setSubscribed((prevState) => !prevState);
		return (
			<Fragment>
				{loading === true ? (
					<TableRow
						sx={{
							borderTop: '2px solid rgb(81, 81, 81)',
							borderBottom: '2px solid rgb(81, 81, 81)'
						}}
					>
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
					<TableRow
						sx={{
							borderTop: '2px solid rgb(81, 81, 81)',
							borderBottom: '2px solid rgb(81, 81, 81)'
						}}
					>
						<TableCell>{subID}</TableCell>
						<TableCell>{magazineName}</TableCell>
						<TableCell>${cost}</TableCell>
						<TableCell>{category}</TableCell>
						<TableCell>{startDate}</TableCell>
						<TableCell>{endDate}</TableCell>
						<TableCell padding="checkbox">
							<Checkbox
								type="checkbox"
								checked={subscribed === true}
								onChange={handleChange}
								value={subscribed}
							/>
						</TableCell>
					</TableRow>
				)}
			</Fragment>
		);
	};

	return (
		<TableContainer
			sx={{
				backgroundColor: 'rgb(18, 18, 18)',
				borderRadius: '4px',
				'& .MuiTableCell-root': {
					color: 'rgb(255, 255, 255)'
				},
				'& .MuiTableHead-root': {
					fontWeight: 500
				}
			}}
		>
			<Table>
				<TableHeader />
				<TableBody
					sx={{
						borderTop: '2px solid rgb(81, 81, 81)',
						borderBottom: '2px solid rgb(81, 81, 81)',
						borderCollapse: 'collapse',
						'& tr:nth-of-type(even)': {
							backgroundColor: 'rgb(26, 32, 39)'
						},
						'& tr:nth-of-type(odd)': {
							backgroundColor: 'rgba(255, 255, 255, 0.08)'
						}
					}}
				>
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
