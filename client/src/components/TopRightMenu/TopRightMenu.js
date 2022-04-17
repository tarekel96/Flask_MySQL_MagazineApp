import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Popper from '@mui/material/Popper';

import styles from './toprightmenu.module.css';

export const TopRightMenu = ({ logout }) => {
	const [ anchorEl, setAnchorEl ] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<artcile className={styles['top-right-menu-wrapper']}>
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				className={styles['top-right-menu-btn']}
			>
				<MenuIcon className={styles['menu-icon']} />
			</Button>
			<Popper open={open} role={undefined} placement="bottom-start" transition disablePortal>
				<Menu
					className={styles['top-right-menu']}
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClick}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					MenuListProps={{
						'aria-labelledby': 'basic-button'
					}}
				>
					<Stack direction="row" spacing={2}>
						<Paper elevation="string">
							<MenuList>
								<MenuItem onClick={logout} className={styles['logout-btn']}>
									Logout
								</MenuItem>
							</MenuList>
						</Paper>
					</Stack>
				</Menu>
			</Popper>
		</artcile>
	);
};
