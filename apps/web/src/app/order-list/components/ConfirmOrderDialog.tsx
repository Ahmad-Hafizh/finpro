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
    <DialogTitle id="confirm-dialog-title">
      Konfirmasi Penerimaan Pesanan
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Apakah Anda yakin ingin mengonfirmasi penerimaan pesanan ini? Tindakan
        ini tidak dapat dibatalkan.
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 3 }}>
      <Button onClick={onClose} color="inherit">
        Batal
      </Button>
      <Button onClick={onConfirmOrder} color="primary" variant="contained">
        Konfirmasi Penerimaan
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmOrderDialog;
