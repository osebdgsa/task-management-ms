import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

const username = process.env.MONGO_INITDB_ROOT_USERNAME || 'admin';
const password = process.env.MONGO_INITDB_ROOT_PASSWORD || 'admin';

const connectWithRetry = async () => {
    try {
        await mongoose.connect(`mongodb://${username}:${password}@mongo:27017/user-authentication-service`, {});
        console.log('Connected to MongoDB');
        startServer();
    } catch (err) {
        console.error('Failed to connect to MongoDB. Retrying in 5 seconds...', err);
        setTimeout(connectWithRetry, 5000);
    }
};

app.use(cors({
    credentials: true,
    preflightContinue: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH' , 'DELETE', 'OPTIONS'],
    origin: true
}));

// Middleware
app.use(express.json());

app.use('/api/auth', authRoutes);
connectWithRetry().catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({ message: err.message });
});
// Start the server
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};