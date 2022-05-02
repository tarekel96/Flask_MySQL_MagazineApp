export const ButtonSx = {
	color: 'rgb(255, 255, 255)',
	backgroundColor: '#20df7f',
	boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
	borderRadius: '10px',
	width: '300px',
	height: '45px',
	'&:hover': {
		cursor: 'pointer',
		backgroundColor: '#20df7f',
		opacity: '0.75'
	},
	'&:disabled': {
		cursor: 'not-allowed'
	}
};
