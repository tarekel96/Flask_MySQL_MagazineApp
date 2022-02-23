// import routes
import { routes } from './routes/routes';
// import libraries
import axios from 'axios';
// import library components
import { Routes, Route } from 'react-router-dom';
// import styles
import './styles/App.css';

function App() {
	return (
		<div className="App">
			<Routes>
				{routes.map((route) => (
					<Route key={route.path} path={route.path} element={route.component} exact={route.exact} />
				))}
			</Routes>
		</div>
	);
}

export default App;
