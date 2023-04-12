import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
});

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}