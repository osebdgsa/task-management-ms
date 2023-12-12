import express from 'express';
import * as mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

const username = process.env.MONGO_INITDB_ROOT_USERNAME || 'admin';
const password = process.env.MONGO_INITDB_ROOT_PASSWORD || 'admin';

// Connect to MongoDB
const connectWithRetry = async () => {
    try {
        await mongoose.connect(`mongodb://${username}:${password}@mongo:27017/task-service`, {});
        console.log('Connected to MongoDB');

        // Call the function to start the server
        startServer();
    } catch (err) {
        console.error('Failed to connect to MongoDB. Retrying in 5 seconds...', err);
        setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
    }
};

connectWithRetry().catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Handling OPTIONS requests
// this is a hacky way of doing it
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200,
};

app.options('*',cors(corsOptions));
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Start the server
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({ message: err.message });
});


// Routes
app.use('/tasks', taskRoutes);