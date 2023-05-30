import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { Button, TextField } from "@mui/material";

import { RxCheck, RxCross2 } from "react-icons/rx";

import {
    mapDispatchToProps,
    mapStateToProps,
} from "../../app/store/dispatcher";

const OpenAiKeyInput = ({ setApiKey, userSettings }) => {
    const [inputApiKey, setInputApiKey] = useState(userSettings.apiKey);
    const [apiCheckStatus, setApiCheckStatus] = useState("");

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
        <>
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
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenAiKeyInput);
