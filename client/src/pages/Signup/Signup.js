import { SignupForm } from '../../components/Form/SignupForm';
import styles from '../../components/Form/signupform.module.css';

const Signup = () => {
	return (
		<section className={styles['signup-sub-container']}>
			<h2 className={styles['formHeader']}>Sign Up</h2>
			<SignupForm />
		</section>
	);
};

export default Signup;
