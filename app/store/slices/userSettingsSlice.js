import { createSlice } from "@reduxjs/toolkit";

const userSettingsSlice = createSlice({
    name: "userSettings",
    initialState: {
        apiKey: "",
    },
    reducers: {
        setApiKey: (state, action) => {
            state.apiKey = action.payload;
        },
    },
});

export const userSettingsMethods = userSettingsSlice.actions;

export default userSettingsSlice;
