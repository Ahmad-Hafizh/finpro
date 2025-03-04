import React from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  SelectChangeEvent,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Address } from "../types";

interface ShippingCourierProps {
  addresses: Address[];
  selectedAddress: number | "";
  onAddressChange: (addressId: number | "") => void;
  onAddNewAddress: () => void;
  error: string | null;
}

const ShippingCourier: React.FC<ShippingCourierProps> = ({
  addresses,
  selectedAddress,
  onAddressChange,
  onAddNewAddress,
  error,
}) => {
  const handleAddressChange = (event: SelectChangeEvent<number | "">) => {
    const value = event.target.value;
    onAddressChange(value === "" ? "" : Number(value));
  };

  const onGetCourier = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        border: "1px solid #e0e0e0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <LocationOnIcon sx={{ color: "primary.main", mr: 1.5, fontSize: 24 }} />
        <Typography variant="h5" component="h2">
          Kurir Pengiriman
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <FormControl fullWidth required sx={{ mb: 3 }}>
        <InputLabel id="address-label">Pilih Alamat Pengiriman</InputLabel>
        <Select
          labelId="address-label"
          id="address-select"
          value={selectedAddress}
          label="Pilih Alamat Pengiriman"
          onChange={handleAddressChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                borderRadius: 12,
              },
            },
          }}
        >
          {addresses.map((address) => (
            <MenuItem key={address.address_id} value={address.address_id}>
              {address.street}, {address.city}, {address.province}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {error && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
};

export default ShippingCourier;
