import { SignupForm } from '../../components/Form/User/Signup/SignupForm';
import styles from '../../components/Form/User/Signup/signupform.module.css';

const Signup = () => {
	return (
		<section className={styles['signup-sub-container']}>
			<h2 className={styles['formHeader']}>Sign Up</h2>
			<SignupForm />
		</section>
	);
};

export default Signup;
