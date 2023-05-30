"use client";

import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { Button, TextField, CircularProgress } from "@mui/material";

import { RxCheck, RxCross2 } from "react-icons/rx";

import {
    mapDispatchToProps,
    mapStateToProps,
} from "../../app/store/dispatcher";

const OpenAiKeyInput = ({ setApiKey, userSettings }) => {
    const [inputApiKey, setInputApiKey] = useState(userSettings.apiKey);
    const [apiCheckStatus, setApiCheckStatus] = useState("");

    const testApiKey = async () => {
        setApiCheckStatus("loading");
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

    let buttonIcon;
    switch (apiCheckStatus) {
        case "success":
            buttonIcon = (
                <RxCheck size={"1.4em"} style={{ marginRight: ".3rem" }} />
            );
            break;
        case "error":
            buttonIcon = (
                <RxCross2 size={"1.4em"} style={{ marginRight: ".3rem" }} />
            );
            break;
        case "loading":
            buttonIcon = (
                <CircularProgress
                    size={".8rem"}
                    color="inherit"
                    style={{ marginRight: ".3rem" }}
                />
            );
            break;
        default:
            buttonIcon = null;
            break;
    }

    return (
        <>
            <TextField
                value={inputApiKey}
                onChange={event => setInputApiKey(event.target.value)}
                label="Clé API OpenAI"
                type="password"
                style={{ marginRight: "1rem" }}
                id="open-ai-key"
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
                style={{ textTransform: "capitalize", width: "6rem" }}
                aria-busy={apiCheckStatus === "loading"}
                aria-describedby="open-ai-key"
            >
                {buttonIcon}
                Test
            </Button>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenAiKeyInput);
