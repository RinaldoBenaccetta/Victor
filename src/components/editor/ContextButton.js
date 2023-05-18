"use client";

import { useRef, useEffect } from "react";
import { Button } from "@mui/material";

const ContextButton = ({ isTextSelected, position }) => {
    const buttonRef = useRef();

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
            style={{
                position: "absolute",
                transition: "0.2s",
                visibility: isTextSelected ? "visible" : "hidden",
            }}
        >
            Click Me
        </Button>
    );
};

export default ContextButton;
