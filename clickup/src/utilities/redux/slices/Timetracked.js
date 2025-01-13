import { createSlice } from "@reduxjs/toolkit";



const initialData = {
    timetrackedIds: {},
    timetrackeds: {},
    hasFetched: {}
};


const timetrackedSlice = createSlice({
    name: 'timetracked',
    initialState: initialData,
    reducers: {
        add: (state, action) => {
            const { time, taskUUID } = action.payload;

            state.timetrackeds = {
                ...state.timetrackeds,
                [time.uuid]: time,
            };

            state.timetrackedIds[taskUUID] ??= [];
            state.timetrackedIds[taskUUID].push(time.uuid);
        },
        togleFetch: (state, action) => {
            const { fetchedtime, taskUUID } = action.payload;

            state.hasFetched[taskUUID] = fetchedtime;
        },
        update: (state, action) => {
            const timedata = action.payload;

            state.timetrackeds = {
                ...state.timetrackeds,
                [timedata.uuid]: timedata
            };
        },
        remove: (state, action) => {
            const { time, taskUUID } = action.payload;

            delete state.timetrackeds[time.uuid];
            state.timetrackedIds[taskUUID] ??= [];
        },

        clear: (state, action) => {
            state.timetrackeds = {};
            state.timetrackedIds = {};
            state.hasFetched = {};
        }
    }
});

export const { add, remove, update, clear, togleFetch } = timetrackedSlice.actions;
export default timetrackedSlice.reducer;