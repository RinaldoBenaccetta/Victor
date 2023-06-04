import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    open: false,
    items: [],
    title: "",
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
        setTitle: (state, action) => {
            state.title = action.payload;
        },
    },
});

export const { setOpen, setLoading, setItems, setTitle } =
    multiChoiceContextMenuSlice.actions;

export default multiChoiceContextMenuSlice.reducer;
