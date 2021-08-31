import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [apiToken, setApiToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{ apiToken, setApiToken, isAuthenticated, setIsAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
