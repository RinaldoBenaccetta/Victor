import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, Typography, Button } from "@mui/material";
import { closeInfoModal } from "../../app/store/slices/infoModalSlice";

const InfoModal = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.infoModal.open);
    const message = useSelector(state => state.infoModal.message);

    const handleClose = () => {
        dispatch(closeInfoModal());
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Typography>{message}</Typography>
                <Button
                    onClick={handleClose}
                    color="primary"
                    sx={{
                        mt: 2,
                        display: "block",
                        mx: "auto",
                    }}
                >
                    OK
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default InfoModal;
