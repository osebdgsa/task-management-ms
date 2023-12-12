import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link as RouterLink,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import { Button, Box } from '@mui/material';
const Navigation = () => {
    return (
        <Box display="flex" justifyContent="center" my={2}>
            <Button component={RouterLink} to="/" variant="contained" color="primary" sx={{ mx: 1 }}>
                Login
            </Button>
            <Button component={RouterLink} to="/register" variant="contained" color="primary" sx={{ mx: 1 }}>
                Register
            </Button>
            <Button component={RouterLink} to="/tasks" variant="contained" color="primary" sx={{ mx: 1 }}>
                Task List
            </Button>
            <Button component={RouterLink} to="/create-task" variant="contained" color="primary" sx={{ mx: 1 }}>
                Create Task
            </Button>
        </Box>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/edit-task/:id" element={<EditTask />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
