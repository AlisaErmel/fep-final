import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { saveTraining } from '../trainingsapi';
import MenuItem from '@mui/material/MenuItem';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import PropTypes from 'prop-types';

export default function AddTraining({ handleFetch, customer }) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        activity: "",
        date: dayjs(),
        duration: "",
        customer: customer._links.self.href
    });

    const [activities, setActivities] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
        fetchActivities();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDateChange = (newDate) => {
        setTraining({ ...training, date: newDate });
    };

    const handleSave = () => {
        const isoDate = training.date.toISOString();
        const newTraining = { ...training, date: isoDate };

        saveTraining(newTraining)
            .then(() => {
                handleFetch();
                setTraining({
                    activity: "",
                    date: dayjs(),
                    duration: "",
                    customer: customer._links.self.href
                });
                handleClose();
            })
            .catch(err => console.error(err));
    };

    const fetchActivities = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL2);
            const data = await response.json();
            const uniqueActivities = Array.from(new Set(data.map(train => train.activity)));
            setActivities(uniqueActivities);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    return (
        <>
            <Button onClick={handleClickOpen} startIcon={<AddCircleOutlineIcon />}></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Add Training ({customer.firstname} {customer.lastname})
                </DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        margin="dense"
                        name="activity"
                        label="Activity"
                        value={training.activity}
                        onChange={(e) => setTraining({ ...training, activity: e.target.value })}
                        fullWidth
                        variant="standard"
                    >
                        {activities.map((activity, index) => (
                            <MenuItem key={index} value={activity}>
                                {activity}
                            </MenuItem>
                        ))}
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                                label="Date"
                                value={training.date}
                                onChange={handleDateChange}
                                ampm={true}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        name="duration"
                        label="Duration (min)"
                        value={training.duration}
                        onChange={(e) => setTraining({ ...training, duration: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} startIcon={<CancelIcon />}>Cancel</Button>
                    <Button onClick={handleSave} startIcon={<SaveIcon />}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

AddTraining.propTypes = {
    handleFetch: PropTypes.func.isRequired,
    customer: PropTypes.shape({
        _links: PropTypes.shape({
            self: PropTypes.shape({
                href: PropTypes.string.isRequired,
            }).isRequired
        }).isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired
    }).isRequired
};