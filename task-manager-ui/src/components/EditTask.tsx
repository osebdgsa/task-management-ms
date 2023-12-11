import React from 'react';
import { useParams } from 'react-router-dom';

const EditTask: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // Your edit task component logic here, using the 'id' parameter
    return (
        <div>
            {/* Form to edit a specific task */}
            <h2>Edit Task {id}</h2>
        </div>
    );
};

export default EditTask;
