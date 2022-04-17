import styles from './button.module.css';

export const Button = ({ children }, className, disabled, type = 'submit') => {
	if (type === 'submit') {
		return (
			<input
				placeholder={children}
				value={children}
				className={`${styles['button']} ${className !== undefined && className}`}
				type={type}
				disabled={disabled}
			/>
		);
	}
	return (
		<button
			className={`${styles['button']} ${className !== undefined && className}`}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
