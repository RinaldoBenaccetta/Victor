"use client";

import { useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Box } from "@mui/material";
import belAmi from "@/model/demoText/belAmi";

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

    return (
        <Box>
            <Slate
                editor={editor}
                value={value}
                onChange={value => setValue(value)}
            >
                <Editable />
            </Slate>
        </Box>
    );
};

export default TextEditor;
