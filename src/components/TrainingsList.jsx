import { useState, useEffect } from 'react'
import { fetchTrainings, deleteTrainings } from '../trainingsapi';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

import DeleteIcon from '@mui/icons-material/Delete';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import dayjs from 'dayjs';


function TrainingsList() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);


    const [colDefs, setColDefs] = useState([
        { field: "activity", filter: true, sortable: true, width: 250 },
        {
            field: "date",
            headerName: "Date",
            filter: true,
            sortable: true,
            width: 300,
            valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm a')
        },
        { field: "duration", filter: true, sortable: true, width: 200 },
        {
            field: "customer",
            headerName: "Customer",
            filter: true,
            sortable: true,
            width: 200,
            valueGetter: params => params.data.customer ?
                `${params.data.customer.firstname} ${params.data.customer.lastname}` : ''
        },
        {
            cellRenderer: params => <Button color="error" size="small" onClick={() => handleDelete(params.data.id)} startIcon={<DeleteIcon />} style={{ minWidth: 0 }}></Button>,
            width: 100
        },
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchTrainings()
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteTrainings(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`)
                .then(() => {
                    handleFetch();
                    setOpen(true);
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <>
            <div
                className="ag-theme-material"
                style={{
                    height: '100vh',
                    width: '100vw',
                }}
            >
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Training deleted"
            />
        </>
    );
}

export default TrainingsList;