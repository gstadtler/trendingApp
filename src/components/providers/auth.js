import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [apiToken, setApiToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const sessionRef = useRef(true);

  const setSession = (token) => {
    localStorage.setItem("@token", token);
    setIsAuthenticated(!isAuthenticated);
  };

  const removeSession = () => {
    localStorage.removeItem("@token");
    setIsAuthenticated(!isAuthenticated);
  };

  useEffect(() => {
    // if (sessionRef.current) {
    //   sessionRef.current = false;
    const activeSessionToken = localStorage.getItem("@token");
    if (activeSessionToken) {
      setApiToken(activeSessionToken);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        apiToken,
        setApiToken,
        isAuthenticated,
        setIsAuthenticated,
        setSession,
        removeSession,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
