import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import {register} from "../services/authHttpService";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [registrationError, setRegistrationError] = useState('');

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
        setPasswordMatchError('');
        setRegistrationError('');
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
        setPasswordMatchError('');
        setRegistrationError('');
    };

    const handleConfirmPasswordChange = (e: any) => {
        setConfirmPassword(e.target.value);
        setPasswordMatchError('');
        setRegistrationError('');
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordMatchError('Passwords do not match');
            return;
        }

        try {
            const response = await register({
                username,
                password,
            });
            console.log(response.data); // Handle successful registration
        } catch (error) {
            setRegistrationError('Registration failed. Please try again.'); // Handle registration error
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <form onSubmit={handleSubmit} style={{ width: '300px', textAlign: 'center' }}>
                <Typography variant="h4">Register</Typography>
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
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        fullWidth
                    />
                    {passwordMatchError && (
                        <Alert severity="error">{passwordMatchError}</Alert>
                    )}
                </Box>
                <Box my={2}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </Box>
                {registrationError && (
                    <Alert severity="error">{registrationError}</Alert>
                )}
            </form>
        </Box>
    );
};

export default Register;
