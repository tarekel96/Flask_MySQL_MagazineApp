import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useUserContext } from '../../context/UserContext';
import { Loading } from '../../components/Loading/Loading';
import { CatalogBanner } from '../../components/CatalogBanner/CatalogBanner';
import axios from 'axios';
import styles from './catalog.module.css';

const columns = [
	{ field: 'magID', headerName: 'ID', flex: true },
	{ field: 'magazineName', headerName: 'Name', flex: true },
	{
		field: 'cost',
		headerName: 'Monthly Cost',
		flex: true,

		valueGetter: (params) => `$ ${params.row.cost}`
	},
	{
		field: 'category',
		headerName: 'Category',
		flex: true
	}
];

const Catalog = () => {
	const [ data, setData ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	const setCart = useUserContext()['setCart'];

	const fetchCatalog = () => {
		try {
			axios
				.get('http://127.0.0.1:5000/auth/magazine_catalog')
				.then((res) => {
					if (res.status === 201) {
						return res;
					}
					console.log(res);
				})
				.then((json) => {
					setData(json.data);
					setLoading(false);
				})
				.catch((e) => {
					console.log(e);
					alert(e);
				});
		} catch (e) {
			console.log('An error occurred in fetching the data; see below:');
			console.log(e);
		}
	};

	useEffect(() => {
		fetchCatalog();
	}, []);

	return (
		<section className={styles['catalog-page']}>
			{!loading && <CatalogBanner />}
			{data.length === 0 || loading ? (
				<Loading />
			) : (
				<DataGrid
					autoHeight={true}
					getRowId={(r) => r.magID}
					sx={{
						color: 'rgb(255, 255, 255)',
						'& .MuiDataGrid-row:nth-of-type(even)': {
							backgroundColor: 'rgb(26, 32, 39)'
						},
						'& .MuiDataGrid-row:nth-of-type(odd)': {
							backgroundColor: 'rgb(10, 25, 41)'
						},
						'& .MuiDataGrid-columnHeader': {
							backgroundColor: 'rgb(18, 18, 18)'
						},
						'&  .MuiDataGrid-columnHeadersInner': {
							backgroundColor: 'rgb(18, 18, 18)'
						},
						'&  MuiDataGrid-columnHeadersInner--scrollable': {
							backgroundColor: 'rgb(18, 18, 18)'
						},
						'& .MuiDataGrid-iconButtonContainer': {
							backgroundColor: 'rgb(18, 18, 18)'
						},
						'& .MuiDataGrid-iconSeparator': {
							backgroundColor: 'rgb(18, 18, 18)'
						},
						'& .MuiDataGrid-columnSeparator--sideRight': {
							backgroundColor: 'rgb(18, 18, 18)',
							color: 'rgb(18,18,18)'
						},
						'& .MuiDataGrid-footerContainer': {
							color: 'rgb(255, 255, 255)',
							backgroundColor: 'rgb(18, 18, 18)'
						},
						'& .MuiTablePagination-toolbar': {
							color: 'rgb(255, 255, 255)'
						}
					}}
					rows={data}
					columns={columns}
					pageSize={20}
					rowsPerPageOptions={[ 20 ]}
					checkboxSelection
					onSelectionModelChange={(selectedData) => setCart(selectedData)}
				/>
			)}
		</section>
	);
};

export default Catalog;
