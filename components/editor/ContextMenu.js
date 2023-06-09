"use client";

import { Popper, Fade, Paper, MenuItem, List } from "@mui/material";
import { useRef, useState } from "react";
import { getSynonyms } from "../../app/editor/services/text-editor/synonym";
import { connect, useDispatch } from "react-redux";
import {
    mapDispatchToProps,
    mapStateToProps,
} from "../../app/store/dispatcher";
import {
    setItems,
    setLoading,
    setOpen,
    setTitle,
} from "../../app/store/slices/multiChoiceContextMenuSlice";
import { openInfoModal } from "../../app/store/slices/infoModalSlice";
import getAntonyms from "../../app/apiServices/getAntonyms";

const ContextMenu = ({ anchorEl, setAnchorEl, selectedText, userSettings }) => {
    const singleWordFirstRef = useRef(null);
    const notASingleWordFirstRef = useRef(null);

    const dispatch = useDispatch();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const showModalNeedApiKey = () => {
        dispatch(
            openInfoModal("Vous devez entrer un clé API de OpenAi valide")
        );
    };

    const handleGetSynonyms = async (selectedText, apiKey) => {
        if (!apiKey) {
            showModalNeedApiKey();
            return;
        }

        dispatch(setLoading(true));
        dispatch(setOpen(true));
        dispatch(setTitle(`Synonymes de ${selectedText}`));

        const synonyms = await getSynonyms(selectedText, apiKey);

        if (synonyms) {
            dispatch(setItems(synonyms));
        }

        dispatch(setLoading(false));
    };

    const handleGetAntonyms = async (selectedText, apiKey) => {
        if (!apiKey) {
            showModalNeedApiKey();
            return;
        }

        dispatch(setLoading(true));
        dispatch(setOpen(true));
        dispatch(setTitle(`Antonymes de ${selectedText}`));

        const antonymes = await getAntonyms(selectedText, apiKey);

        if (antonymes) {
            dispatch(setItems(antonymes));
        }

        dispatch(setLoading(false));
    };

    const isSingleWord = selectedText && !selectedText.trim().includes(" ");

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
                                        onClick={async () => {
                                            await handleGetSynonyms(
                                                selectedText,
                                                userSettings.apiKey
                                            );
                                            handleClose();
                                        }}
                                        key="synonyme"
                                        tabIndex={0} // this make menuItem focusable with tab
                                    >
                                        Synonyme
                                    </MenuItem>
                                ),
                                isSingleWord && (
                                    <MenuItem
                                        onClick={async () => {
                                            await handleGetAntonyms(
                                                selectedText,
                                                userSettings.apiKey
                                            );
                                            handleClose();
                                        }}
                                        key="antonyme"
                                        tabIndex={0}
                                    >
                                        Antonyme
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

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
