import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AdminContext';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HideSourceIcon from '@mui/icons-material/HideSource';
import { ButtonSx } from '../../styles/MUI_styles';
import { MagItem } from '../../components/MagItem/MagItem';
import { CustItem } from '../../components/CustItem/CustItem';
import {
	AnimatedAxis, // any of these can be non-animated equivalents
	AnimatedGrid,
	AnimatedBarSeries,
	XYChart,
	Tooltip,
	buildChartTheme
} from '@visx/xychart';
import axios from 'axios';
// @ts-ignore
import styles from './admin.module.css';

const Admin = () => {
	let navigate = useNavigate();
	const admin = useAuthContext()['admin'];
	const setAdmin = useAuthContext()['isAdmin'];
	const logoutAuth = useAuthContext()['logoutAuth'];
	const [ showForm, setFormVisibility ] = useState(true);
	const [ content, setContent ] = useState([]);
	const [ userSelection, setUserSelection ] = useState('');

	const [ viewAllMags, setViewAllMags ] = useState(false);
	const [ fetchedMags, setMagFetchStatus ] = useState(false);

	const [ viewAllCust, setViewAllCust ] = useState(false);
	const [ fetchedCusts, setCustFetchStatus ] = useState(false);

	const [ viewAvgCatCost, setViewAvgCatCost ] = useState(false);
	const [ fetchedAvgCatCost, setAvgCatCostStatus ] = useState(false);

	const falsifyStates = (arr) => arr.forEach((setState) => setState(false));

	useEffect(() => {
		const savedAdmin = JSON.parse(window.localStorage.getItem('admin'));
		console.log(savedAdmin);
		if (admin === null && (savedAdmin === null || savedAdmin === undefined)) {
			navigate('/');
		}
		else if (admin === null && savedAdmin !== null && savedAdmin !== undefined) {
			setAdmin(savedAdmin);
		}
	}, []);

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

	const getAvgCatCost = async () => {
		cleanForm();
		try {
			return await axios
				.get('http://127.0.0.1:5000/auth/avg_cost_category')
				.then((res) => {
					if (res.status === 201) {
						return res;
					}
					console.log(res);
				})
				.then((json) => {
					setContent(json.data);
					setAvgCatCostStatus(true);
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

	const layoutAvgCost = () => {
		let data = [];
		let labels = [];
		for (let i = 0; i < content.length; ++i) {
			let currentData = {
				x: content[i].category,
				y: content[i].AverageCost
			};
			data.push(currentData);
			labels.push(content[i].category);
		}
		console.log(data);
		console.log(labels);
		const accessors = {
			xAccessor: (d) => d.x,
			yAccessor: (d) => d.y
		};

		const customTheme = buildChartTheme({
			// colors
			colors: [ '#20df7f', '#aef' ], // categorical colors, mapped to series via `dataKey`s
			backgroundColor: 'rgb(18, 18, 18)',
			svgLabelSmall: { color: '#20df7f', fontWeight: 700, fill: '#20df7f' },
			// labels
			// svgLabelBig?: SVGTextProps;
			// svgLabelSmall?: SVGTextProps;
			// htmlLabel?: HTMLTextStyles;

			// // lines
			// xAxisLineStyles?: LineStyles;
			// yAxisLineStyles?: LineStyles;
			// xTickLineStyles: { className: "ticks" }
			// yTickLineStyles?: LineStyles;
			tickLength: 4,

			// // grid
			gridColor: 'lightgrey',
			gridColorDark: 'black' // used for axis baseline if x/yxAxisLineStyles not set
			// gridStyles?: CSSProperties;
		});

		return (
			<XYChart
				theme={customTheme}
				height={500}
				xScale={{ type: 'band', paddingInner: 0.5 }}
				yScale={{ type: 'linear' }}
			>
				<AnimatedAxis hideAxisLine={true} hideTicks={true} orientation="left" />
				<AnimatedGrid rows={true} columns={false} numTicks={16} />
				<AnimatedBarSeries dataKey="Category" data={data} {...accessors} />

				<Tooltip
					// snapTooltipToDatumX
					// snapTooltipToDatumY
					// showVerticalCrosshair
					// showSeriesGlyphs
					renderTooltip={({ tooltipData, colorScale }) => (
						<div>
							<div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
								{tooltipData.nearestDatum.key}
							</div>
							{accessors.xAccessor(tooltipData.nearestDatum.datum).toString()}
							{', '}
							{accessors.yAccessor(tooltipData.nearestDatum.datum)}
						</div>
					)}
				/>
			</XYChart>
		);

		//return JSON.stringify(content);
	};

	const avgCatCostReady = () => content.length !== 0 && fetchedAvgCatCost === true;

	const handleUserInput = (name) => {
		setUserSelection(name);
		switch (name) {
			case 'view_all_mags':
				setUserSelection('view_all_mags');
				setViewAllMags(true);
				falsifyStates([ setViewAllCust, setAvgCatCostStatus ]);
				break;
			case 'view_all_cust':
				setUserSelection('view_all_cust');
				setViewAllCust(true);
				falsifyStates([ setViewAllMags, setAvgCatCostStatus ]);
				break;
			case 'avg_cat_cost':
				setUserSelection('avg_cat_cost');
				setViewAvgCatCost(true);
				falsifyStates([ setViewAllCust, setViewAllMags ]);
				break;
			default:
				return '';
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		switch (userSelection) {
			case 'view_all_mags':
				falsifyStates([ setCustFetchStatus, setAvgCatCostStatus ]);
				getAllMags();
				break;
			case 'view_all_cust':
				falsifyStates([ setMagFetchStatus, setAvgCatCostStatus ]);
				getAllCust();
				break;
			case 'avg_cat_cost':
				falsifyStates([ setCustFetchStatus, setMagFetchStatus ]);
				getAvgCatCost();
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
		falsifyStates([ setViewAllMags, setViewAllMags, setViewAvgCatCost ]);
	};

	const cleanForm = () => {
		setContent([]);
	};

	const retItems = () => {
		if (magIsReady()) return layoutMags();
		if (custIsReady()) return layoutCusts();
		if (avgCatCostReady()) return layoutAvgCost();
	};

	return (
		<div>
			<h1 className={styles['admin-header']}>Admin Page</h1>
			<form onSubmit={logoutAuth} className={styles['logout-btn-container']}>
				<Button type="submit" sx={ButtonSx}>
					Logout
				</Button>
			</form>
			{!showForm ? (
				<div className={styles['show-btn-wrapper']}>
					<Button sx={ButtonSx} onClick={toggleForm} variant="outlined">
						Show Form
					</Button>
				</div>
			) : (
				''
			)}
			{showForm ? (
				<form className={styles['radio-form']} onSubmit={(e) => handleSubmit(e)}>
					<span className={styles['form-hide-btn']} onClick={toggleForm}>
						<HideSourceIcon />
					</span>
					<h3>Options: </h3>
					<ol>
						<li>
							<label htmlFor="view_all_mags">View all magazines.</label>
							<input
								type="radio"
								name="view_all_mags"
								checked={viewAllMags}
								onChange={(e) => handleUserInput(e.target.name)}
							/>
						</li>
						<li>
							<label htmlFor="view_all_cust">View all customers.</label>
							<input
								type="radio"
								name="view_all_cust"
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
								name="avg_cat_cost"
								checked={viewAvgCatCost}
								onChange={(e) => handleUserInput(e.target.name)}
							/>
						</li>
						<li>
							<label htmlFor="get_all_mags_by_year">View magazines by year.</label>
							<input type="radio" name="get_all_mags_by_year" disabled={true} />
						</li>
						<li>
							<label htmlFor="get_all_cust_by_city">View all customers by city.</label>
							<input type="radio" name="get_all_cust_by_city" disabled={true} />
						</li>
						<li>
							<label htmlFor="get_all_cust_prof">View all customer profiles.</label>
							<input type="radio" name="get_all_cust_prof" disabled={true} />
						</li>
						<li>
							<label htmlFor="get_all_mag_subs">View all magazine subscriptions.</label>
							<input type="radio" name="get_all_mag_subs" disabled={true} />
						</li>
						<li>
							<label htmlFor="max_cat_by_zip">View top categories by zip code.</label>
							<input type="radio" name="max_cat_by_zip" disabled={true} />
						</li>
						<div className={styles['submit-btn-wrapper']}>
							<Button
								type="button"
								onClick={handleClear}
								variant="outlined"
								color="error"
								sx={{
									'&:hover': {
										cursor: 'pointer'
									}
								}}
								endIcon={<DeleteForeverIcon />}
							>
								Clear
							</Button>
							<Button
								type="submit"
								variant="outlined"
								sx={{
									color: '#20df7f',
									borderColor: '#20df7f',
									'&:hover': {
										color: '#20df7f',
										borderColor: '#20df7f',
										cursor: 'pointer'
									}
								}}
								endIcon={
									<KeyboardArrowUpIcon
										sx={{
											transform: 'rotate(90deg)'
										}}
									/>
								}
							>
								Submit
							</Button>
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
