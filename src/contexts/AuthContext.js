import React, { createContext, useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { login, refresh, verify } from "../api/auth";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  console.log("AuthProvider CONTEXT");
  const [cookies] = useCookies(["refresh_token", "access_token"]);
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
