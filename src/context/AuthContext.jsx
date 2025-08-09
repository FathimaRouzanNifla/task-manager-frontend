import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  login as authLogin,
  register as authRegister,
  logout as authLogout,
  getProfile,
} from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const userData = await authLogin(email, password);
      setUser(userData);
      localStorage.setItem('token', userData.token);
      navigate('/');
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Login failed';
      setError(message);
      throw new Error(message);
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const userData = await authRegister(name, email, password);
      setUser(userData);
      localStorage.setItem('token', userData.token);
      navigate('/');
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Registration failed';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await authLogout();
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
