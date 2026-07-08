import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;

    try {
      const storedUser = window.localStorage.getItem("cinepulse-user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to load auth user", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        window.localStorage.setItem("cinepulse-user", JSON.stringify(user));
      } else {
        window.localStorage.removeItem("cinepulse-user");
      }
    } catch (error) {
      console.error("Failed to save auth user", error);
    }
  }, [user]);

  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, message: "Please enter both email and password." };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = normalizedEmail.split("@")[0];
    const newUser = {
      email: normalizedEmail,
      name: normalizedName,
    };

    setUser(newUser);
    return { success: true, message: "Signed in successfully." };
  };

  const logout = () => setUser(null);

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
