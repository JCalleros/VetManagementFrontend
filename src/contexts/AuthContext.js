import React, { createContext, useState, useEffect, useCallback } from "react";
import { login, verify } from "../api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await verify();
        if (JSON.stringify(response) === JSON.stringify({})) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthentication();
    const refreshInterval = setInterval(checkAuthentication, 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, []);

  const logIn = useCallback(async ({ email, password }) => {
    setIsLoading(true);
    setError(null);
    try {
      await login({ email, password });
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        logIn,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
