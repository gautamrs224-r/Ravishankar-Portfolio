import { createContext, useContext, useEffect, useState } from "react";
import { verifyToken } from "../api.js";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // checking stored token on mount

  // On mount, check if there's a stored token that's still valid
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) { setLoading(false); return; }

    verifyToken()
      .then(() => setIsLoggedIn(true))
      .catch(() => {
        localStorage.removeItem("adminToken");
        setIsLoggedIn(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const loginSuccess = (token) => {
    localStorage.setItem("adminToken", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };

  return (
    <AdminContext.Provider value={{ isLoggedIn, loading, loginSuccess, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
};
