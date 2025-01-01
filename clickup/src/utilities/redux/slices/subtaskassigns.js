import { createSlice } from "@reduxjs/toolkit";

const initialsubtaskAssignData = {
    subtaskassigns: {}, 
    assignIdsBySubTask: {}, 
};

const subtaskassignsSlice = createSlice({
    name: 'subtaskassignsSlice',
    initialState: initialsubtaskAssignData,
    reducers: {
        // Add an assignment
        addAssignsubtask: (state, action) => {
            const { subtaskUUID, userUUID, assignment } = action.payload;

            // Store the assignment data
            state.subtaskassigns[assignment.uuid] = assignment;

            // Initialize the array if it doesn't exist for the taskUUID
            state.assignIdsBySubTask[subtaskUUID] ??= [];

            // Add the userUUID to the array if it's not already there
            if (!state.assignIdsBySubTask[subtaskUUID].includes(userUUID)) {
                state.assignIdsBySubTask[subtaskUUID].push(userUUID);
            }
        },
        // Remove an assignment
        removeAssignsubtask: (state, action) => {
            const { subtaskUUID, userUUID } = action.payload;

            // Filter out the userUUID from the array
            if (state.assignIdsBySubTask[subtaskUUID]) {
                state.assignIdsBySubTask[subtaskUUID] = state.assignIdsBySubTask[subtaskUUID].filter(id => id !== userUUID);

                // Remove the assignment if it exists
                for (const [uuid, assignment] of Object.entries(state.subtaskassigns)) {
                    if (assignment.subtaskId === subtaskUUID && assignment.userId === userUUID) {
                        delete state.subtaskassigns[uuid];
                        break;
                    }
                }
            }
        },
        // Clear all assignments
        clearAssignssubtask: (state) => {
            state.subtaskassigns = {};
            state.assignIdsBySubTask = {};
        },
    },
});

export const { addAssignsubtask, removeAssignsubtask, clearAssignssubtask } = subtaskassignsSlice.actions;
export default subtaskassignsSlice.reducer;
