import React from "react";
import {
    CircularProgress,
    List,
    Paper,
    Dialog,
    DialogContent,
    Box,
    MenuItem,
    DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../app/store/slices/multiChoiceContextMenuSlice";

const MultiChoiceContextMenu = ({}) => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.multiChoiceContextMenu.open);
    const loading = useSelector(state => state.multiChoiceContextMenu.loading);
    const items = useSelector(state => state.multiChoiceContextMenu.items);
    const title = useSelector(state => state.multiChoiceContextMenu.title);

    const handleClose = () => {
        dispatch(setOpen(false));
    };

    const handleItemClick = item => {
        console.log(item);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={props => (
                <Paper {...props} style={{ minWidth: 200, minHeight: 200 }} />
            )}
        >
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                {loading ? (
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <List>
                        {items.map((item, index) => (
                            <MenuItem
                                key={index}
                                tabIndex={0}
                                style={{ textAlign: "center" }}
                                onClick={() => handleItemClick(item)}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default MultiChoiceContextMenu;
