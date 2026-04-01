import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "./i18n/index.js";
import App from "./App.jsx";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:5000";   // ⭐ VERY IMPORTANT
axios.defaults.withCredentials = true;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <SidebarProvider>
          <AuthProvider>
            <App />
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          </AuthProvider>
        </SidebarProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
