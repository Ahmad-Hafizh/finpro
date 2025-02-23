import { createSlice } from "@reduxjs/toolkit";

export interface IStore {
  store_id: number;
  store_name: string;
  store_address: string;
  city: string;
  lat: string;
  lng: string;
  distance: number;
}

const initialStore: IStore = {
  store_id: 0,
  store_name: "",
  store_address: "",
  city: "",
  lat: "",
  lng: "",
  distance: 0,
};

export const storeSlice = createSlice({
  name: "store",
  initialState: initialStore,
  reducers: {
    setStore(initialState, action) {
      return { ...action.payload };
    },
  },
});

export const { setStore } = storeSlice.actions;
export default storeSlice.reducer;
