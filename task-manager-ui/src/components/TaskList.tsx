import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, MenuItem } from '@mui/material';
import { Task } from "../types/Task";
import { fetchTasks, updateTask } from "../services/taskHttpService";
import TaskStatus from "../enums/TaskStatus";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editedTasks, setEditedTasks] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await fetchTasks();
                setTasks(response.data);
                setEditedTasks(Object.fromEntries(response.data.map((task: Task) => [task._id, false])));
            } catch (error) {
                console.error(error);
            }
        };
        getTasks();
    }, []);

    const handleEditToggle = (taskId: string) => {
        setEditedTasks({ ...editedTasks, [taskId]: !editedTasks[taskId] });
    };

    const handleInputChange = (taskId: string, field: string, value: string) => {
        const updatedTasks = tasks.map((task: Task) => {
            if (task._id === taskId) {
                return { ...task, [field]: value };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const handleTaskUpdate = async (updatedTask: Task) => {
        try {
            await updateTask(updatedTask);
            setEditedTasks({ ...editedTasks, [updatedTask._id]: false });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box display="flex" flexWrap="wrap" gap={2}>
            {tasks.map((task: Task) => (
                <Card key={task._id} variant="outlined" sx={{ width: 500, mb: 2, bgcolor: '#f5f5f5' }}>
                    <CardContent>
                        <TextField
                            value={task.title}
                            fullWidth
                            label="Title"
                            variant="outlined"
                            disabled={!editedTasks[task._id]}
                            sx={{
                                mb: 2,
                                bgcolor: 'white',
                                pointerEvents: editedTasks[task._id] ? 'auto' : 'none',
                            }}
                            onChange={(e) => handleInputChange(task._id, 'title', e.target.value)}
                        />
                        <TextField
                            multiline
                            rows={4}
                            value={task.description}
                            fullWidth
                            label="Description"
                            variant="outlined"
                            disabled={!editedTasks[task._id]}
                            sx={{
                                mb: 2,
                                bgcolor: 'white',
                                pointerEvents: editedTasks[task._id] ? 'auto' : 'none',
                            }}
                            onChange={(e) => handleInputChange(task._id, 'description', e.target.value)}
                        />
                        <TextField
                            select
                            value={task.status}
                            fullWidth
                            label="Status"
                            variant="outlined"
                            disabled={!editedTasks[task._id]}
                            sx={{
                                mb: 2,
                                bgcolor: 'white',
                                pointerEvents: editedTasks[task._id] ? 'auto' : 'none',
                            }}
                            onChange={(e) => handleInputChange(task._id, 'status', e.target.value)}
                        >
                            {Object.values(TaskStatus).map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            type="date"
                            value={new Date(task.dueDate).toISOString().split('T')[0]}
                            fullWidth
                            label="Due Date"
                            variant="outlined"
                            disabled={!editedTasks[task._id]}
                            sx={{
                                mb: 2,
                                bgcolor: 'white',
                                pointerEvents: editedTasks[task._id] ? 'auto' : 'none',
                            }}
                            onChange={(e) => handleInputChange(task._id, 'dueDate', e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {editedTasks[task._id] && (
                            <Button onClick={() => handleTaskUpdate(task)}>Save</Button>
                        )}
                        <Button onClick={() => handleEditToggle(task._id)}>
                            {editedTasks[task._id] ? 'Cancel' : 'Edit'}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default TaskList;
