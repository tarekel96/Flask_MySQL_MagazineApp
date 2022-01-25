import { useState, useEffect } from 'react';
import { MagItem } from '../../components/MagItem/MagItem';
import axios from 'axios';
import styles from './admin.module.css';

const Admin = () => {
	const [ content, setContent ] = useState([]);
	const [ userSelection, setUserSelection ] = useState('view_all_mags');
	const [ viewAllMags, setViewAllMags ] = useState(false);

	const getAllMags = () => {
		return axios
			.get('http://127.0.0.1:5000/auth/magazine_catalog')
			.then((res) => {
				if (res.status === 201) {
					return res;
				}
				console.log(res);
			})
			.then((json) => {
				setContent(json.data);
			})
			.catch((e) => {
				console.log(e);
				alert(e);
			});
	};

	const handleUserinput = (name) => {
		setUserSelection(name);
		switch (name) {
			case 'view_all_mags':
				setUserSelection('view_all_mags');
				setViewAllMags(true);
				break;
			default:
				return '';
		}
	};

	const handleSubmit = (e) => {
		getAllMags();
		e.preventDefault();
		console.log('CONTENT');
		console.log(content);
	};

	return (
		<div>
			<h1>Admin Page</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<ol>
					<li>
						<label>View all magazines.</label>
						<input
							type="radio"
							name="view_all_mags"
							value={viewAllMags}
							checked={viewAllMags}
							onChange={(e) => handleUserinput(e.target.name)}
						/>
						<input type="submit" />
					</li>
				</ol>
			</form>
			<div className={styles['grid-container']}>
				<div className={styles['items-container']}>
					{content.map((item) => (
						<MagItem
							key={item.magID}
							magID={item.magID}
							magazineName={item.magazineName}
							cost={item.magazinePrice}
							category={item.category}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Admin;
