import React from "react";
import {
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Search as SearchIcon,
  CalendarMonth as CalendarIcon,
  Clear as ClearIcon,
  Assignment as OrderIcon,
} from "@mui/icons-material";

interface OrderFiltersProps {
  searchParams: { date: string; orderNumber: string };
  setSearchParams: (params: { date: string; orderNumber: string }) => void;
  onSearch: () => void;
  onReset: () => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  searchParams,
  setSearchParams,
  onSearch,
  onReset,
}) => {
  return (
    <Paper
      sx={{
        p: { xs: 2, md: 3 },
        mb: 4,
        borderRadius: 3,
        border: "1px solid #e0e0e0",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <Grid container spacing={2} alignItems="flex-end">
          <Grid size={{ xs: 12, sm: 5 }}>
            <TextField
              fullWidth
              id="orderNumber"
              label="Order Number"
              variant="outlined"
              value={searchParams.orderNumber}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  orderNumber: e.target.value,
                })
              }
              placeholder="Search Order Number"
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <OrderIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: searchParams.orderNumber && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setSearchParams({ ...searchParams, orderNumber: "" })
                        }
                        edge="end"
                        size="small"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
                inputLabel: { shrink: true },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <TextField
              fullWidth
              id="orderDate"
              label="Order Date"
              type="date"
              variant="outlined"
              value={searchParams.date}
              onChange={(e) =>
                setSearchParams({ ...searchParams, date: e.target.value })
              }
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: searchParams.date && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setSearchParams({ ...searchParams, date: "" })
                        }
                        edge="end"
                        size="small"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
                inputLabel: { shrink: true },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Stack direction="row" spacing={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                fullWidth
              >
                Search
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={onReset}
                fullWidth
              >
                Reset
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default OrderFilters;
