"use client";

import { Menu, MenuItem } from "@mui/material";

const ContextMenu = ({ anchorEl, setAnchorEl, buttonRef }) => {
    const handleClose = () => {
        setAnchorEl(null);
        buttonRef.current.style.visibility = "hidden";
    };

    return (
        <Menu
            id="context-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>Option 1</MenuItem>
            <MenuItem onClick={handleClose}>Option 2</MenuItem>
            <MenuItem onClick={handleClose}>Option 3</MenuItem>
        </Menu>
    );
};

export default ContextMenu;
