import Avatar from '@mui/material/Avatar';
import styles from './profileicon.module.css';
export const ProfileIcon = () => {
	return (
		<article className={styles['profile-icon-wrapper']}>
			<Avatar
				sx={{
					height: '48px',
					width: '48px'
				}}
			/>
		</article>
	);
};
