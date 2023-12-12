import express from 'express';
import * as mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

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


// MongoDB's connection options
// to stop tslint from crying about missing properties
const options = {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/task-service', options);

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

// Call the function to start the server
startServer();