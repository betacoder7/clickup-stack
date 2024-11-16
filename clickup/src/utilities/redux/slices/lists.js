import { createSlice } from "@reduxjs/toolkit";

const initialData = {
    listIds: {},
    lists: {},
    hasFetched: {},
};

const listSlice = createSlice({
    name: 'listsSlice',
    initialState: initialData,
    reducers: {
        add: (state, action) => {
            const { list, folderUUID } = action.payload;

            state.lists = {
                ...state.lists,
                [list.uuid]: list,
            };

            state.listIds[folderUUID] ??= [];

            state.listIds[folderUUID].push(list.uuid);
        },
        toggleFetch: (state, action) => {
            const { fetched, folderUUID } = action.payload;

            state.hasFetched[folderUUID] = fetched;
        },
        update: (state, action) => {
            const list = action.payload.list;

            state.lists = {
                ...state.lists,
                [list.uuid]: list,
            };
        },
        remove: (state, action) => {
            const { list, folderUUID } = action.payload;

            delete state.lists[list.uuid];
            state.listIds[folderUUID] ??= [];

            state.listIds[folderUUID] = state.listIds[folderUUID].filter(item => item !== list.uuid);
        },
        clear: (state, action) => {
            state.lists = {};
            state.listIds = {};
            state.hasFetched = {};
        },
    }
});

export const { add, remove, update, clear, toggleFetch } = listSlice.actions;
export default listSlice.reducer;