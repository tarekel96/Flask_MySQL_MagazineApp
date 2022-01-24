// import libraries
import axios from 'axios';
// import library components
import { Routes, Route } from 'react-router-dom';
// import pages
import Login from './pages/Login/Login';
// import components
import { Container } from './components/Container/Container';
// import styles
import './styles/App.css';
import loginStyles from './pages/Login/login.module.css';

function App() {
	const LoginPage = () => (
		<Container className={loginStyles['container']}>
			<Login />
		</Container>
	);
	return (
		<div className="App">
			<Routes>
				<Route path="/" exact={true} element={<LoginPage />} />
			</Routes>
		</div>
	);
}

export default App;