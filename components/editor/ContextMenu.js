"use client";

import { Popper, Fade, Paper, MenuItem, List } from "@mui/material";
import { useRef } from "react";

const ContextMenu = ({ anchorEl, setAnchorEl, selectedText }) => {
    const singleWordFirstRef = useRef(null);
    const notASingleWordFirstRef = useRef(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isSingleWord = selectedText && !selectedText.trim().includes(" ");

    const handleSynonyms = async () => {
        try {
            const res = await fetch(`/api/get-synonyms/${selectedText}`);
            // const res = await fetch(`/api/get-synonyms`);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const data = await res.json();
            console.log(data.synonyms);
        } catch (error) {
            console.error("Fetch error:", error);
        }
        handleClose();
    };

    return (
        // Popper because Menu is not working well with fake anchorEl
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                        <List>
                            {[
                                isSingleWord && (
                                    <MenuItem
                                        ref={singleWordFirstRef}
                                        onClick={handleSynonyms}
                                        key="synonyme"
                                        tabIndex={0} // this make menuItem focusable with tab
                                    >
                                        synonyme
                                    </MenuItem>
                                ),
                                isSingleWord && (
                                    <MenuItem
                                        onClick={handleClose}
                                        key="antonyme"
                                        tabIndex={0}
                                    >
                                        antonyme
                                    </MenuItem>
                                ),
                                <MenuItem
                                    ref={notASingleWordFirstRef}
                                    onClick={handleClose}
                                    key="option1"
                                    tabIndex={0}
                                >
                                    Option 1
                                </MenuItem>,
                                <MenuItem
                                    onClick={handleClose}
                                    key="option2"
                                    tabIndex={0}
                                    // This make a circular navigation :
                                    // the focus go on the first item when press tab
                                    onKeyDown={e => {
                                        if (e.key === "Tab") {
                                            e.preventDefault();
                                            // focus on right item according to single word or not
                                            (isSingleWord
                                                ? singleWordFirstRef
                                                : notASingleWordFirstRef
                                            ).current.focus();
                                        }
                                    }}
                                >
                                    Option 2
                                </MenuItem>,
                            ]}
                        </List>
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
};

export default ContextMenu;
