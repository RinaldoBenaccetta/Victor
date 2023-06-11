"use client";

import { useState, useMemo } from "react";
import { createEditor, Range, Editor, Text, Transforms } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { Box } from "@mui/material";
import belAmi from "../../model/demoText/belAmi";
import ContextMenu from "./ContextMenu";
import MultiChoiceContextMenu from "./MultiChoiceContextMenu";
import { trimAndAppendSpaces } from "../../app/utils/text/trimAndAppendSpaces";

const CONTEXT_MENU_APPEAR_DELAY = 1000;

const TextEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), []);

    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: belAmi }],
        },
    ]);

    // const [isTextSelected, setTextSelected] = useState(false);
    const [selectedText, setSelectedText] = useState("");
    const [extendedSelectedText, setExtendedSelectedText] = useState("");
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
                // setTextSelected(false);
                setAnchorEl(null);
            } else {
                // setTextSelected(true);
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

                const beforePoint = Editor.before(editor, selection, {
                    unit: "word",
                });
                const afterPoint = Editor.after(editor, selection, {
                    unit: "word",
                });

                if (beforePoint && afterPoint) {
                    const extendedRange = {
                        anchor: beforePoint,
                        focus: afterPoint,
                    };
                    const extendedText = Editor.string(editor, extendedRange);

                    setExtendedSelectedText(extendedText);
                }
            }
        }, CONTEXT_MENU_APPEAR_DELAY);
    };

    const handleSelectionReplacement = itemValue => {
        const { selection } = editor;
        if (!selection) return;

        const selectedText = Editor.string(editor, selection);

        // Delete the currently selected text
        Editor.deleteFragment(editor);

        // Insert the new text
        const newText = trimAndAppendSpaces(selectedText, itemValue);
        Transforms.insertText(editor, newText);
    };

    const handleExtendedSelectionReplacement = itemValue => {
        const { selection } = editor;
        if (!selection) return;

        const beforePoint = Editor.before(editor, selection, { unit: "word" });
        const afterPoint = Editor.after(editor, selection, { unit: "word" });

        if (beforePoint && afterPoint) {
            const extendedRange = { anchor: beforePoint, focus: afterPoint };

            // Delete the extended text
            Transforms.delete(editor, { at: extendedRange });

            const newText = itemValue.trim();

            // Insert the new text
            Transforms.insertText(editor, newText, {
                at: extendedRange.anchor,
            });
        }
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
                    extendedSelectedText={extendedSelectedText}
                />
                <MultiChoiceContextMenu
                    onItemSelect={handleExtendedSelectionReplacement}
                />
            </Slate>
        </Box>
    );
};

export default TextEditor;
