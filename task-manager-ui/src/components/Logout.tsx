import React from 'react';
import { Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('You have been logged out.');
        navigate('/login'); // Redirect after logout
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <form style={{ width: '300px', textAlign: 'center' }}>
                <Typography variant="h4">Logout</Typography>
                <Box my={2}>
                    <Button onClick={handleOpen} variant="contained" color="primary" fullWidth>
                        Logout
                    </Button>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to logout?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleLogout} color="primary">
                            Logout
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </Box>
    );
};

export default Logout;
