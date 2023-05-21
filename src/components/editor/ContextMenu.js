"use client";

import { Menu, MenuItem } from "@mui/material";

const ContextMenu = ({ anchorEl, setAnchorEl, selectedText }) => {
    const handleClose = () => {
        setAnchorEl(null);
        // buttonRef.current.style.visibility = "hidden";
    };

    const isSingleWord = selectedText && !selectedText.trim().includes(" ");

    return (
        <Menu
            id="context-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {/* Menu need for items in an array  */}
            {[
                isSingleWord && (
                    <MenuItem onClick={handleClose} key="synonyme">
                        synonyme
                    </MenuItem>
                ),
                isSingleWord && (
                    <MenuItem onClick={handleClose} key="antonyme">
                        antonyme
                    </MenuItem>
                ),
                <MenuItem onClick={handleClose} key="option1">
                    Option 1
                </MenuItem>,
            ]}
        </Menu>
    );
};

export default ContextMenu;
