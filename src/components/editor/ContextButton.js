"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { RxDotsVertical } from "react-icons/rx";

import ContextMenu from "./ContextMenu";

const ContextButton = ({ isTextSelected, position, selectedText }) => {
    const buttonRef = useRef();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        event.preventDefault();

        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (isTextSelected && position) {
            // Position the button
            buttonRef.current.style.top = `${position.top}px`;
            buttonRef.current.style.left = `${position.left}px`;
            buttonRef.current.style.visibility = "visible";
        } else {
            buttonRef.current.style.visibility = "hidden";
        }
    }, [isTextSelected, position]);

    return (
        <>
            <Button
                ref={buttonRef}
                variant="contained"
                style={{
                    position: "absolute",
                    visibility: isTextSelected ? "visible" : "hidden",
                }}
                color="grey"
                aria-label="outils"
                onClick={handleClick}
            >
                <RxDotsVertical />
            </Button>

            <ContextMenu
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                buttonRef={buttonRef}
                selectedText={selectedText}
            />
        </>
    );
};

export default ContextButton;
