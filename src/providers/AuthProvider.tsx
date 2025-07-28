import axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthContext } from '@contexts/AuthContext';
import type { User, UserLogin, UserRegister } from '@models/user.interface';

const TOKEN_KEY = 'auth_token';

export interface AuthProviderProps {
  children: React.ReactNode;
}
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const updateToken = (newToken: string) => {
    if (newToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    }
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
  };

  const register = async (data: UserRegister) => {
    try {
      const res = await axios.post<string>('/api/auth/register', data);
      updateToken(res.data);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logOut = () => {
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  const logIn = async ({ email, password }: UserLogin) => {
    try {
      const res = await axios.post<string>(`/api/auth/login`, { email, password });
      updateToken(res.data);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) throw new Error('No token found');

      setIsLoading(true);
      try {
        const res = await axios.get<User>('/api/auth/me');
        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        logOut();
      } finally {
        setIsLoading(false);
      }
    };

    if (token && !user) {
      fetchUser();
    }
  }, [token, user]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, logOut, logIn, register }}>{children}</AuthContext.Provider>
  );
}
