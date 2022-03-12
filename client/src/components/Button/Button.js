import styles from './button.module.css';

export const Button = (
	{ children },
	className = undefined,
	onClick = undefined,
	onSubmit = undefined,
	type = 'button'
) => {
	return (
		<button
			className={`${styles['button']} ${className !== undefined && className}`}
			onClick={onClick !== undefined && onClick}
			onSubmit={onSubmit !== undefined && onSubmit}
			type={type}
		>
			{children}
		</button>
	);
};
