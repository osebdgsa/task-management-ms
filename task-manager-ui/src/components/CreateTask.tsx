import React, { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { createTask } from '../services/taskHttpService';
import TaskStatus from "../enums/TaskStatus";

const CreateTask = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date().toISOString().substr(0, 10)); // Default to today's date
    const [status, setStatus] = useState(TaskStatus.BACKLOG);
    const [createError, setCreateError] = useState('');

    const handleTitleChange = (e: any) => {
        setTaskTitle(e.target.value);
        setCreateError('');
    };

    const handleDescriptionChange = (e: any) => {
        setTaskDescription(e.target.value);
        setCreateError('');
    };

    const handleDueDateChange = (e: any) => {
        setDueDate(e.target.value);
        setCreateError('');
    };

    const handleStatusChange = (e: any) => {
        setStatus(e.target.value);
        setCreateError('');
    };

    const handleCreateTask = async () => {
        try {
            await createTask({
                title: taskTitle,
                description: taskDescription,
                dueDate: new Date(dueDate),
                status: status,
            });

            setTaskTitle('');
            setTaskDescription('');
            setDueDate(new Date().toISOString().substr(0, 10));
            setStatus(TaskStatus.BACKLOG);
        } catch (error) {
            setCreateError('Failed to create task. Please try again.');
        }
    };

    return (
        <Box>
            <Typography variant="h4">Create Task</Typography>
            <Box my={2}>
                <TextField
                    label="Task Title"
                    variant="outlined"
                    value={taskTitle}
                    onChange={handleTitleChange}
                    fullWidth
                />
            </Box>
            <Box my={2}>
                <TextField
                    label="Task Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={taskDescription}
                    onChange={handleDescriptionChange}
                    fullWidth
                />
            </Box>
            <Box my={2}>
                <TextField
                    label="Due Date"
                    type="date"
                    variant="outlined"
                    value={dueDate}
                    onChange={handleDueDateChange}
                    fullWidth
                />
            </Box>
            <Box my={2}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        onChange={handleStatusChange}
                        label="Status"
                    >
                        {Object.values(TaskStatus).map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box my={2}>
                <Button onClick={handleCreateTask} variant="contained" color="primary" fullWidth>
                    Create Task
                </Button>
            </Box>
            {createError && (
                <Typography variant="body2" color="error">{createError}</Typography>
            )}
        </Box>
    );
};

export default CreateTask;
