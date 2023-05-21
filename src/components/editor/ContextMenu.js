"use client";

import { Popper, Fade, Paper, MenuItem } from "@mui/material";

const ContextMenu = ({ anchorEl, selectedText }) => {
    const handleClose = () => {
        setAnchorEl(null);
    };

    const isSingleWord = selectedText && !selectedText.trim().includes(" ");

    return (
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
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
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
};

export default ContextMenu;
