import { createSlice } from "@reduxjs/toolkit";

const initialAssignData = {
    tag: {},
    tagIdbyTask: {}
};

const tagtaskSlice = createSlice({
    name: "tagtask",
    initialState: initialAssignData,
    reducers: {
        //add an tag
        addtagtask: (state, action) => {
            const { taskUUID, tagUUID, tags } = action.payload;

            // Store the tag data
            state.tag[tags.uuid] = tags;

            //initialize the array if it doesn't exist for the taskUUID
            state.tagIdbyTask[taskUUID] ??= [];

            //add the tagUUID to the array if it's not already there
            if (!state.tagIdbyTask[taskUUID].includes(tagUUID)) {
                state.tagIdbyTask[taskUUID].push(tagUUID);
            }
        },

        //remove an tag
        removetagtask: (state, action) => {
            const { taskUUID, tagUUID } = action.payload;

            //Filter out the tagUUID from the array
            if (state.tagIdbyTask[taskUUID]) {
                state.tagIdbyTask[taskUUID] = state.tagIdbyTask[taskUUID].filter(id => id !== tagUUID);

                //remove the tag if it exists
                for (const [uuid, tags] of Object.entries(state.tag)) {
                    if (tags.taskId === taskUUID && tags.tagId === tagUUID) {
                        delete state.tag[uuid];
                        break;
                    }
                }
            }
        },
        //clear all tags
        cleartag: (state) => {
            state.tag = {};
            state.tagIdbyTask = {};
        },
    }
});

export const { addtagtask, removetagtask, cleartag } = tagtaskSlice.actions;
export default tagtaskSlice.reducer;