import { createSlice } from "@reduxjs/toolkit";

const initialAssignData = {
    assigns: {}, // Stores assignment data by UUID
    assignIdsByTask: {}, // Maps task UUIDs to an array of user UUIDs assigned to the task
};

const assignsSlice = createSlice({
    name: 'assignsSlice',
    initialState: initialAssignData,
    reducers: {
        // Add an assignment
        addAssign: (state, action) => {
            const { taskUUID, userUUID, assignment } = action.payload;

            // Store the assignment data
            state.assigns[assignment.uuid] = assignment;

            // Initialize the array if it doesn't exist for the taskUUID
            state.assignIdsByTask[taskUUID] ??= [];

            // Add the userUUID to the array if it's not already there
            if (!state.assignIdsByTask[taskUUID].includes(userUUID)) {
                state.assignIdsByTask[taskUUID].push(userUUID);
            }
        },
        // Remove an assignment
        removeAssign: (state, action) => {
            const { taskUUID, userUUID } = action.payload;

            // Filter out the userUUID from the array
            if (state.assignIdsByTask[taskUUID]) {
                state.assignIdsByTask[taskUUID] = state.assignIdsByTask[taskUUID].filter(id => id !== userUUID);

                // Remove the assignment if it exists
                for (const [uuid, assignment] of Object.entries(state.assigns)) {
                    if (assignment.taskId === taskUUID && assignment.userId === userUUID) {
                        delete state.assigns[uuid];
                        break;
                    }
                }
            }
        },
        // Clear all assignments
        clearAssigns: (state) => {
            state.assigns = {};
            state.assignIdsByTask = {};
        },
    },
});

export const { addAssign, removeAssign, clearAssigns } = assignsSlice.actions;
export default assignsSlice.reducer;
