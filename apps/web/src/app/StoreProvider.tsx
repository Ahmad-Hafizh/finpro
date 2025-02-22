"use client";

import { Provider } from "react-redux";
import { store, AppStore } from "@/lib/redux/store";
import React, { FC, ReactNode, useRef } from "react";

interface IStoreProvider {
  children: ReactNode;
}

const StoreProvider: FC<IStoreProvider> = ({ children }) => {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = store();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
