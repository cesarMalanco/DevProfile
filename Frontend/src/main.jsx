import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CVProvider } from "./context/CVContext";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CVProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CVProvider>
  </AuthProvider>
);