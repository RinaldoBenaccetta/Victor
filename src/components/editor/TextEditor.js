"use client";

import { useState, useMemo } from "react";
import { createEditor, Range, Editor, Text } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { Box } from "@mui/material";
import belAmi from "@/model/demoText/belAmi";
import ContextButton from "./ContextButton";

const BUTTON_APPEAR_DELAY = 1000;

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
                const rect = range.getBoundingClientRect();

                // Set the position of the button
                setButtonPosition({
                    top: rect.bottom + window.pageYOffset,
                    left: rect.right + window.pageXOffset,
                });

                const selectedText = window.getSelection().toString();

                setSelectedText(selectedText);
            }
        }, BUTTON_APPEAR_DELAY);
    };

    return (
        <Box>
            <Slate
                editor={editor}
                value={value}
                onChange={value => setValue(value)}
            >
                <Editable onSelect={handleSelect} />

                <ContextButton
                    isTextSelected={isTextSelected}
                    position={buttonPosition}
                    selectedText={selectedText}
                />
            </Slate>
        </Box>
    );
};

export default TextEditor;
