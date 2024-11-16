import { createSlice } from "@reduxjs/toolkit";
import * as Cache from "../../cache/cache-manager";

const initialData = {
    defaultWorkspaceUUID: null,
    defaultSpaceUUID: null,
    defaultFolderUUID: null,
    defaultListUUID: null,
};

const globalSlice = createSlice({
    name: 'globalSlice',
    initialState: initialData,
    reducers: {
        update: (state, actions) => {
            const { key, action, value } = actions.payload;

            switch (action) {
                case "update":
                    state[key] = value;
                    Cache.set(key, value);
                    break;

                case "delete":
                    state[key] = null;
                    Cache.remove(key);
                    break;

                default: break;
            }
        }
    }
});

export const { update } = globalSlice.actions;
export default globalSlice.reducer;