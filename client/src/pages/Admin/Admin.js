import { useState } from 'react';
import axios from 'axios';

const Admin = () => {
	const [ content, setContent ] = useState([]);
	const [ userSelection, setUserSelection ] = useState('view_all_mags');
	const [ viewAllMags, setViewAllMags ] = useState(false);

	const getAllMags = () => {
		return axios
			.post('http://127.0.0.1:5000/auth/magazine_catalog', {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log(res);
				if (res.status === 201) {
					return res;
				}
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
		e.preventDefault();
		setContent(getAllMags());
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
					</li>
				</ol>
			</form>
			<ul>{content.map((item) => <li>{item}</li>)}</ul>
		</div>
	);
};

export default Admin;
