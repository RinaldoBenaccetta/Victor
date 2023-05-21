"use client";

import { useState, useMemo } from "react";
import { createEditor, Range, Editor, Text } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { Box } from "@mui/material";
import belAmi from "@/model/demoText/belAmi";
// import ContextButton from "./ContextButton";
import ContextMenu from "./ContextMenu";

const CONTEXT_MENU_APPEAR_DELAY = 1000;

const TextEditor = () => {
    // Initialize Slate editor
    const editor = useMemo(() => withReact(createEditor()), []);

    // Initialize Slate state
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: belAmi }],
        },
    ]);

    // Track whether text is selected
    const [isTextSelected, setTextSelected] = useState(false);

    // Store the position of the button
    const [buttonPosition, setButtonPosition] = useState(null);

    // Store the selected text
    const [selectedText, setSelectedText] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);

    const handleSelect = () => {
        // Delay execution to allow Slate to update selection
        setTimeout(() => {
            const { selection } = editor;
            if (
                !selection ||
                Range.isCollapsed(selection) ||
                !ReactEditor.isFocused(editor)
            ) {
                setTextSelected(false);
            } else {
                setTextSelected(true);
                const domSelection = window.getSelection();
                const range = domSelection.getRangeAt(0);
                // const rect = range.getBoundingClientRect();

                // Set the position of the button
                // setButtonPosition({
                //     top: rect.bottom + window.pageYOffset,
                //     left: rect.right + window.pageXOffset,
                // });

                // Get the position of the selection
                const rect = range.getBoundingClientRect();
                const selectionCenter = rect.left + rect.width / 2;

                console.log("rect : ", rect);

                // Check which half of the screen the selection is in
                const isLeftHalf = selectionCenter < window.innerWidth / 2;

                // Set the position of the context menu
                setAnchorEl({
                    getBoundingClientRect: () => ({
                        top: rect.bottom + window.pageYOffset,
                        left: isLeftHalf
                            ? rect.left + window.pageXOffset
                            : rect.right + window.pageXOffset,
                        width: rect.width,
                        height: rect.height,
                    }),
                });

                const selectedText = window.getSelection().toString();

                setSelectedText(selectedText);
            }
        }, CONTEXT_MENU_APPEAR_DELAY);
    };

    return (
        <Box>
            <Slate
                editor={editor}
                value={value}
                onChange={value => setValue(value)}
            >
                <Editable onSelect={handleSelect} />

                <ContextMenu
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    selectedText={selectedText}
                />

                {/* <ContextButton
                    isTextSelected={isTextSelected}
                    position={buttonPosition}
                    selectedText={selectedText}
                /> */}
            </Slate>
        </Box>
    );
};

export default TextEditor;
