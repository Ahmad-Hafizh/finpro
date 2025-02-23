import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import storeReducer from "./reducers/storeSlice";

export const store = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      store: storeReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
