import { useState, useEffect } from 'react';

/**
 * A custom hook for storing and retrieving data in local storage.
 * @param {string} key - The key under which to store the data in local storage.
 * @param {any} initialValue - The initial value to use if no value is found in local storage.
 * @returns {[any, function]} - A tuple containing the current value and a function to update the value.
 */
const useLocalStorageState = <T>(
  key: string,
  initialValue: T
): [T, (newValue: T) => void] => {
  const storedValue = localStorage.getItem(key);
  let initial;

  if (storedValue !== null) {
    try {
      initial = JSON.parse(storedValue);
    } catch {
      initial = initialValue;
    }
  } else {
    initial = initialValue;
    localStorage.setItem(key, JSON.stringify(initialValue));
  }

  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (storedValue === null) {
      localStorage.setItem(key, JSON.stringify(initialValue));
    }
  }, [key, initialValue, storedValue]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setValue(JSON.parse(event.newValue) as T);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  /**
   * Function to update the value in localStorage and state.
   * @param {any} newValue - The new value to set and store in local storage.
   */
  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));

    window.dispatchEvent(new CustomEvent("local-storage-update", { detail: { key, newValue } }));
  };

  useEffect(() => {
    const handleCustomStorageEvent = (event: CustomEvent) => {
      if (event.detail.key === key) {
        setValue(event.detail.newValue);
      }
    };

    window.addEventListener("local-storage-update", handleCustomStorageEvent as EventListener);
    return () => window.removeEventListener("local-storage-update", handleCustomStorageEvent as EventListener);
  }, [key]);

  return [value, setStoredValue];
};

export default useLocalStorageState;
