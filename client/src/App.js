import { Footer } from './components/Footer/Footer';
// import routes
import { routes } from './routes/routes';
// import libraries
import axios from 'axios';
// import library components
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AdminContext';
// import styles
import './styles/App.css';

function App() {
	return (
		<AuthProvider>
			<UserProvider>
				<div className="App">
					<Routes>
						{routes.map((route) => (
							<Route key={route.path} path={route.path} element={route.component} exact={route.exact} />
						))}
					</Routes>
				</div>
				<Footer className="footer" />
			</UserProvider>
		</AuthProvider>
	);
}

export default App;
