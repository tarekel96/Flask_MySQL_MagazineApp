import styles from './button.module.css';

export const Button = ({ children }, className, type = 'submit') => {
	if (type === 'submit') {
		return (
			<input
				placeholder={children}
				className={`${styles['button']} ${className !== undefined && className}`}
				type={type}
			/>
		);
	}
	return (
		<button className={`${styles['button']} ${className !== undefined && className}`} type={type}>
			{children}
		</button>
	);
};
