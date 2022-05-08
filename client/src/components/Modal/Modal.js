import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
// @ts-ignore
import styles from './modal.module.css';
export const MaterialModal = ({ title, message, open, handleClose }) => {
	const style = {
		position: 'absolute',
		top: '33%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		p: 4,
		backgroundColor: 'rgb(18, 18, 18)',
		border: '2px solid rgb(0, 0, 0)',
		boxShadow:
			'rgb(0 0 0 / 20%) 0px 11px 15px -7px, rgb(0 0 0 / 14%) 0px 24px 38px 3px, rgb(0 0 0 / 12%) 0px 9px 46px 8px',
		padding: '32px'
	};
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<h2 id="modal-modal-title" className={styles['modal-title']}>
					{title}
				</h2>
				<div className={styles['modal-x-close-btn-container']}>
					<Button
						variant="outlined"
						color="error"
						size="small"
						disableElevation={true}
						sx={{
							fontWeight: 500,
							fontSize: 20
						}}
						onClick={handleClose}
					>
						&times;
					</Button>
				</div>
				<p id="modal-modal-description">{message}</p>
			</Box>
		</Modal>
	);
};
