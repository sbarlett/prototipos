import React from "react";
import ReactDOM from "react-dom/client";
// import Clarity from "@microsoft/clarity";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Clarity.init("TU_PROJECT_ID");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
