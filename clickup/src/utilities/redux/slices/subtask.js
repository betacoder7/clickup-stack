import { createSlice } from "@reduxjs/toolkit";
const initialData = {
    subtasks: {},
    subtaskIds: {},
    hasFetched: {},
};

const subtaskSlice = createSlice({
    name: 'subtaskSlice',
    initialState: initialData,
    reducers: {
        addsubtask: (state, action) => {
            const { subtask, taskUUID } = action.payload;

            state.subtasks = {
                ...state.subtasks,
                [subtask.uuid]: subtask,
            };
            state.subtaskIds[taskUUID] ??= [];

            state.subtaskIds[taskUUID].push(subtask.uuid);
        },

        toggleFetchsubtask: (state, action) => {
            const { fetched, taskUUID } = action.payload;
            state.hasFetched[taskUUID] = fetched;
        },

        updatasubtask: (state, action) => {
            const subtask = action.payload.subtask;

            state.suntasks = {
                ...state.subtasks,
                [subtask.uuid]: subtask,
            };
        },

        removesubtask: (state, action) => {
            const { subtask, taskUUID } = action.payload;

            delete state.subtasks[subtask.uuid];
            state.subtaskIds[taskUUID] ??= [];

            state.subtaskIds[taskUUID] = state.subtaskIds[taskUUID].filter(item => item !== subtask.uuid);
        },
        clearsubtask: (state, action) => {
            state.subtasks = {};
            state.subtaskIds = {};
            state.hasFetched = {};
        }
    }
});


export const { addsubtask, toggleFetchsubtask, updatasubtask, removesubtask, clearsubtask } = subtaskSlice.actions;
export default subtaskSlice.reducer;