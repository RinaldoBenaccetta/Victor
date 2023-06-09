import { configureStore } from "@reduxjs/toolkit";
import userSettingsReducer from "./slices/userSettingsSlice";
import multiChoiceContextMenuReducer from "./slices/multiChoiceContextMenuSlice";
import infoModalSliceReducer from "./slices/infoModalSlice";

export const store = configureStore({
    reducer: {
        userSettings: userSettingsReducer.reducer,
        multiChoiceContextMenu: multiChoiceContextMenuReducer,
        infoModal: infoModalSliceReducer,
    },
});
