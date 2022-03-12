import { SignupForm } from '../../components/Form/SignupForm';
import { useState } from 'react';
import styles from '../../components/Form/signupform.module.css';

const Signup = () => {
	const [ isAdmin, setUserType ] = useState(false);

	const handleSelection = (e) => {
		setUserType((prevState) => !prevState);
	};

	return (
		<section className={styles['signup-sub-container']}>
			<h2 className={styles['formHeader']}>Sign Up</h2>
			<SignupForm />
		</section>
	);
};

export default Signup;
