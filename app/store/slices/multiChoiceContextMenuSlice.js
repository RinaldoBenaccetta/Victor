import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    open: false,
    items: [],
};

const multiChoiceContextMenuSlice = createSlice({
    name: "multiChoiceContextMenu",
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { setOpen, setLoading, setItems } =
    multiChoiceContextMenuSlice.actions;

export default multiChoiceContextMenuSlice.reducer;
