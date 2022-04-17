// import routes
import { routes } from './routes/routes';
// import library components
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AdminContext';
// import styles
import './styles/App.css';

const App = () => {
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
			</UserProvider>
		</AuthProvider>
	);
};

export default App;
