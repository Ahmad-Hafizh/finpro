/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  // SelectChangeEvent,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppSelector } from "@/lib/redux/hooks";
import { callAPI } from "@/config/axios";
// import { Address } from "../types";

interface ShippingCourierProps {
  // addresses: any[];
  selectedAddress: number | "";
  // onAddressChange: (addressId: number | "") => void;
  // onAddNewAddress: () => void;
  onSelectCourier: (courier: string, cost: number) => void;
  selectedCourier: string;
  error: string | null;
}
interface CourierType {
  courier: string;
  cost: number;
}

const ShippingCourier: React.FC<ShippingCourierProps> = ({
  // addresses,
  selectedAddress,
  // onAddressChange,
  // onAddNewAddress
  // ,
  selectedCourier,
  onSelectCourier,
  error,
}) => {
  const store = useAppSelector((state) => state.store);
  // const [courier, setCourier] = useState([]);
  const [courier, setCourier] = useState<CourierType[]>([]);
  // const handleAddressChange = (event: SelectChangeEvent<number | "">) => {
  //   const value = event.target.value;
  //   onAddressChange(value === "" ? "" : Number(value));
  // };

  const onGetCourier = async () => {
    try {
      const response = await callAPI.post("/address/ongkir", {
        store_id: store.store_id,
        address_id: selectedAddress,
      });

      setCourier(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetCourier();
  }, [selectedAddress]);

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
        <InputLabel id="courier-label">Pilih Jasa Pengiriman</InputLabel>
        <Select
          labelId="courier-label"
          id="courier-select"
          value={selectedCourier}
          label="Pilih Jasa Pengiriman"
          onChange={(e) => {
            const selectedValue = e.target.value;
            const selectedOption = courier.find(
              (c: any) => c.courier === selectedValue,
            );
            if (selectedOption) {
              onSelectCourier(selectedOption.courier, selectedOption.cost);
            }
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                borderRadius: 12,
              },
            },
          }}
        >
          {courier.map((c: any, i: number) => (
            <MenuItem key={i} value={c.courier}>
              {c.courier}
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
