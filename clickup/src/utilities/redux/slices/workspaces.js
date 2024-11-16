import { createSlice } from "@reduxjs/toolkit";

const initialData = {
    workspaceIds: [],
    workspaces: {},
    hasFetched: false,
};

const workspaceSlice = createSlice({
    name: 'workspaceSlice',
    initialState: initialData,
    reducers: {
        add: (state, action) => {
            const workspace = action.payload.workspace;

            state.workspaces = {
                ...state.workspaces,
                [workspace.uuid]: workspace,
            };

            state.workspaceIds.push(workspace.uuid);
        },
        toggleFetch: (state, action) => {
            state.hasFetched = action.payload;
        },
        update: (state, action) => {
            const workspace = action.payload.workspace;

            state.workspaces = {
                ...state.workspaces,
                [workspace.uuid]: workspace,
            };
        },
        remove: (state, action) => {
            const workspace = action.payload.workspace;

            delete state.workspaces[workspace.uuid];
            state.workspaceIds = state.workspaceIds.filter(item => item !== workspace.uuid);
        },
        clear: (state, action) => {
            state.workspaceIds = [];
            state.workspaces = {};

            state.hasFetched = false;
        },
    }
});

export const { add, remove, update, toggleFetch, clear } = workspaceSlice.actions;
export default workspaceSlice.reducer;