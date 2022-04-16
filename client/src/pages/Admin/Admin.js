import { useState } from 'react';
import { useAuthContext } from '../../context/AdminContext';
import { Button } from '../../components/Button/Button';
import { MagItem } from '../../components/MagItem/MagItem';
import { CustItem } from '../../components/CustItem/CustItem';
import axios from 'axios';
import styles from './admin.module.css';

const Admin = () => {
	const logoutAuth = useAuthContext()['logoutAuth'];
	const [ showForm, setFormVisibility ] = useState(true);
	const [ content, setContent ] = useState([]);
	const [ userSelection, setUserSelection ] = useState('');
	const [ viewAllMags, setViewAllMags ] = useState(false);
	const [ fetchedMags, setMagFetchStatus ] = useState(false);
	const [ viewAllCust, setViewAllCust ] = useState(false);
	const [ fetchedCusts, setCustFetchStatus ] = useState(false);

	const falsifyStates = (arr) => arr.forEach((setState) => setState(false));

	const getAllMags = async () => {
		cleanForm();
		try {
			return await axios
				.get('http://127.0.0.1:5000/auth/magazine_catalog')
				.then((res) => {
					if (res.status === 201) {
						return res;
					}
					console.log(res);
				})
				.then((json) => {
					setContent(json.data);
					setMagFetchStatus(true);
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

	const layoutMags = () => {
		return content.map((item) => (
			<MagItem
				key={item.magID}
				magID={item.magID}
				magazineName={item.magazineName}
				cost={item.magazinePrice}
				category={item.category}
			/>
		));
	};

	const magIsReady = () => content.length !== 0 && fetchedMags === true;

	const getAllCust = async () => {
		cleanForm();
		try {
			return await axios
				.get('http://127.0.0.1:5000/auth/customers')
				.then((res) => {
					if (res.status === 201) {
						return res;
					}
					console.log(res);
				})
				.then((json) => {
					setContent(json.data);
					setCustFetchStatus(true);
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

	const layoutCusts = () => {
		return content.map((item) => (
			<CustItem
				key={item.custID}
				custID={item.custID}
				userName={item.userName}
				firstName={item.firstName}
				lastName={item.lastName}
			/>
		));
	};

	const custIsReady = () => content.length !== 0 && fetchedCusts === true;

	const handleUserInput = (name) => {
		setUserSelection(name);
		switch (name) {
			case 'view_all_mags':
				setUserSelection('view_all_mags');
				setViewAllMags(true);
				falsifyStates([ setViewAllCust ]);
				break;
			case 'view_all_cust':
				setUserSelection('view_all_cust');
				setViewAllCust(true);
				falsifyStates([ setViewAllMags ]);
				break;
			default:
				return '';
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		switch (userSelection) {
			case 'view_all_mags':
				falsifyStates([ setCustFetchStatus ]);
				getAllMags();
				break;
			case 'view_all_cust':
				falsifyStates([ setMagFetchStatus ]);
				getAllCust();
				break;
			default:
				return '';
		}
	};

	const toggleForm = () => {
		setFormVisibility((prevState) => !prevState);
	};

	const handleClear = () => {
		setContent([]);
		falsifyStates([ setViewAllMags, setViewAllMags ]);
	};

	const cleanForm = () => {
		setContent([]);
	};

	const retItems = () => {
		if (magIsReady()) return layoutMags();
		if (custIsReady()) return layoutCusts();
	};

	return (
		<div>
			<h1 className={styles['admin-header']}>Admin Page</h1>
			<form onSubmit={logoutAuth} className={styles['logout-btn-container']}>
				<Button type="submit">Logout</Button>
			</form>
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
								onChange={(e) => handleUserInput(e.target.name)}
							/>
						</li>
						<li>
							<label htmlFor="view_all_cust">View all customers.</label>
							<input
								type="radio"
								name="view_all_cust"
								value={viewAllCust}
								checked={viewAllCust}
								onChange={(e) => handleUserInput(e.target.name)}
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
				<div className={styles['items-container']}>{retItems()}</div>
			</div>
		</div>
	);
};

export default Admin;
