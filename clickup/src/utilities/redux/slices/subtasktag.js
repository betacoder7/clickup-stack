import { createSlice } from "@reduxjs/toolkit";


const initialsubtasktag = {
    subtasktag: {},
    tagIdbySubtask: {},
};


const tagsubtaskSlice = createSlice({
    name: "tagsubtask",
    initialState: initialsubtasktag,
    reducers: {
        addtagsubtask: (state, action) => {
            const { subtaskUUID, tagUUID, tags } = action.payload;

            state.subtasktag[tags.uuid] = tags;

            state.tagIdbySubtask[subtaskUUID] ??= [];

            if (!state.tagIdbySubtask[subtaskUUID].includes(tagUUID)) {
                state.tagIdbySubtask[subtaskUUID].push(tagUUID);
            }
        },
        removesubtasktag: (state, action) => {
            const { subtaskUUID, tagUUID } = action.payload;

            if (state.tagIdbySubtask[subtaskUUID]) {
                state.tagIdbySubtask[subtaskUUID] = state.tagIdbySubtask[subtaskUUID].filter(id => id !== tagUUID);

                for (const [uuid, tags] of Object.entries(state.tag)) {
                    if (tags.taskId === subtaskUUID && tags.tagId === tagUUID) {
                        delete state.subtasktag[uuid];
                        break;
                    }
                }
            }
        },

        clearsubtasktag: (state) => {
            state.subtasktag = {};
            state.tagIdbySubtask = {};
        }
    }
});

export const { addtagsubtask  ,removesubtasktag , clearsubtasktag } = tagsubtaskSlice.actions;
export default tagsubtaskSlice.reducer;