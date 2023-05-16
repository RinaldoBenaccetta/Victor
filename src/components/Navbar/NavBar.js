"use client";

import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

const navItems = [
    {
        text: "Accueil",
        link: "/",
    },
    {
        text: "Editeur",
        link: "/editor",
    },
];

export default function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(prevState => !prevState);
    };

    const menuItems = (
        <>
            {navItems.map((item, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton
                        component={Link}
                        to={item.link}
                        onClick={() => {
                            setMobileOpen(false);
                        }}
                        sx={{ textAlign: "center" }}
                    >
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </>
    );

    const drawer = (
        <Box
            sx={{
                textAlign: "center",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <IconButton
                sx={{ alignSelf: "flex-end", margin: ".5rem" }}
                onClick={handleDrawerToggle}
            >
                <RxCross2 />
            </IconButton>
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ my: 2 }}>
                    Victor
                </Typography>
                <Divider />
                <List>{menuItems}</List>
            </Box>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { sm: "none" },
                        }}
                    >
                        <RxHamburgerMenu />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        Victor
                    </Typography>

                    <List
                        sx={{
                            flexDirection: "row",
                            display: { xs: "none", sm: "flex" },
                            p: 1,
                        }}
                    >
                        {menuItems}
                    </List>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: "100%",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
