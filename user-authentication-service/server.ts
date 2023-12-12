import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    credentials: true,
    preflightContinue: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH' , 'DELETE', 'OPTIONS'],
    origin: true
}));

// Middleware
app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://mongo:27017/user-authentication-service', {})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Connection to MongoDB failed:', error);
    });
