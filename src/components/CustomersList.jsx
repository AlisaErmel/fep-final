import { useState, useEffect } from 'react'
import { fetchCustomers, deleteCustomer } from '../customersapi';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining'

import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Box from "@mui/material/Box";
import { saveAs } from 'file-saver';


function CustomersList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);


    const [colDefs, setColDefs] = useState([
        { field: "firstname", filter: true, sortable: true, width: 150 },
        { field: "lastname", filter: true, sortable: true, width: 150 },
        { field: "email", filter: true, sortable: true, width: 200 },
        { field: "phone", filter: true, sortable: true, width: 200 },
        { field: "streetaddress", filter: true, sortable: true, width: 200 },
        { field: "postcode", filter: true, sortable: true, width: 150 },
        { field: "city", filter: true, sortable: true, width: 150 },
        {
            cellRenderer: params => <AddTraining handleFetch={handleFetch} customer={params.data} />,
            width: 112
        },
        {
            cellRenderer: params => <EditCustomer handleFetch={handleFetch} data={params.data} />,
            width: 100
        },
        {
            cellRenderer: params => <Button color="error" size="small" onClick={() => handleDelete(params.data._links.self.href)} startIcon={<DeleteIcon />} style={{ minWidth: 0 }}></Button>,
            width: 100
        },
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }

    const handleDelete = (url) => {
        if (window.confirm("Are you sure?")) {
            deleteCustomer(url)
                .then(() => {
                    handleFetch();
                    setOpen(true);
                })
                .catch(err => console.error(err))
        }
    }

    const exportToCSV = () => {
        const csvRows = [
            ['First Name', 'Last Name', 'Email', 'Phone', 'Streetaddress', 'Postcode', 'City'],
            ...customers.map(c => [
                c.firstname,
                c.lastname,
                c.email,
                c.phone,
                c.streetaddress,
                c.postcode,
                c.city
            ]),
        ];

        const csvContent = csvRows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'Customers.csv');
    };



    return (
        <>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }} />
            <Box sx={{ padding: 2, display: "flex", justifyContent: "flex-start" }}>
                <AddCustomer handleFetch={handleFetch} />
                <Button variant="contained" color="primary" onClick={exportToCSV} style={{ marginLeft: 16 }} startIcon={<DownloadIcon />}>
                    Export
                </Button>
            </Box>

            <div
                className="ag-theme-material"
                style={{
                    height: '100vh',
                    width: '100vw',
                }}
            >
                <AgGridReact
                    rowData={customers}
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
                message="Customer deleted"
            />
        </>
    );
}

export default CustomersList;