import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../../utils/storage";

/**
 * Save the api key on local storage and in the apiKey state.
 */
export const setApiKey = createAsyncThunk(
    // Use AsyncThunk to let the reducer pure : prevent board effects.
    "userSettings/setApiKey",
    async key => {
        // localStorage.setItem("VICTOR_OPENAI_KEY", key);
        setItem("VICTOR_OPENAI_KEY", key);
        return key;
    }
);

const userSettingsSlice = createSlice({
    name: "userSettings",
    initialState: {
        apiKey: getItem("VICTOR_OPENAI_KEY") || "",
    },
    // If reducer is asynchrone or have boards effect,
    // put it in extraReducers, otherwise, put it in reducers
    extraReducers: builder => {
        builder.addCase(setApiKey.fulfilled, (state, action) => {
            state.apiKey = action.payload;
        });
    },
});

/**
 * for exporting reducers
 */
// export const userSettingsMethods = userSettingsSlice.actions;

export const userSettingsMethods = {
    setApiKey,
};

export default userSettingsSlice;
