"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    try {
      const saved = localStorage.getItem("auth_token");
      if (saved) setToken(saved);
    } catch (_) {}
    setLoading(false);
  }, []);

  const login = useCallback(async ({ username, password, remember }) => {
    const res = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      
      const text = await res.text().catch(() => "");
      throw new Error(text || "Login failed");
    }

    const data = await res.json(); 
    if (!data?.token) throw new Error("No token in response");

    setToken(data.token);
    if (remember) {
      try { localStorage.setItem("auth_token", data.token); } catch (_) {}
    }
    return data.token;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    try { localStorage.removeItem("auth_token"); } catch (_) {}
  }, []);

  const value = { token, login, logout, loading, isAuthenticated: !!token };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
