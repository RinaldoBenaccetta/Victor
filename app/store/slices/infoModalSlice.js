import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    message: "",
};

const infoModalSlice = createSlice({
    name: "infoModal",
    initialState,
    reducers: {
        openInfoModal: (state, action) => {
            state.open = true;
            state.message = action.payload;
        },
        closeInfoModal: state => {
            state.open = false;
            state.message = "";
        },
    },
});

export const { openInfoModal, closeInfoModal } = infoModalSlice.actions;

export default infoModalSlice.reducer;
