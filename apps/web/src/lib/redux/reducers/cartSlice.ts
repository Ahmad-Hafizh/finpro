import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      const res = await fetch("http://localhost:8090/cart/items");
      const data: CartResponse = await res.json();
      if (!res.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCartCount = createAsyncThunk(
  "cart/fetchCartCount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:8090/cart/count");
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data);
      }
      return data.count;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { cart_item_id, quantity }: { cart_item_id: number; quantity: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await fetch(`http://localhost:8090/cart/${cart_item_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.error);
      }

      dispatch(fetchCartItems());
      dispatch(fetchCartCount());
      return { cart_item_id, quantity };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (cart_item_id: number, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:8090/cart/${cart_item_id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.error);
      }
      dispatch(fetchCartItems());
      dispatch(fetchCartCount());
      return cart_item_id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
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
