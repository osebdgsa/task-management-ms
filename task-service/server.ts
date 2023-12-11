import express from 'express';
import * as mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB's connection options
// to stop tslint from crying about missing properties
const options = {
    promiseLibrary: require('bluebird'), useNewUrlParser: true, useUnifiedTopology: true
};

// Connect to MongoDB
mongoose.connect('mongodb://localhost/task-service', options);

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

// Default route
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Task Service is running');
});

// Call the function to start the server
startServer();