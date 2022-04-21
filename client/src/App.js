// import routes
import { routes } from './routes/routes';
// import library components
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AdminContext';
import { CartProvider } from './context/CartContext';
// import styles
import './styles/App.css';

const App = () => {
	return (
		<AuthProvider>
			<UserProvider>
				<CartProvider>
					<div className="App">
						<Routes>
							{routes.map((route) => (
								<Route
									key={route.path}
									path={route.path}
									element={route.component}
									exact={route.exact}
								/>
							))}
						</Routes>
					</div>
				</CartProvider>
			</UserProvider>
		</AuthProvider>
	);
};

export default App;
