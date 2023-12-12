import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {login} from "../services/authHttpService";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/logout'); // Redirect to logout if the user is already logged in
        }
    }, [navigate]);

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
        setLoginError('');
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
        setLoginError('');
    };

    const handleLogin = async () => {
        try {
            const response = await login({
                username,
                password
            })

            localStorage.setItem('token', response.data.token); // Store token in local storage
            // Redirect or navigate to another page upon successful login
            // Replace this with your navigation logic
            navigate('/tasks');
        } catch (error) {
            setLoginError('Login failed. Please check your credentials.');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <form style={{ width: '300px', textAlign: 'center' }}>
                <Typography variant="h4">Login</Typography>
                <Box my={2}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={handleUsernameChange}
                        fullWidth
                    />
                </Box>
                <Box my={2}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        fullWidth
                    />
                </Box>
                <Box my={2}>
                    <Button onClick={handleLogin} variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </Box>
                {loginError && (
                    <Alert severity="error">{loginError}</Alert>
                )}
            </form>
        </Box>
    );
};

export default Login;
