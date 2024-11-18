import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { saveCustomer } from '../customersapi';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function AddCar(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomers] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setCustomers({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        saveCustomer(customer)
            .then(() => {
                props.handleFetch();
                setCustomers({
                    firstname: "",
                    lastname: "",
                    email: "",
                    phone: "",
                    streetaddress: "",
                    postcode: "",
                    city: ""
                });
                handleClose();
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<PersonAddIcon />}
            >
                Add Customer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="firstname"
                        label="First Name"
                        value={customer.firstname}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        label="Last Name"
                        value={customer.lastname}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        value={customer.email}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Phone"
                        value={customer.phone}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        label="Street Address"
                        value={customer.streetaddress}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        label="Postcode"
                        value={customer.postcode}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        label="City"
                        value={customer.city}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        startIcon={<CancelIcon />}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
