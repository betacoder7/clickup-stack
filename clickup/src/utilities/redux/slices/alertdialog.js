import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    type: null,
    title: null,
    description: null,
    onButtonClicked: null,
    positiveButtonText: null,
};

const AlertDialogSlice = createSlice({
    name: 'alertdialog',
    initialState,
    reducers: {
        show(state, action) {
            state.type = action.payload.type;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.onButtonClicked = action.payload.onButtonClicked || null;
            state.positiveButtonText = action.payload.positiveButtonText;

            state.open = true;
        },
        hide(state) {
            state.open = false;
        },
    }
});

export const { show, hide } = AlertDialogSlice.actions;
export default AlertDialogSlice.reducer;