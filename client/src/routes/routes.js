import { RequireAuth, RequireAdminAuth } from '../auth/auth';
import { Fragment } from 'react';
import Login from '../pages/Login/Login';
import Admin from '../pages/Admin/Admin';
import User from '../pages/User/User';
import NotFound from '../pages/NotFound/NotFound';
import Test from '../pages/Test/Test';
import Signup from '../pages/Signup/Signup';
import Catalog from '../pages/Catalog/Catalog';
import { Footer } from '../components/Footer/Footer';
import { Container } from '../components/Container/Container';
import loginStyles from '../pages/Login/login.module.css';
import adminStyles from '../pages/Admin/admin.module.css';
import { TopLeftMenu } from '../components/TopLeftMenu/TopLeftMenu';

const LoginPage = () => {
	return (
		<Container className={loginStyles['container']}>
			<Login />
			<Footer className="footer" />
		</Container>
	);
};

const SignupPage = () => {
	return (
		<Fragment>
			<Signup />
			<Footer className="footer" />
		</Fragment>
	);
};

const UserPage = () => {
	return (
		<Container>
			<User />
			<TopLeftMenu />
			<Footer className="footer" />
		</Container>
	);
};

const AdminPage = () => {
	return (
		<Container className={adminStyles['container']}>
			<Admin />
			<Footer className="footer" />
		</Container>
	);
};

const CatalogPage = () => {
	return (
		<Fragment>
			<Catalog />
			<TopLeftMenu />
			<Footer className="footer" />
		</Fragment>
	);
};

export const routes = [
	{
		path: '/',
		component: <LoginPage />,
		exact: true
	},
	{
		path: '/signup',
		component: <SignupPage />,
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
				<CatalogPage />
			</RequireAuth>
		),
		exact: true
	},
	{
		path: '/test',
		component: (
			<Fragment>
				<Test />
				<Footer className="footer" />
			</Fragment>
		),
		exact: true
	},
	{
		path: '/*',
		component: (
			<Fragment>
				<NotFound />
				<Footer className="footer" />
			</Fragment>
		),
		exact: false
	}
];
