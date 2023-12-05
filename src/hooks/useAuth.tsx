import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import { useLocalStorage } from './useLocalStorage';

interface UseAuthOutput {
  error: string | null;
  loading: boolean;
  token: string | null;
  isAdmin: boolean;
  login(email: string, password: string): void;
  logout(): void;
}

export function useAuth(): UseAuthOutput {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useLocalStorage<string | null>('token');
  const [isAdmin, setisAdmin] = useLocalStorage<boolean>('isAdmin');
  const navigate = useNavigate();

  const login = useCallback((email: string, password: string) => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Usuário e/ou Senha invalidos');
        }
        return res.json();
      })
      .then(({ token, isAdmin }) => {
        setToken(token);
        setisAdmin(isAdmin);
        navigate('/', { replace: true });
      })
      .catch(({ message }) => setError(message))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    setToken(null);
    navigate('/login', { replace: true });
  };

  return {
    error,
    loading,
    token,
    isAdmin,
    login,
    logout,
  };
}
