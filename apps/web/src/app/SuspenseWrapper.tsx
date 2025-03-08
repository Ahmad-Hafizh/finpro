import { Suspense } from "react";
import React from "react";
import Loading from "./loading";

interface ISuspenseWrapperProps {
  children: React.ReactNode;
}

const SuspenseWrapper: React.FC<ISuspenseWrapperProps> = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default SuspenseWrapper;
