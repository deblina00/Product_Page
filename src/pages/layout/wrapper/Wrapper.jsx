import React from "react";
import ResponsiveAppBar from "../header/Header";

export default function Wrapper({ children }) {
  return (
    <>
      <ResponsiveAppBar />
      {children}
    </>
  );
}
