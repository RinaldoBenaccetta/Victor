import { createTheme } from "@mui/material/styles";

// Créer un thème clair
const lightTheme = createTheme({
    palette: {
        mode: "light", // Ici, on définit le mode à 'light'
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

// Créer un thème sombre
const darkTheme = createTheme({
    palette: {
        mode: "dark", // Ici, on définit le mode à 'dark'
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
