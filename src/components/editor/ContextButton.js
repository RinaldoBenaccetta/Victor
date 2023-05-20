"use client";

import { useRef, useEffect } from "react";
import { Button, useTheme } from "@mui/material";
import { RxDotsVertical } from "react-icons/rx";

const ContextButton = ({ isTextSelected, position }) => {
    const buttonRef = useRef();
    const theme = useTheme();

    useEffect(() => {
        if (isTextSelected && position) {
            // Position the button
            buttonRef.current.style.top = `${position.top}px`;
            buttonRef.current.style.left = `${position.left}px`;
        }
    }, [isTextSelected, position]);

    return (
        <Button
            ref={buttonRef}
            variant="contained"
            style={{
                position: "absolute",
                transition: "0.2s",
                visibility: isTextSelected ? "visible" : "hidden",
            }}
            color="grey"
            aria-label="outils"
        >
            <RxDotsVertical />
        </Button>
    );
};

export default ContextButton;
