"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Custom404() {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-white text-black">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-xl font-medium">Page Not Found</p>
      <p className="text-center text-sm">
        The Page you are looking for doesnt exist or an other error occured.{" "}
        <br />
        <span className="text-green-500" onClick={() => router.back()}>
          Go back
        </span>
        , or head over to{" "}
        <span className="text-green-500" onClick={() => router.replace("/")}>
          Greeneries
        </span>{" "}
        to choose a new direction
      </p>
    </div>
  );
}
