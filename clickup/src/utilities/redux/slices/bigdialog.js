import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    child: null,
};

const BigDialogSlice = createSlice({
    name: 'bigdialog',
    initialState,
    reducers: {
        show(state, action) {
            state.child = action.payload.child;

            state.open = true;
        },
        hide(state) {
            state.open = false;
            state.child = null; 
        },
    }
});

export const { show, hide } = BigDialogSlice.actions;
export default BigDialogSlice.reducer;