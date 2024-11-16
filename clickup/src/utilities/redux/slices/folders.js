import { createSlice } from "@reduxjs/toolkit";

const initialData = {
    folderIds: {},
    folders: {},
    hasFetched: {},
    expanded: {},
};

const folderSlice = createSlice({
    name: 'foldersSlice',
    initialState: initialData,
    reducers: {
        add: (state, action) => {
            const { folder, spaceUUID } = action.payload;

            state.folders = {
                ...state.folders,
                [folder.uuid]: folder,
            };

            state.folderIds[spaceUUID] ??= [];

            state.folderIds[spaceUUID].push(folder.uuid);
        },
        toggleFetch: (state, action) => {
            const { fetched, spaceUUID } = action.payload;

            state.hasFetched[spaceUUID] = fetched;
        },
        toggleExpanded: (state, action) => {
            const { expanded, folderUUID } = action.payload;

            state.expanded[folderUUID] = expanded;
        },
        updateExpanded: (state, action) => {
            state.expanded = {
                ...state.expanded,
                ...action.payload,
            };
        },
        update: (state, action) => {
            const folder = action.payload.folder;

            state.folders = {
                ...state.folders,
                [folder.uuid]: folder,
            };
        },
        remove: (state, action) => {
            const { folder, spaceUUID } = action.payload.folder;

            delete state.folders[folder.uuid];
            state.folderIds[spaceUUID] ??= [];

            state.folderIds[spaceUUID] = state.folderIds[spaceUUID].filter(item => item !== folder.uuid);
        },
        clear: (state, action) => {
            state.folderIds = {};
            state.folders = {};
            state.hasFetched = {};
        },
    }
});

export const { add, remove, update, clear, toggleFetch, toggleExpanded, updateExpanded } = folderSlice.actions;
export default folderSlice.reducer;