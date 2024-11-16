import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button } from '@mui/material';

function Popup({ row, onSave, onClose }) {
    const [task, setTask] = useState(row.task);
    const [assignee, setAssignee] = useState(row.assignee);
    const [dueDate, setDueDate] = useState(row.dueDate);

    useEffect(() => {
        setTask(row.task);
        setAssignee(row.assignee);
        setDueDate(row.dueDate);
    }, [row]);

    const handleSave = () => {
        const updatedRow = { ...row, task, assignee, dueDate };
        onSave(updatedRow);
    };

    return (
        <Modal open={true} onClose={onClose} className="flex justify-center items-center ">
            <div className=" p-6 rounded-lg w-80">
                <h2 className="text-xl mb-4">Edit Task</h2>
                <div className="mb-3">
                    <TextField
                        label="Task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Assignee"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Due Date"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="flex justify-between">
                    <Button
                        onClick={onClose}
                        variant="contained"
                        color="secondary"
                        className="mr-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default Popup;
