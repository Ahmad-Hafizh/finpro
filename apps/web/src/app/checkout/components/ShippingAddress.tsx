import React, { useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Address } from "../types";

interface ShippingAddressProps {
  addresses: Address[];
  selectedAddress: number | "";
  onAddressChange: (addressId: number | "") => void;
  // onAddNewAddress: () => void;
  error: string | null;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({
  addresses = [],
  selectedAddress,
  onAddressChange,
  // onAddNewAddress,
  error,
}) => {
  useEffect(() => {
    console.log("ShippingAddress - addresses:", addresses);
    console.log("ShippingAddress - selectedAddress:", selectedAddress);
  }, [addresses, selectedAddress]);

  const handleAddressChange = (event: SelectChangeEvent<number | "">) => {
    const value = event.target.value;
    onAddressChange(value === "" ? "" : Number(value));
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
        mb: 3,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          bgcolor: "primary.main",
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <LocationOnIcon sx={{ color: "primary.main", mr: 1.5, fontSize: 24 }} />
        <Typography variant="h5" component="h2">
          Delivery Address
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {addresses.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 2 }}>
          <CircularProgress size={24} sx={{ mb: 2 }} />
          <Typography color="text.secondary">Loading addresses...</Typography>
        </Box>
      ) : (
        <FormControl fullWidth required sx={{ mb: 3 }}>
          <InputLabel id="address-label">Choose Delivery Address</InputLabel>
          <Select
            labelId="address-label"
            id="address-select"
            value={selectedAddress}
            label="Choose Delivery Address"
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
      )}

      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddLocationAltIcon />}
        // onClick={onAddNewAddress}
        sx={{ mb: 2 }}
      >
        Add New Address
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
};

export default ShippingAddress;
