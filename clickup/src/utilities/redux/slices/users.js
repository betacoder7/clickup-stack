import { createSlice } from "@reduxjs/toolkit";

const initialData = {
    email: null,
    fullName: null,
    uuid: null,
    image: null,
    createdAt: null,
    updatedAt: null,
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialData,
    reducers: {
        set: (state, action) => {
            state.email = action.payload.email ?? state.email;
            state.fullName = action.payload.fullName ?? state.fullName;
            state.uuid = action.payload.uuid ?? state.uuid;
            state.image = action.payload.image ?? state.image;
            state.createdAt = action.payload.createdAt ?? state.createdAt;
            state.updatedAt = action.payload.updatedAt ?? state.updatedAt;
        },
        clear: (state, action) => {
            state.email = null;
            state.fullName = null;
            state.uuid = null;
            state.image = null;
            state.createdAt = null;
            state.updatedAt = null;
        },
    }
});

export const { set, clear } = userSlice.actions;
export default userSlice.reducer;