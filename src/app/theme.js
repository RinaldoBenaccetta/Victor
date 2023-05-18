import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#556cd6",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: "#red",
        },
        background: {
            default: "#fff",
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#556cd6",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: "#red",
        },
        background: {
            default: "#000",
        },
    },
});

export { lightTheme, darkTheme };
