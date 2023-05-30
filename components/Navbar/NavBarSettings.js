"use client";

import React, { useState } from "react";
import { connect } from "react-redux";

import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import OpenAiKeyInput from "../OpenAiKeyInput.js/OpenAiKeyInput";

import { IoIosSettings } from "react-icons/io";
import { mapStateToProps } from "../../app/store/dispatcher";
import { mapDispatchToProps } from "../../app/store/dispatcher";

const NavBarSettings = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
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
                    <OpenAiKeyInput />
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarSettings);
