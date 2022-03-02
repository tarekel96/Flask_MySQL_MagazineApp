import Login from '../pages/Login/Login';
import Admin from '../pages/Admin/Admin';
import User from '../pages/User/User';
import NotFound from '../pages/NotFound/NotFound';
import { Container } from '../components/Container/Container';
import loginStyles from '../pages/Login/login.module.css';

const LoginPage = () => (
	<Container className={loginStyles['container']}>
		<Login />
	</Container>
);

const UserPage = () => (
	<Container>
		<User />
	</Container>
);

export const routes = [
	{
		path: '/',
		component: <LoginPage />,
		exact: true
	},
	{
		path: '/admin',
		component: <Admin />,
		exact: true
	},
	{
		path: '/dashboard/:id',
		component: <UserPage />,
		exact: true
	},
	{
		path: '/*',
		component: <NotFound />,
		exact: false
	}
];
