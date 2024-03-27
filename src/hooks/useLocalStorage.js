import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      return initialValue;
    } finally {
      setLoading(false);
    }
  });

  const setValue = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
      setErrorMessage(null);
    } catch (error) {
      console.error(`Error writing localStorage item "${key}":`, error);
      setErrorMessage(
        `Error writing local storage item "${key}": ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return [storedValue, setValue, errorMessage, loading];
};

export default useLocalStorage;
