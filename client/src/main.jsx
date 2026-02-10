import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';

import { AuthProvider } from './context/AuthContext';

// Global Axios Configuration
const isProduction = window.location.hostname.includes('vercel.app');
axios.defaults.baseURL = isProduction
    ? 'https://devspace-backend-hfu5.onrender.com'
    : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001');

axios.defaults.withCredentials = true; // Essential for cross-origin cookies

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
