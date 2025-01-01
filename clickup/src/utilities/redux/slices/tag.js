import { createSlice } from "@reduxjs/toolkit";



const initialData = {
    tags: {},
    tagIds: {},
    hasFetched: {},
};

const tagSlice = createSlice({
    name: 'tag',
    initialState: initialData,
    reducer: {
        add: (state, action) => {
            const { tag, workspaceUUID } = action.payload;
            state.tags = {
                ...state.tags,
                [tag.uuid]: tag,
            };

            state.tagIds[workspaceUUID] ??= [];
            state.tagIds[workspaceUUID].push(tag.uuid);
        },
        toggleFetch: (state, action) => {
            const { fetched, workspaceUUID} = action.payload;

            state.hasFetched[workspaceUUID] = fetched;
        },

        update: (state, action) => {
            const tag = action.payload.tag;

            state.tags = {
                ...state.tags,
                [tag.uuid]: tag,
            };
        },

        remove: (state, action) => {
            const { tag, workspaceUUID } = action.payload;
            delete state.tags[tag.uuid];
            state.tagIds[workspaceUUID] ??= [];
            state.tagIds[workspaceUUID] = state.tagIds[workspaceUUID].filter(item => item !== tag.uuid);
        },

        clear: (state, action) => {
            state.tags = {};
            state.tagIds = {};
            state.hasFetched = {};
        },
    }
});


export const { add, update, remove, clear, toggleFetch } = tagSlice.actions;
export default tagSlice.reducer;
