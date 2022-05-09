import Button from '@mui/material/Button';
import { ButtonSx } from '../../../styles/MUI_styles';
import { useAuthContext } from '../../../context/AdminContext';
import axios from 'axios';
import { MaterialModal } from '../../Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// @ts-ignore
import styles from './adminform.module.css';
export const AdminForm = () => {
	const [ statusCode, setStatusCode ] = useState(-1);
	const [ modal, setModal ] = useState(false);
	const toggleModal = () => setModal((prev) => !prev);
	const handleClose = () => {
		toggleModal();
		if (statusCode === 201) {
			navigate('/admin');
		}
	};

	const [ modalTitle, setModalTitle ] = useState('');
	const [ modalMsg, setModalMsg ] = useState('');

	const authenticateAdmin = useAuthContext()['authenticateAdmin'];
	let navigate = useNavigate();

	const [ password, setPassword ] = useState('');
	const handleChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		return axios
			.post('http://127.0.0.1:5000/auth/admin', JSON.stringify({ password }), {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				setStatusCode(res.status);
				if (res.status === 201) {
					authenticateAdmin({ admin: 'admin' });
					setModalTitle('Success:');
					setModalMsg(res.data);
					toggleModal();
					console.log(res.data);
				}
				else if (res.status === 401) {
					setModalTitle('Error:');
					setModalMsg(res.data);
					toggleModal();
				}
			})
			.catch((e) => {
				console.log(e);
				setModalTitle('Error Message:');
				setModalMsg(String(e));
				toggleModal();
			});
	};
	return (
		<form className={styles['admin-form']} onSubmit={(e) => handleSubmit(e)}>
			<div className={styles['admin-form-body']}>
				<div>
					<input
						onChange={(e) => handleChange(e)}
						value={password}
						type="password"
						name="password"
						placeholder="Password.."
						className={styles['password-input']}
					/>
					<MaterialModal title={modalTitle} message={modalMsg} open={modal} handleClose={handleClose} />
				</div>
				<Button type="submit" sx={ButtonSx} disabled={password === ''}>
					Authenticate
				</Button>
			</div>
		</form>
	);
};
