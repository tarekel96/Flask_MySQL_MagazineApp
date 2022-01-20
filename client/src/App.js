// import libraries
import Login from './pages/Login/Login';
import axios from 'axios';
// import styles
import './App.css';

function App() {
	const handleSubmit = (e) => {
		e.preventDefault();
		return axios
			.post('http://127.0.0.1:5000/auth/admin', {
				password: 'password'
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((e) => console.log(`Error: Unsuccessful request,\n${e}`));
	};

	return (
		<div className="App">
			Home page
			<Login />
		</div>
	);
}

export default App;
