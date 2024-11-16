import { createSlice } from "@reduxjs/toolkit";

const initialData = {
    spaceIds: {},
    spaces: {},
    hasFetched: {},
    expanded: {},
};

const spaceSlice = createSlice({
    name: 'spacesSlice',
    initialState: initialData,
    reducers: {
        add: (state, action) => {
            const { space, workspaceUUID } = action.payload;

            state.spaces = {
                ...state.spaces,
                [space.uuid]: space,
            };

            state.spaceIds[workspaceUUID] ??= [];

            state.spaceIds[workspaceUUID].push(space.uuid);
        },
        toggleFetch: (state, action) => {
            const { fetched, workspaceUUID } = action.payload;

            state.hasFetched[workspaceUUID] = fetched;
        },
        toggleExpanded: (state, action) => {
            const { expanded, spaceUUID } = action.payload;

            state.expanded[spaceUUID] = expanded;
        },
        updateExpanded: (state, action) => {
            state.expanded = {
                ...state.expanded,
                ...action.payload,
            };
        },
        update: (state, action) => {
            const space = action.payload.space;

            state.spaces = {
                ...state.spaces,
                [space.uuid]: space,
            };
        },
        remove: (state, action) => {
            const { space, workspaceUUID } = action.payload.space;

            delete state.spaces[space.uuid];
            state.spaceIds[workspaceUUID] ??= [];

            state.spaceIds[workspaceUUID] = state.spaceIds[workspaceUUID].filter(item => item !== space.uuid);
        },
        clear: (state, action) => {
            state.spaceIds = {};
            state.spaces = {};
            state.hasFetched = {};
        },
    }
});

export const { add, remove, update, clear, toggleFetch, updateExpanded, toggleExpanded } = spaceSlice.actions;
export default spaceSlice.reducer;