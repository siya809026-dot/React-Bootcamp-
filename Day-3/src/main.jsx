import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from "./Context/AuthContext.jsx";
import ThemeProvider from "./Context/ThemeContext.jsx";
import ToastProvider from "./Context/ToastContext.jsx";
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthContextProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
