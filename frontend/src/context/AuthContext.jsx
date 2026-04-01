import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ GET USER FROM BACKEND USING COOKIE
  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", {
      withCredentials: true
    })
    .then(res => {
      setUser(res.data);
      setIsAuthenticated(true);
    })
    .catch(() => {
      setUser(null);
      setIsAuthenticated(false);
    });
  }, []);

  // ✅ LOGIN (NO localStorage)
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // ✅ LOGOUT (call backend if needed)
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, {
        withCredentials: true
      });
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};