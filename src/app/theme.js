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
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "roundButton" },
                    style: {
                        backgroundColor: "#aaa",
                        color: "rgba(0, 0, 0, 0.87)",
                        borderColor: "rgba(0, 0, 0, 0.87)",
                        borderRadius: "50%",
                    },
                },
            ],
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
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "roundButton" },
                    style: {
                        backgroundColor: "#AAA",
                        color: "#fff",
                        borderColor: "#fff",
                        borderRadius: "50%",
                    },
                },
            ],
        },
    },
});

export { lightTheme, darkTheme };
