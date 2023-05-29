"use client";

import React, { useState } from "react";
import { connect } from "react-redux";

import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { IoIosSettings } from "react-icons/io";

import { mapStateToProps } from "../../app/store/dispatcher";
import { mapDispatchToProps } from "../../app/store/dispatcher";

const NavBarSettings = ({ userSettings, setApiKey }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log("apikey : ", userSettings.apiKey);

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
                        value={userSettings.apiKey}
                        onChange={event => setApiKey(event.target.value)}
                        label="Clé API OpenAI"
                        type="password"
                    />
                </MenuItem>
            </Menu>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarSettings);
