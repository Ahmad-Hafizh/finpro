/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmOrderDialogProps {
  open: boolean;
  orderId: number | null;
  onClose: () => void;
  onConfirmOrder: () => void;
}

const ConfirmOrderDialog: React.FC<ConfirmOrderDialogProps> = ({
  open,
  orderId,
  onClose,
  onConfirmOrder,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="confirm-dialog-title"
    slotProps={{
      paper: {
        sx: { borderRadius: 3 },
      },
    }}
  >
    <DialogTitle id="confirm-dialog-title">Delivery Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure to confirm this delivery? The action can not be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 3 }}>
      <Button onClick={onClose} color="inherit">
        Batal
      </Button>
      <Button onClick={onConfirmOrder} color="primary" variant="contained">
        Confirm Delivery
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmOrderDialog;
