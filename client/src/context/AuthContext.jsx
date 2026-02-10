import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const isProduction = window.location.hostname.includes('vercel.app');
            const backendUrl = isProduction
                ? 'https://devspace-backend-hfu5.onrender.com'
                : 'http://localhost:5001';

            try {
                const res = await axios.get(`${backendUrl}/api/current_user`, {
                    withCredentials: true
                });
                setUser(res.data);
            } catch (err) {
                console.error("Error fetching user", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
