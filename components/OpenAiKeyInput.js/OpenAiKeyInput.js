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
            // todo : pass key in headers
            const response = await axios.get(`/api/test-key/${inputApiKey}`);

            if (response.status === 200) {
                setApiKey(inputApiKey);
                setApiCheckStatus("success");
            } else {
                setApiCheckStatus("error");
                console.error("Error testing API key");
            }
        } catch (error) {
            setApiCheckStatus("error");
            console.error("Error testing API key", error);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        testApiKey();
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
        <form
            onSubmit={handleSubmit}
            style={{ display: "flex", alignItems: "center" }}
        >
            <TextField
                value={inputApiKey}
                onChange={event => setInputApiKey(event.target.value)}
                label="Clé API OpenAI"
                type="password"
                style={{ marginRight: "1rem" }}
                id="open-ai-key"
            />
            <Button
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
                type="submit"
            >
                {buttonIcon}
                Test
            </Button>
        </form>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenAiKeyInput);
