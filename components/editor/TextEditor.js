"use client";

import { useState, useMemo } from "react";
import { createEditor, Range, Editor, Text } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { Box } from "@mui/material";
import belAmi from "../../model/demoText/belAmi";
import ContextMenu from "./ContextMenu";

const CONTEXT_MENU_APPEAR_DELAY = 1000;

const TextEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), []);

    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: belAmi }],
        },
    ]);

    const [isTextSelected, setTextSelected] = useState(false);

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
                setAnchorEl(null);
            } else {
                setTextSelected(true);
                const domSelection = window.getSelection();
                const range = domSelection.getRangeAt(0);
                const rect = range.getBoundingClientRect();

                const selectionCenter = rect.left + rect.width / 2;

                const isLeftHalf = selectionCenter < window.innerWidth / 2;

                setAnchorEl(() => ({
                    getBoundingClientRect: () => ({
                        top: rect.bottom + window.pageYOffset,
                        left: isLeftHalf
                            ? rect.left + window.pageXOffset
                            : rect.right + window.pageXOffset - rect.width,
                        width: rect.width,
                        height: rect.height,
                    }),
                }));

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
            </Slate>
        </Box>
    );
};

export default TextEditor;
