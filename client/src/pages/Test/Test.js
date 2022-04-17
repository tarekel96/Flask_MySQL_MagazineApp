import { Fragment, useState } from 'react';
import { UserSubsTable } from '../../components/UserSubsTable/UserSubsTable';
import { TopRightMenu } from '../../components/TopRightMenu/TopRightMenu';

const Test = () => {
	const [ isOpen, toggle ] = useState(false);
	const handleClick = () => toggle((prev) => !prev);
	const logout = () => console.log('logout');
	return (
		<Fragment>
			{/*<TopRightMenu isOpen={isOpen} handleClick={handleClick} logout={logout} /> */}

			<UserSubsTable
				subs={[
					{
						id: 1,
						name: 'Cat in the Hat',
						price: 5.99,
						category: 'children',
						startDate: '10/12/2021',
						endDate: '03/01/2022'
					},
					{
						id: 2,
						name: 'Clifford the red dog',
						price: 8.99,
						category: 'children',
						startDate: '10/10/2021',
						endDate: '05/01/2022'
					},
					{
						id: 3,
						name: 'Goosebumps',
						price: 9.99,
						category: 'children',
						startDate: '08/10/2020',
						endDate: '06/01/2023'
					}
				]}
			/>
		</Fragment>
	);
};

export default Test;
