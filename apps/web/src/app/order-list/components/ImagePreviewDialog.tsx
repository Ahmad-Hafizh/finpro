import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Button,
} from "@mui/material";

interface ImagePreviewDialogProps {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ImagePreviewDialog: React.FC<ImagePreviewDialogProps> = ({
  open,
  imageUrl,
  onClose,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="md"
    slotProps={{
      paper: { sx: { borderRadius: 3, overflow: "hidden" } },
    }}
  >
    <DialogContent sx={{ p: 0 }}>
      <Box
        component="img"
        src={imageUrl}
        alt="Payment proof"
        sx={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
      />
    </DialogContent>
    <DialogActions sx={{ p: 2 }}>
      <Button onClick={onClose} color="primary" variant="contained">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default ImagePreviewDialog;
