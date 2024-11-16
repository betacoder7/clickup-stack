import { createSlice } from "@reduxjs/toolkit";

const initialData = {
    progress: 0,
};

const topLoadingBarSlice = createSlice({
    name: 'topLoadingBarSlice',
    initialState: initialData,
    reducers: {
        setProgress: (state, action) => {
            state.progress = action.payload;
        }
    }
});

export const { setProgress } = topLoadingBarSlice.actions;
export default topLoadingBarSlice.reducer;