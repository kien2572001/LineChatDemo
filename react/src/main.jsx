import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./Dashboard.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./context/ContextProvider.jsx";
import { Buffer } from "buffer";
global.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
