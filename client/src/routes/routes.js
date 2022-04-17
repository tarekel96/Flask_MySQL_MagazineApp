import { RequireAuth, RequireAdminAuth } from '../auth/auth';
import Login from '../pages/Login/Login';
import Admin from '../pages/Admin/Admin';
import User from '../pages/User/User';
import NotFound from '../pages/NotFound/NotFound';
import Test from '../pages/Test/Test';
import Signup from '../pages/Signup/Signup';
import Catalog from '../pages/Catalog/Catalog';
import { TopRightMenu } from '../components/TopRightMenu/TopRightMenu';
import { Container } from '../components/Container/Container';
import loginStyles from '../pages/Login/login.module.css';
import adminStyles from '../pages/Admin/admin.module.css';

const LoginPage = () => (
	<Container className={loginStyles['container']}>
		<Login />
	</Container>
);

const UserPage = () => {
	return (
		<Container>
			<User />
			<TopRightMenu />
		</Container>
	);
};

const AdminPage = () => (
	<Container className={adminStyles['container']}>
		<Admin />
	</Container>
);

export const routes = [
	{
		path: '/',
		component: <LoginPage />,
		exact: true
	},
	{
		path: '/signup',
		component: <Signup />,
		exact: true
	},
	{
		path: '/admin',
		component: (
			<RequireAdminAuth>
				<AdminPage />
			</RequireAdminAuth>
		),
		exact: true
	},
	{
		path: '/dashboard/:id',
		component: (
			<RequireAuth>
				<UserPage />
			</RequireAuth>
		),
		exact: true
	},
	{
		path: '/catalog/:id',
		component: (
			<RequireAuth>
				<Catalog />
				<TopRightMenu />
			</RequireAuth>
		),
		exact: true
	},
	{
		path: '/test',
		component: <Test />,
		exact: true
	},
	{
		path: '/*',
		component: <NotFound />,
		exact: false
	}
];
