import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center">
      <CircularProgress color="success" />
    </div>
  );
};

export default Loading;
