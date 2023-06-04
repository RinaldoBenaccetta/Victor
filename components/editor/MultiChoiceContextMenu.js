import React from "react";
import {
    CircularProgress,
    List,
    Paper,
    Dialog,
    DialogContent,
    ListItem,
    Box,
    Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../app/store/slices/multiChoiceContextMenuSlice";

const MultiChoiceContextMenu = ({}) => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.multiChoiceContextMenu.open);
    const loading = useSelector(state => state.multiChoiceContextMenu.loading);
    const items = useSelector(state => state.multiChoiceContextMenu.items);

    const handleClose = () => {
        dispatch(setOpen(false));
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{ style: { minWidth: 200, minHeight: 200 } }}
        >
            {loading ? (
                <DialogContent>
                    <CircularProgress />
                </DialogContent>
            ) : (
                <DialogContent>
                    <List>
                        {items.map((item, index) => (
                            <ListItem key={index}>{item}</ListItem>
                        ))}
                    </List>
                </DialogContent>
            )}
        </Dialog>
    );
};

export default MultiChoiceContextMenu;
