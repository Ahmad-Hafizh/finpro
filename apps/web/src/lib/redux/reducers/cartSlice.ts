import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callAPI } from "@/config/axios";

export interface ProductImg {
  url: string;
}

export interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
  product_img?: ProductImg[];
}

export interface CartItem {
  cart_item_id: number;
  product_id: number;
  quantity: number;
  product: Product;
  subtotal: number;
  store_name?: string;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
}

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await callAPI.get("/cart/items");
      return response.data as CartResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchCartCount = createAsyncThunk(
  "cart/fetchCartCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await callAPI.get("/cart/count");
      return response.data.count;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { cart_item_id, quantity }: { cart_item_id: number; quantity: number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await callAPI.patch(`/cart/${cart_item_id}`, { quantity });
      dispatch(fetchCartItems());
      dispatch(fetchCartCount());
      return { cart_item_id, quantity };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  },
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (cart_item_id: number, { dispatch, rejectWithValue }) => {
    try {
      await callAPI.delete(`/cart/${cart_item_id}`);
      dispatch(fetchCartItems());
      dispatch(fetchCartCount());
      return cart_item_id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  },
);

interface CartState {
  items: CartItem[];
  total: number;
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  count: 0,
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.count = action.payload;
      });
  },
});

export default cartSlice.reducer;
