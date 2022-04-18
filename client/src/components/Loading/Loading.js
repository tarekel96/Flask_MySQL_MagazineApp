import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './loading.module.css';

export const Loading = () => {
	return (
		<Box sx={{ display: 'flex', height: '90vh', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
			<CircularProgress color="success" size={96} />
		</Box>
	);
};
export const SmallLoading = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<CircularProgress className={styles['loadingSectionSmall']} color="success" />
		</Box>
	);
};
