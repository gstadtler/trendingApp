import React from "react";
import ReactDOM from "react-dom";
import "./global.scss";
import App from "./App";
import { AuthProvider } from "./components/providers/auth";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
