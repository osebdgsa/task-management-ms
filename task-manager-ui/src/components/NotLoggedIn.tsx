import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotLoggedIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            // No token found, redirect to the Not Logged In page or login route
            navigate('/not-logged-in');
        }
    }, [navigate]);

    return (
        <div>
            <Typography variant="h4">You are not logged in.</Typography>
            <Typography variant="body1">Please log in to access this page.</Typography>
        </div>
    );
};

export default NotLoggedIn;
