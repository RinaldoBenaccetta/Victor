"use client";

import React, { useState } from "react";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { IoIosSettings } from "react-icons/io";

const NavBarSettings = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [apiKey, setApiKey] = useState("");

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <IoIosSettings />
            </IconButton>
            <Menu
                id="settings-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <TextField
                        value={apiKey}
                        onChange={event => setApiKey(event.target.value)}
                        label="Clé API OpenAI"
                        type="password"
                    />
                </MenuItem>
            </Menu>
        </div>
    );
};

export default NavBarSettings;
