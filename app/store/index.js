import { configureStore } from "@reduxjs/toolkit";
import userSettingsReducer from "./slices/userSettingsSlice";

export const store = configureStore({
    reducer: {
        userSettings: userSettingsReducer.reducer,
    },
});
