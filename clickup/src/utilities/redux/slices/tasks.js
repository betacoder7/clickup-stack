import { createSlice } from "@reduxjs/toolkit";

const initialData = {
    taskIds: {},
    tasks: {},
    hasFetched: {},
};


const taskSlice = createSlice({
    name: 'tasksSlice',
    initialState: initialData,
    reducers: {
        add: (state, action) => {
            const { task, listUUID } = action.payload;

            console.log(listUUID ,"avction");
            console.log(task ,"taskactionss");
            
            

            state.tasks = {
                ...state.tasks,
                [task.uuid]: task,
            };

            state.taskIds[listUUID] ??= [];

            state.taskIds[listUUID].push(task.uuid);
        },
        toggleFetch: (state, action) => {
            const { fetched, listUUID } = action.payload;

            state.hasFetched[listUUID] = fetched;
        },
        update: (state, action) => {
            const task = action.payload.task;

            state.tasks = {
                ...state.tasks,
                [task.uuid]: task,
            };
        },
        remove: (state, action) => {
            const { task, listUUID } = action.payload;

            delete state.tasks[task.uuid];
            state.taskIds[listUUID] ??= [];

            state.taskIds[listUUID] = state.taskIds[listUUID].filter(item => item !== task.uuid);
        },
        clear: (state, action) => {
            state.tasks = {};
            state.taskIds = {};
            state.hasFetched = {};
        },
    }
});

export const { add, remove, update, clear, toggleFetch } = taskSlice.actions;
export default taskSlice.reducer;


