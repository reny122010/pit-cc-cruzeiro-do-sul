import { useState } from 'react';

export function useLocalStorage<T>(key: string): [T, Function] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  });
  const setValue = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };
  return [storedValue, setValue];
}
