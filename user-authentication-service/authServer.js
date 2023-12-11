const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Mock user data (for demonstration purposes)
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
];

// Middleware for basic authentication
const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const username = auth[0];
        const password = auth[1];
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            next();
        } else {
            res.status(401).send('Unauthorized');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Protected route
app.get('/secure', basicAuth, (req, res) => {
    res.send('Access Granted');
});

// Unprotected route
app.get('/', (req, res) => {
    res.send('Welcome to User Authentication Service');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Authentication server running on port ${PORT}`);
});
