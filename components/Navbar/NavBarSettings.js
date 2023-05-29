"use client";

import React, { useState } from "react";
import { connect } from "react-redux";

import axios from "axios";

import { Button, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { IoIosSettings } from "react-icons/io";

import { mapStateToProps } from "../../app/store/dispatcher";
import { mapDispatchToProps } from "../../app/store/dispatcher";

const NavBarSettings = ({ userSettings, setApiKey }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [inputApiKey, setInputApiKey] = useState(userSettings.apiKey);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const testApiKey = async () => {
        try {
            const response = await axios.get(`/api/test-key/${inputApiKey}`);

            if (response.status === 200) {
                setApiKey(inputApiKey);
                console.log("valid API key");
            } else {
                console.error("Error testing API key");
            }
        } catch (error) {
            console.error("Error testing API key", error);
        }
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
                        value={inputApiKey}
                        onChange={event => setInputApiKey(event.target.value)}
                        label="Clé API OpenAI"
                        type="password"
                    />
                    <Button onClick={testApiKey}>Test</Button>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarSettings);
