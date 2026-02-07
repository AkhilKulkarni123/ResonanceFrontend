import { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('resonance_token');
    if (token) {
      authService.getMe()
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem('resonance_token');
          localStorage.removeItem('resonance_user');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await authService.login({ email, password });
    localStorage.setItem('resonance_token', res.data.token);
    setUser(res.data.user);
    return res.data;
  }, []);

  const signup = useCallback(async (data) => {
    const res = await authService.signup(data);
    localStorage.setItem('resonance_token', res.data.token);
    setUser(res.data.user);
    return res.data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('resonance_token');
    localStorage.removeItem('resonance_user');
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (data) => {
    const res = await authService.updateProfile(data);
    setUser(res.data.user);
    return res.data;
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
