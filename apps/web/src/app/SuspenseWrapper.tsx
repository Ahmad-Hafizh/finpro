import { Suspense } from "react";
import React from "react";

interface ISuspenseWrapperProps {
  children: React.ReactNode;
}

const SuspenseWrapper: React.FC<ISuspenseWrapperProps> = ({ children }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default SuspenseWrapper;
