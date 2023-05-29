import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Use AsyncThunk to let the reducer pure : prevent board effects.
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
        apiKey: "",
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
