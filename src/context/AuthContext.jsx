import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function getStoredUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));

  function saveAuth({ user, token, apiKey }) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("apiKey", apiKey);

    setUser(user);
    setToken(token);
    setApiKey(apiKey);
  }

  function updateUser(updatedUser) {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("apiKey");

    setUser(null);
    setToken(null);
    setApiKey(null);
  }

  const value = {
    user,
    token,
    apiKey,
    isLoggedIn: Boolean(token),
    isVenueManager: Boolean(user?.venueManager),
    saveAuth,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}