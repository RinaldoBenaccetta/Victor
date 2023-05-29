import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Use AsyncThunk to let the reducer pure : prevent board effects.

/**
 * Save the api key on local storage and in the apiKey state.
 */
export const setApiKey = createAsyncThunk(
    "userSettings/setApiKey",
    async key => {
        localStorage.setItem("VICTOR_OPENAI_KEY", key);
        return key;
    }
);

const userSettingsSlice = createSlice({
    name: "userSettings",
    initialState: {
        apiKey: localStorage.getItem("VICTOR_OPENAI_KEY") || "",
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
