import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface CancelOrderDialogProps {
  open: boolean;
  orderId: number | null;
  reason: string;
  onReasonChange: (reason: string) => void;
  onClose: () => void;
  onCancelOrder: () => void;
}

const CancelOrderDialog: React.FC<CancelOrderDialogProps> = ({
  open,
  orderId,
  reason,
  onReasonChange,
  onClose,
  onCancelOrder,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="cancel-dialog-title"
    slotProps={{
      paper: {
        sx: { borderRadius: 3 },
      },
    }}
  >
    <DialogTitle id="cancel-dialog-title">Cancel Order</DialogTitle>
    <DialogContent>
      <DialogContentText sx={{ mb: 2 }}>
        Please provide a reason for canceling this order.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="reason"
        label="Cancellation Reason"
        type="text"
        fullWidth
        variant="outlined"
        value={reason}
        onChange={(e) => onReasonChange(e.target.value)}
        multiline
        rows={3}
        required
      />
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 3 }}>
      <Button onClick={onClose} color="inherit">
        Cancel
      </Button>
      <Button
        onClick={onCancelOrder}
        color="error"
        variant="contained"
        disabled={!reason.trim()}
      >
        Cancel Order
      </Button>
    </DialogActions>
  </Dialog>
);

export default CancelOrderDialog;
