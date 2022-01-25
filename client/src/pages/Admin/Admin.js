import { useState, useEffect } from 'react';
import { MagItem } from '../../components/MagItem/MagItem';
import axios from 'axios';
import styles from './admin.module.css';

const Admin = () => {
	const [ showForm, setFormVisibility ] = useState(true);
	const [ content, setContent ] = useState([]);
	const [ userSelection, setUserSelection ] = useState('view_all_mags');
	const [ viewAllMags, setViewAllMags ] = useState(false);

	const getAllMags = () => {
		try {
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
		} catch (e) {
			console.log('An error occurred in fetching the data; see below:');
			console.log(e);
		}
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

	const toggleForm = () => {
		setFormVisibility((prevState) => !prevState);
	};

	const handleClear = () => {
		setContent([]);
	};

	return (
		<div>
			<h1 className={styles['admin-header']}>Admin Page</h1>
			{!showForm ? (
				<div className={styles['show-btn-wrapper']}>
					<button className={styles['show-btn']} onClick={toggleForm}>
						Show Form
					</button>
				</div>
			) : (
				''
			)}
			{showForm ? (
				<form className={styles['radio-form']} onSubmit={(e) => handleSubmit(e)}>
					<span className={styles['form-hide-btn']} onClick={toggleForm}>
						Hide
					</span>
					<h3>Options: </h3>
					<ol>
						<li>
							<label htmlFor="view_all_mags">View all magazines.</label>
							<input
								type="radio"
								name="view_all_mags"
								value={viewAllMags}
								checked={viewAllMags}
								onChange={(e) => handleUserinput(e.target.name)}
							/>
						</li>
						<li>
							<label htmlFor="view_all_cust">View all customers.</label>
							<input
								type="radio"
								name="view_all_cust"
								// value={viewAllMags}
								// checked={viewAllMags}
								// onChange={(e) => handleUserinput(e.target.name)}
							/>
						</li>
						<li>
							<label htmlFor="mags_avg_cost_cat">
								View average costs of magazines across categories.
							</label>
							<input
								type="radio"
								name="mags_avg_cost_cat"
								// value={viewAllMags}
								// checked={viewAllMags}
								// onChange={(e) => handleUserinput(e.target.name)}
							/>
						</li>
						<li>
							<label htmlFor="get_all_mags_by_year">View magazines by year.</label>
							<input
								type="radio"
								name="get_all_mags_by_year"
								// value={viewAllMags}
								// checked={viewAllMags}
								// onChange={(e) => handleUserinput(e.target.name)}
							/>
						</li>
						<li>
							<label htmlFor="get_all_cust_by_city">View all customers by city.</label>
							<input
								type="radio"
								name="get_all_cust_by_city"
								// value={viewAllMags}
								// checked={viewAllMags}
								// onChange={(e) => handleUserinput(e.target.name)}
							/>
						</li>
						<li>
							<label htmlFor="get_all_cust_prof">View all customer profiles.</label>
							<input
								type="radio"
								name="get_all_cust_prof"
								// value={viewAllMags}
								// checked={viewAllMags}
								// onChange={(e) => handleUserinput(e.target.name)}
							/>
						</li>
						<li>
							<label htmlFor="get_all_mag_subs">View all magazine subscriptions.</label>
							<input
								type="radio"
								name="get_all_mag_subs"
								// value={viewAllMags}
								// checked={viewAllMags}
								// onChange={(e) => handleUserinput(e.target.name)}
							/>
						</li>
						<li>
							<label htmlFor="max_cat_by_zip">View top categories by zip code.</label>
							<input
								type="radio"
								name="max_cat_by_zip"
								// value={viewAllMags}
								// checked={viewAllMags}
								// onChange={(e) => handleUserinput(e.target.name)}
							/>
						</li>
						<div className={styles['submit-btn-wrapper']}>
							<input type="submit" />
							<button type="button" className={styles['clear-btn']} onClick={handleClear}>
								Clear
							</button>
						</div>
					</ol>
				</form>
			) : (
				''
			)}
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
