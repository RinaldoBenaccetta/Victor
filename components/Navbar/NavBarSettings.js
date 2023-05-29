"use client";

import React, { useState } from "react";
import { connect } from "react-redux";

import axios from "axios";

import { Button, IconButton, Menu, MenuItem, TextField } from "@mui/material";

import { IoIosSettings } from "react-icons/io";
import { RxCheck } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

import { mapStateToProps } from "../../app/store/dispatcher";
import { mapDispatchToProps } from "../../app/store/dispatcher";

const NavBarSettings = ({ userSettings, setApiKey }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [inputApiKey, setInputApiKey] = useState(userSettings.apiKey);
    const [apiCheckStatus, setApiCheckStatus] = useState(null);

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
                setApiCheckStatus("success");
                console.log("valid API key");
            } else {
                setApiCheckStatus("error");
                console.error("Error testing API key");
            }
        } catch (error) {
            setApiCheckStatus("error");
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
                        style={{ marginRight: ".5rem" }}
                    />
                    <Button
                        onClick={testApiKey}
                        variant="contained"
                        color={
                            apiCheckStatus === "success"
                                ? "success"
                                : apiCheckStatus === "error"
                                ? "error"
                                : "primary"
                        }
                        style={{ textTransform: "capitalize" }}
                    >
                        {apiCheckStatus === "success" && <RxCheck />}
                        {apiCheckStatus === "error" && <RxCross2 />}
                        Test
                    </Button>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarSettings);
